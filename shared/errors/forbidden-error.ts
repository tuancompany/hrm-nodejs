import { HTTP_STATUS } from "../constants";
import { ApiError } from "./api-error.dto";

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(HTTP_STATUS.FORBIDDEN, message);
  }
}
