import ISignUpUser from '../interfaces/SignUp'
import SignUpRespository from '../respositories/SignUpRespository'

export default class SignUpService {
  static async execute(payload: ISignUpUser) {
    const newUser = await SignUpRespository.createUser(payload)
    return newUser
  }
}
