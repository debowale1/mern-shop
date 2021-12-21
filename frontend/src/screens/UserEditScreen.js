import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
// import { USER_DETAILS_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const {id} = useParams()
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  useEffect(() => {
    if(!user.name || user._id !== id){
      dispatch(getUserDetails(id))
    }else{
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, user, id])


  const submitHandler = (e) => {
    e.preventDefault()
   
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
    <FormContainer>
      <h1>Edit User</h1>
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
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email' 
            placeholder='enter email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='isadmin'>
          <Form.Check 
            type='checkbox' 
            label='Is Admin' 
            checked={isAdmin} 
            onChange={(e) => setIsAdmin(e.target.checked)}>
          </Form.Check>
        </Form.Group>
        <Button type='submit' variant='primary'>Update</Button>
      </Form>
      )}
    </FormContainer>
    </>
  )
}

export default UserEditScreen
