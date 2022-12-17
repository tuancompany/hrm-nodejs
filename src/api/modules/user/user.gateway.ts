import { User, UserAttributes } from "./../../../db/models/user.model";
import { UserPermission } from "./../../../db/models/user-permission.model";

import { v4 as uuidv4 } from "uuid";
import { UserDto } from "shared/dtos/user.dto";
import { UserEntity } from "./../../../../shared/entity/user.entity";
import {
  CreateUserResponse,
  ICreateUserResponse,
} from "./../../../../shared/interfaces/create-user.response";
import {
  IGetUserResponse,
  GetUserResponse,
} from "./../../../../shared/interfaces/get-user.response";
import { PermissionDto } from "./../../../../shared/dtos/permission.dto";
import { UserPermissionEntity } from "./../../../../shared/entity/user-permission.entity";
import { ModelType, WhereOptions } from "sequelize";
import { Permission } from "./../../../db/models/permission.model";

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

  public async getAllUsers({
    limit,
    order,
    permission,
    role,
    name,
  }: {
    limit?: number;
    order?: string;
    permission?: boolean;
    role?: string;
    name?: string;
  }): Promise<IGetUserResponse[]> {
    let queryConstraint: {
      attributes?: string[];
      include?: {
        model: ModelType;
        attributes: string[];
        required: boolean;
        as: string;
      }[];
      limit?: number;
      order?: [string];
      where?: WhereOptions<UserAttributes>;
    } = {};
    queryConstraint.attributes = ["id", "name", "email", "role", "extraInfo"];

    if (limit) {
      queryConstraint.limit = limit;
    }

    if (order) {
      queryConstraint.order = [order];
    }

    if (role) {
      queryConstraint.where = {
        ...queryConstraint.where,
        ...{ role },
      };
    }

    if (name) {
      queryConstraint.where = {
        ...queryConstraint.where,
        ...{ name },
      };
    }
    if (permission) {
      queryConstraint.include = [
        {
          model: Permission,
          attributes: ["id", "name"],
          required: true,
          as: "permission",
        },
      ];
    }

    const users = await User.findAll(queryConstraint);

    const response = users.map((user) => {
      const plainUser = user.get({ plain: true });

      return new GetUserResponse({
        id: plainUser.id,
        name: plainUser.name,
        email: plainUser.email,
        role: plainUser.role,
        extraInfo: plainUser.extraInfo,
        permission: plainUser.permission,
        createdAt: plainUser.createdAt,
      });
    });

    return response;
  }
}
