import { Manager } from "../../../db/models/manager.model";
import { API_ERROR } from "./../../../../shared/constants";
import { IGetManagerResponse } from "../../../../shared/interfaces/get-manager.response";

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
}
