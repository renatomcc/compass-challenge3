import { Request, Response } from 'express'
import ISignUpUser from '../../interfaces/SignUp'
import SignUpService from '../../services/UserServices/SignUpService'

export default class SignUpController {
  static async handle(req: Request, res: Response) {
    try {
      const payload: ISignUpUser = req.body
      const { newUser, statusCode } = await SignUpService.execute(payload)
      return res.status(statusCode).json(newUser)
    } catch (err) {
      console.log('deu erro')
    }
  }
}
