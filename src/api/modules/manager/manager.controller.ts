import joi from "joi";
import { Request } from "express";
import { ManagerService } from "./manager.service";
import { API_ERROR } from "./../../../../shared/constants";
import { IActionRequestResponse } from "./../../../../shared/interfaces/request-action.response";
export class ManagerController {
  private managerService: ManagerService;
  constructor() {
    this.managerService = new ManagerService();
  }

  public async approveActionRequest(req: Request): Promise<IActionRequestResponse<string>> {
    const schema = joi.object({
      requestActionId: joi.string().required().uuid(),
      employeeId: joi.string().required().uuid(),
    });
    try {
      const requestBody = req.body;

      const { error } = schema.validate(requestBody);

      if (error) {
        throw API_ERROR.BAD_REQUEST(`Invalid request body: ${error}`);
      }

      const response = await this.managerService.approveActionRequest(
        {
            requestActionId: requestBody.requestActionId,
            employeeId: requestBody.employeeId,
            managerId: req.params.managerId
        }
      );
      return response;

    } catch (error) {
      throw error;
    }
  }

  public async getManagers(req: Request): Promise<any> {
    try {
      const { limit, order } = req.query;
        const response = await this.managerService.getManagers({
          limit, 
          order
        });

        return response;
    } catch (error) {
      throw error;
    }
  }
}
