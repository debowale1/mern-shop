import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'


const reducers = combineReducers({})

//all initial states go here
const initialState = {}

const middleware = [thunk]


//create store
const store = createStore(
  reducers, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store