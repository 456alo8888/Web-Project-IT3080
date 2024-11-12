import express from 'express'
import { allHistory } from '../controllers/historyController.js'
import upload from '../middlewares/multer.js'

const historyRouter = express.Router()

historyRouter.get('/all-history', upload.none(), allHistory)

export default historyRouter