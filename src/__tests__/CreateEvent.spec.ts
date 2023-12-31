import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'

describe('Create event', () => {
  let createdUserId: string

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
  })
  it('should create a new event', async () => {
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

    const userLogin = {
      email: 'shakira@wakawaka.com',
      password: 'hipsdontlie',
    }

    const signUpResponse = await request(app)
      .post('/api/v1/users/sign-up')
      .send(userData)
      .set('Accept', 'application/json')

    createdUserId = signUpResponse.body._id

    const signInResponse = await request(app)
      .post('/api/v1/users/sign-in')
      .send(userLogin)
      .set('Accept', 'application/json')

    const token = signInResponse.body.token

    const eventData = {
      description: 'Show',
      dayOfWeek: 'sunday',
    }

    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer ${token}`)
    expect(createEventResponse.status).toBe(200)
    expect(createEventResponse.body).toBeDefined
    expect(createEventResponse.body._id).toBeDefined
    expect(createEventResponse.body.description).toBeDefined
    expect(createEventResponse.body.dayOfWeek).toBeDefined
    expect(createEventResponse.body.userId).toBeDefined
    expect(createEventResponse.body.userId).toEqual(createdUserId)
  })
})
