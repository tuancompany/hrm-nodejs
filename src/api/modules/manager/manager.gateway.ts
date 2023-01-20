import { Manager, ManagerAttributes } from "../../../db/models/manager.model";
import { API_ERROR, QUERY_ATTRIBUTES } from "./../../../../shared/constants";
import { IGetManagerResponse } from "../../../../shared/interfaces/get-manager.response";
import { ModelType, WhereOptions } from "sequelize";

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @interface Entity to format and make sure that data is the entity passing to DB.
 */
export class ManagerGateway {
  constructor() {}

  public async getManagerById({
    managerId,
  }: {
    managerId: string;
  }): Promise<IGetManagerResponse> {
    try {
      const manager = await Manager.findByPk(managerId);

      if (!manager) {
        return;
      }

      const response = manager.get({ plain: true });
      return response;
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }

  public async getManagers({
    limit,
    order,
  }: {
    limit?: number;
    order?: string;
  }): Promise<any> {
    let queryConstraint: {
      attributes?: string[];
      include?: {
        model: ModelType;
        attributes: string[];
        required?: boolean;
        as?: string;
        through?: {
          attributes: undefined[];
        };
      }[];
      limit?: number;
      order?: [string];
      where?: WhereOptions<ManagerAttributes>;
    } = {};

    queryConstraint.attributes = QUERY_ATTRIBUTES.GET_MANAGER;
    
    if(limit ) {
      queryConstraint.limit = limit;
    }

    if(order) {
      queryConstraint.order = [order];
    }

    const managers = await Manager.findAll(queryConstraint);

    const response = managers.map(item => {
      const plainObject = item.get({ plain: true });

      return plainObject
    });

    return response;
  }
}
