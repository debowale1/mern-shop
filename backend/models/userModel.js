import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
})

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.comparePassword = async (enteredPassword, dbPassword) => {
  return await bcrypt.compare(enteredPassword, dbPassword)
}

const User =  mongoose.model('User', userSchema)
export default User