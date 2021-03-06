import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const navigate = useNavigate()
  
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  
  if(!shippingAddress){
    navigate('/shipping')
  }
  
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
     <Form onSubmit={handleSubmit}>
        <Form.Group controlId='country'>
          <Form.Label as='legend'>Select Method</Form.Label>
        <Col>
          <Form.Check 
          type='radio'
          label='Paypal or Credit Card'
          id='PayPal'
          name='paymentMethod'
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
        <Form.Check 
          type='radio'
          label='Stripe'
          id='Stripe'
          name='paymentMethod'
          onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
        </Col>
        </Form.Group>
        <Button type="submit" variant='primary'> Continue</Button>
     </Form>
    </FormContainer>
  )
}

export default PaymentScreen
