import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import residentRouter from './routes/residentRoute.js'
import feeRouter from './routes/feeRoute.js'
// import historyRouter from './routes/historyRoute.js'

//App Config
const app = express()

const port = process.env.PORT || 4000
 

// Database and image storage
connectCloudinary()


//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



//api endpoint
app.use('/api/admin', adminRouter)
app.use('/api/resident', residentRouter)
app.use('/api/fees', feeRouter)
// app.use('/api/history', historyRouter)


app.get('/', (req, res)=>{
    res.send("API Working")
})

app.listen(port, () => console.log('Server started on PORT: ' + port))