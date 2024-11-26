import express from 'express'
import upload from '../middlewares/multer.js'
import { getRoomPaymentsInfo } from '../controllers/feeController.js'

const roomRouter = express.Router()

roomRouter.get('/:id/pay', upload.none(), getRoomPaymentsInfo)

export default roomRouter