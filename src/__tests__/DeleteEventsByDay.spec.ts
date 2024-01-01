import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'

describe('Delete Events by day', () => {
  let createdUserId: string
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
  })

  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }
  })
  it('should delete and return all events on a specific day of the week', async () => {
    const eventData = {
      description: 'Show',
      dayOfWeek: 'sunday',
    }

    const eventData2 = {
      description: 'Show2',
      dayOfWeek: 'sunday',
    }

    const eventData3 = {
      description: 'Show3',
      dayOfWeek: 'sunday',
    }

    await request(app)
      .post('/api/v1/events')
      .send(eventData)
      .set('Authorization', `Bearer ${token}`)

    await request(app)
      .post('/api/v1/events')
      .send(eventData2)
      .set('Authorization', `Bearer ${token}`)

    await request(app)
      .post('/api/v1/events')
      .send(eventData3)
      .set('Authorization', `Bearer ${token}`)

    const dayOfWeek: string = 'sunday'

    const deleteEventsResponse = await request(app)
      .delete(`/api/v1/events?dayOfWeek=${dayOfWeek}`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteEventsResponse.status).toBe(200)
    expect(deleteEventsResponse.body).toBeDefined
    expect(deleteEventsResponse.body.deletedEvents).toBeDefined
    expect(deleteEventsResponse.body.deletedEvents.length).toEqual(3)
  })

  it('should handle invalid data supplied', async () => {
    const dayOfWeek: string = 'invalidDay'

    const deleteEventsResponse = await request(app)
      .delete(`/api/v1/events?dayOfWeek=${dayOfWeek}`)
      .set('Authorization', `Bearer ${token}`)
      
    expect(deleteEventsResponse.status).toBe(400)
    expect(deleteEventsResponse.body).toBeDefined
    expect(deleteEventsResponse.body.type).toEqual('Validation error')
    expect(deleteEventsResponse.body.errors[0].resource).toEqual('dayOfWeek')
    expect(deleteEventsResponse.body.errors[0].message).toEqual(
      'dayOfWeek must be a valid day of the week',
    )
  })

  it('should handle a request with no token', async () => {
    const deleteEventsResponse = await request(app)
      .delete(`/api/v1/events?dayOfWeek=sunday`)
      .set('Authorization', ``)
      
    expect(deleteEventsResponse.status).toBe(401)
    expect(deleteEventsResponse.body).toBeDefined
    expect(deleteEventsResponse.body.type).toEqual('AuthenticationError')
    expect(deleteEventsResponse.body.errors[0].resource).toEqual('token')
    expect(deleteEventsResponse.body.errors[0].message).toEqual(
      'No token provided.',
    )
  })

  it('should handle a request with invalid token format', async () => {
    const deleteEventsResponse = await request(app)
      .delete(`/api/v1/events?dayOfWeek=sunday`)
      .set('Authorization', `invalidToken`)
      
    expect(deleteEventsResponse.status).toBe(401)
    expect(deleteEventsResponse.body).toBeDefined
    expect(deleteEventsResponse.body.type).toEqual('AuthenticationError')
    expect(deleteEventsResponse.body.errors[0].resource).toEqual('token')
    expect(deleteEventsResponse.body.errors[0].message).toEqual(
      'Invalid token format.',
    )
  })
})
