// Connect with Database
import { Position } from "../../../db/models/position.model";
import { PositionDto } from "./../../../../shared/dtos/position.dto";

export class PositionGateway {
  constructor() {}

  async getPositionById(id: string): Promise<PositionDto | {}> {
    const position = Position.findByPk(id);

    if(!position) {
        return {};
    }
    return position;
  }
}

