import { User } from "./../../../db/models/user.model";
import { UserPermission } from "./../../../db/models/user-permission.model";

import { v4 as uuidv4 } from "uuid";
import { UserDto } from "shared/dtos/user.dto";
import { UserEntity } from "./../../../../shared/entity/user.entity";
import {
  CreateUserResponse,
  ICreateUserResponse,
} from "./../../../../shared/interfaces/create-user.response";
import { IGetUserResponse } from "./../../../../shared/interfaces/get-user.response";
import { PermissionDto } from "./../../../../shared/dtos/permission.dto";
import { UserPermissionEntity } from "./../../../../shared/entity/user-permission.entity";

export class UserGateway {
  constructor() {}

  public async getUserByEmail(email: string): Promise<IGetUserResponse> {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return;
      }
      const response = user.get({ plain: true });

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async createUser({
    user,
    permissions,
  }: {
    user: UserDto;
    permissions: PermissionDto[];
  }): Promise<ICreateUserResponse> {
    try {
      user.id = uuidv4();
      const userEntity = new UserEntity(user);
      const userCreated = await User.create(userEntity);

      const userPermissionEntity = permissions.map(
        (permission) =>
          new UserPermissionEntity({
            id: uuidv4(),
            userId: userCreated.id,
            permissionId: permission.id,
            licensed: 0,
          })
      );

      await UserPermission.bulkCreate(userPermissionEntity);
      const response: ICreateUserResponse = new CreateUserResponse(
        userCreated.get({ plain: true })
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}