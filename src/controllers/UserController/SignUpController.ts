import { Request, Response } from 'express'
import CustomError from '../../errors/CustomError'
import ISignUpUser from '../../interfaces/SignUp'
import SignUpService from '../../services/UserServices/SignUpService'

export default class SignUpController {
  static async handle(req: Request, res: Response) {
    try {
      const payload: ISignUpUser = req.body
      const newUser = await SignUpService.execute(payload)
      return res.status(200).json(newUser)
    } catch (err) {
      if (err instanceof CustomError) {
        return res
          .status(err.statusCode)
          .json({ type: err.type, errors: err.errors })
      } else {
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }
}
