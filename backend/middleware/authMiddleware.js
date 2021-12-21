import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';


export const protect = asyncHandler( async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id).select('-password')

      req.user = user
      next()
    } catch (error) {
      console.log(error);
      res.status(403)
      throw new Error('Not Authorized, token failed')
    }

  }

  if(!token){
    res.status(401)
    throw new Error('Not Authorized! No Token')
  }
})

export const admin = asyncHandler(async(req, res, next) => {
  if(req.user && req.user.isAdmin){
    next()
  }else{
    res.status(401)
    throw new Error('You are not authorized to access this page')
  }
})