import mongoose from 'mongoose'
import slugify from 'slugify'

const {Schema} = mongoose



const reviewSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  } 
}, 
{
  timeStamps: true,
})

const productSchema = Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  slug: String,
  image: {
    type: String,
    required: true,    
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
},{
  timestamps: true,
})

productSchema.pre('save', function(next){
  this.slug = slugify(this.name)
  next()
})

const Product = new mongoose.model('Product', productSchema)
export default Product;