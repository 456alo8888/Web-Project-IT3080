import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import residentRouter from './routes/residentRoute.js'
import feeRouter from './routes/feeRoute.js'
import roomRouter from './routes/roomRoute.js'

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Database and image storage
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//api endpoint
app.use('/api/admin', adminRouter)
app.use('/api/residents', residentRouter)
app.use('/api/fees', feeRouter)
app.use('/api/rooms', roomRouter)

app.get('/', (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log('Server started on PORT: ' + port));
