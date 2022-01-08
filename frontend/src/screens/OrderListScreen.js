import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../components/Loader'
import Message from '../components/Message'
import {listOrders} from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'


const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderList = useSelector(state => state.orderList)
  const { loading, orders, error} = orderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // const userDelete = useSelector(state => state.userDelete)
  // const { success:successDelete } = userDelete

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listOrders())
    }else{
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate])


  return (
    <>
      <h2>Orders</h2>
      {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
         <Table striped bordered hover responsive className='table-sm'>
           <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOATAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order, index) => <tr key={index}>
        <td>{order._id}</td>
        <td>{order.user && order.user.name}</td>
        <td>{order.createdAt}</td>
        <td>{order.totalPrice}</td>
        <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
          <i className="fas fa-times" style={{color: 'red'}}></i>
        )}</td>
        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10): (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>             
        <td>
          <LinkContainer to={`/order/${order._id}`}>
            <Button className='btn-sm' variant='light'>
              Details
            </Button>
          </LinkContainer>
        </td>
        
      </tr>)}
          </tbody>
         </Table>
      )}
     
    </>
  )
}

export default OrderListScreen