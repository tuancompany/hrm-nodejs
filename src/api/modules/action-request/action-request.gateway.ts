import { ActionRequest } from "../../../db/models/action-request.model";
import { API_ERROR } from "./../../../../shared/constants";
import { ActionRequestDto } from "shared/dtos/action-request.dto";
import { ActionRequestEntity } from "./../../../../shared/entity/action-request.entity";
import { ActionRequestResponse } from "./../../../../shared/interfaces/request-action.response";
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
}
