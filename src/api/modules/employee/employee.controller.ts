import { Request } from "express";
import joi from "joi";
import { EmployeeDto } from "shared/dtos/employee.dto";
import { CreateEmployeeResponse } from "./../../../../shared/interfaces/create-employee.response";
import { GetEmployeeResponse } from "./../../../../shared/interfaces/get-employee.response";
import { IActionRequestResponse } from "./../../../../shared/interfaces/request-action.response";
import { EmployeeService } from "./employee.service";
import { API_ERROR, ACTION_REQUEST_TYPE } from "./../../../../shared/constants";

export class EmployeeController {
  private employeeService: EmployeeService;
  constructor() {
    this.employeeService = new EmployeeService();
  }

  public async createEmployee(req: Request): Promise<CreateEmployeeResponse> {
    const schema = joi.object({
      name: joi.string().required().max(15).min(0),
      gender: joi.string().required().valid("Male", "Female"),
      dob: joi.date().raw(),
      phoneNumber: joi.string().required().min(0).max(20),
      citizenIdentification: joi.string().min(0).max(40),
      address: joi.string(),
      basicSalary: joi.number().required(),
      imageUrl: joi.string(),
      dateJoined: joi.date().raw(),
      dateLeft: joi.date().raw().allow(null),
      active: joi.boolean(),
      jobLevel: joi.number().valid(1, 2, 3, 4, 5, 6),
      managerId: joi.string().required().uuid(),
      allowance: joi
        .array()
        .items({
          id: joi.string().required().uuid(),
          name: joi.string().required().max(20).min(0),
          amount: joi.number().required(),
          content: joi.string().allow("").allow(null),
        })
        .required(),
      contract: joi
        .object({
          startDate: joi.date().required(),
          endDate: joi.date().required(),
          signedDate: joi.date().required(),
          content: joi.string().required().max(5000).min(0),
          timesSigned: joi.number().required(),
          deadline: joi.string().required(),
          coefficientSalary: joi.number().required(),
        })
        .required(),
      departmentId: joi.string().required().uuid(),
      partId: joi.string().required().uuid(),
      positionId: joi.string().required().uuid(),
      degreeId: joi.string().required().uuid(),
    });

    try {
      const requestBody: EmployeeDto = req.body;

      const { error } = schema.validate(requestBody);

      if (error) {
        throw API_ERROR.BAD_REQUEST(`Invalid request body: ${error}`);
      }

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
    const schema = joi.object({
      name: joi.string().required().max(15).min(0),
      gender: joi.string().required().valid("Male", "Female"),
      dob: joi.date().raw(),
      phoneNumber: joi.string().required().min(0).max(20),
      citizenIdentification: joi.string().min(0).max(40),
      address: joi.string(),
      basicSalary: joi.number().required(),
      imageUrl: joi.string(),
      allowance: joi.array(),
      departmentId: joi.string().required().uuid(),
      partId: joi.string().required().uuid(),
      positionId: joi.string().required().uuid(),
      degreeId: joi.string().required().uuid(),
    });

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

      const data = {
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
      };

      const { error } = schema.validate(data);

      if (error) {
        throw API_ERROR.BAD_REQUEST(`Invalid request body: ${error}`);
      }

      const response = await this.employeeService.updateEmployee({
        employeeId: req.params.employeeId,
        data,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async requestAction(req: Request): Promise<IActionRequestResponse> {
    const schema = joi.object({
      managerId: joi.string().required().uuid(),
      expirationDate: joi.date().raw(),
      type: joi
        .string()
        .required()
        .valid(
          ACTION_REQUEST_TYPE.LEAVE,
          ACTION_REQUEST_TYPE.MATERNITY_LEAVE,
          ACTION_REQUEST_TYPE.ONSIDE,
          ACTION_REQUEST_TYPE.OVER_TIME,
          ACTION_REQUEST_TYPE.WFH
        ),
    });

    try {
      const { managerId, expirationDate, type } = req.body;

      const data = {
        managerId,
        expirationDate,
        type,
      };

      const { error } = schema.validate(data);

      if (error) {
        throw API_ERROR.BAD_REQUEST(`Invalid request body: ${error}`);
      }

      const response = await this.employeeService.requestAction({
        employeeId: req.params.employeeId,
        data,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
