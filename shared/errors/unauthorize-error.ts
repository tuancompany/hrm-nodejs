import { HTTP_STATUS } from "../constants";
import { ApiError } from "./api-error.dto";

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(HTTP_STATUS.UNAUTHORIZED, message);
  }
}
