import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ConflictError
} from "./errors";

export enum HTTP_STATUS {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export const API_ERROR = {
  INVALID_ARGUMENT(message: string) {
    return new BadRequestError(message ? message : `Invalid argument`);
  },
  BAD_REQUEST(message: string) {
    return new BadRequestError(message ? message : `Bad request`);
  },
  INTERNAL_SERVER(message: string) {
    return new InternalServerError(message ? message : `INTERNAL SERVER ERROR`);
  },
  UNAUTHORIZED(message: string) {
    return new UnauthorizedError(message ? `Unauthorized: ${message}` : "Unauthorized")
  },
  NOT_FOUND(message: string) { 
    return new NotFoundError(message ? `Not found error: ${message}` : "Not found error");
  },
  CONFLICT(message: string) {
    return new ConflictError(message ? `Conflict resource error: ${message}` : "Conflict resource error");
  }
};

export const ALL_VALID_ACCESS_TYPES = [
  "HRM-login",
  'HRM-get-employees',
  'HRM-create-employees',
]

export const API_PREFIX = {
  ROOT_PREFIX: '/api',
  AUTH_PREFIX: '/auth',
  EMPLOYEE_PREFIX: "/employee",
  USER_PREFIX: "/user"
};
// "Full", "Admin", "Read only", "Edit", "Create"
export const USER_PERMISSION = {
  FULL: "Full",
  ADMIN: "Admin",
  READ_ONLY: "Read only",
  EDIT: "Edit",
  CREATE: "Create"
}

export const USER_ROLE = {
  ADMIN: "Admin",
  MEMBER: "Member",
  VIEWER: "Viewer"
}

export const TOKEN_CONFIG = {
  PASS_PHRASE: "tuan12345",
  EXPIRE_TIME: "1h",
  REFRESH_EXPIRE_TIME: "12",
  REFRESH_TOKEN_KEY: "HRM_refresh"
}

export const SORT = {
  ASC: 'ASC',
  DESC: 'DESC'
}
