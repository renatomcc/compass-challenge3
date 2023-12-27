import CustomError from '../../errors/CustomError'
import ISignUpUser from '../../interfaces/SignUp'
import SignUpRespository from '../../respositories/UserRespositories/SignUpRepository'
import UserValidator from '../../validation/UserValidator'

export default class SignUpService {
  static async execute(payload: ISignUpUser) {
    const validationResponse = UserValidator(payload)

    if (validationResponse.statusCode !== 200) {
      throw new CustomError(
        validationResponse.type || 'UnknownError',
        validationResponse.errors,
        validationResponse.statusCode,
      )
    }

    const newUser = await SignUpRespository.createUser(payload)
    return newUser
  }
}
