class ApiResponse {
  constructor(statusCode, msg = "success", data) {
    this.statusCode = statusCode;
    this.msg = msg;
    this.data = data;
  }
}

export { ApiResponse };
