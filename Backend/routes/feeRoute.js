import express from 'express'
import upload from '../middlewares/multer.js'
import { createFee } from '../controllers/feeController.js'

const feeRouter = express.Router()

feeRouter.post('/', upload.none(), createFee)
// feeRouter.post('/update-fee', upload.none(), updateFee)
// feeRouter.post('/delete-fee', upload.none(), deleteFee)
// feeRouter.get('/all-fee', upload.none(), allFee)

export default feeRouter