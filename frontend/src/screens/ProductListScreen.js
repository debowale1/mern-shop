import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from './../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'


const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const pageNumber = params.pageNumber || 1

  const productList = useSelector(state => state.productList)
  const { loading, products, error, pages, page } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector(state => state.productDelete)
  const { laoding:loadingDelete, success:successDelete, error:errorDelete } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const { laoding:loadingCreate, success:successCreate, error:errorCreate, product:createdProduct } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if(successCreate){ 
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }else if(userInfo && userInfo.isAdmin){
      dispatch(listProducts('', pageNumber))
    }else{
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate, successDelete, successCreate, createdProduct, pageNumber])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')){
      dispatch(deleteProduct(id))
    }
  }
  const createProductHandler = () => {
    dispatch(createProduct())
  }

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
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
        <>
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
         <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
     
    </>
  )
}

export default ProductListScreen