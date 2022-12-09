import { Request } from "express";
import { JwtAuthentication } from "./../../../../shared/helpers/utils/jwt.utils";

export class UserController {
  private readonly jwtAuthentication: JwtAuthentication;
  constructor() {

  }

  public async login(req: Request): Promise<any> {
    const token = this.jwtAuthentication.generateToken();
    return token;
  }

}
