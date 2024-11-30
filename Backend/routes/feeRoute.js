import express from 'express'
import upload from '../middlewares/multer.js'
import { 
  createFee, 
  getNonOptionalTypes, 
  parseCsv, 
  getAllFees,
  getNonOptionalFeeInfo, 
  updateNonOptionalFee,
  deleteFee,
  addRoomPaymentOfFee,
} from '../controllers/feeController.js'

const feeRouter = express.Router()

feeRouter.get('/', upload.none(), getAllFees)
feeRouter.post('/', upload.none(), createFee)
feeRouter.delete('/:id', upload.none(), deleteFee)
feeRouter.post('/:id/pay', upload.none(), addRoomPaymentOfFee)
feeRouter.post('/csv', upload.single('file'), parseCsv)
feeRouter.get('/non-optional', upload.none(), getNonOptionalFeeInfo)
feeRouter.patch('/non-optional/:id', upload.none(), updateNonOptionalFee)
feeRouter.get('/non-optional/types', upload.none(), getNonOptionalTypes)

export default feeRouter