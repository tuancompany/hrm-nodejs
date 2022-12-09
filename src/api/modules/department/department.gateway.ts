// Connect with Database
import { DepartmentDto } from "./../../../../shared/dtos/department.dto";

import { Department } from "../../../db/models/department.model";

export class DepartmentGateway {
  constructor() {}

  async getDepartmentById(id: string): Promise<DepartmentDto | {}> {
    const department = Department.findByPk(id);

    if(!department) {
        return {};
    }
    return department;
  }
}

