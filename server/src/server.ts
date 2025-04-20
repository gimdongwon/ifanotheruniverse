import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import connectDB from 'app/config/db';
import userRoutes from 'app/routes/userRoutes';
import authRoutes from 'app/routes/authRoutes';
import postRoutes from 'app/routes/postRoutes';
import commentRoutes from 'app/routes/commentRoutes';

dotenv.config();
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    // origin: 'http://localhost:3000',
    origin: true,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the API!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
