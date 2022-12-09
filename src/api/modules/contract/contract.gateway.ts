// Connect with Database
import { ContractDto } from "./../../../../shared/dtos/contract.dto";

import { Contract } from "../../../db/models/contract.model";
import { Op } from "sequelize/types";

export class ContractGateway {
  constructor() {}

  async getContractById(id: string): Promise<ContractDto | {}> {
    const contract = Contract.findByPk(id);

    if(!contract) {
        return {};
    }
    return contract;
  }

  async getContractByEmployeeId(employeeIds: string[]): Promise<ContractDto[] | []> {
    const contract = Contract.findAll({
        where: {
            employeeId: {
                [Op.in] : employeeIds
            }
        }
    });

    if(!contract) {
        return [];
    }
    return contract;
  }
}

