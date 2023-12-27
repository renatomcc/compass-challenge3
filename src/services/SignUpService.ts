import ISignUpUser from '../interfaces/SignUp'
import SignUpRespository from '../respositories/SignUpRespository'
import jwt from 'jsonwebtoken'

export default class SignUpService {
  static async execute(payload: ISignUpUser) {
    const newUser = await SignUpRespository.createUser(payload)
    const newUserId = newUser._id
    const token = jwt.sign({ newUserId }, process.env.SECRET!)
    return { newUser, token }
  }
}
