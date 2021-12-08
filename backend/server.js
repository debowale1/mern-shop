import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'

dotenv.config()
const app = express()

//connect to db
connectDB()

app.get('/', (req, res) => {
  res.status(200).send('Hello')
})
app.get('/api/products', (req, res) => {
  res.status(200).json(products)
})
app.get('/api/products/:id', (req, res) => {
  const {id}= req.params
  const product = products.find(p => p._id === id)
  res.status(200).json(product)
})


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))