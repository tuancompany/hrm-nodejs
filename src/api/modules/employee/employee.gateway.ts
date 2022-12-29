// Connect with Database
import { sequelize } from "../../../db";
import {
  Employee,
  EmployeeAttributes,
} from "./../../../db/models/employee.model";
import { EmployeeAllowance } from "../../../db/models/employee-allowance.model";
import { Contract } from "../../../db/models/contract.model";
import { Department } from "./../../../db/models/department.model";
import { Part } from "./../../../db/models/part.model";
import { Position } from "./../../../db/models/position.model";
import { Degree } from "./../../../db/models/degree.model";
import { Allowance } from "./../../../db/models/allowance.model";
import { Manager } from "./../../../db/models/manager.model";

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
import { API_ERROR, QUERY_ATTRIBUTES } from "./../../../../shared/constants";
import { isEmpty } from "lodash";
import { ModelType, WhereOptions } from "sequelize";
import { IUpdateEmployee } from "./../../../../shared/interfaces/update-employee.response";

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
  /** @param order: order will sourt order of response record */
  /** @param allowance: If allowance is true, response employee attach with allowance   */
  /** @param contract: If contract is true, response employee attach with contract  */
  public async getEmployee({
    limit,
    order,
    allowance,
    contract,
  }: {
    limit?: number;
    order?: string;
    allowance?: string;
    contract?: string;
  }): Promise<GetEmployeeResponse[]> {
    try {
      let queryConstraint: {
        attributes?: string[];
        include?: {
          model: ModelType;
          attributes: string[];
          required?: boolean;
          as?: string;
          through?: {
            attributes: undefined[];
          };
        }[];
        limit?: number;
        order?: [string];
        where?: WhereOptions<EmployeeAttributes>;
      } = {};

      queryConstraint.attributes = QUERY_ATTRIBUTES.GET_EMPLOYEE;
      queryConstraint.include = [
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
        {
          model: Manager,
          attributes: QUERY_ATTRIBUTES.GET_MANAGER,
          required: true,
          as: "manager",
        },
      ];

      if (limit) {
        queryConstraint.limit = limit;
      }

      if (order) {
        queryConstraint.order = [order];
      }

      if (allowance === "true") {
        queryConstraint.include = [
          ...queryConstraint.include,
          ...[
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
          ],
        ];
      }

      if (contract === "true") {
        queryConstraint.include = [
          ...queryConstraint.include,
          ...[
            {
              model: Contract,
              attributes: QUERY_ATTRIBUTES.GET_CONTRACT,
              required: true,
              as: "contract",
            },
          ],
        ];
      }
      const employees = await Employee.findAll(queryConstraint);

      const response: GetEmployeeResponse[] = employees.map((employee) => {
        const plainObject: IGetEmployeeResponse = employee.get({ plain: true });

        return new GetEmployeeResponse(plainObject);
      });

      return response;
    } catch (e) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${e}`);
    }
  }

  /** @function transaction use to create a transaction to handle case if any error occurs  when delete employee, then rollback*/
  public async deleteEmployee({
    employeeId,
  }: {
    employeeId: string;
  }): Promise<void> {
    const t = await sequelize.transaction();
    try {
      await EmployeeAllowance.destroy({
        where: {
          employeeId,
        },
        transaction: t,
      });

      await Contract.destroy({
        where: {
          employeeId,
        },
        transaction: t,
      });

      await Employee.destroy({
        where: {
          id: employeeId,
        },
        transaction: t,
      });

      await t.commit();
    } catch (error) {
      t.rollback();
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

  public async updateEmployee({
    employeeId,
    data,
  }: {
    employeeId: string;
    data: IUpdateEmployee;
  }): Promise<void> {

    try {
      await Employee.update({
        name: data.name,
        gender: data.gender,
        dob: data.dob,
        phoneNumber: data.phoneNumber,
        citizenIdentification: data.citizenIdentification,
        address: data.address,
        basicSalary: data.basicSalary,
        imageUrl: data.imageUrl,
        departmentId: data.departmentId,
        partId: data.partId,
        positionId: data.positionId,
        degreeId: data.degreeId,
      }, {
        where: {
          id: employeeId
        }
      });

      data.allowance.map(async item => {
        await EmployeeAllowance.update({
          allowanceId: item
        }, {
          where: {
            employeeId,
          }
        })
      });

    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }
}
