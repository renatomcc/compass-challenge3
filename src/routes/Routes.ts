import express, { Router } from 'express'
import { SignUpController } from '../controllers/SignUpController'
import { SignInController } from '../controllers/SignInController'
const Routes: Router = express.Router()

const prefix = '/api/v1'

Routes.post(`${prefix}/users/sign-up`, SignUpController.handle).post(
  `${prefix}/users/sign-in`,
  SignInController.handle,
)

export default Routes
