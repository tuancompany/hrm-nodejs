import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";

export interface EmployeeAllowanceAttributes {
  id: string;
  date: Date;
  content: string;
  amount: number;
  employeeId: string;
  allowanceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeAllowanceCreationAttributes
  extends Optional<EmployeeAllowanceAttributes, "id"> {}

export const EmployeeAllowanceDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "date",
  },
  content: {
    type: DataTypes.CHAR,
    allowNull: false,
    field: "content",
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    field: "amount",
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "employee_id",
  },
  allowanceId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "allowance_id",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "updated_at",
  },
};

export class EmployeeAllowance
  extends Model<
    EmployeeAllowanceAttributes,
    EmployeeAllowanceCreationAttributes
  >
  implements EmployeeAllowanceAttributes
{
  public id: string;
  public date: Date;
  public content: string;
  public amount: number;
  public employeeId: string;
  public allowanceId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
}
