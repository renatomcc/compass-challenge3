import CustomError from './CustomError'

class InternalServerError extends CustomError {
  constructor(message: string = 'Internal Server Error') {
    super('InternalServerError', [{ resource: 'server', message }])
    this.statusCode = 500
  }
}

export default InternalServerError
