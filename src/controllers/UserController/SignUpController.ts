import { Request, Response } from 'express'
import CustomError from '../../errors/CustomError'
import ISignUpUser from '../../interfaces/SignUp'
import SignUpService from '../../services/UserServices/SignUpService'
import { handleError } from '../../utils/errorHandler'

export default class SignUpController {
  static async handle(req: Request, res: Response) {
    try {
      const payload: ISignUpUser = req.body
      const newUser = await SignUpService.execute(payload)
      return res.status(200).json(newUser)
    } catch (err) {
      return handleError(err, res)
    }
  }
}
