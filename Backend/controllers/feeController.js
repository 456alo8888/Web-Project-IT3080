import db from '../models/index.js'

const { Fee, FeeOptional, FeeNonOptional, Admin, FeeType, Bill } = db;

async function createOptionalFee(req, res, adminId, deadline) {
  const { name, lowerBound } = req.body;
  if (name == null || lowerBound == null) {
    return res.status(400).json({message: 'Thiếu thông tin' });
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

async function createNonOptionalFee(req, res, adminId, deadline) {
  const { feeList: feeListRaw, typeId, month, year } = req.body;
  if (feeListRaw == null || typeId == null || month == null || year == null) {
    return res.status(400).json({message: 'Thiếu thông tin' });
  }

  const feeList = JSON.parse(feeListRaw);
  if (!Array.isArray(feeList)) {
    return res.status(400).json({ message: 'Danh sách phí sai định dạng'});
  }

  if (month < 1 || month > 12 || year < 2000 || year > 3000) {
    return res.status(400).json({ message: 'Sai ngày tháng'});
  }

  const feeType = await FeeType.findOne({ where: { id: typeId } });
  if (!feeType) {
    return res.status(400).json({ message: 'Sai loại phí' });
  }

  const name = `${feeType.name} - ${month}/${year}`;

  const fee = await Fee.create({
    name,
    isOptional: false,
    createdById: adminId,
    deadline: new Date(deadline),
    houseCount: feeList.length,
    paidCount: 0,
  });


  const bills = feeList.map(f => {
    return {
      roomId: f.id,
      feeId: fee.id,
      value: f.value,
    }
  });

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
      return res.status(401).json({message: 'Bạn không có quyền tạo phí'});
    }

    const { deadline, isOptional, adminId } = req.body;
    if (deadline == null || isOptional == null || adminId == null) {
      return res.status(400).json({message: 'Thiếu thông tin' });
    }
    if (!(await Admin.findOne({ where: { id: adminId }}))) {
      return res.status(400).json({ message: 'Admin không tồn tại'});
    }

    return isOptional === 'true'
      ? await createOptionalFee(req, res, adminId, deadline) 
      : await createNonOptionalFee(req, res, adminId, deadline);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
}