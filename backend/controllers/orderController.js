import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


/**
 * @desc  Add new Order
 * @route /api/orders
 * @access  private
 */
export const addOrderItems = asyncHandler(async (req, res) => {
  const {orderItems, shippingAddress, paymentMethod, shippingPrice, taxPrice, itemsPrice, totalPrice } = req.body
  if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No order Items')
    return
  }else{
    const order = new Order({
      user: req.user._id, 
      orderItems, 
      shippingAddress, 
      paymentMethod, 
      shippingPrice, 
      taxPrice, 
      itemsPrice, 
      totalPrice 
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})
/**
 * @desc  GET order by ID
 * @route /api/orders/:id
 * @access  private
 */
export const getOrderById = asyncHandler(async (req, res) => {
    const {id} = req.params
    const order = await Order.findById(id).populate('user', 'name email')
    if(order){
      res.status(200).json(order)
    }else{
      res.status(400)
      throw new Error('Order not found')
    }
})
