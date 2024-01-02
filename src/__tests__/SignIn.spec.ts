import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'

describe('Sign In', () => {
  let createdUserId: string
  let userLogin: any

  beforeAll(async () => {
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

    userLogin = {
      email: 'shakira@wakawaka.com',
      password: 'hipsdontlie',
    }

    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')

    createdUserId = signUpResponse.body._id
  })

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
  })
  it('should logged a existing user', async () => {
    const signInResponse = await request(app)
      .post('/api/v1/users/sign-in')
      .send(userLogin)
      .set('Accept', 'application/json')

    expect(signInResponse.status).toBe(200)
    expect(signInResponse.body).toBeDefined()
    expect(signInResponse.body.firstName).toBeDefined()
    expect(signInResponse.body.lastName).toBeDefined()
    expect(signInResponse.body.email).toBeDefined()
    expect(signInResponse.body.token).toBeDefined()
  })

  it('should handle a request with invalid email', async () => {
    userLogin.email = 'shakirawakawaka.com'
    const signInResponse = await request(app)
      .post('/api/v1/users/sign-in')
      .send(userLogin)
      .set('Accept', 'application/json')

    expect(signInResponse.status).toBe(400)
    expect(signInResponse.body).toBeDefined()
    expect(signInResponse.body.type).toEqual('Validation Error')
    expect(signInResponse.body.errors[0].resource).toEqual('email')
    expect(signInResponse.body.errors[0].message).toEqual(
      '"email" must be a valid email',
    )
  })

  it('should handle a request with email not found', async () => {
    userLogin.email = 'shakira2@wakawaka.com'
    const signInResponse = await request(app)
      .post('/api/v1/users/sign-in')
      .send(userLogin)
      .set('Accept', 'application/json')
    expect(signInResponse.status).toBe(404)
    expect(signInResponse.body).toBeDefined()
    expect(signInResponse.body.type).toEqual('UserNotFound')
    expect(signInResponse.body.errors[0].resource).toEqual('email')
    expect(signInResponse.body.errors[0].message).toEqual(
      'User with this email does not exist',
    )
  })
})
