import express from 'express'
import products from './data/products.js'

const app = express()

app.get('/', (req, res) => {
  res.status(200).json()
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
app.listen(PORT, console.log(`app running on port ${PORT}`))