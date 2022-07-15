import mongoose from 'mongoose'
import "dotenv/config";
const URI = process.env.MONGODB_URL 

mongoose.connect(`${URI}`, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
    if (err) throw err;
    console.log('Mongodb connected');
    
 });
