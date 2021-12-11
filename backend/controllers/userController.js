import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken  from '../utils/generateToken.js'

/**
 * @desc  Auth user & get Token
 * @route POST /api/users/login
 * @access  public
 */
 export const authUser = asyncHandler(async (req, res) => {
   const {email, password } = req.body
  const user = await User.findOne({ email })

  if(!user || !(await user.comparePassword(password, user.password))){
    res.status(401)
    throw new Error('Invalid email or password')
  }

  //generate token
  const token = generateToken(user._id)

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token
  })
})
/**
 * @desc  User Profile
 * @route GET /api/users/profile
 * @access  private
 */
 export const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)

   if(user){
     res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
     })
   }else{
     res.status(404)
     throw new Error('User not found')
   }
})