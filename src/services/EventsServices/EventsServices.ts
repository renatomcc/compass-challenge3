import CustomError from '../../errors/CustomError'
import IEvent from '../../interfaces/Event'
import EventsRepository from '../../respositories/EventsRepositories/EventsRepository'
import EventValidator from '../../validation/EventsValidation/CreateEventValidator'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default class EventsServices {
  static async createEvent(payload: IEvent, token: string) {
    const validationResponse = EventValidator(payload)

    if (validationResponse.statusCode !== 200) {
      throw new CustomError(
        validationResponse.type || 'ValidationError',
        validationResponse.errors,
        validationResponse.statusCode,
      )
    }

    const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload
    const newEvent = await EventsRepository.createEvent(
      payload,
      decodedToken.userId,
    )

    const formattedResult = {
      _id: newEvent._id,
      description: newEvent.description,
      dayOfWeek: newEvent.dayOfWeek,
      userId: newEvent.userId,
    }

    return formattedResult
  }

  static async getAllEventsByDay(payload: string, token: string) {
    return await EventsRepository.getAllEventsByDay(payload)
  }
  static async deleteEventsByDay(payload: string) {
    return await EventsRepository.deleteEventsByDay(payload)
  }
  static async getEventById(payload: string) {
    return await EventsRepository.getEventById(payload)
  }
  static async deleteEventById(payload: string) {
    return await EventsRepository.deleteEventById(payload)
  }
}
