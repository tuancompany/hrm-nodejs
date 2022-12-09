import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";
// import { OvertimeType } from "./overtime-type.model";

export interface OvertimeAttributes {
  id: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  employeeId: string;
  overtimeTypeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OvertimeCreationAttributes
  extends Optional<OvertimeAttributes, "id"> {}

export const OvertimeDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "year",
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "month",
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "day",
  },
  hour: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    field: "hour",
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "employee_id",
  },
  overtimeTypeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "overtime_type_id",
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

export class Overtime
  extends Model<OvertimeAttributes, OvertimeCreationAttributes>
  implements OvertimeAttributes
{
  public id: string;
  public year: number;
  public month: number;
  public day: number;
  public hour: number;
  public employeeId: string;
  public overtimeTypeId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Overtime.prototype.associate = function () {
  Employee.hasMany(Overtime, { as: "overtime", foreignKey: "employeeId" });
  Overtime.belongsTo(Employee, { as: "employee" });
};
