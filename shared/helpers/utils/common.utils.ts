import { Request } from "express";

export interface Utils {
  generateLog(req: Request): string;
}

export class UtilsImpl implements Utils {
  constructor() {}

  public generateLog(req: Request): string {
    return `Request from IP: ${req.ip}\nMethod: ${req.method} api: ${
      req.url
    }\nContext: ${JSON.stringify(req.body)}\nTimestamp: ${new Date()}`;
  }
}
