import CustomError from '../../errors/CustomError'
import ISignUpUser from '../../interfaces/SignUp'
import SignUpRespository from '../../respositories/UserRespositories/SignUpRepository'
import SignUpValidator from '../../validation/UserValidation/SignUpValidator'

export default class SignUpService {
  static async execute(payload: ISignUpUser) {
    const validationResponse = SignUpValidator(payload)

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
