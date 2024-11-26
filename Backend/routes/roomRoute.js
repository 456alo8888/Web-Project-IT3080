import express from 'express'
import { roomList , changeHeadResident , roomResident } from '../controllers/residentController.js'
import upload from '../middlewares/multer.js'

const roomRouter = express.Router()

roomRouter.get('/', upload.none(), roomList)
roomRouter.put('/:id/head-resident',upload.none(), changeHeadResident);
roomRouter.get('/:id' , upload.none(), roomResident);

export default roomRouter