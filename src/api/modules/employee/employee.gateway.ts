// Connect with Database
import { Employee } from "./../../../db/models/employee.model";
import { EmployeeAllowance } from "../../../db/models/employee-allowance.model";
import { Contract } from "../../../db/models/contract.model";
import { Department } from "./../../../db/models/department.model";
import { Part } from "./../../../db/models/part.model";
import { Position } from "./../../../db/models/position.model";
import { Degree } from "./../../../db/models/degree.model";
import { Allowance } from "./../../../db/models/allowance.model";

import { CreateEmployeeResponse } from "./../../../../shared/interfaces/create-employee.response";
import {
  GetEmployeeResponse,
  IGetEmployeeResponse,
} from "./../../../../shared/interfaces/get-employee.response";
import { EmployeeEntity } from "./../../../../shared/entity/employee.entity";
import { ContractEntity } from "./../../../../shared/entity/contract.entity";
import { EmployeeAllowanceEntity } from "./../../../../shared/entity/employee-allowance.entity";
import { EmployeeDto } from "shared/dtos/employee.dto";
import { ContractDto } from "shared/dtos/contract.dto";
import { v4 as uuidv4 } from "uuid";
import { API_ERROR } from "./../../../../shared/constants";
import { isEmpty } from "lodash";

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @interface Entity to format and make sure that data is the entity passing to DB.
 */
export class EmployeeGateway {
  constructor() {}

  /** @param employee: Employee data from request body  */
  /** @param contract :  Employee contract from request body*/
  public async createEmployee({
    employee,
    contract,
  }: {
    employee: EmployeeDto;
    contract: ContractDto;
  }): Promise<CreateEmployeeResponse> {
    try {
      employee.id = uuidv4();
      const employeeEntity = new EmployeeEntity(employee);

      const employeeCreate = await Employee.create(employeeEntity);

      const employeeAllowanceEntity = employee.allowance.map(
        (item) =>
          new EmployeeAllowanceEntity({
            id: uuidv4(),
            date: new Date(),
            content: "",
            amount: item.amount,
            employeeId: employeeCreate.id,
            allowanceId: item.id,
          })
      );

      await EmployeeAllowance.bulkCreate(employeeAllowanceEntity);

      if (!isEmpty(contract)) {
        contract.id = uuidv4();
        contract.employeeId = employeeCreate.id;

        const contractEntity = new ContractEntity(contract);
        await Contract.create(contractEntity);
      }

      const response = new CreateEmployeeResponse(employee);

      return response;
    } catch (e) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${e}`);
    }
  }

  /** @param limit: limit number of response record */
  public async getEmployee({ limit }): Promise<GetEmployeeResponse[]> {
    try {
      const employees = await Employee.findAll({
        attributes: [
          "id",
          "name",
          "gender",
          "dob",
          "phoneNumber",
          "citizenIdentification",
          "address",
          "basicSalary",
          "imageUrl",
          "partId",
          "positionId",
          "degreeId",
        ],
        include: [
          {
            model: Contract,
            attributes: [
              "id",
              "startDate",
              "endDate",
              "signedDate",
              "content",
              "timesSigned",
              "deadline",
              "coefficientsSalary",
            ],
            required: true,
            as: "contract",
          },
          {
            model: Allowance,
            attributes: ["id", "name", "amount"],
            required: true,
            as: "allowance",
            /** @argument through : to remove junction table data in response */
            through: {
              attributes: [],
            },
          },
          {
            model: Department,
            attributes: ["id", "name"],
            required: true,
            as: "department",
          },
          {
            model: Part,
            attributes: ["id", "name"],
            required: true,
            as: "part",
          },
          {
            model: Position,
            attributes: ["id", "name"],
            required: true,
            as: "position",
          },
          {
            model: Degree,
            attributes: ["id", "name"],
            required: true,
            as: "degree",
          },
        ],
        limit,
      });

      const response: GetEmployeeResponse[] = employees.map((employee) => {
        const plainObject: IGetEmployeeResponse = employee.get({ plain: true });

        return new GetEmployeeResponse(plainObject);
      });

      return response;
    } catch (e) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${e}`);
    }
  }

  public async deleteEmployee({
    employeeId,
  }: {
    employeeId: string;
  }): Promise<void> {
    try {
      await EmployeeAllowance.destroy({
        where: {
          employeeId,
        },
      });

      await Contract.destroy({
        where: {
          employeeId,
        },
      });

      await Employee.destroy({
        where: {
          id: employeeId,
        },
      });
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }

  public async getEmployeeById({
    employeeId,
  }: {
    employeeId: string;
  }): Promise<GetEmployeeResponse | {}> {
    try {
      const employee = await Employee.findByPk(employeeId);

      if (!employee) {
        return {};
      }

      const response = employee.get({ plain: true });
      return response;
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }
}
