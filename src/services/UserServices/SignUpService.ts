import ISignUpUser from '../../interfaces/SignUp'
import SignUpRespository from '../../respositories/UserRespositories/SignUpRepository'
import SignUpValidator from '../../validation/UserValidation/SignUpValidator'
import { handleValidationResponse } from '../../utils/validationResponse'

export default class SignUpService {
  static async execute(payload: ISignUpUser) {
    const validationResponse = await SignUpValidator(payload)
    handleValidationResponse(validationResponse)

    const newUser = await SignUpRespository.createUser(payload)
    return newUser
  }
}
