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
  static async deleteEventsByDay(dayOfWeek: string) {
    const result = await Event.deleteMany({ dayOfWeek })
    return result
  }
  static async getEventById(eventId: string) {
    const result = await Event.findById(eventId)
    return result
  }
  static async deleteEventById(req: Request, res: Response) {}
}
