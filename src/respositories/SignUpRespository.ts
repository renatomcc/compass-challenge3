import ISignUpUser from '../interfaces/SignUp'
import Client from '../model/User'

export default class SignUpRespository {
  static async createUser(user: ISignUpUser) {
    const newClient = await Client.create(user)
    return newClient
  }
}
