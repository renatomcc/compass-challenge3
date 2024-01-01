import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'

describe('Get Event by id', () => {
  let createdUserId: string

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
  })

  it('should return a specific day of informed id', async () => {
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

    const createdEventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer ${token}`)

    const eventId: string = createdEventResponse.body._id

    const getEventResponse = await request(app)
      .get(`/api/v1/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)

    console.log(createdUserId)
    console.log(getEventResponse.body)

    expect(getEventResponse.status).toBe(200)
    expect(getEventResponse.body).toBeDefined
    expect(getEventResponse.body.description).toBeDefined
    expect(getEventResponse.body.dayOfWeek).toBeDefined
    expect(getEventResponse.body.userId).toBeDefined

    if (createdUserId) {
      expect(getEventResponse.body.userId).toEqual(createdUserId)
    }

    expect(getEventResponse.body._id).toBeDefined
    expect(getEventResponse.body._id).toEqual(eventId)
  })
})
