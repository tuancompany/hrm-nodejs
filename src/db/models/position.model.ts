import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";

export interface PositionAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PositionCreationAttributes
  extends Optional<PositionAttributes, "id"> {}

export const PositionDefinition = {
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

export class Position
  extends Model<PositionAttributes, PositionCreationAttributes>
  implements PositionAttributes
{
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Position.prototype.associate = function () {
  Position.hasMany(Employee, { as: "employee", foreignKey: "positionId" });
};
