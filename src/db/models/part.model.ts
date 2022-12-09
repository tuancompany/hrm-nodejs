import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";

export interface PartAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartCreationAttributes
  extends Optional<PartAttributes, "id"> {}

export const PartDefinition = {
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

export class Part
  extends Model<PartAttributes, PartCreationAttributes>
  implements PartAttributes
{
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Part.prototype.associate = function () {
  Part.hasMany(Employee, { foreignKey: "partId" });
};
