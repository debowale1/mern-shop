import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI.replace('<PASSWORD>', process.env.MONGO_PASS)
const connectDB = async() => {
 try {
  const con = await mongoose.connect(uri)
  console.log(con.connection.host);
 } catch (error) {
   console.log(error.message);
   process.exit(1)
 }
}

export default connectDB