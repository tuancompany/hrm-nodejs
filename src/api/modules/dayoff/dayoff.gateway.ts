import { DayOff } from "./../../../db/models/dayoff.model";
import { DayoffEntity } from "./../../../../shared/entity/dayoff.entity";
import { DayoffDto } from "./../../../../shared/dtos/dayoff.dto";
import { ICreateDayoffResponse } from "./../../../../shared/interfaces/create-dayoff.response";
import { API_ERROR } from "./../../../../shared/constants";

export class DayoffGateway {
  constructor() {}

  public async createDayoff({
    dayoff
  }: {
    dayoff: DayoffDto
  }): Promise<ICreateDayoffResponse> {
    try {
        const dayoffEntity =  new DayoffEntity(dayoff);
        const dayoffCreated = await DayOff.create(dayoffEntity);

        const response = dayoffCreated.get({ plain: true });
        return response;

    } catch (error) {
        throw API_ERROR.INTERNAL_SERVER(`Something went wrong... ${error}`);
    }
  }
}
