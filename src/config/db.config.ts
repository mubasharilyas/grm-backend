import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
/////////////////////////////////
///// MongoDB Connection
mongoose.Promise = global.Promise;
global.mongoose = mongoose
export function connectDB() {
  mongoose.connect('mongodb+srv://Aftab-Taabi:<PASSWORD>@cluster0.2m6pczo.mongodb.net/?retryWrites=true&w=majority'.replace('<PASSWORD>', 'MongoDB.'), {

  }).then(() => console.log("DB connection established!")).catch(err => console.log(err))
}


