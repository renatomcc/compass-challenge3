import ISignInUser from '../interfaces/SignIn'
import SignInRepository from '../respositories/SignInRepository'
import jwt from 'jsonwebtoken'

export default class SignInService {
  static async execute(payload: ISignInUser) {
    return await SignInRepository.login(payload)
  }
}
