import { HTTP_STATUS } from "../constants";
import { ApiError } from "./api-error.dto";

export class UnprocessableError extends ApiError {
  constructor(message: string) {
    super(HTTP_STATUS.UNPROCESSABLE_ENTITY, message);
  }
}
