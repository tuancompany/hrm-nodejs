import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";
// import { TimeKeepingType } from "./timekeeping-type.model";

export interface TimeKeepingAttributes {
  id: string;
  year: number;
  month: number;
  day: number;
  entryHour: number;
  entryMin: number;
  exitHour: number;
  exitMin: number;
  employeeId: string;
  timeKeepingTypeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeKeepingCreationAttributes
  extends Optional<TimeKeepingAttributes, "id"> {}

export const TimeKeepingDefinition = {
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
  entryHour: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "entry_hour",
  },
  entryMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "entry_min",
  },
  exitHour: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "exit_hour",
  },
  exitMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "exit_min",
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "employee_id",
  },
  timeKeepingTypeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "time_keeping_type_id",
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

export class TimeKeeping
  extends Model<TimeKeepingAttributes, TimeKeepingCreationAttributes>
  implements TimeKeepingAttributes
{
  public id: string;
  public year: number;
  public month: number;
  public day: number;
  public entryHour: number;
  public entryMin: number;
  public exitHour: number;
  public exitMin: number;
  public employeeId: string;
  public timeKeepingTypeId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

TimeKeeping.prototype.associate = function () {
  Employee.hasMany(TimeKeeping, {
    as: "timekeeping",
    foreignKey: "employeeId",
  });
  TimeKeeping.belongsTo(Employee, { as: "employee" });
};
