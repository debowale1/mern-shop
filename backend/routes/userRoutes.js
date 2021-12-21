import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers } from '../controllers/userController.js'
// import { registerUser, , authUser, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect,admin, getUsers)
router.post('/login', authUser)

// router.use(protect)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

// router.route('/').get(protect, restrictTo('admin'), getUsers).post(registerUser)

// router.route('/:id')
//       .get(protect, restrictTo('admin'), getUserById)
//       .put(protect, restrictTo('admin'), updateUser)
//       .delete(protect, restrictTo('admin'), deleteUser)


export default router