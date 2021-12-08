import connectDB from "../config/db.js";
import dotenv from 'dotenv'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import users from './users.js'
import products from './products.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await User.insertMany(users)
    // const savedUser = await User.find()
    const admin = await User.findOne({isAdmin: true}, {_id: 1})
    const insertedProducts = products.map(product => {
      return {
        ...product,
        user: admin
      }
    })
    await Product.insertMany(insertedProducts)
    console.log('data seeded');
  } catch (error) {
    console.log(error.message);
  }
  process.exit(1)
}

const deleteData = async () => {
  try {
    await User.deleteMany({})
    await Product.deleteMany({})
    console.log('data deleted');
  } catch (error) {
    console.log(error.message);
  }
  process.exit(1)
}


if(process.argv[2] === '--import'){
  importData()
}else{
  if(process.argv[2] === '--delete'){
    deleteData()
  }
}

