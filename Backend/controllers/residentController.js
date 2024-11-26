import { v2 as cloudinary } from "cloudinary"
import db from "../models/index.js"
const { Resident, Room } = db

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        return result.secure_url;
    } catch (error) {
        throw new Error('Image upload failed');
    }
};

const createResident = async (req, res) => {

    try {

        const {updateresidenttoken} = req.headers

        if(!updateresidenttoken) {
            return res.json({success:false, message: "Bạn không có quyền cập nhật dân cư"})
        }

        const { room,name, age, gender, phoneNumber, idCardNumber } = req.body
        const imageFile = req.file
        console.log(req.body);
        console.log(req.file);

        if (!imageFile) {
            return res.json({ success: false, message: "Thiếu ảnh" })
        }
        if (!room || !name || !age || !gender || !phoneNumber || !idCardNumber) {
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

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
            resource_type: "image"
        })
        const image = imageUpload.secure_url

        const residentData = {
            roomId, name, age, gender, phoneNumber, idCardNumber, image
        }

        if (!Resident.create(residentData)) {
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
        const { updateresidenttoken } = req.headers;

        if (!updateresidenttoken) {
            return res.json({ success: false, message: "Bạn không có quyền cập nhật dân cư" });
        }

        const { room, name, age, gender, phoneNumber, idCardNumber } = req.body;
        const image = req.file;

        const roomRecord = await Room.findOne({ where: { roomNumber: room } });
        if (!roomRecord) {
            return res.json({ success: false, message: "Phòng không tồn tại" });
        }
        console.log(roomRecord.toJSON());
        const resident = await Resident.findOne({ where: { id: req.params.id } });
        if (!resident) {
            return res.json({ success: false, message: "Cư dân không tồn tại" });
        }

        let updatedData = { name, age, gender, phoneNumber, idCardNumber, roomId: roomRecord.id };

        if (image) {
            const imageUrl = await uploadImage(image.path);
            updatedData.imageUrl = imageUrl;
        }

        await resident.update(updatedData);

        res.json({ success: true, message: "Cập nhật cư dân thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};




const deleteResident = async (req, res) => {
    try {
        const { updateresidenttoken } = req.headers;


        if (!updateresidenttoken) {
            return res.json({ success: false, message: "Bạn không có quyền cập nhật dân cư" });
        }

        const { id } = req.params; // Extract the id parameter from the request parameters

        // Find the resident by ID
        const resident = await Resident.findOne({ where: { id } });
        if (!resident) {
            return res.json({ success: false, message: "Cư dân không tồn tại" });
        }
        console.log(resident.toJSON());
        
        // Delete the resident record
        await resident.destroy();
        console.log('finish');
        return res.json({ success: true, message: "Xóa cư dân thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

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

const changeHeadResident = async (req, res) => {
    try {
        const { updateresidenttoken } = req.headers;

        if (!updateresidenttoken) {
            return res.json({ success: false, message: "Bạn không có quyền cập nhật dân cư" });
        }

        const { residentId } = req.body; // Extract the residentId from the request body

        // Find the resident by residentId
        const resident = await Resident.findOne({ where: { id: residentId } });
        if (!resident) {
            return res.json({ success: false, message: "Cư dân không tồn tại" });
        }

        // Find the room associated with the resident
        const room = await Room.findOne({ where: { id: resident.roomId } });
        if (!room) {
            return res.json({ success: false, message: "Phòng không tồn tại" });
        }

        // Update the headResidentId of the room
        room.headResidentId = residentId;
        await room.save();

        res.json({ success: true, message: "Cập nhật chủ hộ thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const roomList = async (req, res) => {
    try {
        // Find all rooms
        const rooms = await Room.findAll({
            attributes: ['id', 'roomNumber', 'headResidentId'],
            include: [
                {
                    model: Resident,
                    attributes: ['id', 'name'],
                }
            ]
        });

        // Format the response
        const formattedRooms = rooms.map(room => {
            const residentCount = room.Residents ? room.Residents.length : 0;
            const headResident = room.Residents.find(resident => resident.id === room.headResidentId);
            const headResidentName = headResident ? headResident.name : null;

            return {
                id: room.id,
                name: room.roomNumber,
                residentCount: residentCount,
                headResidentName: headResidentName
            };
        });

        return res.json({ success: true, data: formattedRooms });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export { allResident, createResident, deleteResident, updateResident, roomList, changeHeadResident };

