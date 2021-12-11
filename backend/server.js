import express from 'express'
import dotenv from 'dotenv'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()

//connect to db
connectDB()


app.use(express.json( { limit: '50kb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))