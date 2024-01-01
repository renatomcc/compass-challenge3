import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../model/User'
import Event from '../model/Event'
import IEvent from '../interfaces/Event'

describe('Delete Event by id', () => {
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
  })
  afterAll(async () => {
    if (createdUserId) {
      await User.findByIdAndDelete(createdUserId)
    }

    if (createdEventId) {
      await Event.findByIdAndDelete(createdEventId)
    }
  })

  it('should delete a specific day of informed id', async () => {
    const createdEventResponse = await request(app)
      .delete('/api/v1/events')
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

  it('should handle invalid id format supplied', async () => {
    const deleteEventResponse = await request(app)
      .delete(`/api/v1/events/invalidId`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteEventResponse.status).toBe(400)
    expect(deleteEventResponse.body).toBeDefined
    expect(deleteEventResponse.body.type).toBeDefined
    expect(deleteEventResponse.body.errors).toBeDefined
    expect(deleteEventResponse.body.type).toEqual('Validation error')
    expect(deleteEventResponse.body.errors[0].resource).toEqual('id')
    expect(deleteEventResponse.body.errors[0].message).toEqual(
      'Invalid ObjectId',
    )
  })
})
