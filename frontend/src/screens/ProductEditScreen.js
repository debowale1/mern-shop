import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate

  useEffect(() => {
    if(successUpdate){
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    }else{
      if(!product.name || product._id !== id){
        dispatch(listProductDetails(id))
      }else{
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setImage(product.image)
        setCountInStock(product.countInStock)
      }

    }
  }, [dispatch, id, navigate, successUpdate, product])


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const {data} = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error);
      setUploading(false)
      
    }
  }


  const submitHandler = (e) => {
    e.preventDefault()
   dispatch(updateProduct({_id: id, name, price, brand, category, description, image, countInStock }))
  }

  

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
    <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter Name' 
            value={name} 
            onChange={(e) => setName(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type='number' 
            placeholder='enter price' 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter price' 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter category' 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter brand' 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='countInStock'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control 
            type='number' 
            placeholder='enter count in stock' 
            value={countInStock} 
            onChange={(e) => setCountInStock(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter image url' 
            value={image} 
            onChange={(e) => setImage(e.target.value)}>
          </Form.Control>
          <Form.Label>Choose File</Form.Label>
          <Form.Control 
          type="file"
          onChange={uploadFileHandler}
           />
          {/* <Form.File
          id='image-file'
          label='choose file'
          custom
          // onChange={uploadFileHandler}
          ></Form.File> */}
          {uploading && <Loader /> } 
        </Form.Group>
        <Button type='submit' variant='primary'>Update Product</Button>
      </Form>
      )}
    </FormContainer>
    </>
  )
}

export default ProductEditScreen
