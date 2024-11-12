import feeModel from "../models/feeModel.js";
import historyModel from "../models/historyModel.js";




const createFee = async (req, res) => {

    try {

        const {createfeetoken} = req.headers
        
        if(!createfeetoken) {
            return res.json({success:false, message: "Bạn không có quyền thêm khoản thu"})
        }


        const {name, feeType, feepayInfo, deadline} = req.body
        
        const parsedFeepayInfo = JSON.parse(feepayInfo)

        if (!name || !feeType || !parsedFeepayInfo || !deadline) {
            return res.json({success: false, message: "Thiếu thông tin"})
        }

        

        const newFee = new feeModel({
            name: name,
            feeType: feeType,
            feepayInfo: parsedFeepayInfo,
            deadline: deadline,
        })

        const savedFee = await newFee.save()
        console.log(savedFee);
        

        return res.json({success: true, message: "Thêm khoản thu thành công"})

        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
    
}

const updateFee = async (req, res) => {

    try {

        const {updatefeetoken} = req.headers
        
        if(!updatefeetoken) {
            return res.json({success:false, message: "Bạn không có quyền cập nhật khoản thu"})
        }

        const {feeId, room, payed, username} = req.body

        if (!feeId || !room || !payed || !username) {
            return res.json({success: false, message: "Thiếu thông tin"})
        }

        if (payed < 0) {
            return res.json({success: false, message: "Khoản đóng góp phải lớn hơn 0"})
        }

        const feeDocument = await feeModel.findById(feeId)

        if(!feeDocument) {
            return res.json({success: false, message: "Khoản thu không tồn tại"})
        }

        const roomEntry = feeDocument.feepayInfo.find(r => r.room === room)

        if (!roomEntry) {
            return res.json({success: false, message: "Phòng không tồn tại"})
        }


        roomEntry.payed = payed;

        await feeDocument.save()



        const historyRecord = new historyModel({
            feeId: feeId,
            feeName: feeDocument.name,
            feeCost: roomEntry.cost,
            room: room,
            roomPayed: payed,
            username: username,
        })

        await historyRecord.save()


        
        return res.json({success: true, message: "Cập nhật thành công"})

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
    
}

const deleteFee = async (req, res) => {

    try {

        const {createfeetoken} = req.headers
        
        if(!createfeetoken) {
            return res.json({success:false, message: "Bạn không có quyền xóa khoản thu"})
        }

        const {feeId} = req.body

        if(!feeId) {
            return res.json({success: false, message: "Khoản thu không tồn tại"})
        }

        await feeModel.findByIdAndDelete(feeId)

        return res.json({success: true, message: "Xóa khoản thu thành công"})

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
    
}


const allFee = async (req, res) => {
    
try {
    
    const fees = await feeModel.find({})
    console.log(fees);
    
    return res.json({success: true, fees})


} catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message})
    
}

}


export {createFee, updateFee, deleteFee, allFee}