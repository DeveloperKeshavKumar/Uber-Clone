import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

connectDB();
app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use('/api/v1', router)

app.get('/', (req, res) => {
    res.send('Hello World!');
})


export default app;