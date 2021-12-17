import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    navigate('/payment')
  }
  
  return (
    <FormContainer>
      <h1>Shipping</h1>
     <Form onSubmit={handleSubmit}>
     <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter address' 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}>
          </Form.Control>
        </Form.Group>
      <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter city' 
            value={city} 
            onChange={(e) => setCity(e.target.value)}>
          </Form.Control>
        </Form.Group>
      <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter postalCode' 
            value={postalCode} 
            onChange={(e) => setPostalCode(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter country' 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant='primary'> Continue</Button>
     </Form>
    </FormContainer>
  )
}

export default ShippingScreen
