import moment from "moment";
import { isEmpty } from "lodash";
import { v4 as uuidv4 } from "uuid";

// import { ManagerGateway } from "./manager.gateway";
import { ACTION_REQUEST_TYPE, API_ERROR } from "./../../../../shared/constants";
import { ActionRequestGateway } from "../action-request/action-request.gateway";
import { IActionRequestResponse } from "./../../../../shared/interfaces/request-action.response";
import { OvertimeGateway } from "./../overtime/overtime.gateway";
import { DayoffGateway } from "./../dayoff/dayoff.gateway";

export class ManagerService {
  // private managerGateway: ManagerGateway;
  private actionRequestGateway: ActionRequestGateway;
  private overtimeGateway: OvertimeGateway;
  private dayoffGateway: DayoffGateway

  constructor() {
    // this.managerGateway = new ManagerGateway();
    this.actionRequestGateway = new ActionRequestGateway();
    this.overtimeGateway = new OvertimeGateway();
    this.dayoffGateway = new DayoffGateway();
  }

  public async approveActionRequest({
    requestActionId,
    employeeId,
    managerId,
  }: {
    requestActionId: string;
    employeeId: string;
    managerId: string;
  }): Promise<IActionRequestResponse<string>> {
    try {
      const actionRequest: IActionRequestResponse<string> =
        await this.actionRequestGateway.getActionRequestById(requestActionId);

      if (isEmpty(actionRequest)) {
        throw API_ERROR.NOT_FOUND(
          `Action request with id ${requestActionId} is not exists`
        );
      }
      // Check manager id of request action is equal to manager id params or not.

      if (actionRequest.managerId !== managerId) {
        throw API_ERROR.BAD_REQUEST(`Manager is not valid`);
      }

      // Check expiration date of request action.
      const toDay = moment().startOf("day");
      const expirationDate = moment(actionRequest.expirationDate);

      if (expirationDate.isBefore(toDay)) {
        throw API_ERROR.UNPROCESSABLE_ENTITY(`Action request is expired !`);
      }

      // Update approved -> true.
      await this.actionRequestGateway.updateActionRequest({
        id: requestActionId,
        data: {
          approved: true,
        },
      });

      if (actionRequest.type.trim() === ACTION_REQUEST_TYPE.OVER_TIME) {
        await this.overtimeGateway.createOvertime({
          overtime: {
            id: uuidv4(),
            employeeId,
            ...JSON.parse(actionRequest.information)
          },
        });
      }

      if (actionRequest.type.trim() === ACTION_REQUEST_TYPE.DAY_OFF) {
        // Create dayoff
        await this.dayoffGateway.createDayoff({
          dayoff: {
            id: uuidv4(),
            employeeId,
            ...JSON.parse(actionRequest.information)
          }
        })
      }

      // Cần phải nghĩ ra các loại overtime type: Ví dụ: Làm thêm đêm, cuối tuần, ngày lễ ....
      // vd: https://www.brighthr.com/articles/contracts/employee-worker-overtime/

      return actionRequest;
    } catch (error: any) {
      if (error.code === 500) {
        throw API_ERROR.INTERNAL_SERVER(`Something went wrongs... : ${error}`);
      }

      throw error;
    }
    // Check request action is exists
  }
}
