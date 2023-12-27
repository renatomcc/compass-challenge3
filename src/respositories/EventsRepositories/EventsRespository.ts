import IEvent from '../../interfaces/Event'
import Event from '../../model/Event'

const DAYS_OF_WEEK = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

export default class EventsRepository {
  static async createEvent(event: IEvent) {
    const newEvent = await Event.create(event)
    return newEvent
  }
  static async getAllEventsByDay(dayOfWeek: string) {
    if (!DAYS_OF_WEEK.includes(dayOfWeek)) {
      console.log('invalid day of week')
    }
    const events = await Event.find({ dayOfWeek })
    return events
  }
  static async deleteEventsByDay(req: Request, res: Response) {}
  static async getEventsById(req: Request, res: Response) {}
  static async deleteEventsById(req: Request, res: Response) {}
}
