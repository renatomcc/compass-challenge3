import IEvent from '../../interfaces/Event'
import Event from '../../model/Event'

export default class EventsRepository {
  static async createEvent(event: IEvent, userId: string) {
    const newEvent = await Event.create({
      description: event.description,
      dayOfWeek: event.dayOfWeek,
      userId: userId,
    })

    return newEvent
  }
  static async getAllEventsByDay(dayOfWeek: string) {
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
  static async deleteEventById(eventId: string) {
    const result = await Event.findByIdAndDelete(eventId)
    return result
  }
}
