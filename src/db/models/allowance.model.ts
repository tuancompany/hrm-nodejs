import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { EmployeeAllowance } from "./employee-allowance.model";
import { Employee } from "./employee.model";

export interface AllowanceAttributes {
  id: string;
  name: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AllowanceCreationAttributes
  extends Optional<AllowanceAttributes, "id"> {}

export const AllowanceDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  name: {
    allowNull: false,
    type: DataTypes.CHAR,
    field: "name",
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    field: "amount",
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

export class Allowance
  extends Model<AllowanceAttributes, AllowanceCreationAttributes>
  implements AllowanceAttributes
{
  public id: string;
  public name: string;
  public amount: number;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Allowance.prototype.associate = function () {
  Employee.belongsToMany(Allowance, {
    through: EmployeeAllowance,
    foreignKey: "employeeId",
    as: "allowance"
  });
  Allowance.belongsToMany(Employee, {
    through: EmployeeAllowance,
    foreignKey: "allowanceId",
  });
};
