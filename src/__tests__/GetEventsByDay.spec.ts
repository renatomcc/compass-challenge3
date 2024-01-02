import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import Event from '../model/Event'
import IEvent from '../interfaces/Event'
import EventsServices from '../services/EventsServices/EventsServices'

describe('Get Events by day', () => {
  let createdUserId: string
  let createdEventId: string
  let token: string
  let eventData: IEvent
  let dayOfWeek: string

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

    const createEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer ${token}`)

    createdEventId = createEventResponse.body._id
    dayOfWeek = 'sunday'
  })

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
    if (createdEventId) {
      await Event.findByIdAndDelete(createdEventId)
    }
  })
  it('should return all events on a specific day of the week', async () => {
    const getEventsByDayResponse = await request(app)
      .get(`/api/v1/events?dayOfWeek=${dayOfWeek}`)
      .set('Authorization', `Bearer ${token}`)

    expect(getEventsByDayResponse.status).toBe(200)
    expect(getEventsByDayResponse.body).toBeDefined
    expect(getEventsByDayResponse.body._id).toBeDefined
    expect(getEventsByDayResponse.body.description).toBeDefined
    expect(getEventsByDayResponse.body.userId).toBeDefined
  })

  it('should handle invalid data supplied', async () => {
    const invalidDay: string = 'invalidDay'

    const getEventsResponse = await request(app)
      .get(`/api/v1/events?dayOfWeek=${invalidDay}`)
      .set('Authorization', `Bearer ${token}`)

    expect(getEventsResponse.status).toBe(400)
    expect(getEventsResponse.body).toBeDefined
    expect(getEventsResponse.body.type).toEqual('Validation error')
    expect(getEventsResponse.body.errors[0].resource).toEqual('dayOfWeek')
    expect(getEventsResponse.body.errors[0].message).toEqual(
      'dayOfWeek must be a valid day of the week',
    )
  })

  it('should handle a request with no token', async () => {
    const getEventsByDayResponse = await request(app)
      .get(`/api/v1/events?dayOfWeek=sunday`)
      .set('Authorization', ``)

    expect(getEventsByDayResponse.status).toBe(401)
    expect(getEventsByDayResponse.body).toBeDefined
    expect(getEventsByDayResponse.body.type).toEqual('AuthenticationError')
    expect(getEventsByDayResponse.body.errors[0].resource).toEqual('token')
    expect(getEventsByDayResponse.body.errors[0].message).toEqual(
      'No token provided.',
    )
  })

  it('should handle a request with invalid token format', async () => {
    const getEventsByDayResponse = await request(app)
      .get(`/api/v1/events?dayOfWeek=sunday`)
      .set('Authorization', `invalidToken`)

    expect(getEventsByDayResponse.status).toBe(401)
    expect(getEventsByDayResponse.body).toBeDefined
    expect(getEventsByDayResponse.body.type).toEqual('AuthenticationError')
    expect(getEventsByDayResponse.body.errors[0].resource).toEqual('token')
    expect(getEventsByDayResponse.body.errors[0].message).toEqual(
      'Invalid token format.',
    )
  })

  it('should handle a request with invalid token', async () => {
    const getEventsByDayResponse = await request(app)
      .get(`/api/v1/events?dayOfWeek=sunday`)
      .set('Authorization', `Bearer a3sd541a96s84fa2s61`)

    expect(getEventsByDayResponse.status).toBe(401)
    expect(getEventsByDayResponse.body).toBeDefined
    expect(getEventsByDayResponse.body.type).toEqual('AuthenticationError')
    expect(getEventsByDayResponse.body.errors[0].resource).toEqual('token')
    expect(getEventsByDayResponse.body.errors[0].message).toEqual(
      'Invalid token.',
    )
  })

  it('should handle a request with internal server error', async () => {
    jest
      .spyOn(EventsServices, 'getAllEventsByDay')
      .mockImplementationOnce(() => {
        throw new Error('Internal Server Error')
      })

    const getEventsByDay = await request(app)
      .get(`/api/v1/events`)
      .set('Authorization', `Bearer ${token}`)

    expect(getEventsByDay.status).toBe(500)
    expect(getEventsByDay.body).toBeDefined()
    expect(getEventsByDay.body.message).toEqual('Internal Server Error')

    jest.spyOn(EventsServices, 'getAllEventsByDay').mockRestore()
  })
})
