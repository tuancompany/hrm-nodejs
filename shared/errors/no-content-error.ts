import { HTTP_STATUS } from "../constants";
import { ApiError } from "./api-error.dto";

export class NoContentError extends ApiError {
  constructor(message: string) {
    super(HTTP_STATUS.NO_CONTENT, message);
  }
}
