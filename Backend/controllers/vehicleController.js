import db from "../models/index.js"
import { v2 as cloudinary } from "cloudinary"
const { VehicleType, Room, Vehicle } = db

function parseDate(str) {
  const val = Date.parse(str);
  return isNaN(val) ? null : Date(val);
}

export async function getVehicleTypes(req, res) {
  try {
    const vehicleTypes = await VehicleType.findAll({
      attributes: ['id', 'name'],
    });

    res.status(200).json({
      data: vehicleTypes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
}


export async function createVehicle(req, res) {

  try {

      const {updateresidenttoken} = req.headers

      if(!updateresidenttoken) {
          return res.status(403).json({success:false, message: "Bạn không có quyền cập nhật xe của cư dân"});
      }

      const { id: roomId } = req.params;
      const { typeId, insuranceEndDate: insuranceEndDateRaw, licensePlate } = req.body
      const imageFile = req.file

      if (!imageFile) {
          return res.status(400).json({ success: false, message: "Thiếu ảnh" })
      }
      if (typeId == null 
          || insuranceEndDateRaw == null 
          || licensePlate == null
          || roomId == null
      ) {
        return res.status(400).json({ success: false, message: "Thiếu dữ liệu" })
      }

      const insuranceEndDate = parseDate(insuranceEndDateRaw);
      if (insuranceEndDate == null) {
        return res.status(400).json({ success: false, message: "Sai định dạng ngày" })
      }

      if (!await Room.findOne({ where: { id: roomId } })) {
          return res.status(400).json({ success: false, message: "Phòng không tồn tại"})
      }
      if (!await VehicleType.findOne({ where: { id: typeId } })) {
        return res.status(400).json({ success: false, message: "Loại xe không hợp lệ"})
      }
      if (await Vehicle.findOne({ where: { licensePlate } })) {
        return res.status(400).json({ success: false, message: "Biển số xe đã tồn tại"})
      }

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
          resource_type: "image"
      })
      const image = imageUpload.secure_url

      const vehicleData = {
          roomId, 
          typeId,
          image,
          licensePlate,
          insuranceEndDate
      }

      const vehicle = await Vehicle.create(vehicleData)
      if (!vehicle) {
          res.status(500).json({ success: false, message: "Lỗi hệ thống", })
      }

      res.status(200).json({ 
          message: "Đã thêm xe vào phòng",
          data: { id: vehicle.id }
      })


  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message })
  }

};