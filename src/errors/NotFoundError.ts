import CustomError from './CustomError';

class NotFoundError extends CustomError {
  constructor(message: string = 'Not Found') {
    super(404, 'Not Found', message);
  }
}

export default NotFoundError;
