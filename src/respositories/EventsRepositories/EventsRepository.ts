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
  static async getAllEventsByDay(dayOfWeek: string, userId: string) {
    const events = await Event.find({ dayOfWeek, userId })
    return events
  }
  static async deleteEventsByDay(dayOfWeek: string, userId: string) {
    const eventsToDelete = await Event.find({ dayOfWeek, userId })
    await Event.deleteMany({ dayOfWeek, userId })
    return eventsToDelete
  }
  static async getEventById(eventId: string) {
    const event = await Event.findById(eventId)
    return event
  }
  static async deleteEventById(eventId: string, userId: string) {
    const eventToDelete = await Event.findById(eventId)
    await Event.deleteMany({ eventId, userId })
    console.log(eventToDelete)
    return eventToDelete
  }
}
