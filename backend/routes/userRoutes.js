import express from 'express'
import { authUser } from '../controllers/userController.js'
// import { registerUser, getAllUsers, authUser, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
// import { protect, restrictTo } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)
// router.use(protect)
// router.route('/profile').get(protect, getUserProfile).patch(protect, updateUserProfile)

// router.route('/').get(protect, restrictTo('admin'), getAllUsers).post(registerUser)

// router.route('/:id')
//       .get(protect, restrictTo('admin'), getUserById)
//       .put(protect, restrictTo('admin'), updateUser)
//       .delete(protect, restrictTo('admin'), deleteUser)


export default router