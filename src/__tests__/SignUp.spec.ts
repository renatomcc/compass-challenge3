import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import ISignUpUser from '../interfaces/SignUp'

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

  it('should handle a request with data missing', async () => {
    userData.firstName = ''
    const response = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')

    expect(response.status).toBe(422)
    expect(response.body).toBeDefined()
    expect(response.body.type).toEqual('Validation error')
    expect(response.body.errors[0].resource).toEqual('firstName')
    expect(response.body.errors[0].message).toEqual(
      '"firstName" is not allowed to be empty',
    )
  })

  it('should handle a request with invalid data', async () => {
    userData.firstName = 1
    const response = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(response.status).toBe(422)
    expect(response.body).toBeDefined()
    expect(response.body.type).toEqual('Validation error')
    expect(response.body.errors[0].resource).toEqual('firstName')
    expect(response.body.errors[0].message).toEqual(
      '"firstName" must be a string',
    )
  })

  it('should handle a request with invalid date of birth', async () => {
    userData.birthDate = new Date('2025-02-02')
    const response = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(response.status).toBe(422)
    expect(response.body).toBeDefined()
    expect(response.body.type).toEqual('Validation error')
    expect(response.body.errors[0].resource).toEqual('birthDate')
    expect(response.body.errors[0].message).toEqual(
      '"birthDate" date cannot be in the future',
    )
  })

  it('should handle a request with invalid email', async () => {
    userData.email = 'shakirawakawaka.com'
    const response = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(response.status).toBe(422)
    expect(response.body).toBeDefined()
    expect(response.body.type).toEqual('Validation error')
    expect(response.body.errors[0].resource).toEqual('email')
    expect(response.body.errors[0].message).toEqual(
      '"email" must be a valid email',
    )
  })

  it('should handle a request with invalid password', async () => {
    userData.password = 'abc'
    const response = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(response.status).toBe(422)
    expect(response.body).toBeDefined()
    expect(response.body.type).toEqual('Validation error')
    expect(response.body.errors[0].resource).toEqual('password')
    expect(response.body.errors[0].message).toEqual(
      '"password" length must be at least 6 characters long',
    )
  })

  it('should handle a request with passwords not matching', async () => {
    userData.confirmPassword = 'abc'
    const response = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')
    expect(response.status).toBe(422)
    expect(response.body).toBeDefined()
    expect(response.body.type).toEqual('Validation error')
    expect(response.body.errors[0].resource).toEqual('confirmPassword')
    expect(response.body.errors[0].message).toEqual(
      '"confirmPassword" must match the password',
    )
  })

  it('should handle a request with email already in use', async () => {
    const response = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')

    expect(response.status).toBe(422)
    expect(response.body).toBeDefined()
    expect(response.body.type).toEqual('Validation error')
    expect(response.body.errors[0].resource).toEqual('email')
    expect(response.body.errors[0].message).toEqual('Email is already in use')
  })
})
