import express from 'express'
import { allResident, createResident, deleteResident, updateResident, roomList , changeHeadResident} from '../controllers/residentController.js'
import upload from '../middlewares/multer.js'

const residentRouter = express.Router()

residentRouter.post('/create-resident', upload.single('avatar'), createResident)
residentRouter.put('/update-resident/:id', upload.none(), updateResident)
residentRouter.delete('/delete-resident/:id', upload.none(), deleteResident)
residentRouter.get('/all-resident', upload.none(), allResident)
residentRouter.get('/room-list', upload.none(), roomList)
residentRouter.put('/change-head-resident',upload.none(), changeHeadResident);
export default residentRouter