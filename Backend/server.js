import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

// Chuyển đổi các đường dẫn module thành URL `file://`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chuyển đổi đường dẫn cho các module import
const cloudinaryPath = pathToFileURL(path.join(__dirname, './config/cloudinary.js')).href;
const adminRouterPath = pathToFileURL(path.join(__dirname, './routes/adminRoute.js')).href;
const residentRouterPath = pathToFileURL(path.join(__dirname, './routes/residentRoute.js')).href;

// Import các module sử dụng dynamic import
const connectCloudinary = await import(cloudinaryPath);
const adminRouter = await import(adminRouterPath);
const residentRouter = await import(residentRouterPath);

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Database and image storage
connectCloudinary.default();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoint
app.use('/api/admin', adminRouter.default);
app.use('/api/resident', residentRouter.default);
// app.use('/api/fee', feeRouter)
// app.use('/api/history', historyRouter)

app.get('/', (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log('Server started on PORT: ' + port));
