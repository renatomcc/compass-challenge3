import CustomError from './CustomError'

class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized') {
    super('UnauthorizedError', [{ resource: 'authorization', message }])
    this.statusCode = 401
  }
}

export default UnauthorizedError
