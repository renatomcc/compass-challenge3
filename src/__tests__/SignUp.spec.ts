import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import ISignUpUser from '../interfaces/SignUp'

describe('Sign Up', () => {
  let createdUserId: string
  let userData: any

  beforeAll(async () => {
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
})
