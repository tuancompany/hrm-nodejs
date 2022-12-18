import { IGetUserResponse } from "../../../../shared/interfaces/get-user.response";
import { API_ERROR, SORT, USER_ROLE } from "../../../../shared/constants";
import { UserGateway } from "./user.gateway";

export class UserService {
  private userGateway: UserGateway;
  constructor() {
    this.userGateway = new UserGateway();
  }

  public async getAllUsers({
    limit,
    order,
    permission,
    role,
    name,
  }): Promise<IGetUserResponse[]> {
    try {
      const orderFormat = order.split(",");

      if (limit && parseInt(limit) < 0) {
        throw API_ERROR.BAD_REQUEST("Query params limit must be >= 0");
      }

      if (order && ![SORT.ASC, SORT.DESC].includes(orderFormat[1])) {
        throw API_ERROR.BAD_REQUEST("Query params sort is not valid");
      }

      if (permission && !["true", "false"].includes(permission)) {
        throw API_ERROR.BAD_REQUEST(
          "Query params permission must be boolean value"
        );
      }

      if (
        role &&
        ![USER_ROLE.ADMIN, USER_ROLE.MEMBER, USER_ROLE.VIEWER].includes(role)
      ) {
        throw API_ERROR.BAD_REQUEST(
          `Query params role must be ${USER_ROLE.ADMIN}, ${USER_ROLE.MEMBER} or ${USER_ROLE.VIEWER}`
        );
      }

      let options: {
        limit?: number;
        order?: string;
        permission?: boolean;
        role?: string;
        name?: string;
      } = {};

      if (limit) {
        options.limit = limit;
      }

      if (order) {
        options.order = orderFormat;
      }

      if (permission) {
        options.permission = Boolean(permission);
      }

      if (role) {
        options.role = role;
      }

      if (name) {
        options.name = name;
      }

      const user = await this.userGateway.getAllUsers(options);
      return user;
    } catch (error: any) {
      if(error.code === 500) {
        throw API_ERROR.INTERNAL_SERVER(`Something went wrongs... : ${error}`)
      }
      throw error;
    }
  }

  public async getUserPermissions(): Promise<any> {}
}
