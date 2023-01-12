import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Overtime } from "./overtime.model";

export interface OvertimeTypeAttributes {
  id: string;
  name: string;
  coefficients: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OvertimeTypeCreationAttributes
  extends Optional<OvertimeTypeAttributes, "id"> {}

export const OvertimeTypeDefinition = {
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
  coefficients: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: "coefficients",
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

export class OvertimeType
  extends Model<OvertimeTypeAttributes, OvertimeTypeCreationAttributes>
  implements OvertimeTypeAttributes
{
  public id: string;
  public name: string;
  public coefficients: number;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

OvertimeType.prototype.associate = function () {
  OvertimeType.hasMany(Overtime, {
    as: "overtime",
    foreignKey: "overtime_type_id",
  });
  Overtime.belongsTo(OvertimeType, { as: "overtimeType" });
};
