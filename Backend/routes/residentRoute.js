import express from 'express'
import { allResident, createResident, deleteResident, updateResident, roomList , changeHeadResident , roomResident} from '../controllers/residentController.js'
import upload from '../middlewares/multer.js'

const residentRouter = express.Router()

residentRouter.post('/', upload.single('avatar'), createResident)
residentRouter.put('/:id', upload.none(), updateResident)
residentRouter.delete('/:id', upload.none(), deleteResident)
residentRouter.get('/', upload.none(), allResident)
export default residentRouter