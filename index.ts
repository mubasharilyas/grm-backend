import express, { Request, Response } from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './src/config/db.config';
connectDB()

import * as alertRoutes from './src/routes/alert.route'
import * as contactRoutes from './src/routes/contact.route'
import * as authRoutes from './src/routes/auth.route'


import cors from 'cors';
app.use(express.json());

app.use(cors());

app.get('/', function (req: Request, res: Response) {

    try {
        return res.json({ message: "Hello from Server! v2" });

    }
    catch (err) {
        res.json({ errorMessage: "Something has gone wrong on the server" });
    }



})
app.use('/auth', authRoutes.router);
app.use('/contact', contactRoutes.router);
app.use('/alert', alertRoutes.router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`)

}) 