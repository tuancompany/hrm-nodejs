// Connect with Database
import { Part } from "../../../db/models/part.model";
import { PartDto } from "../../../../shared/dtos/part.dto"

export class PartGateway {
  constructor() {}

  async getPartById(id: string): Promise<PartDto | {}> {
    const part = Part.findByPk(id);

    if(!part) {
        return {};
    }
    return part;
  }
}

