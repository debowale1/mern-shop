import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


/**
 * @desc  Fetch all products
 * @route /api/products
 * @access  public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.status(200).json(products)
})


/**
 * @desc  Fetch single product
 * @route /api/product/:id
 * @access  public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const {id}= req.params
  const product = await Product.findById(id)
  if(!product){
    res.status(404)
    throw new Error('Product Not Found')
  }
  res.status(200).json(product)
})