import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';



const app = express();
const PORT = process.env.PORT || 4000;

// Parse CLIENT_URL - can be a single URL string or comma-separated URLs
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : [];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
await connectDB();

app.get('/', (req, res) => {
  res.send('Server is running');
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
