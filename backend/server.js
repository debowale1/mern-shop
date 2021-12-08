import express from 'express'
import dotenv from 'dotenv'
import productRouter from './routes/productRoutes.js'
import connectDB from './config/db.js'

dotenv.config()
const app = express()

//connect to db
connectDB()



app.use('/api/products', productRouter)

app.get('*', (req, res) => {
  res.status(404).send('Nothing Here')
})
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))