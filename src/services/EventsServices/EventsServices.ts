import jwt from 'jsonwebtoken'
import IEvent from '../../interfaces/Event'
import EventsRepository from '../../respositories/EventsRepositories/EventsRespository'

export default class EventsServices {
  static async createEvent(payload: IEvent) {
    return await EventsRepository.createEvent(payload)
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
  static async deleteEventById(req: Request, res: Response) {}
}
