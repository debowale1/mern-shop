import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import {Row, Col, ListGroup, Form, Image, Button, Card } from 'react-router-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const productId = params?.id 
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  console.log(cart);


  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])


  

  


  return (
    <h1>
      Cart
    </h1>
  )
}

export default CartScreen
