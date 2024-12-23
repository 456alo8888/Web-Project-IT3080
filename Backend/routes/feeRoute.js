import express from 'express'
import upload from '../middlewares/multer.js'
import { 
  createFee, 
  getNonOptionalTypes, 
  parseCsv, 
  getAllFees,
  getFeesStatus, 
  updateNonOptionalFee,
  deleteFee,
  addRoomPaymentOfFee,
} from '../controllers/feeController.js'
import { getFeeStatistics } from '../controllers/statsController.js'

const feeRouter = express.Router()

feeRouter.get('/', upload.none(), getAllFees)
feeRouter.post('/', upload.none(), createFee)
feeRouter.delete('/:id', upload.none(), deleteFee)
feeRouter.post('/:id/pay', upload.none(), addRoomPaymentOfFee)
feeRouter.post('/csv', upload.single('file'), parseCsv)
feeRouter.get('/status', upload.none(), getFeesStatus)
feeRouter.patch('/non-optional/:id', upload.none(), updateNonOptionalFee)
feeRouter.get('/non-optional/types', upload.none(), getNonOptionalTypes)
feeRouter.get('/stats', upload.none(), getFeeStatistics)

export default feeRouter