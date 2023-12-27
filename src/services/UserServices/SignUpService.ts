import ISignUpUser from '../../interfaces/SignUp'
import SignUpRespository from '../../respositories/UserRespositories/SignUpRepository'
import UserValidator from '../../validation/UserValidator'

export default class SignUpService {
  static async execute(payload: ISignUpUser) {
    const newUser = await SignUpRespository.createUser(payload)
    const validationResponse = UserValidator(payload)
    if (validationResponse.errors) {
      const validationErrors = validationResponse.errors
      return { type: 'Validation error', validationErrors, statusCode: 422 }
    }
    return { newUser, statusCode: 200 }
  }
}
