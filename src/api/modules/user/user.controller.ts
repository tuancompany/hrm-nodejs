import { Request } from "express";
import { UserService } from "./user.service";
import { IGetUserResponse } from "../../../../shared/interfaces/get-user.response";
import { GetPermissionResponse } from "../../../../shared/interfaces/get-permission.response";

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
        name,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(req: Request): Promise<IGetUserResponse | {}> {
    try {
      const { userId } = req.params;
      const user = await this.userService.deleteUser({ userId });
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async getUserPermissions(
    req: Request
  ): Promise<GetPermissionResponse[]> {
    try {
      const { userId } = req.params;
      const userPermissions = await this.userService.getUserPermissions({
        userId,
      });
      return userPermissions;
    } catch (error) {
      throw error;
    }
  }
}
