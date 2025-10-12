import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

const alloudOrigins = ['http://localhost:5173',
  'https://mern-auth-client-wlnz.onrender.com'
]

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: alloudOrigins ,credentials: true}));



// API Endpoints
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// // Serve Vite frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route for React
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/', (req, res) => {
    res.send("Backend is running");
});



app.listen(port, ()=>console.log(`Server is running on PORT: ${port}`))