import express from 'express';
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

app.use('/',(req,res)=>{
    res.send("Hello from SERVER!");
})
app.use('/auth', authRoutes.router);
app.use('/contact', contactRoutes.router);
app.use('/alert', alertRoutes.router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`)

}) 