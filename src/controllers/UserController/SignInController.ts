import { Request, Response } from 'express'
import ISignInUser from '../../interfaces/SignIn'
import SignInService from '../../services/UserServices/SignInService'

class SignInController {
  static async handle(req: Request, res: Response) {
    const userLogin: ISignInUser = req.body
    const result = await SignInService.execute(userLogin)
    return res.status(200).json({ result })
  }
}

export { SignInController }
