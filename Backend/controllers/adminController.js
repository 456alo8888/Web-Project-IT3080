import bcrypt from 'bcrypt'
import db from '../models/index.js'
import jwt from 'jsonwebtoken'


const { Admin } = db

//API for signup

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const signup = async (req, res) => {

    try {

        const { roottoken } = req.headers

        if (!roottoken) {
            return res.json({ success: false, message: "Bạn không có quyền tạo admin mới" })
        }

        const { username, password, updateFeeAuth, createFeeAuth, updateResidentAuth, receiveAuthority } = req.body

        // console.log(req.body);

        if (!username || !password || !updateFeeAuth | !createFeeAuth || !updateResidentAuth || !receiveAuthority) {
            return res.json({ success: false, message: "Thiếu dữ liệu" })
        }

        //validating 
        if (password.length < 8) {
            return res.json({ success: false, message: "Hãy nhập mật khẩu trên 7 kí tự" })
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10)

        const adminData = {
            username: username,
            password: hashedPassword,
            updateFeeAuthority: updateFeeAuth === 'true' ? true : false,
            createFeeAuthority: createFeeAuth === 'true' ? true : false,
            updateResidentAuthority: updateResidentAuth === 'true' ? true : false,
            receiveAuthority: receiveAuthority === 'true' ? true : false
        }

        Admin.create(adminData)

        return res.json({ success: true, message: "Thêm ADMIN thành công" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

const login = async (req, res) => {

    try {

        const { username, password } = req.body

        const admin = await Admin.findOne({ where: { username } })

        if (!admin) {
            return res.json({ success: false, message: "Username không tồn tại" })
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Mật khẩu không đúng" })
        }


        const token = jwt.sign(username, process.env.JWT_SECRET)
        const updatefeetoken = admin.updateFeeAuthority ? 'yes' : ''
        const createfeetoken = admin.createFeeAuthority ? 'yes' : ''
        const updateresidenttoken = admin.updateResidentAuthority ? 'yes' : ''
        const receiveAuthority = admin.receiveAuthority ? 'yes' : ''
        const roottoken = admin.isRoot ? 'yes' : ''

        return res.json({ 
            success: true, 
            message: "Đăng nhập thành công", 
            token, 
            updatefeetoken, 
            createfeetoken, 
            updateresidenttoken, 
            roottoken,
            receiveAuthority
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


const changePassword = async (req, res) => {

    try {

        const { username, oldPassword, newPassword } = req.body

        if (newPassword === oldPassword) {
            return res.json({ success: false, message: "Mật khẩu mới trùng mật khảu cũ" })
        }
        if (newPassword.length < 8) {
            return res.json({ success: false, message: "Mật khẩu mới phải trên 7 kí tự" })
        }

        const admin = await adminModel.findOne({ username: username });

        if (!admin) {
            return res.json({ success: false, message: "Không tìm thấy admin" })
        }

        const isMatch = await bcrypt.compare(oldPassword, admin.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Mật khẩu không đúng" })
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        admin.password = hashedNewPassword
        await admin.save()

        return res.json({ success: true, message: "Đổi mật khẩu thành công" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


const deleteAdmin = async (req, res) => {

    try {

        const { roottoken } = req.headers

        if (!roottoken) {
            return res.json({ success: false, message: "Bạn không có quyền xóa admin" })
        }


        const { username } = req.body

        const deletedAdmin = await adminModel.findOneAndDelete({ username: username })

        // console.log(deletedAdmin);

        if (!deletedAdmin) {
            return res.json({ success: false, message: "User không tồn tại" })
        }

        return res.json({ success: true, message: "Xóa admin thành công" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


const changeAuthority = async (req, res) => {

    try {

        const { roottoken } = req.headers

        if (!roottoken) {
            return res.json({ success: false, message: "Bạn không có quyền thay đổi quyền admin" })
        }


        const { username, updateFeeAuth, createFeeAuth, updateResidentAuth } = req.body

        // console.log(req.body);
        

        const admin = await adminModel.findOneAndUpdate(
            { username: username },
            {
                $set: {
                    updateFeeAuthority: updateFeeAuth === true ? true : false,
                    createFeeAuthority: createFeeAuth === true ? true : false,
                    updateResidentAuthority: updateResidentAuth === true ? true : false
                },

            },
            { new: true, runValidators: true },
        )


        if (!admin) {
            return res.json({ success: false, message: "User không tồn tại" })
        }

        return res.json({ success: true, message: "Cập nhật quyền admin thành công" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}



const allAdmin = async (req, res) => {

    try {

        const {roottoken} = req.headers
        
        if(!roottoken) {
            return res.json({success:false, message: "Bạn không có quyền"})
        }

        const admins = await Admin.findAll()

        return res.json({success: true, admins})


    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }

}

export { login, signup, changePassword, deleteAdmin, changeAuthority, allAdmin }