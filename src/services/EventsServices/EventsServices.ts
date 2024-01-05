import jwt, { JwtPayload } from 'jsonwebtoken'
import CustomError from '../../errors/CustomError'
import IEvent from '../../interfaces/Event'
import EventsRepository from '../../respositories/EventsRepositories/EventsRepository'
import CreateEventValidator from '../../validation/EventsValidation/CreateEventValidator'
import CheckEventsByDayValidator from '../../validation/EventsValidation/CheckEventsByDayValidator'
import CheckEventByIdValidator from '../../validation/EventsValidation/CheckEventByIdValidator'
import { CheckEvents } from '../../utils/checkEvents'
import { handleValidationResponse } from '../../utils/validationResponse'

export default class EventsServices {
  static async createEvent(payload: IEvent, token: string) {
    const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload
    const validationResponse = await CreateEventValidator(
      payload,
      decodedToken.userId,
    )

    handleValidationResponse(validationResponse)

    const newEvent = await EventsRepository.createEvent(
      payload,
      decodedToken.userId,
    )

    return newEvent
  }

  static async getAllEventsByDay(
    dayOfWeek: string,
    token: string,
    number: number,
    skip: number,
    description: string | null,
  ) {
    const validationResponse = CheckEventsByDayValidator(dayOfWeek)
    const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload
    const userId = decodedToken.userId

    handleValidationResponse(validationResponse)

    const eventsResponse = await CheckEvents(
      dayOfWeek,
      userId,
      description,
      number,
      skip,
    )

    return eventsResponse
  }

  static async deleteEventsByDay(payload: string, token: string) {
    const validationResponse = CheckEventsByDayValidator(payload)
    const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload
    const userId = decodedToken.userId

    handleValidationResponse(validationResponse)

    const deletedEvents = await EventsRepository.deleteEventsByDay(
      payload,
      userId,
    )
    return deletedEvents
  }

  static async getEventById(payload: string, token: string) {
    const validationResponse = await CheckEventByIdValidator(payload)

    handleValidationResponse(validationResponse)

    return await EventsRepository.getEventById(payload)
  }

  static async deleteEventById(payload: string, token: string) {
    const validationResponse = await CheckEventByIdValidator(payload)
    const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload
    const userId = decodedToken.userId

    handleValidationResponse(validationResponse)

    return await EventsRepository.deleteEventById(payload, userId)
  }
}
