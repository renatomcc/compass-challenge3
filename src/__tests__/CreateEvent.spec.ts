import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import Event from '../model/Event'
import IEvent from '../interfaces/Event'

describe('Create event', () => {
  let createdUserId: string
  let createdEventId: string
  let eventData: IEvent
  let token: string

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

    token = signInResponse.body.token

    eventData = {
      description: 'Show',
      dayOfWeek: 'sunday',
    }
  })

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
    if (createdEventId) {
      await Event.findByIdAndDelete(createdEventId)
    }
  })

  it('should create a new event', async () => {
    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer ${token}`)

    createdEventId = createEventResponse.body._id

    expect(createEventResponse.status).toBe(200)
    expect(createEventResponse.body).toBeDefined
    expect(createEventResponse.body._id).toBeDefined
    expect(createEventResponse.body.description).toBeDefined
    expect(createEventResponse.body.dayOfWeek).toBeDefined
    expect(createEventResponse.body.userId).toBeDefined
  })

  it('should handle a request with invalid token', async () => {
    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `invalidToken`)

    expect(createEventResponse.status).toBe(401)
    expect(createEventResponse.body).toBeDefined
    expect(createEventResponse.body.type).toEqual('AuthenticationError')
    expect(createEventResponse.body.errors[0].resource).toEqual('token')
    expect(createEventResponse.body.errors[0].message).toEqual(
      'No token provided.',
    )
  })

  it('should handle a request invalid data', async () => {
    const invalidData: IEvent = {
      description: 'invalid event',
      dayOfWeek: 'invalidDayOfWeek',
    }
    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(invalidData)
      .set('Authorization', `Bearer ${token}`)

    expect(createEventResponse.status).toBe(400)
    expect(createEventResponse.body).toBeDefined
    expect(createEventResponse.body.type).toEqual('Validation error')
    expect(createEventResponse.body.errors[0].resource).toEqual('dayOfWeek')
    expect(createEventResponse.body.errors[0].message).toEqual(
      'dayOfWeek must be a valid day of the week',
    )
  })
})
