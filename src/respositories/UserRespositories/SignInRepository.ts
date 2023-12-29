import User from '../../model/User'
import ISignInUser from '../../interfaces/SignIn'
import ISignUpUser from '../../interfaces/SignUp'

export default class SignInRepository {
  static async login(payload: ISignInUser): Promise<ISignUpUser | null> {
    const existingUser = await User.findOne({ email: payload.email })
    return existingUser as ISignUpUser | null
  }
}
