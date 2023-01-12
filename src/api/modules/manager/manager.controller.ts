import joi from "joi";
import { Request } from "express";
import { ManagerService } from "./manager.service";
import { API_ERROR } from "./../../../../shared/constants";
export class ManagerController {
  private managerService: ManagerService;
  constructor() {
    this.managerService = new ManagerService();
  }

  public async approveActionRequest(req: Request): Promise<any> {
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
}
