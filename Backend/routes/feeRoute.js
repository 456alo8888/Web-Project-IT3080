import express from 'express'
import upload from '../middlewares/multer.js'
import { createFee, getNonOptionalTypes, parseCsv, getAllFees } from '../controllers/feeController.js'

const feeRouter = express.Router()

feeRouter.post('/', upload.none(), createFee)
feeRouter.get('/non-optional/types', upload.none(), getNonOptionalTypes)
feeRouter.post('/csv', upload.single('file'), parseCsv)
// feeRouter.post('/update-fee', upload.none(), updateFee)
// feeRouter.post('/delete-fee', upload.none(), deleteFee)
feeRouter.get('/', upload.none(), getAllFees)

export default feeRouter