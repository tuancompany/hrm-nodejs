import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";

import { Employee } from "./employee.model";

export interface DayOffAttributes {
  id: string;
  requestedDate: Date;
  from: Date;
  to: Date;
  type: string;
  approved: boolean;
  reason: string;
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DayOffCreationAttributes
  extends Optional<DayOffAttributes, "id"> {}

export const DayOffDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  requestedDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "requested_date",
  },
  from: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "from",
  },
  to: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "to",
  },
  type: {
    allowNull: false,
    type: DataTypes.CHAR,
    field: "type"
  },
  approved: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "approved"
  },
  reason: {
    allowNull: false,
    type: DataTypes.CHAR,
    field: "reason"
  },
  employeeId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "employee_id"
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

export class DayOff
  extends Model<DayOffAttributes, DayOffCreationAttributes>
  implements DayOffAttributes
{
  public id: string;
  public requestedDate: Date;
  public from: Date;
  public to: Date;
  public type: string;
  public approved: boolean;
  public reason: string;
  public employeeId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

DayOff.prototype.associate = function () {
  Employee.hasMany(DayOff, {
    as: "dayOff",
    foreignKey: "employeeId"
  });
  DayOff.belongsTo(Employee, { as: "employee" });
};
