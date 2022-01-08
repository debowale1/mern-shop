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
/**
 * @desc  Update order to paid
 * @route /api/orders/:id/pay
 * @access  private
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const {id} = req.params
    const order = await Order.findById(id)
    if(order){
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }
  
      const updatedOrder = await order.save()
      res.status(200).json(updatedOrder)
    }
    
    res.status(500)
    throw new Error('There was a problem updating the order')
    return
})
/**
 * @desc  Get logged in user orders
 * @route /api/orders/myOrders
 * @access  private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id})
    res.json(orders)
})
/**
 * @desc  Get all orders
 * @route /api/orders
 * @access  private
 */
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'id name')
    res.json(orders)
})
