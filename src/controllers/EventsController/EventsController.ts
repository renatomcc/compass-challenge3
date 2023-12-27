import { Request, Response } from 'express'
import EventsServices from '../../services/EventsServices/EventsServices'
import IEvent from '../../interfaces/Event'

export default class EventsController {
  static async createEvent(req: Request, res: Response) {
    const newEvent: IEvent = req.body
    const result = await EventsServices.createEvent(newEvent)
    return res.status(200).json({ result })
  }
  static async getAllEventsByDay(req: Request, res: Response) {
    const dayOfWeek: string = String(req.query.dayOfWeek)
    const events = await EventsServices.getAllEventsByDay(dayOfWeek)
    return res.status(200).json({ events })
  }
  static async deleteEventsByDay(req: Request, res: Response) {
    const dayOfWeek: string = String(req.query.dayOfWeek)
    console.log(dayOfWeek)
    const events = await EventsServices.deleteEventsByDay(dayOfWeek)
    return res.status(200).json({ events })
  }
  static async getEventById(req: Request, res: Response) {
    const eventId: string = req.params.id
    const event = await EventsServices.getEventById(eventId)
    return res.status(200).json(event)
  }
  static async deleteEventsById(req: Request, res: Response) {
    const eventId: string = req.params.id
    const result = await EventsServices.deleteEventById(eventId)
    return res.status(200).json(result)
  }
}
