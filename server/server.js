import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';



const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [process.env.CLIENT_URL];

app.use(cors({
  origin: allowedOrigins,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
  res.send('Server is running');
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
