import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import StatusCodes from 'http-status-codes'
import CustomError from '../errors/CustomError'

export const authenticationMiddleware = async (
  req: Request & { decodedToken?: JwtPayload },
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new CustomError(
      'AuthenticationError',
      [{ resource: 'token', message: 'No token provided.' }],
      StatusCodes.UNAUTHORIZED,
    )
    return res.status(StatusCodes.UNAUTHORIZED).json(error)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken: JwtPayload = jwt.verify(
      token,
      process.env.SECRET!,
    ) as JwtPayload
    req.decodedToken = decodedToken
    next()
  } catch (error) {
    error = new CustomError(
      'AuthenticationError',
      [{ resource: 'token', message: 'Invalid token.' }],
      StatusCodes.UNAUTHORIZED,
    )
    return res.status(StatusCodes.UNAUTHORIZED).json(error)
  }
}

export default {
  authenticationMiddleware,
}
