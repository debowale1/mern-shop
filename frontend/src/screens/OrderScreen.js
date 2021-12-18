import React, {useEffect} from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../actions/orderActions'


const OrderScreen = () => {
  const dispatch = useDispatch()
  const {id} = useParams()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails
  
  if(!loading){
    // calculate prices
  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2)
  }
  order.itemsPrice = addDecimals(order.orderItems.reduce((acc, cur) => acc + cur.qty * cur.price,0))
  }

  useEffect(() => {
    dispatch(getOrderDetails(id))
  }, [dispatch, id])

  // const placeOrderHandler = () => {
   
  // }
  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
    <h1>Order</h1>
    <Row>
       <Col md={8}>
          <ListGroup variant='flush'>
           <ListGroup.Item>
           <h2>Shipping</h2>
           <strong>Name: </strong> {order.user.name} { }
           <a href={`mailto:${order.user.name}`}>{order.user.email}</a>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? <Message variant='success'>Delivered On:{order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
           </ListGroup.Item>

           <ListGroup.Item>
             <h2>Payment Method</h2>
            <p>
             <strong>Method: </strong>
             {order.paymentMethod}
            </p>
            {order.isPaid ? <Message variant='success'>Paid On:{order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
           </ListGroup.Item>

           <ListGroup.Item>
             <h2>Order Items</h2>
             
             {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
               <ListGroup variant='flush'>
                 {order.orderItems.map((item, index) => <ListGroup.Item key={index}>
                   <Row>
                     <Col md={1}>
                       <Image src={item.image} fluid alt={item.name} rounded></Image>
                     </Col>
                     <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                     </Col>
                     <Col md={4}>{item.qty} x ${item.price} = ${item.qty * item.price}</Col>
                   </Row>
                 </ListGroup.Item>)}
               </ListGroup>
             ) }
           </ListGroup.Item>
          </ListGroup>
       </Col>
       <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
            
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
        
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
       </Col>
      </Row> 
  </>
}

export default OrderScreen
