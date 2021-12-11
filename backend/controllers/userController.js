import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: null
  })
})