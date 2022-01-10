import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


/**
 * @desc  Fetch all products
 * @route /api/products
 * @access  public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}
  const count = await Product.countDocuments({...keyword})
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
  res.status(200).json({products, page, pages: Math.ceil(count / pageSize)})
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
    user: req.user._id,
    name: 'Sample Name',
    price: 0,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
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
/**
 * @desc  Create new review
 * @route POST /api/product/:id/reviews
 * @access  private
 */
 export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if(product){
    const alreadyReviewd = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if(alreadyReviewd){
      res.status(400)
      throw new Error('Product already reviewed!')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
    await product.save()

    res.status(200).json({ message: 'Review Added'})
  }else{
    res.status(404)
    throw new Error('Prooduct not found!')
  }

})
/**
 * @desc  Get top-rated products
 * @route GET /api/products/top
 * @access  public
 */
 export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({rating: -1}).limit(3)
  res.json(products)

})