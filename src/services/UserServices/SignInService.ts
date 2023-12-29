import ISignInUser from '../../interfaces/SignIn'
import SignInRepository from '../../respositories/UserRespositories/SignInRepository'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import CustomError from '../../errors/CustomError'
import SignInValidator from '../../validation/UserValidation/SignInValidator'

export default class SignInService {
  static async execute(payload: ISignInUser) {
    const validationResponse = SignInValidator(payload)

    if (validationResponse.statusCode !== 200) {
      throw new CustomError(
        validationResponse.type || 'ValidationError',
        validationResponse.errors,
        validationResponse.statusCode,
      )
    }

    const existingUser = await SignInRepository.login(payload)

    if (!existingUser) {
      throw new CustomError(
        'UserNotFound',
        [
          {
            resource: 'email',
            message: 'User with this email does not exist',
          },
        ],
        404,
      )
    }

    const validPassword = await bcrypt.compare(
      payload.password,
      existingUser.password,
    )

    if (!validPassword) {
      throw new CustomError(
        'InvalidCredentials',
        [
          {
            resource: 'password',
            message: 'Invalid password',
          },
        ],
        401,
      )
    }

    try {
      const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET!)

      const result = {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: payload.email,
        token: token,
      }

      return result
    } catch (error) {
      throw new CustomError(
        'AuthenticationError',
        [
          {
            resource: 'token',
            message: 'error generating the token',
          },
        ],
        500,
      )
    }
  }
}
