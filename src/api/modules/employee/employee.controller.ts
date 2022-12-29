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
    try {
      const requestBody: EmployeeDto = req.body;

      // Check role permission of request here
      const response = await this.employeeService.createEmployee(requestBody);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getEmployee(req: Request): Promise<GetEmployeeResponse[]> {
    try {
      const { limit, order, allowance, contract } = req.query;
      const response = await this.employeeService.getEmployee({
        limit,
        order,
        allowance,
        contract,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteEmployee(req: Request): Promise<GetEmployeeResponse | {}> {
    try {
      const { employeeId } = req.params;
      const response = await this.employeeService.deleteEmployee({
        employeeId,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async updateEmployee(req: Request): Promise<any> {
    try {
      const {
        name,
        gender,
        dob,
        phoneNumber,
        citizenIdentification,
        address,
        basicSalary,
        imageUrl,
        allowance,
        departmentId,
        partId,
        positionId,
        degreeId,
      } = req.body;

      const response = await this.employeeService.updateEmployee({
        employeeId: req.params.employeeId,
        data: {
          name,
          gender,
          dob,
          phoneNumber,
          citizenIdentification,
          address,
          basicSalary,
          imageUrl,
          allowance,
          departmentId,
          partId,
          positionId,
          degreeId,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
