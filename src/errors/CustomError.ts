class CustomError extends Error {
    statusCode: number;
    error: string;
  
    constructor(statusCode: number, error: string, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.error = error;
    }
  
    getErrorResponse(): { statusCode: number; error: string; message: string } {
      return {
        statusCode: this.statusCode,
        error: this.error,
        message: this.message,
      };
    }
  }
  
  export default CustomError;
  