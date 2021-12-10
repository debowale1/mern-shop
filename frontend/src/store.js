import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'


const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart:           cartReducer
})

//all initial states go here
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]


//create store
const store = createStore(
  reducers, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store