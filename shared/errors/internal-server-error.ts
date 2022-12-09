import { HTTP_STATUS } from "../constants";
import { ApiError } from "./api-error.dto";

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }
}
