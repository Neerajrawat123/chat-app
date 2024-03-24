class ApiError extends Error {
  constructor(statusCode = 500, message, stack = []) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.stack = stack;
    Error.captureStackTrace(this);
  }
}

export { ApiError };
