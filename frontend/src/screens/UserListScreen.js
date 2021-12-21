import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../components/Loader'
import Message from '../components/Message'
import {listUsers} from '../actions/userActions'
import { useNavigate } from 'react-router-dom'


const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector(state => state.userList)
  const { loading, users, error} = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listUsers())
    }else{
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate])

  const deleteHandler = (id) => {
    console.log(id);
  }

  return (
    <>
      <h2>Users</h2>
      {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
         <Table striped bordered hover responsive className='table-sm'>
           <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {users.map((user, index) => <tr key={index}>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.isAdmin ? <i className="fas fa-check" style={{ color: 'green'}}></i> : (
          <i className="fas fa-times" style={{ color: 'red'}}></i>
        )}</td>              
        <td>
          <LinkContainer to={`/user/${user._id}/edit`}>
            <Button className='btn-sm' variant='light'><i className="fas fa-edit" ></i></Button>
          </LinkContainer>
          <Button 
            className='btn-sm' 
            variant='danger' 
            onClick={() => deleteHandler(user._id)}
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

export default UserListScreen