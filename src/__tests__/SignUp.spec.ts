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
  })
  it('should create a new user', async () => {
    const userData = {
      firstName: 'Shakira',
      lastName: 'Isabel',
      birthDate: '1977-02-02',
      city: 'Barranquilla',
      country: 'Colômbia',
      email: 'shakira@wakawaka.com',
      password: 'hipsdontlie',
      confirmPassword: 'hipsdontlie',
    }

    const response = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')

    createdUserId = response.body._id

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.firstName).toBeDefined()
    expect(response.body.lastName).toBeDefined()
    expect(response.body.birthDate).toBeDefined()
    expect(response.body.city).toBeDefined()
    expect(response.body.email).toBeDefined()
  })
})
