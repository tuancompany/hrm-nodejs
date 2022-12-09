import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { sequelize } from ".."; // import sequelize from index

export interface DepartmentAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentCreationAttributes
  extends Optional<DepartmentAttributes, "id"> {}

const DepartmentDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

export class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
}

Department.init(DepartmentDefinition, {
  sequelize,
  tableName: "Department",
  updatedAt: true,
  createdAt: true,
  scopes: Department.scopes,
  validate: Department.validations,
});
