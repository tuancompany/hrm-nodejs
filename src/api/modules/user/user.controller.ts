import { Request } from "express";
import { ICreateUserResponse } from "./../../../../shared/interfaces/create-user.response";
import { UserService } from './user.service';

export class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request): Promise<ICreateUserResponse> {
    const user = this.userService.createUser(req.body);
    return user;
  }

}
