import { v2 as cloudinary } from "cloudinary"
import db from "../models/index.js"
const { Resident, Room, RoomType, Vehicle } = db

function isNumeric(str) {
    return /^\d+$/.test(str); // Checks if the string contains only digits
}

const createResident = async (req, res) => {

    try {

        const {updateresidenttoken} = req.headers

        if(!updateresidenttoken) {
            return res.status(403).json({success:false, message: "Bạn không có quyền cập nhật dân cư"})
        }

        const { roomName, name, age, gender, phoneNumber, idCardNumber, isHeadResident } = req.body
        const imageFile = req.file
        //console.log(req.body);
        //console.log(req.file);

        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Thiếu ảnh" })
        }
        if (roomName == null 
            || name == null 
            || age == null 
            || gender == null 
            || phoneNumber == null 
            || idCardNumber == null
            || isHeadResident == null
        ) {
            return res.status(400).json({ success: false, message: "Thiếu dữ liệu" })
        }

        const roomRecord = await Room.findOne({ where: { roomName } })
        if (!roomRecord) {
            return res.status(400).json({ success: false, message: "Phòng không tồn tại"})
        }
        if (await Resident.findOne({ where: { idCardNumber } })) {
            return res.status(400).json({ message: 'CCCD đã tồn tại' })
        }
        if (isHeadResident === 'true' && roomRecord.headResidentId != null) {
            return res.status(400).json({ message: 'Đã có trưởng phòng'})
        }

        if (!isNumeric(phoneNumber) || phoneNumber.length <= 9 || phoneNumber.length > 15) {
            return res.status(400).json({ success: false, message: "SĐT không hợp lệ" })
        }

        if (!isNumeric(idCardNumber) || idCardNumber.length !== 12) {
            return res.status(400).json({ success: false, message: "CCCD phải có đúng 12 số" })
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
            resource_type: "image"
        })
        const image = imageUpload.secure_url

        const residentData = {
            roomId: roomRecord.id, name, age, gender, phoneNumber, idCardNumber, image
        }

        const resident = await Resident.create(residentData)
        if (!resident) {
            res.status(500).json({ success: false, message: "Lỗi hệ thống", })
        }
        if (isHeadResident === 'true') {
            roomRecord.headResidentId = resident.id
            await roomRecord.save()
        }

        res.status(200).json({ 
            message: "Thêm cư dân thành công",
            data: { id: resident.id }
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }

};



const updateResident = async (req, res) => {
    try {
        const { updateresidenttoken } = req.headers;

        if (!updateresidenttoken) {
            return res.status(403).json({ success: false, message: "Bạn không có quyền cập nhật dân cư" });
        }

        const { room, name, age, gender, phoneNumber, idCardNumber } = req.body;
        const { id } = req.params;

        if (id == null 
            || name == null 
            || age == null 
            || gender == null 
            || phoneNumber == null 
            || idCardNumber == null
        ) {
            return res.status(400).json({ success: false, message: "Thiếu dữ liệu" })
        }

        if (idCardNumber.length !== 12) {
            return res.status(400).json({ success: false, message: "CCCD phải có đúng 12 số" })
        }

        // Tìm phòng theo roomName
        const newRoom = await Room.findOne({ where: { roomName: room } });
        if (!newRoom) {
            return res.status(400).json({ success: false, message: "Phòng không tồn tại" });
        }

        // Tìm cư dân theo id trong path params
        const resident = await Resident.findOne({ where: { id } });
        if (!resident) {
            return res.status(400).json({ success: false, message: "Cư dân không tồn tại" });
        }

        if (resident.idCardNumber !== idCardNumber && await Resident.findOne({where: {idCardNumber}})) {
            return res.status(400).json({ success: false, message: "CCCD đã tồn tại" })
        }

        const oldRoom = await Room.findOne({ where: { id: resident.roomId } });

        const willChangeRoom = oldRoom.id != newRoom.id;
        const isCurrentHeadResident = oldRoom.headResidentId == resident.id;

        if (willChangeRoom && isCurrentHeadResident) {
            await oldRoom.update({ headResidentId: null });
        }

        // Tạo đối tượng dữ liệu cập nhật
        const updatedData = {
            name,
            age,
            gender,
            phoneNumber,
            idCardNumber,
            roomId: newRoom.id
        };

        // Cập nhật cư dân với dữ liệu mới
        await resident.update(updatedData);

        res.status(200).json({ success: true, message: "Cập nhật cư dân thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const deleteResident = async (req, res) => {
    try {
        const { updateresidenttoken } = req.headers;


        if (!updateresidenttoken) {
            return res.status(403).json({ success: false, message: "Bạn không có quyền cập nhật dân cư" });
        }

        const { id } = req.params; // Extract the id parameter from the request parameters

        // Find the resident by ID
        const resident = await Resident.findOne({ where: { id } });
        if (!resident) {
            return res.status(400).json({ success: false, message: "Cư dân không tồn tại" });
        }
        //console.log(resident.toJSON());
        
        // Delete the resident record
        await resident.destroy();
        //console.log('finish');
        return res.status(200).json({ success: true, message: "Xóa cư dân thành công" });
    } catch (error) {
        //console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const changeHeadResident = async (req, res) => {
    try {
        const { updateresidenttoken } = req.headers;

        if (!updateresidenttoken) {
            return res.status(403).json({ success: false, message: "Bạn không có quyền cập nhật dân cư" });
        }

        const { headResidentId } = req.body;
        const { id: roomId } = req.params;
        if (headResidentId == null || roomId == null) {
            return res.status(400).json({ message: 'Thiếu dữ liệu'});
        }

        // Find the resident by residentId
        const resident = await Resident.findOne({ where: { id: headResidentId } });
        if (!resident) {
            return res.status(400).json({ success: false, message: "Cư dân không tồn tại" });
        }

        if (resident.roomId != roomId) {
            return res.status(400).json({ message: 'Cư dân không thuộc phòng' });
        }

        // Find the room associated with the resident
        const room = await Room.findOne({ where: { id: resident.roomId } });
        if (!room) {
            return res.status(400).json({ success: false, message: "Phòng không tồn tại" });
        }

        // Update the headResidentId of the room
        room.headResidentId = headResidentId;
        await room.save();

        res.status(200).json({ success: true, message: "Cập nhật chủ hộ thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const roomList = async (req, res) => {
    try {
        // Find all rooms
        const rooms = await Room.findAll({
            include: [
                {
                    model: Resident,
                    as: 'headResident',
                    attributes: ['id', 'name'],
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
        });
        // Format the response
        const formattedRooms = rooms.map(room => {

            return {
                id: room.id,
                name: room.roomName,
                residentCount: room.Residents?.length ?? 0,
                vehicleCount: room.Vehicles?.length ?? 0,
                headResidentName: room.headResident?.name ?? null,
                typeId: room.typeId
            };
        });

        return res.status(200).json({ success: true, data: formattedRooms });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


const roomResident = async (req, res) => {
    try {
        const { id: roomId } = req.params;
        if (roomId == null) {
            return res.status(400).json({ message: 'Thiếu dữ liệu'});
        }

        // Find the room by roomId to get the headResidentId
        const room = await Room.findOne({
            where: { id: roomId },
            attributes: ['headResidentId']
        });

        if (!room) {
            return res.status(400).json({ success: false, message: "Phòng không tồn tại" });
        }

        // Find all residents of the specified room
        const residents = await Resident.findAll({
            where: { roomId },
            attributes: ['id', 'name', 'age', 'gender', 'phoneNumber', 'idCardNumber', 'image'], // Select specific attributes
            raw: true,
            nest: true,
        });

        // Format the response
        const formattedResidents = residents.map(resi => ({
            id: resi.id,
            name: resi.name,
            age: resi.age,
            gender: resi.gender,
            phoneNumber: resi.phoneNumber,
            idCardNumber: resi.idCardNumber,
            image: resi.image,
        }));

        return res.status(200).json({ success: true, headResidentId: room.headResidentId, data: formattedResidents });
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export async function getRoomTypes(req, res) {
    try {
        const roomTypes = await RoomType.findAll({
            attributes: ['id', 'name', 'area'],
        });

        res.status(200).json({
            data: roomTypes,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}

export { createResident, deleteResident, updateResident, roomList, changeHeadResident, roomResident };

