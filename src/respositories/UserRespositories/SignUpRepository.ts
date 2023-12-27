import ISignUpUser from '../../interfaces/SignUp'
import User from '../../model/User'

export default class SignUpRespository {
  static async createUser(user: ISignUpUser) {
    const newUser = await User.create(user)
    return newUser
  }
}
