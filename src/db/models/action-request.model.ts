import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";

export interface ActionRequestAttributes {
  id: string;
  expirationDate: Date;
  type: string;
  approved: boolean;
  information: string;
  employeeId: string;
  managerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActionRequestCreationAttributes
  extends Optional<ActionRequestAttributes, "id"> {}

export const ActionRequestDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "expiration_date",
  },
  type: {
    type: DataTypes.CHAR,
    allowNull: false,
    field: "type",
  },
  approved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "approved",
  },
  information: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "information"
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "employee_id",
  },
  managerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "manager_id",
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

export class ActionRequest
  extends Model<ActionRequestAttributes, ActionRequestCreationAttributes>
  implements ActionRequestAttributes
{
  public id: string;
  public expirationDate: Date;
  public type: string;
  public approved: boolean;
  public information: string;
  public employeeId: string;
  public managerId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

ActionRequest.prototype.associate = function () {
  Employee.hasMany(ActionRequest, {
    as: "actionRequest",
    foreignKey: "employee_id"
  });

  ActionRequest.belongsTo(Employee, { as: "employee" });
};
