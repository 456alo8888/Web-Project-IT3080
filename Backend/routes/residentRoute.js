import express from 'express'
import { allResident, createResident, deleteResident, updateResident } from '../controllers/residentController.js'
import upload from '../middlewares/multer.js'

const residentRouter = express.Router()

residentRouter.post('/create-resident', upload.single('image'), createResident)
residentRouter.post('/update-resident', upload.none(), updateResident)
residentRouter.post('/delete-resident', upload.none(), deleteResident)
residentRouter.get('/all-resident', upload.none(), allResident)

export default residentRouter