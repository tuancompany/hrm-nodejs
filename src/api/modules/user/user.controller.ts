import { Request } from "express";
import { UserService } from "./user.service";
import { IGetUserResponse } from "../../../../shared/interfaces/get-user.response";

export class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async getAllUsers(req: Request): Promise<IGetUserResponse[]> {
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
    } catch (error) {
      throw error;
    }
  }
}
