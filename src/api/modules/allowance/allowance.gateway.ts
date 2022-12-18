// Connect with Database

import { Allowance } from "../../../db/models/allowance.model";
import { API_ERROR } from "../../../../shared/constants";

export class AllowanceGateway {
  constructor() {}

  async getAllowances(): Promise<any> {
    try {
      const allowances = await Allowance.findAll({
        attributes: [
            'id',
            'name',
            'amount'
        ],
        raw: true
      });

      return allowances;
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }
}

