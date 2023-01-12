import { Overtime } from "./../../../db/models/overtime.model";
import { OvertimeDto } from "../../../../shared/dtos/overtime.dto";
import { OvertimeEntity } from "../../../../shared/entity/overtime.entity";
import { ICreateOvertimeResponse } from "../../../../shared/interfaces/create-overtime.response";
import { API_ERROR } from "./../../../../shared/constants";

export class OvertimeGateway {
  constructor() {}

  public async createOvertime({
    overtime,
  }: {
    overtime: OvertimeDto;
  }): Promise<ICreateOvertimeResponse> {
    try {
      const overtimeEntity = new OvertimeEntity(overtime);
      const overtimeCreated = await Overtime.create(overtimeEntity);

      const response = overtimeCreated.get({ plain: true });
      return response;
    } catch (error) {
      throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }
}
