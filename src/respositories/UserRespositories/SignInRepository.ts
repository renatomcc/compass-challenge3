import ISignInUser from '../../interfaces/SignIn'
import ISignUpUser from '../../interfaces/SignUp'
import User from '../../model/User'
import bcrypt from 'bcrypt'

export default class SignInRepository {
  static async login(user: ISignInUser) {
    const existingUser: ISignUpUser | null = await User.findOne({
      email: user.email,
    })
    if (existingUser) {
      const validPassword = await bcrypt.compare(
        user.password,
        existingUser.password,
      )
      if (validPassword) {
        const firstName = existingUser.firstName
        const lastName = existingUser.lastName
        const email = user.email
        return { firstName, lastName, email }
      } else {
        return { msg: 'Invalid password.' }
      }
    }
  }
}
