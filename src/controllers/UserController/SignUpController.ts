import { Request, Response } from 'express'
import ISignUpUser from '../../interfaces/SignUp'
import SignUpService from '../../services/UserServices/SignUpService'

export default class SignUpController {
  static async handle(req: Request, res: Response) {
    const payload: ISignUpUser = req.body
    const newUser = await SignUpService.execute(payload)
    return res.status(200).json({ msg: 'Created.', Client: newUser })
  }
}
