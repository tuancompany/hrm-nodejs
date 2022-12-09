import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { TimeKeeping } from "./timekeeping.model";

export interface TimeKeepingTypeAttributes {
  id: string;
  name: string;
  coefficients: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeKeepingTypeCreationAttributes
  extends Optional<TimeKeepingTypeAttributes, "id"> {}

export const TimeKeepingTypeDefinition = {
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
  coefficients: {
    type: DataTypes.INTEGER,
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

export class TimeKeepingType
  extends Model<TimeKeepingTypeAttributes, TimeKeepingTypeCreationAttributes>
  implements TimeKeepingTypeAttributes
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

TimeKeepingType.prototype.associate = function () {
  TimeKeepingType.hasMany(TimeKeeping, {
    as: "timekeeping",
    foreignKey: "time_keeping_type_id",
  });
  TimeKeeping.belongsTo(TimeKeepingType, { as: "timeKeepingType" });
};
