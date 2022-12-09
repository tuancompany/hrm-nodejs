// Connect with Database
import { DegreeDto } from "./../../../../shared/dtos/degree.dto";

import { Degree } from "../../../db/models/degree.model";

export class DegreeGateway {
  constructor() {}

  async getDegreeById(id: string): Promise<DegreeDto | {}> {
    const degree = Degree.findByPk(id);

    if(!degree) {
        return {};
    }
    return degree;
  }
}

