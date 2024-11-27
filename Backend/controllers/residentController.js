import { v2 as cloudinary } from "cloudinary"
import db from "../models/index.js"
const { Resident, Room } = db

const createResident = async (req, res) => {

    try {

        const {updateresidenttoken} = req.headers

        if(!updateresidenttoken) {
            return res.json({success:false, message: "Bạn không có quyền cập nhật dân cư"})
        }

        const { room, firstName, middleName, lastName, age, gender, phoneNumber, idCardNumber } = req.body
        const imageFile = req.file
        console.log(req.body);
        // console.log(req.file);

        if (!room || !firstName || !lastName || !age || !gender || !phoneNumber || !idCardNumber) {
            return res.json({ success: false, message: "Thiếu dữ liệu" })
        }

        const roomRecord = await Room.findOne({ where: { roomNumber: room } })
        if (!roomRecord) {
            return res.json({ success: false, message: "Phòng không tồn tại"})
        }
        const roomId = roomRecord.id

        if (idCardNumber.length !== 12) {
            return res.json({ success: false, message: "CCCD phải có đúng 12 số" })
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const image = imageUpload.secure_url

        const residentData = {
            roomId, firstName, middleName, lastName, age, gender, phoneNumber, idCardNumber, image
        }

        if (!(await Resident.create(residentData))) {
            res.status(500).json({ success: false, message: "Lỗi hệ thống", })
        }

        res.json({ success: true, message: "Thêm cư dân thành công" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

};


const updateResident = async (req, res) => {

    try {

        const {updateresidenttoken} = req.headers

        if(!updateresidenttoken) {
            return res.json({success:false, message: "Bạn không có quyền cập nhật dân cư"})
        }

        const { room, firstName, middleName, lastName, age, gender, phoneNumber, idCardNumber } = req.body

        const roomRecord = Room.findOne({ where: { roomNumber: room } })
        if (!roomRecord) {
            return res.json({ success: false, message: "Phòng không tồn tại"})
        }
        const roomId = roomRecord.id

        if (idCardNumber.length !== 12) {
            return res.json({ success: false, message: "CCCD phải có đúng 12 số" })
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const image = imageUpload.secure_url

        const [updatedRows] = await Resident.update(
            {
                roomId, firstName, middleName, lastName, age, gender, phoneNumber, idCardNumber, image
            }, 
            { 
                where : { idCardNumber },
                returning: true,
                plain: true,
            } 
        )
        if (!updatedRows) {
            return res.status(400).json({ success: false, message: 'Không tìm thấy cư dân'})
        }

        res.json({ success: true, message: "Cập nhật thành công" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

const deleteResident = async (req, res) => {

    try {

        const {updateresidenttoken} = req.headers

        if(!updateresidenttoken) {
            return res.json({success:false, message: "Bạn không có quyền cập nhật dân cư"})
        }

        const { idCardNumber } = req.body

        await Resident.destroy({ where: { idCardNumber } });

        return res.json({ success: true, message: "Xóa cư dân thành công" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


const allResident = async (req, res) => {
    try {
        const residents = (await Resident.findAll({
            include: {
                model: Room,
                attributes: ['room_number']
            },
            raw: true,
            nest: true,
        })).map(resi => ({
            ...resi,
            roomNumber: resi.Room.room_number,
            Room: undefined
        }))
        return res.json({ success: true, residents });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}


export { createResident, updateResident, deleteResident, allResident }