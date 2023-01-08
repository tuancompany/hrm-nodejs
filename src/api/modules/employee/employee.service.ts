import moment from "moment";
import { isEmpty } from "lodash";
import { v4 as uuidv4 } from "uuid";

import { EmployeeGateway } from "./employee.gateway";
import { CreateEmployeeResponse } from "./../../../../shared/interfaces/create-employee.response";
import { GetEmployeeResponse } from "./../../../../shared/interfaces/get-employee.response";
import {
  IUpdateEmployee,
  UpdateEmployeeRepsonse,
} from "./../../../../shared/interfaces/update-employee.response";
import {
  ActionRequestResponse,
  IActionRequestResponse,
} from "./../../../../shared/interfaces/request-action.response";
import { API_ERROR, SORT } from "./../../../../shared/constants";

import { DepartmentGateway } from "../department/department.gateway";
import { PartGateway } from "../part/part.gateway";
import { PositionGateway } from "../position/position.gateway";
import { DegreeGateway } from "../degree/degree.gateway";
import { ActionRequestGateway } from "../action-request/action-request.gateway";
import { AllowanceGateway } from "../allowance/allowance.gateway";

import { EmployeeDto } from "shared/dtos/employee.dto";
import { DepartmentDto } from "./../../../../shared/dtos/department.dto";
import { PartDto } from "./../../../../shared/dtos/part.dto";
import { PositionDto } from "./../../../../shared/dtos/position.dto";
import { DegreeDto } from "../../../../shared/dtos/degree.dto";
import { AllowanceDto } from "shared/dtos/allowance.dto";
import { ManagerGateway } from "../manager/manager.gateway";

export class EmployeeService {
  private employeeGateway: EmployeeGateway;
  private allowanceGateway: AllowanceGateway;
  private departmentGateway: DepartmentGateway;
  private partGateway: PartGateway;
  private positionGateway: PositionGateway;
  private degreeGateway: DegreeGateway;
  private actionRequestGateway: ActionRequestGateway;
  private managerGateway: ManagerGateway;

  constructor() {
    this.employeeGateway = new EmployeeGateway();
    this.allowanceGateway = new AllowanceGateway();
    this.departmentGateway = new DepartmentGateway();
    this.partGateway = new PartGateway();
    this.positionGateway = new PositionGateway();
    this.degreeGateway = new DegreeGateway();
    this.actionRequestGateway = new ActionRequestGateway();
    this.managerGateway = new ManagerGateway();
  }

  public async createEmployee(
    input: EmployeeDto
  ): Promise<CreateEmployeeResponse> {
    try {
      // Check if allowance is not exists -> response error.
      const allowances: AllowanceDto[] | [] =
        await this.allowanceGateway.getAllowances();

      if (isEmpty(allowances)) {
        throw API_ERROR.NOT_FOUND("Not found allowance in DB");
      }

      const allowanceFormat: { id: string; name: string; amount: number }[] =
        allowances.map(
          (allowance: { id: string; name: string; amount: number }) => ({
            id: allowance.id,
            name: allowance.name.trim(),
            amount: allowance.amount,
          })
        );
      let invalidAllowance = [];

      input.allowance.forEach((allowance) => {
        if (
          !allowanceFormat.some(
            (item) =>
              item.id === allowance.id &&
              item.name === allowance.name &&
              item.amount === allowance.amount
          )
        ) {
          invalidAllowance.push(allowance);
        }
      });

      if (!isEmpty(invalidAllowance)) {
        throw API_ERROR.BAD_REQUEST(
          `Invalid allowances: ${JSON.stringify(invalidAllowance, null, 2)}`
        );
      }

      const startDateContract = moment(input.contract.startDate);
      const endDateContract = moment(input.contract.endDate);
      const singedDateContract = moment(input.contract.signedDate);

      // Verify valid contract.
      if (startDateContract.isAfter(endDateContract)) {
        throw API_ERROR.BAD_REQUEST(
          `Invalid contract: Start date must be before end date`
        );
      }
      if (singedDateContract.isAfter(endDateContract)) {
        throw API_ERROR.BAD_REQUEST(
          `Invalid contract: Signed date must be before end date`
        );
      }

      // Check manager exists.

      // Check department exists
      const department: DepartmentDto | {} =
        await this.departmentGateway.getDepartmentById(input.departmentId);
      if (isEmpty(department)) {
        throw API_ERROR.NOT_FOUND(
          `Department with id ${input.departmentId} is not exists !`
        );
      }
      // Check part exists

      const part: PartDto | {} = await this.partGateway.getPartById(
        input.partId
      );
      if (isEmpty(part)) {
        throw API_ERROR.NOT_FOUND(
          `Part with id ${input.partId} is not exists !`
        );
      }

      // check position exists

      const position: PositionDto | {} =
        await this.positionGateway.getPositionById(input.positionId);
      if (isEmpty(position)) {
        throw API_ERROR.NOT_FOUND(
          `Position with id ${input.positionId} is not exists !`
        );
      }

      // Check if degree already existed in DB -> map with this degree -> else create new degree record in degree table.
      const degree: DegreeDto | {} = await this.degreeGateway.getDegreeById(
        input.degreeId
      );
      if (isEmpty(degree)) {
        throw API_ERROR.NOT_FOUND(
          `Degree with id ${input.degreeId} is not exists !`
        );
      }

      // Verify valid phone number.

      // Verify valid identification.
      // https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/#Generate_RSA_Key_Pair

      const response = await this.employeeGateway.createEmployee({
        employee: input,
        contract: input.contract,
      });
      return response;
    } catch (error: any) {
      if (error.code === 500) {
        throw API_ERROR.INTERNAL_SERVER(`Something went wrongs... : ${error}`);
      }
      throw error;
    }
  }

  public async getEmployee({
    limit,
    order,
    allowance,
    contract,
  }): Promise<GetEmployeeResponse[]> {
    try {
      if (limit && parseInt(limit) < 0) {
        throw API_ERROR.BAD_REQUEST("Query params limit must be >= 0");
      }

      if (order && ![SORT.ASC, SORT.DESC].includes(order.split(",")[1])) {
        throw API_ERROR.BAD_REQUEST("Query params sort is not valid");
      }

      if (allowance && !["true", "false"].includes(allowance)) {
        throw API_ERROR.BAD_REQUEST(
          "Query params allowance must be boolean value"
        );
      }

      if (contract && !["true", "false"].includes(contract)) {
        throw API_ERROR.BAD_REQUEST(
          "Query params contract must be boolean value"
        );
      }

      let options: {
        limit?: number;
        order?: string;
        allowance?: string;
        contract?: string;
      } = {};

      if (limit) {
        options.limit = limit;
      }

      if (order) {
        options.order = order.split(",");
      }

      if (allowance) {
        options.allowance = allowance;
      }

      if (contract) {
        options.contract = contract;
      }

      const employees = await this.employeeGateway.getEmployee(options);

      return employees;
    } catch (error: any) {
      if (error.code === 500) {
        throw API_ERROR.INTERNAL_SERVER(`Something went wrongs... : ${error}`);
      }
      throw error;
    }
  }

  public async deleteEmployee({
    employeeId,
  }): Promise<GetEmployeeResponse | {}> {
    try {
      const existedEmployee = await this.employeeGateway.getEmployeeById({
        employeeId,
      });

      if (isEmpty(existedEmployee)) {
        throw API_ERROR.NOT_FOUND(
          `Employee with id ${employeeId} is not exists !`
        );
      }

      await this.employeeGateway.deleteEmployee({ employeeId });

      return existedEmployee;
    } catch (error: any) {
      if (error.code === 500) {
        throw API_ERROR.INTERNAL_SERVER(`Something went wrongs... : ${error}`);
      }
      throw error;
    }
  }

  public async updateEmployee({
    employeeId,
    data,
  }: {
    employeeId: string;
    data: IUpdateEmployee;
  }): Promise<any> {
    try {
      const existedEmployee = await this.employeeGateway.getEmployeeById({
        employeeId,
      });

      if (isEmpty(existedEmployee)) {
        throw API_ERROR.NOT_FOUND(
          `Employee with id ${employeeId} is not exists`
        );
      }

      await this.employeeGateway.updateEmployee({
        employeeId,
        data,
      });

      const response = new UpdateEmployeeRepsonse(data);

      return response;
    } catch (error: any) {
      if (error.code === 500) {
        throw API_ERROR.INTERNAL_SERVER(`Something went wrongs... : ${error}`);
      }
      throw error;
    }
  }

  public async requestAction({
    employeeId,
    data,
  }: {
    employeeId: string;
    data: {
      managerId: string;
      expirationDate: Date;
      type: string;
    };
  }): Promise<IActionRequestResponse> {
    try {
      // Check manager exists.
      const manager = await this.managerGateway.getManagerById({
        managerId: data.managerId,
      });

      if (isEmpty(manager)) {
        throw API_ERROR.NOT_FOUND(
          `The manager with id ${data.managerId} is not exists`
        );
      }

      const employee = await this.employeeGateway.getEmployeeById({
        employeeId,
      });

      if (isEmpty(employee)) {
        throw API_ERROR.NOT_FOUND(
          `Employee with id ${employeeId} is not exists`
        );
      }

      // Check manager is manager of requested employee.
      if (manager && data.managerId !== employee.manager.id) {
        throw API_ERROR.CONFLICT(
          `The manager with id ${data.managerId} is not belongs to employee with id ${employee.id}`
        );
      }

      const expirationDate = moment(data.expirationDate);
      const toDay = moment().startOf("day");

      if (expirationDate.isBefore(toDay)) {
        throw API_ERROR.BAD_REQUEST(
          `Expiration date must be before current date`
        );
      }

      const requestAction = await this.actionRequestGateway.createActionRequest(
        {
          actionRequest: {
            id: uuidv4(),
            employeeId,
            managerId: data.managerId,
            expirationDate: data.expirationDate,
            type: data.type,
            approved: false,
          },
        }
      );

      const response: ActionRequestResponse = new ActionRequestResponse(
        requestAction
      );
      return response;
    } catch (error: any) {
      if (error.code === 500) {
        throw API_ERROR.INTERNAL_SERVER(`Something went wrongs... : ${error}`);
      }

      throw error;
    }
  }
}
