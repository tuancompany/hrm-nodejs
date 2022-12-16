import { Request } from "express";
import { ICreateUserResponse } from "./../../../../shared/interfaces/create-user.response";
import { JwtAuthentication } from "./../../../../shared/helpers/utils/jwt.utils";
import { UserService } from './user.service';

export class UserController {
  private readonly jwtAuthentication: JwtAuthentication;
  private readonly userService: UserService;
  constructor() {
    this.jwtAuthentication = new JwtAuthentication();
    this.userService = new UserService();
  }

  public async login(req: Request): Promise<any> {
    const token = this.jwtAuthentication.generateToken({name: "Test", userId: '123'});
    return token;
  }

  public async createUser(req: Request): Promise<ICreateUserResponse> {
    const user = this.userService.createUser(req.body);
    return user;
  }

}
