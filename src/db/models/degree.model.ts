import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";
import { Manager } from "./manager.model";

export interface DegreeAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DegreeCreationAttributes
  extends Optional<DegreeAttributes, "id"> {}

export const DegreeDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "name",
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

export class Degree
  extends Model<DegreeAttributes, DegreeCreationAttributes>
  implements DegreeAttributes
{
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Degree.prototype.associate = function () {
  Degree.hasMany(Employee, { as: "employee", foreignKey: "degreeId" });
  Degree.hasMany(Manager, { as: "employee", foreignKey: "degreeId" });
};
