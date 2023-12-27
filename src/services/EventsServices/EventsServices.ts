import jwt from 'jsonwebtoken'
import IEvent from '../../interfaces/Event'
import EventsRepository from '../../respositories/EventsRepositories/EventsRespository'

export default class EventsServices {
  static async createEvent(payload: IEvent) {
    return await EventsRepository.createEvent(payload)
  }
  static async getAllEventsByDay(req: Request, res: Response) {}
  static async deleteEventsByDay(req: Request, res: Response) {}
  static async getEventsById(req: Request, res: Response) {}
  static async deleteEventsById(req: Request, res: Response) {}
}
