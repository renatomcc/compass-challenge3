import { Request, Response } from 'express'
import ISignInUser from '../../interfaces/SignIn'
import SignInService from '../../services/UserServices/SignInService'
import CustomError from '../../errors/CustomError'
import { handleError } from '../../utils/errorHandler'

export default class SignInController {
  static async handle(req: Request, res: Response) {
    try {
      const userLogin: ISignInUser = req.body
      const result = await SignInService.execute(userLogin)
      return res.status(200).json(result)
    } catch (err) {
      return handleError(err, res)
    }
  }
}
