import { EmployeeDto } from "shared/dtos/employee.dto";
import { EmployeeGateway } from "./employee.gateway";
import { CreateEmployeeResponse } from "./../../../../shared/interfaces/create-employee.response";
import { GetEmployeeResponse } from "./../../../../shared/interfaces/get-employee.response";
import joi from "joi";
import { API_ERROR, SORT } from "./../../../../shared/constants";
import { AllowanceGateway } from "../allowance/allowance.gateway";
import { isEmpty } from "lodash";
import { AllowanceDto } from "shared/dtos/allowance.dto";
import moment from "moment";

import { DepartmentGateway } from "../department/department.gateway";
import { PartGateway } from "../part/part.gateway";
import { PositionGateway } from "../position/position.gateway";
import { DegreeGateway } from "../degree/degree.gateway";

import { DepartmentDto } from "./../../../../shared/dtos/department.dto";
import { PartDto } from "./../../../../shared/dtos/part.dto";
import { PositionDto } from "./../../../../shared/dtos/position.dto";
import { DegreeDto } from "../../../../shared/dtos/degree.dto";

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
export class EmployeeService {
  private employeeGateway: EmployeeGateway;
  private allowanceGateway: AllowanceGateway;
  private departmentGateway: DepartmentGateway;
  private partGateway: PartGateway;
  private positionGateway: PositionGateway;
  private degreeGateway: DegreeGateway;

  constructor() {
    this.employeeGateway = new EmployeeGateway();
    this.allowanceGateway = new AllowanceGateway();
    this.departmentGateway = new DepartmentGateway();
    this.partGateway = new PartGateway();
    this.positionGateway = new PositionGateway();
    this.degreeGateway = new DegreeGateway();
  }

  public async createEmployee(
    input: EmployeeDto
  ): Promise<CreateEmployeeResponse> {
    try {
      const { error } = schema.validate(input);

      if (error) {
        throw API_ERROR.BAD_REQUEST(`Invalid request body: ${error}`);
      }
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

  public async updateEmployee({ employeeId, data }): Promise<any> {}
}
