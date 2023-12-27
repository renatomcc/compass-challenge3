import express, { Router } from 'express'
import { SignUpController } from '../controllers/UserController/SignUpController'
import { SignInController } from '../controllers/UserController/SignInController'
const Routes: Router = express.Router()

const prefix = '/api/v1'

Routes.post(`${prefix}/users/sign-up`, SignUpController.handle)
      .post(`${prefix}/users/sign-in`, SignInController.handle)

export default Routes
