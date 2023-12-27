import express, { Router } from 'express'
import { SignUpController } from '../controllers/SignUpController'
const Routes: Router = express.Router()

const prefix = '/api/v1'

Routes.post(`${prefix}/users/sign-up`, SignUpController.handle)

export default Routes
