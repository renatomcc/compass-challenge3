import express, { Router } from 'express'
import SignUpController from '../controllers/UserController/SignUpController'
import SignInController from '../controllers/UserController/SignInController'
import EventsController from '../controllers/EventsController/EventsController'
import { authenticationMiddleware } from '../middleware/auth'
const Routes: Router = express.Router()

const prefix = '/api/v1'

Routes.post(`${prefix}/users/sign-up`, SignUpController.handle)
  .post(`${prefix}/users/sign-in`, SignInController.handle)
  .post(
    `${prefix}/events`,
    authenticationMiddleware,
    EventsController.createEvent,
  )
  .get(
    `${prefix}/events`,
    authenticationMiddleware,
    EventsController.getAllEventsByDay,
  )
  .delete(
    `${prefix}/events`,
    authenticationMiddleware,
    EventsController.deleteEventsByDay,
  )
  .get(
    `${prefix}/events/:id`,
    authenticationMiddleware,
    EventsController.getEventById,
  )
  .delete(
    `${prefix}/events/:id`,
    authenticationMiddleware,
    EventsController.deleteEventsById,
  )

export default Routes
