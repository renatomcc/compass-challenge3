import CustomError from '../../errors/CustomError'
import IEvent from '../../interfaces/Event'
import EventsRepository from '../../respositories/EventsRepositories/EventsRepository'
import CreateEventValidator from '../../validation/EventsValidation/CreateEventValidator'
import CheckEventsByDayValidator from '../../validation/EventsValidation/CheckEventsByDayValidator'
import CheckEventByIdValidator from '../../validation/EventsValidation/CheckEventByIdValidator'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default class EventsServices {
  static async createEvent(payload: IEvent, token: string) {
    const validationResponse = CreateEventValidator(payload)

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
    const validationResponse = CheckEventsByDayValidator(payload)
    const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload
    const userId = decodedToken.userId
    if (validationResponse.statusCode !== 200) {
      throw new CustomError(
        validationResponse.type || 'ValidationError',
        validationResponse.errors,
        validationResponse.statusCode,
      )
    }
    return await EventsRepository.getAllEventsByDay(payload, userId)
  }
  static async deleteEventsByDay(payload: string, token: string) {
    const validationResponse = CheckEventsByDayValidator(payload)
    const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload
    const userId = decodedToken.userId
    if (validationResponse.statusCode !== 200) {
      throw new CustomError(
        validationResponse.type || 'ValidationError',
        validationResponse.errors,
        validationResponse.statusCode,
      )
    }
    const deletedEvents = await EventsRepository.deleteEventsByDay(
      payload,
      userId,
    )
    return deletedEvents
  }
  static async getEventById(payload: string, token: string) {
    const validationResponse = await CheckEventByIdValidator(payload)
    if (validationResponse.statusCode !== 200) {
      throw new CustomError(
        validationResponse.type || 'ValidationError',
        validationResponse.errors,
        validationResponse.statusCode,
      )
    }
    return await EventsRepository.getEventById(payload)
  }
  static async deleteEventById(payload: string, token: string) {
    const validationResponse = await CheckEventByIdValidator(payload)
    if (validationResponse.statusCode !== 200) {
      throw new CustomError(
        validationResponse.type || 'ValidationError',
        validationResponse.errors,
        validationResponse.statusCode,
      )
    }
    return await EventsRepository.deleteEventById(payload)
  }
}
