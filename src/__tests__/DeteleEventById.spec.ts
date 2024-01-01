import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import Event from '../model/Event'

describe('Delete Event by id', () => {
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

  it('should delete a specific day of informed id', async () => {
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

    createdEventId = createdEventResponse.body._id

    const deleteEventResponse = await request(app)
      .delete(`/api/v1/events/${createdEventId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteEventResponse.status).toBe(204)
    expect(deleteEventResponse.body).toBeDefined
    expect(deleteEventResponse.body.description).toBeDefined
    expect(deleteEventResponse.body.dayOfWeek).toBeDefined
    expect(deleteEventResponse.body._id).toBeDefined
    expect(deleteEventResponse.body.userId).toBeDefined
  })
})
