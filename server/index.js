import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import tmdbApiRoutes from './routes/tmdbApiRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authenticate from './middlewares/authenticate.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/tmdb', tmdbApiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', authenticate, bookmarkRoutes);

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            serverSelectionTimeoutMS: 10000
        });
        console.log('Connected to db');
    } catch (error) {
        console.log('Error connecting to db: ', error.message);
        throw new Error('Failed to connect to DB');        
    }
}

const startServer = async () => {
    try {
        await connectToDB();
        app.listen(process.env.PORT, () => (console.log('listening')));

    } catch (error) {
        console.log('Failed to start the server : ', error.message);
        process.exit(1);        
    }
}

startServer();

