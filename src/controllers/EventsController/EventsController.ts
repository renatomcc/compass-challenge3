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
    const dayOfWeek: string = req.params.dayOfWeek
    const events = await EventsServices.getAllEventsByDay(dayOfWeek)
    return res.status(200).json({ events })
  }
  static async deleteEventsByDay(req: Request, res: Response) {
    const dayOfWeek: string = req.params.dayOfWeek
    const events = await EventsServices.deleteEventsByDay(dayOfWeek)
    return res.status(200).json({ events })
  }
  static async getEventsById(req: Request, res: Response) {}
  static async deleteEventsById(req: Request, res: Response) {}
}
