import { Request } from "express";
import { EmployeeDto } from "shared/dtos/employee.dto";
import { CreateEmployeeResponse } from "./../../../../shared/interfaces/create-employee.response";
import { GetEmployeeResponse } from "./../../../../shared/interfaces/get-employee.response";
import { EmployeeService } from "./employee.service";
export class EmployeeController {
  private employeeService: EmployeeService;
  constructor() {
    this.employeeService = new EmployeeService();
  }

  public async createEmployee(req: Request): Promise<CreateEmployeeResponse> {
    const requestBody: EmployeeDto = req.body;

    // Check role permission of request here
    const response = await this.employeeService.createEmployee(requestBody);
    return response;
  }

  public async getEmployee(req: Request): Promise<GetEmployeeResponse[]> {
    const { limit } = req.query;
    const response = await this.employeeService.getEmployee({ limit });
    return response;
  }

  public async deleteEmployee(req: Request): Promise<any> {
    const { employeeId } = req.params;
    const response = await this.employeeService.deleteEmployee({ employeeId });

    return response;
  }
}
