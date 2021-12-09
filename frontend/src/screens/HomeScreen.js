import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const url = '/api/products'


const HomeScreen = () => {
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    const {data} = await axios(url, {method: 'GET'})

    return data
  }

  useEffect(() => {
    const getProducts = async() =>{
      const products = await fetchProducts()
      setProducts(products)
    } 
    getProducts()
  }, [])

  return (
    <>
     <Row>
       <h1>Latest Products</h1>
       {
         products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>)
          )
       }
    </Row> 
    </>
  )
}

export default HomeScreen
