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
import { ModelType, Op, WhereOptions } from "sequelize";
import { Permission } from "./../../../db/models/permission.model";
import { API_ERROR } from "./../../../../shared/constants";
import { GetPermissionResponse } from "./../../../../shared/interfaces/get-permission.response";

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
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }

  /** @param user: User data from request body*/
  /** @param permissions: Permissions data from request body */

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
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }

  /** @param limit: limit number of response record */
  /** @param order: order will sort order of response record */
  /** @param permission: If permission is true, permission of user will map to repsonse */
  /** @param role: Filter user response by Role  */
  /** @param name :  Filter user response by Name*/

  public async getAllUsers({
    limit,
    order,
    permission,
    role,
    name,
  }: {
    limit?: number;
    order?: string;
    permission?: string;
    role?: string;
    name?: string;
  }): Promise<IGetUserResponse[]> {
    try {
      let queryConstraint: {
        attributes?: string[];
        include?: {
          model: ModelType;
          attributes: string[];
          required?: boolean;
          as: string;
          through: {
            attributes: [];
          };
        }[];
        limit?: number;
        order?: [string];
        where?: WhereOptions<UserAttributes>;
      } = {};

      queryConstraint.attributes = ["id", "name", "email", "role", "extraInfo"];
      queryConstraint.where = {
        ...queryConstraint.where,
        ...{ isDeleted: false },
      };

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

      if (permission === "true") {
        queryConstraint.include = [
          {
            model: Permission,
            attributes: ["id", "name"],
            required: true,
            as: "permission",
            through: {
              attributes: [],
            },
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
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }

  public async getUserById({
    userId,
  }: {
    userId: string;
  }): Promise<GetUserResponse> {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return;
      }

      const plainUser = user.get({ plain: true });

      return plainUser;
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }

  public async deleteUser({ userId }: { userId: string }): Promise<void> {
    try {
      // Soft delete user.

      await User.update(
        {
          isDeleted: true,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }

  public async getUserPermissions({
    userId,
  }: {
    userId: string;
  }): Promise<GetPermissionResponse[]> {
    try {
      const userPermissions: UserPermission[] = await UserPermission.findAll({
        where: {
          userId,
        },
      });

      const permissionIds = userPermissions.map((userPermission) => {
        const plainUserPermission = userPermission.get({ plain: true });
        return plainUserPermission.permissionId;
      });

      const permissions: Permission[] = await Permission.findAll({
        where: {
          id: {
            [Op.in]: permissionIds,
          },
        },
      });

      const response = permissions.map((permission) => {
        const plainPermission = permission.get({ plain: true });
        return plainPermission;
      });

      return response;
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }
}
