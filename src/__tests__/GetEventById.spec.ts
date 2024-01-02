import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import Event from '../model/Event'
import IEvent from '../interfaces/Event'

describe('Get Event by id', () => {
  let createdUserId: string
  let createdEventId: string
  let token: string
  let eventData: IEvent

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

    const createdEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer ${token}`)

    createdEventId = createdEventResponse.body._id
  })

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
    if (createdEventId) {
      await Event.findByIdAndDelete(createdEventId)
    }
  })

  it('should return a specific day of informed id', async () => {
    const getEventResponse = await request(app)
      .get(`/api/v1/events/${createdEventId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(getEventResponse.status).toBe(200)
    expect(getEventResponse.body).toBeDefined
    expect(getEventResponse.body.description).toBeDefined
    expect(getEventResponse.body.dayOfWeek).toBeDefined
    expect(getEventResponse.body.userId).toBeDefined

    if (createdUserId) {
      expect(getEventResponse.body.userId).toEqual(createdUserId)
    }

    expect(getEventResponse.body._id).toBeDefined
    expect(getEventResponse.body._id).toEqual(createdEventId)
  })

  it('should handle invalid id format supplied', async () => {
    const getEventResponse = await request(app)
      .get(`/api/v1/events/invalidId`)
      .set('Authorization', `Bearer ${token}`)

    expect(getEventResponse.status).toBe(400)
    expect(getEventResponse.body).toBeDefined
    expect(getEventResponse.body.type).toBeDefined
    expect(getEventResponse.body.errors).toBeDefined
    expect(getEventResponse.body.type).toEqual('Validation error')
    expect(getEventResponse.body.errors[0].resource).toEqual('id')
    expect(getEventResponse.body.errors[0].message).toEqual('Invalid ObjectId')
  })

  it('should handle a request with no token', async () => {
    const getEventResponse = await request(app)
      .get(`/api/v1/events/${createdEventId}`)
      .set('Authorization', ``)

    expect(getEventResponse.status).toBe(401)
    expect(getEventResponse.body).toBeDefined
    expect(getEventResponse.body.type).toEqual('AuthenticationError')
    expect(getEventResponse.body.errors[0].resource).toEqual('token')
    expect(getEventResponse.body.errors[0].message).toEqual(
      'No token provided.',
    )
  })

  it('should handle a request with invalid token format', async () => {
    const getEventResponse = await request(app)
      .get(`/api/v1/events/${createdEventId}`)
      .set('Authorization', `invalidToken`)

    expect(getEventResponse.status).toBe(401)
    expect(getEventResponse.body).toBeDefined
    expect(getEventResponse.body.type).toEqual('AuthenticationError')
    expect(getEventResponse.body.errors[0].resource).toEqual('token')
    expect(getEventResponse.body.errors[0].message).toEqual(
      'Invalid token format.',
    )
  })

  it('should handle a request with invalid token', async () => {
    const getEventResponse = await request(app)
      .get(`/api/v1/events/${createdEventId}`)
      .set('Authorization', `Bearer a3sd541a96s84fa2s61`)

    expect(getEventResponse.status).toBe(401)
    expect(getEventResponse.body).toBeDefined
    expect(getEventResponse.body.type).toEqual('AuthenticationError')
    expect(getEventResponse.body.errors[0].resource).toEqual('token')
    expect(getEventResponse.body.errors[0].message).toEqual('Invalid token.')
  })
})
