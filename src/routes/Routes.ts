import express, { Router } from 'express'
import { SignUpController } from '../controllers/UserController/SignUpController'
import { SignInController } from '../controllers/UserController/SignInController'
import EventsController from '../controllers/EventsController/EventsController'
const Routes: Router = express.Router()

const prefix = '/api/v1'

Routes.post(`${prefix}/users/sign-up`, SignUpController.handle)
  .post(`${prefix}/users/sign-in`, SignInController.handle)
  .post(`${prefix}/events`, EventsController.createEvent)
  .get(`${prefix}/events/:dayOfWeek`, EventsController.getAllEventsByDay)

export default Routes
