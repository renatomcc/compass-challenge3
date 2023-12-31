import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'

describe('Sign Up', () => {
  let createdUserId: string

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }

    mongoose.connection.close()
  })

  it('should create a new user', async () => {})
})
