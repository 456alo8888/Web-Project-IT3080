import express from 'express'
import upload from '../middlewares/multer.js'
import { getRoomPaymentsInfo } from '../controllers/feeController.js'
import { 
  roomList, 
  changeHeadResident, 
  roomResident 
} from '../controllers/residentController.js'
import { 
  getVehicleTypes,
  createVehicle,
  deleteVehicle,
} from '../controllers/vehicleController.js'

const roomRouter = express.Router()

roomRouter.get('/', upload.none(), roomList)
roomRouter.put('/:id/head-resident',upload.none(), changeHeadResident);
roomRouter.get('/:id' , upload.none(), roomResident);
roomRouter.get('/:id/pay', upload.none(), getRoomPaymentsInfo);
roomRouter.get('/vehicles/types', upload.none(), getVehicleTypes);
roomRouter.post('/:id/vehicles', upload.single('image'), createVehicle);
roomRouter.delete('/:roomId/vehicles/:vehicleId', upload.none(), deleteVehicle);

export default roomRouter