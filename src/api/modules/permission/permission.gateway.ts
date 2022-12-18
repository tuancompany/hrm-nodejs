import { Permission } from "./../../../db/models/permission.model";
import { Op } from "sequelize";
import {
  GetPermissionResponse,
  IGetPermissionResponse,
} from "../../../../shared/interfaces/get-permission.response";
import { API_ERROR } from "../../../../shared/constants";

export class PermissionGateway {
  constructor() {}

  public async getPermissionsByName(
    permissionNames: string[]
  ): Promise<GetPermissionResponse[]> {
    try {
      const permissions = await Permission.findAll({
        where: {
          name: {
            [Op.in]: permissionNames,
          },
        },
      });
      const response: GetPermissionResponse[] = permissions.map(
        (permission) => {
          const plainObject: IGetPermissionResponse = permission.get({
            plain: true,
          });
          return new GetPermissionResponse(plainObject);
        }
      );

      return response;
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }
}
