import axios from 'axios'
import * as userConstants from '../constants/userConstants.js'

export const login  = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/users/login', {email, password}, config)

    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data})
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ 
      type: userConstants.USER_LOGIN_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
    dispatch({type: userConstants.USER_LOGOUT})
    // dispatch({type: USER_DETAILS_RESET})
    // dispatch({type: ORDER_LIST_MY_RESET})
    // dispatch({type: USER_LIST_RESET})
}