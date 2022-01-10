import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { 
  productListReducer, 
  productDetailsReducer, 
  productDeleteReducer, 
  productCreateReducer, 
  productUpdateReducer,
  productCreateReviewReducer,
 } from './reducers/productReducers'
import { 
  userLoginReducer, 
  userRegisterReducer, 
  userDetailsReducer, 
  userUpdateProfileReducer, 
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
}  from './reducers/userReducers'
import { 
  orderCreateReducer, 
  orderDetailsReducer, 
  orderPayReducer, 
  orderListMyReducer, 
  orderListReducer,
  orderDeliverReducer, 
} from './reducers/orderReducers'
import { cartReducer } from './reducers/cartReducers'


const reducers = combineReducers({
  productList:        productListReducer,
  productDetails:     productDetailsReducer,
  productDelete:       productDeleteReducer,
  productCreate:       productCreateReducer,
  productUpdate:       productUpdateReducer,
  productCreateReview:       productCreateReviewReducer,
  cart:               cartReducer,
  userLogin:          userLoginReducer,
  userRegister:       userRegisterReducer,
  userDetails:        userDetailsReducer,
  userUpdateProfile:  userUpdateProfileReducer,
  userList:           userListReducer,
  userDelete:           userDeleteReducer,
  userUpdate:           userUpdateReducer,
  orderCreate:        orderCreateReducer,
  orderDetails:       orderDetailsReducer,
  orderPay:           orderPayReducer,
  orderListMy:        orderListMyReducer,
  orderList:        orderListReducer,
  orderDeliver:        orderDeliverReducer,

})

//all initial states go here
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}

const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userInfo: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]


//create store
const store = createStore(
  reducers, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store