import CustomError from './CustomError';

class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized') {
    super(401, 'Unauthorized', message);
  }
}

export default UnauthorizedError;
