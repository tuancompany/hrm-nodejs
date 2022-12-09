export class ApiError extends Error {
  code: string;
  message: string;
  constructor(code: number, message: string) {
    super();
    this.code = code.toString();
    this.message = message;
  }
}
