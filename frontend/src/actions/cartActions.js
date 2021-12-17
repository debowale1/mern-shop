import axios from 'axios'
import * as cartConstants from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({ 
      type: cartConstants.CART_ADD_ITEM, 
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (error) {
    
  }
}
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({ type: cartConstants.CART_REMOVE_ITEM, payload: id})
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({ type: cartConstants.CART_SAVE_SHIPPING_ADDRESS, payload: data})
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}