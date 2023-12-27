import ISignUpUser from '../interfaces/SignUp'
import SignUpRespository from '../respositories/SignUpRespository'
import jwt from 'jsonwebtoken'

export default class SignUpService {
  static async execute(payload: ISignUpUser) {
    const newUser = await SignUpRespository.createUser(payload)
    console.log(newUser._id)
    // const token = jwt.sign({ newUser }, process.env.SECRET!)
    // console.log(token)
    return newUser
  }
}
