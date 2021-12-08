import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

/**
 * @desc  Fetch all products
 * @route /api/products
 * @access  public
 */

router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.status(200).json(products)
}))

/**
 * @desc  Fetch single product
 * @route /api/product/:id
 * @access  public
 */

router.get('/:id', asyncHandler(async (req, res) => {
  const {id}= req.params
  const product = await Product.findById(id)
  if(!product){
    return res.status(404).json({ message: 'Product Not Found'})
  }
  res.status(200).json(product)
}))

export default router