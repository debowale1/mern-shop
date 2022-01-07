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


/**
 * @desc  Delete single product
 * @route DELETE /api/product/:id
 * @access  private/Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const {id}= req.params
  const product = await Product.findById(id)
  if(product){
    await product.remove()
    res.json({ message: 'product removed'})
  }else{
    res.status(404)
    throw new Error('Product Not Found')
  }
})