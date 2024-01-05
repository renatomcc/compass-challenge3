import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import Event from '../model/Event'
import IEvent from '../interfaces/Event'
import EventsServices from '../services/EventsServices/EventsServices'

describe('Create event', () => {
  let createdUserId: string
  let createdEventId: string
  let createdEventId2: string
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

  afterEach(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
    if (createdEventId) {
      await Event.findByIdAndDelete(createdEventId)
    }
    if (createdEventId2) {
      await Event.findByIdAndDelete(createdEventId2)
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

  it('should handle a request with duplicated event', async () => {
    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer ${token}`)

    const createEventResponse2 = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer ${token}`)

    createdEventId = createEventResponse.body._id
    createdEventId2 = createEventResponse2.body._id

    expect(createEventResponse2.status).toBe(422)
    expect(createEventResponse2.body).toBeDefined
    expect(createEventResponse2.body.type).toEqual('Validation error')
    expect(createEventResponse2.body.errors[0].resource).toEqual('event')
    expect(createEventResponse2.body.errors[0].message).toEqual(
      'Event already registered in this day',
    )
  })

  it('should handle a request with no token', async () => {
    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', ``)

    expect(createEventResponse.status).toBe(401)
    expect(createEventResponse.body).toBeDefined
    expect(createEventResponse.body.type).toEqual('AuthenticationError')
    expect(createEventResponse.body.errors[0].resource).toEqual('token')
    expect(createEventResponse.body.errors[0].message).toEqual(
      'No token provided.',
    )
  })

  it('should handle a request with invalid token format', async () => {
    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `invalidToken`)

    expect(createEventResponse.status).toBe(401)
    expect(createEventResponse.body).toBeDefined
    expect(createEventResponse.body.type).toEqual('AuthenticationError')
    expect(createEventResponse.body.errors[0].resource).toEqual('token')
    expect(createEventResponse.body.errors[0].message).toEqual(
      'Invalid token format.',
    )
  })

  it('should handle a request with invalid token', async () => {
    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer 5af49dasf4s5d4`)

    expect(createEventResponse.status).toBe(401)
    expect(createEventResponse.body).toBeDefined
    expect(createEventResponse.body.type).toEqual('AuthenticationError')
    expect(createEventResponse.body.errors[0].resource).toEqual('token')
    expect(createEventResponse.body.errors[0].message).toEqual('Invalid token.')
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

  it('should handle a request with internal server error', async () => {
    jest.spyOn(EventsServices, 'createEvent').mockImplementationOnce(() => {
      throw new Error('Internal Server Error')
    })

    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer ${token}`)

    jest.spyOn(EventsServices, 'createEvent').mockRestore()
    expect(createEventResponse.status).toBe(500)
    expect(createEventResponse.body).toBeDefined
    expect(createEventResponse.body.message).toEqual('Internal Server Error')
  })
})
