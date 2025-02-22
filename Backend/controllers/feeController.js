import db from '../models/index.js';
import csvParser from 'csv-parser';
import fs from 'fs';
import { Op } from 'sequelize';

const { 
  Fee, FeeOptional, FeeNonOptional, 
  Admin, 
  FeeType, Bill, 
  Room, RoomType,
  Resident, Vehicle,
  Receipt, DonationReceipt 
} = db;

async function createOptionalFee(req, res, adminId, deadline) {
  const { name, lowerBound } = req.body;
  if (name == null || lowerBound == null) {
    return res.status(400).json({message: 'Thiếu thông tin' });
  }
  if (lowerBound < 0) {
    return res.status(400).json({ message: 'Phí tối thiểu là số âm' });
  }
  const fee = await Fee.create({
    name,
    isOptional: true,
    createdById: adminId,
    deadline: new Date(deadline),
    houseCount: 0,
    paidCount: 0,
  });
  await FeeOptional.create({
    lowerBound,
    id: fee.id
  });
  return res.status(200).json({
    message: 'Thêm phí thành công',
    data: { id: fee.id }
  })
}

const FeeCalculationMethod = {
  csv: 1,
  area: 2,
  vehicleCount: 3
};

async function createNonOptionalFee(req, res, adminId, deadline, feeCalculationMethod) {
  const { typeId, month, year } = req.body;
  if (typeId == null || month == null || year == null) {
    return res.status(400).json({message: 'Thiếu thông tin' });
  }
  if (month < 1 || month > 12 || year < 2000 || year > 3000) {
    return res.status(400).json({ message: 'Sai ngày tháng'});
  }

  const feeType = await FeeType.findOne({ where: { id: typeId } });
  if (!feeType) {
    return res.status(400).json({ message: 'Sai loại phí' });
  }
  const name = `${feeType.name} - ${month}/${year}`;

  let feeList = null;
  if (feeCalculationMethod === FeeCalculationMethod.csv) {


    if (req.body.feeList == null) {
      return res.status(400).json({ message: 'Thiếu danh sách phí'});
    }
    feeList = JSON.parse(req.body.feeList);
    if (!Array.isArray(feeList)) {
      return res.status(400).json({ message: 'Danh sách phí sai định dạng'});
    }


  } else {

    if (req.body.valuePerUnit == null) {
      return res.status(400).json({ message: 'Thiếu giá trị tính phí'});
    }
    if (req.body.valuePerUnit <= 0) {
      return res.status(400).json({ message: 'Giá trị tính phí phải lớn hơn 0'});
    }
    feeList = (await Room.findAll({
      include: [
        {
          model: RoomType,
          attributes: ['area']
        },
        {
            model: Resident,
            attributes: ['id']
        },
        {
            model: Vehicle,
            attributes: ['id'],
        },
      ]
    }))
    .filter(r => (r.Residents.length > 0)) // Must have people in room to make fee
    .filter(r => (
      feeCalculationMethod !== FeeCalculationMethod.vehicleCount 
      || r.Vehicles.length > 0
    )) // Must have vehicle(s) if this method is used
    .map(r => ({
      id: r.id,
      value: feeCalculationMethod === FeeCalculationMethod.area
        ? r.RoomType.area * req.body.valuePerUnit
        : feeCalculationMethod === FeeCalculationMethod.vehicleCount
          ? r.Vehicles.length * req.body.valuePerUnit
          : null
    }));
  }

  const isListValid = feeList.every(f => (f.id != null && f.value != null && !isNaN(f.value)));
  if (!isListValid) {
    return res.status(400).json({ message: 'Danh sách phí sai định dạng' });
  }
  const fee = await Fee.create({
    name,
    isOptional: false,
    createdById: adminId,
    deadline: new Date(deadline),
    houseCount: feeList.length,
    paidCount: 0,
  });
  const bills = feeList.map(f => ({
    roomId: f.id,
    value: f.value,
    feeId: fee.id,
  }));

  await FeeNonOptional.create({
    id: fee.id,
    date: new Date(year, month - 1, 1),
    type: typeId
  });

  await Bill.bulkCreate(bills);
  return res.status(200).json({
    message: 'Thêm phí thành công',
    data: { id: fee.id }
  })
  
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createFee(req, res) {
  try {
    const { createfeetoken } = req.headers;
    if (!createfeetoken) {
      return res.status(403).json({message: 'Bạn không có quyền tạo phí'});
    }

    const { deadline, isOptional, adminId } = req.body;
    if (deadline == null || isOptional == null || adminId == null) {
      return res.status(400).json({message: 'Thiếu thông tin' });
    }
    if (!(await Admin.findOne({ where: { id: adminId }}))) {
      return res.status(400).json({ message: 'Admin không tồn tại'});
    }

    if (isOptional === 'true') {
      return await createOptionalFee(req, res, adminId, deadline);
    } else {
      const feeCalculationMethod = req.body.basedOnSize === 'true' 
        ? FeeCalculationMethod.area
        : req.body.basedOnVehicleCount === 'true'
          ? FeeCalculationMethod.vehicleCount
          : FeeCalculationMethod.csv;
      return await createNonOptionalFee(req, res, adminId, deadline, feeCalculationMethod);
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
}

export async function getNonOptionalTypes(req, res) {
  try {
    const feeTypes = await FeeType.findAll({
      attributes: ['id', 'name'],
    });

    res.status(200).json({
      data: feeTypes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function parseCsv(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file' });
    }

    const filePath = req.file.path;
    const records = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        // Push each row to records array
        records.push(row);
      })
      .on('end', async () => {
        // Delete the file after reading
        fs.unlinkSync(filePath);

        // Validate required columns
        if (!records.every((record) => 'room' in record && 'value' in record)) {
          return res.status(400).json({ message: 'File phải có cột "room" và "value"' });
        }

        // Fetch all rooms from the database
        const rooms = await Room.findAll({
          attributes: ['id', 'roomName'],
        });

        // Create a map for room name to ID
        const roomMap = rooms.reduce((map, room) => {
          map[room.roomName] = room.id;
          return map;
        }, {});

        // Process the records and match with room IDs
        const data = records.map((record) => ({
          id: roomMap[record.room] || null, // Use null if the room name doesn't exist in the database
          name: record.room,
          value: parseInt(record.value), // Convert value to a number
        }));

        // Check if any room name was unmatched
        if (data.some((entry) => entry.id === null)) {
          return res.status(400).json({
            message: 'Có một số phòng không tồn tại',
            data,
          });
        }

        // Respond with the processed data
        res.status(200).json({
          message: 'File OK',
          data,
        });
      });
  } catch (error) {
    console.error('Error processing CSV:', error);
    // Return an error response
    res.status(500).json({ message: error });
  }
};

export async function getAllFees(req, res) {
  try {
    const feeAttributes = ['id', 'name', 'isOptional', 'deadline', 'houseCount', 'paidCount', 'createdAt'];
    // Fetch all fees with their associated variant data
    const fees = await Fee.findAll({
      attributes: feeAttributes,
      include: [{
        model: FeeOptional,
        attributes: ['lowerBound'],
      }],
    });
    const data = fees.map((f) => ({
      isOptional: f.isOptional,
      deadline: f.deadline,
      name: f.name,
      id: f.id,
      createdAt: f.createdAt,
      count: f.isOptional ? null : f.houseCount,
      finished: f.paidCount,
      ...(f.isOptional ? { lowerBound: f.lowerBound } : {})
    }));
    res.status(200).json({
      message: 'OK',
      data: data,
    });
  } catch (error) {
    console.error('Error fetching fees:', error);
    res.status(500).json({ message: error});
  }
};

export async function getFeesStatus(req, res) {
  try {
    const { id: idsRaw } = req.query;
    if (!idsRaw) {
      return res.status(200).json([]);
    }
    const ids = JSON.parse(`[${idsRaw}]`);
    
    const fees = await Fee.findAll({
      where: { id: { [Op.in]: ids } },
      include: [
        {
          model: Bill,
          attributes: ['roomId', 'value'],
          include: [
            {
              model: Room,
              attributes: ['roomName'],
            },
            {
              model: Receipt,
              attributes: ['id', 'value']
            }
          ],
        },
        {
          model: DonationReceipt,
          attributes: ['roomId', 'value'],
          include: [
            {
              model: Room,
              attributes: ['roomName'],
            }
          ],
        },
        {
          model: FeeOptional,
          attributes: ['lowerBound'],
        }
      ],
    });

    const data = fees.map(f => ({
      isOptional: f.isOptional,
      deadline: f.deadline,
      name: f.name,
      id: f.id,
      createdAt: f.createdAt,
      count: f.houseCount,
      finished: f.paidCount,
      ...f.isOptional 
        ? { lowerBound: f.FeeOptional.lowerBound }
        : {},
      values: f.isOptional 
        ? f.DonationReceipts.map(d => ({
          roomId: d.roomId,
          paidAmount: d.value,
          roomName: d.roomName,
        }))
        : f.Bills.map((b) => ({
          roomId: b.roomId,
          needAmount: b.value,
          paidAmount: b.Receipt?.value ?? 0,
          isPaid: b.Receipt != null,
          roomName: b.Room.roomName,
        }))        
    }));
    const sortedData = data.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
    return res.status(200).json(sortedData);
  } catch (error) {
    console.error('Error get fee info:', error);
    res.status(500).json({ message: error});
  }
}

export async function updateNonOptionalFee(req, res) {
  try {
    if (!req.headers.updatefeetoken) {
      return res.status(403).json({ message: 'Bạn không có quyền cập nhật khoản thu'});
    }
    
    const { data: dataRaw } = req.body;
    if (dataRaw == null) {
      return res.status(400).json({ message: 'Không có dữ liệu' });
    }
    let data;
    try {
      data = JSON.parse(dataRaw);
    } catch (error) {
      return res.status(400).json({ message: 'Sai định dạng' + ' ' + error });
    }
    if (!Array.isArray(data)) {
      return res.status(400).json({ message: 'Sai định dạng' });
    }

    const { id: feeId } = req.params;
    if (feeId == null) {
      
      return res.status(400).json({ message: 'Thiếu dữ liệu' });
    }

    const fee = await Fee.findOne({
      where: { id: feeId },
      include: {
        model: FeeNonOptional
      }
    });

    if (fee == null || fee.FeeNonOptional == null) {
      return res.status(400).json({ message: 'Khoản thu không tồn tại' });
    }

    let dataValid = true;
    if (dataValid === false) {
      return res.status(400).json({ message: 'Danh sách phí sai định dạng' });
    }

    data.forEach(async d => await Bill.update(
      { value: d.value }, 
      { where: { feeId, roomId: d.roomId } })
    );
    return res.status(200).json({ message: 'Cập nhật khoản thu cho phòng thành công'});
  } catch (error) {
    console.error('Error updating fee:', error);
    res.status(500).json({ message: error});
  }
}

export async function deleteFee(req, res) {
  try {
    if (!req.headers.updatefeetoken) {
      return res.status(403).json({ message: 'Bạn không có quyền xóa khoản thu'});
    }
    const { id: feeId } = req.params;
    if (!feeId) {
      return res.status(400).json({ message: 'Thiếu dữ liệu' });
    }
    const fee = await Fee.findOne({ where: { id: feeId } });
    if (!fee) {
      return res.status(400).json({ message: 'Phí không tồn tại' });
    }
    await fee.destroy();
    return res.status(200).json({ message: 'Xóa khoản thu thành công'});
  } catch (error) {
    console.error('Error deleting fee:', error);
    res.status(500).json({ message: error});
  }
}

export async function addRoomPaymentOfFee(req, res) {
  try {
    if (!req.headers.receivefeetoken) {
      return res.status(403).json({ message: 'Bạn không có quyền nhận khoản thu'});
    }
    const { id: feeId } = req.params;
    const { residentId, value, roomId, adminId } = req.body;
    if (feeId == null || residentId == null || value == null || roomId == null || adminId == null) {
      return res.status(400).json({ message: 'Thiếu dữ liệu' });
    }
    const admin = await Admin.findOne({ where: { id: adminId }});
    if (!admin) {
      return res.status(400).json({ message: 'Admin không tồn tại'});
    }
    const fee = await Fee.findOne({ 
      where: { id: feeId },
      include: [
        { 
          model: FeeOptional,
          attributes: ['lowerBound'],
        },
        { 
          model: Bill,
          where: { roomId },
          required: false,
          attributes: ['value', 'id'],
          include: [{
            model: Room,
            attributes: ['roomName'],
            include: [{
              model: Resident,
              attributes: ['name', 'id']
            }],
          }],
        },
      ],
    });
    if (!fee) {
      return res.status(400).json({ message: 'Không tồn tại khoản phí'});
    }
    if (!fee.isOptional) {
      if (!fee.Bills?.[0]) {
        return res.status(400).json({ message: 'Phòng không cần nộp phí này' });
      }
      const bill = fee.Bills[0];
      const resident = bill.Room?.Residents?.find(r => r.id == residentId);
      if (!resident) {
        return res.status(400).json({ message: 'Cư dân không thuộc phòng này' });
      }
      if (value < bill.value) {
        return res.status(400).json({ message: 'Không đủ số tiền' });
      }
      if (await Receipt.findOne( 
        { where: { billId: bill.id } }
      )) {
        return res.status(400).json({ message: 'Phòng đã nộp khoản phí này'});
      }
      const receipt = await Receipt.create({ adminId: admin.id, residentId, value, billId: bill.id });
      fee.paidCount++;
      await fee.save();
      const data = {
        name: fee.name,
        resident: resident.name,
        admin: admin.name,
        room: bill.Room.roomName,
        value: value,
        createdAt: receipt.createdAt
      };
      return res.status(200).json(data);
    } else {
      if (fee.FeeOptional.lowerBound == null || fee.FeeOptional.lowerBound > value) {
        return res.status(400).json({ message: 'Không đủ số tiền' });
      }
      if (await DonationReceipt.findOne({ where: { feeId: fee.id, roomId } })) {
        return res.status(400).json({ message: 'Phòng đã nộp khoản phí này'});
      }
      const room = await Room.findOne({ where: { id: roomId } });
      if (!room) {
        return res.status(400).json({ message: 'Phòng không tồn tại' });
      }
      const resident = await Resident.findOne({ where: { id: residentId } });
      if (!resident || resident.roomId != roomId) {
        return res.status(400).json({ message: 'Cư dân không thuộc phòng này' });
      }
      const receipt = await DonationReceipt.create({
        adminId,
        residentId,
        value,
        feeId,
        roomId
      });
      fee.paidCount++;
      await fee.save();
      return res.status(200).json({
        name: fee.name,
        resident: resident.name,
        admin: admin.name,
        room: room.roomName,
        value,
        createdAt: receipt.createdAt
      })
    }

  } catch (error) {
    console.error('Error adding payment:', error);
    res.status(500).json({ message: error});
  }
}

export async function getRoomPaymentsInfo(req, res) {
  try {
    const { id: roomId } = req.params;
    if (roomId == null) {
      return res.status(400).json({ message: 'Thiếu dữ liệu' });
    }
    const bills = await Bill.findAll({ 
      where: { roomId },
      include: [
        { 
          model: Receipt, 
          include: [ 
            { model: Resident, attributes: ['name'] },
            { model: Admin, attributes: ['name'] },
          ]
        },
        { model: Fee }
      ]
    });
    const paidNonOptional = bills
      .filter(b => b.Receipt != null)
      .map(b => ({
        feeId: b.feeId,
        name: b.Fee.name,
        resident: b.Receipt.Resident?.name ?? 'Đã xóa',
        admin: b.Receipt.Admin?.name ?? 'Đã xóa',
        value: b.value,
        isOptional: false,
        createdAt: b.Receipt.createdAt,
      }));
    const unpaid = bills
      .filter(b => b.Receipt == null)
      .map(b => ({
        feeId: b.feeId,
        name: b.Fee.name,
        value: b.value,
      }));
    const donations = await DonationReceipt.findAll({ 
      where: { roomId },
      include: [
        { model: Fee, required: true },
        { model: Resident, attributes: ['name'] },
        { model: Admin, attributes: ['name'] },
      ]
    });
    const paidOptional = donations.map(d => ({
      feeId: d.feeId,
      name: d.Fee.name,
      resident: d.Resident?.name ?? 'Đã xóa',
      admin: d.Admin?.name ?? 'Đã xóa',
      value: d.value,
      isOptional: true,
      createdAt: d.createdAt,
    }));
    const data = {
      paid: [...paidOptional, ...paidNonOptional],
      unpaid,
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting room payment:', error);
    res.status(500).json({ message: error});
  }
}