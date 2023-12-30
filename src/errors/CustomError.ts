import ValidationError from './ValidationError'

export default class CustomError extends Error {
  type: string
  errors?: ValidationError[]
  statusCode: number

  constructor(
    type: string,
    errors?: ValidationError[],
    statusCode: number = 500,
  ) {
    super(type)
    this.type = type
    this.errors = errors
    this.statusCode = statusCode
  }
}
