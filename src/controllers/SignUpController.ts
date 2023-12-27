import { Request, Response } from 'express'
import ISignUpUser from '../interfaces/SignUp'
import SignUpService from '../services/SignUpService'

class SignUpController {
  static async handle(req: Request, res: Response) {
    const newUser: ISignUpUser = req.body
    await SignUpService.execute(newUser)
    return res.status(200).json({ Client: newUser, msg: 'Created.' })
  }
}

export { SignUpController }
