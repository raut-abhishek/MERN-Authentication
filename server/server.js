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

const alloudOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: alloudOrigins ,credentials: true}));



// API Endpoints
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Serve Vite frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '../client/dist');


app.use(express.static(frontendPath));

// Catch-all route for React
app.use((req, res, next) => {
  // if request doesn't start with /api
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendPath, 'index.html'));
  } else {
    next();
  }
});



app.listen(port, ()=>console.log(`Server is running on PORT: ${port}`))