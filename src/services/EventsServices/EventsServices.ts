import jwt from 'jsonwebtoken'
import IEvent from '../../interfaces/Event'
import EventsRepository from '../../respositories/EventsRepositories/EventsRepository'

export default class EventsServices {
  static async createEvent(payload: IEvent) {
    const newEvent = await EventsRepository.createEvent(payload)
    const newEventId = newEvent.id
    const token = jwt.sign({ newEventId }, process.env.SECRET!)
    return { newEvent, token }
  }
  static async getAllEventsByDay(payload: string) {
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
