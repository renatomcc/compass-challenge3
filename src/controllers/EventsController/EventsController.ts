import { Request, Response } from 'express'

class EventsController {
  static async createEvent(req: Request, res: Response) {}
  static async getAllEventsByDay(req: Request, res: Response) {}
  static async deleteEventsByDay(req: Request, res: Response) {}
  static async getEventsById(req: Request, res: Response) {}
  static async deleteEventsById(req: Request, res: Response) {}
}

export { EventsController }
