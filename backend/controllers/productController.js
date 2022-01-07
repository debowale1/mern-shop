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

/**
 * @desc  Create single product
 * @route POST /api/products
 * @access  private/Admin
 */
 export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    name: req.body.name,
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description'
  })

  const newProduct = await product.save()
  res.status(201).json(newProduct)
})

/**
 * @desc  Update single product
 * @route PUT /api/product/:id
 * @access  private/Admin
 */
 export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, countInStock, brand, category, description } = req.body

  const product = await Product.findById(req.params.id)
  if(product){
    product.name = name
    product.price = price
    product.image = image
    product.countInStock = countInStock
    product.brand = brand
    product.category = category
    product.description = description

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  }else{
    res.status(404)
    throw new Error('Prooduct not found!')
  }

})