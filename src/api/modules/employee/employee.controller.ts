import { Request } from "express";
import joi, { ObjectSchema } from "joi";
import { EmployeeDto } from "shared/dtos/employee.dto";
import { CreateEmployeeResponse } from "./../../../../shared/interfaces/create-employee.response";
import { GetEmployeeResponse } from "./../../../../shared/interfaces/get-employee.response";
import {
 ActionRequestResponse
} from "./../../../../shared/interfaces/request-action.response";
import { EmployeeService } from "./employee.service";
import {
  API_ERROR,
  ACTION_REQUEST_TYPE,
  DAYOFF_TYPE,
} from "./../../../../shared/constants";

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

  public async requestAction(
    req: Request
  ): Promise<ActionRequestResponse> {
    const schemaOvertime = joi.object({
      managerId: joi.string().required().uuid(),
      expirationDate: joi.date().raw(),
      type: joi.string().required().valid(ACTION_REQUEST_TYPE.OVER_TIME),
      information: joi.object({
        year: joi.number().required(),
        month: joi.number().required(),
        day: joi.number().required(),
        hour: joi.number().required(),
        overtimeTypeId: joi.string().uuid(),
      }),
    });

    const schemaDayoff = joi.object({
      managerId: joi.string().required().uuid(),
      expirationDate: joi.date().raw(),
      type: joi.string().required().valid(ACTION_REQUEST_TYPE.DAY_OFF),
      information: joi.object({
        requestedDate: joi.date().required(),
        from: joi.date().required(),
        to: joi.date().required(),
        type: joi
          .string()
          .required()
          .valid(
            DAYOFF_TYPE.LEAVE,
            DAYOFF_TYPE.MATERNITY_LEAVE,
            DAYOFF_TYPE.ONSIDE,
            DAYOFF_TYPE.WFH
          ),
        reason: joi.string().required(),
      }),
    });

    try {
      const { managerId, expirationDate, type, information } = req.body;
      const { "request-type": requestType }: any = req.headers;

      if (
        requestType &&
        ![ACTION_REQUEST_TYPE.DAY_OFF, ACTION_REQUEST_TYPE.OVER_TIME].includes(
          requestType
        )
      ) {
        throw API_ERROR.UNPROCESSABLE_ENTITY(`Header requestType is not valid`);
      }

      let schema: ObjectSchema<any>;

      if (requestType === ACTION_REQUEST_TYPE.DAY_OFF) {
        schema = schemaDayoff;
      }

      if (requestType === ACTION_REQUEST_TYPE.OVER_TIME) {
        schema = schemaOvertime;
      }

      const data = {
        managerId,
        expirationDate,
        type,
        information,
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
