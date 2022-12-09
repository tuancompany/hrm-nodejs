import { HTTP_STATUS } from "../constants";
import { ApiError } from "./api-error.dto";

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}
