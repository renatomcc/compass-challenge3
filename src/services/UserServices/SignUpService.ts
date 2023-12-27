import ISignUpUser from '../../interfaces/SignUp'
import SignUpRespository from '../../respositories/UserRespositories/SignUpRespository'
import jwt from 'jsonwebtoken'

export default class SignUpService {
  static async execute(payload: ISignUpUser) {
    const newUser = await SignUpRespository.createUser(payload)
    const newUserId = newUser._id
    return newUser
  }
}
