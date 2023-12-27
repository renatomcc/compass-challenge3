import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  firstName: 'string',
  lastName: 'string',
  birthDate: Date,
  city: 'string',
  country: 'string',
  email: 'string',
  password: 'string',
  confirmPassword: 'string',
})

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password!, salt)
  this.confirmPassword = this.password
})

const User = mongoose.model<Document>('User', userSchema)

export default User
