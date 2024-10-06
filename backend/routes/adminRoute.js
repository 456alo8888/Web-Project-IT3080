import express from 'express'
import { allAdmin, changeAuthority, changePassword, deleteAdmin, login, signup } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'

const adminRouter = express.Router()

adminRouter.post('/signup', upload.none(), signup)
adminRouter.post('/login', upload.none(), login)
adminRouter.post('/change-password', upload.none(), changePassword)
adminRouter.post('/delete-admin', upload.none(), deleteAdmin)
adminRouter.post('/change-authority', upload.none(), changeAuthority)
adminRouter.get('/all-admin', upload.none(), allAdmin)

export default adminRouter