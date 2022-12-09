import { BaseDto } from "./base.dto";
export class AllowanceDto extends BaseDto {
  id: string;
  name: string;
  amount: number;
  content: string;
}
