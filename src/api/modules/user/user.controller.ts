import { Request } from "express";
import { ICreateUserResponse } from "./../../../../shared/interfaces/create-user.response";
import { UserService } from "./user.service";

export class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async getAllUsers(req: Request): Promise<ICreateUserResponse> {
    try {
      const { limit, order, permission, role, name } = req.query;

      const user = await this.userService.getAllUsers({
        limit,
        order,
        permission,
        role,
        name
      });
      return user;
    } catch (e) {
      throw e;
    }
  }
}
