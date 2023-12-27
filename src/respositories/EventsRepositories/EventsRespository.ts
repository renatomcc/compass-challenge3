import IEvent from '../../interfaces/Event'
import Event from '../../model/Event'

export default class EventsRepository {
  static async createEvent(event: IEvent) {
    const newEvent = await Event.create(event)
    return newEvent
  }
  static async getAllEventsByDay(req: Request, res: Response) {}
  static async deleteEventsByDay(req: Request, res: Response) {}
  static async getEventsById(req: Request, res: Response) {}
  static async deleteEventsById(req: Request, res: Response) {}
}
