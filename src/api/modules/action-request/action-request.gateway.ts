import { ActionRequest } from "../../../db/models/action-request.model";
import { API_ERROR } from "./../../../../shared/constants";
import { ActionRequestDto } from "shared/dtos/action-request.dto";
import { ActionRequestEntity } from "./../../../../shared/entity/action-request.entity";
import {
  ActionRequestResponse,
  IActionRequestResponse,
} from "./../../../../shared/interfaces/request-action.response";
/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @interface Entity to format and make sure that data is the entity passing to DB.
 */
export class ActionRequestGateway {
  constructor() {}

  public async createActionRequest({
    actionRequest,
  }: {
    actionRequest: ActionRequestDto;
  }): Promise<ActionRequestResponse> {
    try {
      const actionRequestEntity = new ActionRequestEntity(actionRequest);

      const actionRequestCreate = await ActionRequest.create(
        actionRequestEntity
      );

      const response = actionRequestCreate.get({ plain: true });

      return response;
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }

  public async getActionRequestById(
    id: string
  ): Promise<IActionRequestResponse<string>> {
    try {
      const actionRequest = await ActionRequest.findByPk(id);

      if (!actionRequest) {
        return;
      }

      const plainObject = actionRequest.get({ plain: true });

      const response: IActionRequestResponse<string> = {
        expirationDate: plainObject.expirationDate,
        type: plainObject.type,
        approved: plainObject.approved,
        information: plainObject.information,
        employeeId: plainObject.employeeId,
        managerId: plainObject.managerId,
      };

      return response;
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }

  // Viết 1 hàm update chung luôn
  public async updateActionRequest({
    id,
    data,
  }: {
    id: string;
    data: {
      type?: string;
      approved?: boolean;
      expirationDate?: Date;
    };
  }): Promise<void> {
    try {
      let updateOptions: {
        type?: string;
        approved?: boolean;
        expirationDate?: Date;
      } = {};

      if (data.type) {
        updateOptions.type = data.type;
      }

      if (data.approved) {
        updateOptions.approved = data.approved;
      }

      if (data.expirationDate) {
        updateOptions.expirationDate = data.expirationDate;
      }

      await ActionRequest.update(data, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }
}
