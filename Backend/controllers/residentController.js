import { v2 as cloudinary } from "cloudinary"
import residentModel from "../models/residentModel.js"



const createResident = async (req, res) => {

    try {

        const {updateresidenttoken} = req.headers

        if(!updateresidenttoken) {
            return res.json({success:false, message: "Bạn không có quyền cập nhật dân cư"})
        }

        const { room, name, gender, age, cccd, phone, numMember } = req.body
        const imageFile = req.file
        console.log(req.body);
        console.log(req.file);

        if (!room || !name || !gender || !age || !cccd || !phone || !numMember) {
            return res.json({ success: false, message: "Thiếu dữ liệu" })
        }

        if (cccd.length !== 12) {
            return res.json({ success: false, message: "CCCD phải có đúng 12 số" })
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const residentData = {
            room,
            name,
            gender,
            age,
            cccd,
            phone,
            image: imageUrl,
            numMember,
            createdAt: Date.now(),
        }

        const newResident = new residentModel(residentData)
        await newResident.save()

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

        const { room, name, gender, age, cccd, phone, numMember } = req.body
        const updateData = req.body

        if (cccd && cccd.length !== 12) {
            return res.json({ success: false, message: "CCCD phải có đúng 12 số" })
        }

        const updatedResident = await residentModel.findOneAndUpdate({ room: room }, updateData, {
            new: true,
            runValidators: true
        })

        if (!updatedResident) {
            return res.json({ success: false, message: "Không tìm thấy cư dân" })
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

        const { room } = req.body

        const deletedResident = await residentModel.findOneAndDelete({ room: room });

        if (!deletedResident) {
            return res.json({ success: false, message: "Không tìm thấy cư dân" })
        }

        return res.json({ success: true, message: "Xóa cư dân thành công" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


const allResident = async (req, res) => {

    try {
        
        const residents = await residentModel.find({})
        return res.json({success: true, residents})

    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message})
    }

}


export { createResident, updateResident, deleteResident, allResident }