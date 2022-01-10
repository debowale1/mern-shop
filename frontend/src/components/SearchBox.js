import React, { useState } from 'react'
// import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()){
      setKeyword('')
      navigate(`/search/${keyword}`)
    }else{
      navigate('/')
    }
  }

  return (
    // <Form onSubmit={submitHandler} inline>
    //   <Form.Control
    //   type='text'
    //   name='q'
    //   placeholder='Search Products'
    //   className='mr-sm-2 ml-sm-5'
    //   onChange={(e) => setKeyword(e.target.value)}></Form.Control>
    //   <Button type='submit' variant='outline-success' className='p-2' >Search</Button>
    // </Form>
    <form className="d-flex" onSubmit={submitHandler}>
    <input
    name='q'
    onChange={(e) => setKeyword(e.target.value)} 
    className="form-control me-sm-2" 
    type="text" 
    placeholder="Search" />
    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
  </form>
  )
}

export default SearchBox
