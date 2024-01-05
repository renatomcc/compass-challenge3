import { Request, Response } from 'express'
import EventsServices from '../../services/EventsServices/EventsServices'
import IEvent from '../../interfaces/Event'
import { handleError } from '../../utils/errorHandler'

export default class EventsController {
  static async createEvent(req: Request, res: Response) {
    try {
      const newEvent: IEvent = req.body
      const token: string = String(req.headers.authorization?.split(' ')[1])
      const result = await EventsServices.createEvent(newEvent, token)
      return res.status(200).json(result)
    } catch (err) {
      return handleError(err, res)
    }
  }

  static async getAllEventsByDay(req: Request, res: Response) {
    try {
      const dayOfWeek: string = String(req.query.dayOfWeek)
      let description: string | undefined
      if (req.query.description) {
        description = String(req.query.description)
      }
      const token: string = String(req.headers.authorization?.split(' ')[1])
      const { number = 10, page = 1 } = req.query
      const skip = (Number(page) - 1) * Number(number)
      const events = await EventsServices.getAllEventsByDay(
        dayOfWeek,
        token,
        Number(number),
        skip,
        description !== undefined ? description : null,
      )
      return res.status(200).json(events)
    } catch (err) {
      return handleError(err, res)
    }
  }

  static async deleteEventsByDay(req: Request, res: Response) {
    try {
      const dayOfWeek: string = String(req.query.dayOfWeek)
      const token: string = String(req.headers.authorization?.split(' ')[1])
      const events = await EventsServices.deleteEventsByDay(dayOfWeek, token)
      return res.status(200).json({ deletedEvents: events })
    } catch (err) {
      return handleError(err, res)
    }
  }

  static async getEventById(req: Request, res: Response) {
    try {
      const eventId: string = req.params.id
      const token: string = String(req.headers.authorization?.split(' ')[1])
      const event = await EventsServices.getEventById(eventId, token)
      return res.status(200).json(event)
    } catch (err) {
      return handleError(err, res)
    }
  }

  static async deleteEventsById(req: Request, res: Response) {
    try {
      const eventId: string = req.params.id
      const token: string = String(req.headers.authorization?.split(' ')[1])
      const event = await EventsServices.deleteEventById(eventId, token)
      return res.status(204).json(event)
    } catch (err) {
      return handleError(err, res)
    }
  }
}
