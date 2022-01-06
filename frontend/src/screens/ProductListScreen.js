import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../components/Loader'
import Message from '../components/Message'
import {listProducts} from '../actions/productActions'
import { useNavigate } from 'react-router-dom'


const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector(state => state.productList)
  const { loading, products, error} = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // const userDelete = useSelector(state => state.userDelete)
  // const { success:successDelete } = userDelete

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listProducts())
    }else{
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')){
      // dispatch(deleteUser(id))
    }
  }
  const createProductHandler = () => {}

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      
      {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
         <Table striped bordered hover responsive className='table-sm'>
           <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {products.map((product, index) => <tr key={index}>
        <td>{product._id}</td>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td>{product.category}</td>              
        <td>{product.brand}</td>              
        <td>
          <LinkContainer to={`/admin/product/${product._id}/edit`}>
            <Button className='btn-sm' variant='light'><i className="fas fa-edit" ></i></Button>
          </LinkContainer>
          <Button 
            className='btn-sm' 
            variant='danger' 
            onClick={() => deleteHandler(product._id)}
            >
              <i className="fas fa-trash" ></i>
          </Button>
        </td>
        
      </tr>)}
          </tbody>
         </Table>
      )}
     
    </>
  )
}

export default ProductListScreen