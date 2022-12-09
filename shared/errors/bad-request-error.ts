import { HTTP_STATUS } from "../constants";
import { ApiError } from "./api-error.dto";

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}
