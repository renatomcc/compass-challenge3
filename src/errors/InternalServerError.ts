import CustomError from './CustomError';

class InternalServerError extends CustomError {
  constructor(message: string = 'Internal Server Error') {
    super(500, 'Internal Server Error', message);
  }
}

export default InternalServerError;
