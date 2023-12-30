import CustomError from './CustomError'

class NotFoundError extends CustomError {
  constructor(message: string = 'Not Found') {
    super('NotFoundError', [{ resource: 'server', message }])
    this.statusCode = 404
  }
}

export default NotFoundError
