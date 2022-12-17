import {
  API_ERROR,
  SORT
} from "../../../../shared/constants";
import { UserGateway } from "./user.gateway";

export class UserService {
  private userGateway: UserGateway;
  constructor() {
    this.userGateway = new UserGateway();
  }

  public async getAllUsers({ limit, order, permission, role, name }): Promise<any> {
    try {
      const orderFormat = order.split(",");
    
      if ( parseInt(limit) < 0 ) {
        throw API_ERROR.BAD_REQUEST(`Query params limit must be >= 0`);
      };
  
      if(![SORT.ASC, SORT.DESC].includes(orderFormat[1])) {
        throw API_ERROR.BAD_REQUEST(`Query params sort is not valid`);
      }
  
      let options: {
        limit?: number;
        order?: string;
        permission?: boolean;
        role?: string;
        name?: string;
      } = {};
  
      if(limit) {
        options.limit = limit;
      }
  
      if(order) {
        options.order = orderFormat;
      }
  
      if(permission) {
        options.permission = permission;
      }
  
      if(role) {
        options.role = role;
      }

      if(name) {
        options.name = name;
      }
      console.log('options', options);
  
  
      const user = await this.userGateway.getAllUsers(options);
      return user;
    } catch(error) {
      throw API_ERROR.INTERNAL_SERVER(`${error}`);
    }
   
  }

  public async getUserPermissions(): Promise<any> {

  }
}
