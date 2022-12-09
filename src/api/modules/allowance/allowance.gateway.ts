// Connect with Database

import { Allowance } from "../../../db/models/allowance.model";

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
    } catch (e) {
      console.log("error", e);
    }
  }
}

