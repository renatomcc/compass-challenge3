import ISignUpUser from '../../interfaces/SignUp'
import User from '../../model/User'

export default class SignUpRespository {
  static async createUser(user: ISignUpUser) {
    const newClient = await User.create(user)
    return newClient
  }
}
