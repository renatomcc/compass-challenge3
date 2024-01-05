import { Response } from 'express'
import CustomError from '../errors/CustomError'

export const handleError = (err: any, res: Response): Response => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ type: err.type, errors: err.errors })
  } else {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
