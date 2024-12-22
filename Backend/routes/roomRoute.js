import express from 'express'
import upload from '../middlewares/multer.js'
import { getRoomPaymentsInfo } from '../controllers/feeController.js'
import { 
  roomList, 
  changeHeadResident, 
  roomResident 
} from '../controllers/residentController.js'
import { getVehicleTypes } from '../controllers/vehicleController.js'

const roomRouter = express.Router()

roomRouter.get('/', upload.none(), roomList)
roomRouter.put('/:id/head-resident',upload.none(), changeHeadResident);
roomRouter.get('/:id' , upload.none(), roomResident);
roomRouter.get('/:id/pay', upload.none(), getRoomPaymentsInfo);
roomRouter.get('/vehicles/types', upload.none(), getVehicleTypes);

export default roomRouter