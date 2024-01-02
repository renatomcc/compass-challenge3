import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import SignUpService from '../services/UserServices/SignUpService'

describe('Sign Up', () => {
  let createdUserId: string
  let userData: any

  beforeEach(async () => {
    userData = {
      firstName: 'Shakira',
      lastName: 'Isabel',
      birthDate: new Date('1977-02-02'),
      city: 'Barranquilla',
      country: 'Colômbia',
      email: 'shakira@wakawaka.com',
      password: 'hipsdontlie',
      confirmPassword: 'hipsdontlie',
    }
  })

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
  })
  it('should create a new user', async () => {
    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')

    createdUserId = signUpResponse.body._id

    expect(signUpResponse.status).toBe(200)
    expect(signUpResponse.body).toBeDefined()
    expect(signUpResponse.body.firstName).toBeDefined()
    expect(signUpResponse.body.lastName).toBeDefined()
    expect(signUpResponse.body.birthDate).toBeDefined()
    expect(signUpResponse.body.city).toBeDefined()
    expect(signUpResponse.body.email).toBeDefined()
  })

  it('should handle a request with data missing', async () => {
    userData.firstName = ''
    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')

    expect(signUpResponse.status).toBe(422)
    expect(signUpResponse.body).toBeDefined()
    expect(signUpResponse.body.type).toEqual('Validation error')
    expect(signUpResponse.body.errors[0].resource).toEqual('firstName')
    expect(signUpResponse.body.errors[0].message).toEqual(
      '"firstName" is not allowed to be empty',
    )
  })

  it('should handle a request with invalid data', async () => {
    userData.firstName = 1
    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(signUpResponse.status).toBe(422)
    expect(signUpResponse.body).toBeDefined()
    expect(signUpResponse.body.type).toEqual('Validation error')
    expect(signUpResponse.body.errors[0].resource).toEqual('firstName')
    expect(signUpResponse.body.errors[0].message).toEqual(
      '"firstName" must be a string',
    )
  })

  it('should handle a request with invalid date of birth', async () => {
    userData.birthDate = new Date('2025-02-02')
    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(signUpResponse.status).toBe(422)
    expect(signUpResponse.body).toBeDefined()
    expect(signUpResponse.body.type).toEqual('Validation error')
    expect(signUpResponse.body.errors[0].resource).toEqual('birthDate')
    expect(signUpResponse.body.errors[0].message).toEqual(
      '"birthDate" date cannot be in the future',
    )
  })

  it('should handle a request with invalid email', async () => {
    userData.email = 'shakirawakawaka.com'
    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(signUpResponse.status).toBe(422)
    expect(signUpResponse.body).toBeDefined()
    expect(signUpResponse.body.type).toEqual('Validation error')
    expect(signUpResponse.body.errors[0].resource).toEqual('email')
    expect(signUpResponse.body.errors[0].message).toEqual(
      '"email" must be a valid email',
    )
  })

  it('should handle a request with invalid password', async () => {
    userData.password = 'abc'
    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(signUpResponse.status).toBe(422)
    expect(signUpResponse.body).toBeDefined()
    expect(signUpResponse.body.type).toEqual('Validation error')
    expect(signUpResponse.body.errors[0].resource).toEqual('password')
    expect(signUpResponse.body.errors[0].message).toEqual(
      '"password" length must be at least 6 characters long',
    )
  })

  it('should handle a request with passwords not matching', async () => {
    userData.confirmPassword = 'abc'
    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(signUpResponse.status).toBe(422)
    expect(signUpResponse.body).toBeDefined()
    expect(signUpResponse.body.type).toEqual('Validation error')
    expect(signUpResponse.body.errors[0].resource).toEqual('confirmPassword')
    expect(signUpResponse.body.errors[0].message).toEqual(
      '"confirmPassword" must match the password',
    )
  })

  it('should handle a request with email already in use', async () => {
    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')

    expect(signUpResponse.status).toBe(422)
    expect(signUpResponse.body).toBeDefined()
    expect(signUpResponse.body.type).toEqual('Validation error')
    expect(signUpResponse.body.errors[0].resource).toEqual('email')
    expect(signUpResponse.body.errors[0].message).toEqual('Email is already in use')
  })

  it('should handle a request with internal server error', async () => {
    jest.spyOn(SignUpService, 'execute').mockImplementationOnce(() => {
      throw new Error('Internal Server Error')
    })

    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')

    expect(signUpResponse.status).toBe(500)
    expect(signUpResponse.body).toBeDefined()
    expect(signUpResponse.body.message).toEqual('Internal Server Error')

    jest.spyOn(SignUpService, 'execute').mockRestore()
  })
})
