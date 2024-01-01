import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import Event from '../model/Event'

describe('Get Events by day', () => {
  let createdUserId: string
  let createdEventId: string

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
    if (createdEventId) {
      await Event.findByIdAndDelete(createdEventId)
    }
  })
  it('should return all events on a specific day of the week', async () => {
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

    createdEventId = createEventResponse.body._id
    const dayOfWeek: string = 'sunday'

    const getEventsByDayResponse = await request(app)
      .get(`/api/v1/events?dayOfWeek=${dayOfWeek}`)
      .set('Authorization', `Bearer ${token}`)

    console.log(getEventsByDayResponse.body)
    expect(getEventsByDayResponse.status).toBe(200)
    expect(getEventsByDayResponse.body).toBeDefined
    expect(getEventsByDayResponse.body._id).toBeDefined
    expect(getEventsByDayResponse.body.description).toBeDefined
    expect(getEventsByDayResponse.body.userId).toBeDefined
  })
})
