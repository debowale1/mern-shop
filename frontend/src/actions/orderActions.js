import * as orderConstants from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_CREATE_REQUEST})
  
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.post('/api/orders', order, config)
  
    dispatch({ type: orderConstants.ORDER_CREATE_SUCCESS, payload: data})
    
  } catch (error) {
    dispatch({ 
      type: orderConstants.ORDER_CREATE_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_DETAILS_REQUEST})
  
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/orders/${id}`, config)
  
    dispatch({ type: orderConstants.ORDER_DETAILS_SUCCESS, payload: data})
    
  } catch (error) {
    dispatch({ 
      type: orderConstants.ORDER_CREATE_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}