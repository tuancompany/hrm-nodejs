import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";

export interface BonusDisciplineAttributes {
  id: string;
  bonusDisciplineNumber: number;
  content: string;
  date: Date;
  amount: number;
  status: boolean;
  employeeId: string;
  type: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BonusDisciplineCreationAttributes
  extends Optional<BonusDisciplineAttributes, "id"> {}

export const BonusDisciplineDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  bonusDisciplineNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "bonus_discipline_number",
  },
  content: {
    type: DataTypes.CHAR,
    allowNull: false,
    field: "content",
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "date",
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    field: "amount",
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "status",
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "employee_id",
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "type",
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

export class BonusDiscipline
  extends Model<BonusDisciplineAttributes, BonusDisciplineCreationAttributes>
  implements BonusDisciplineAttributes
{
  public id: string;
  public bonusDisciplineNumber: number;
  public content: string;
  public date: Date;
  public amount: number;
  public status: boolean;
  public employeeId: string;
  public type: number;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

BonusDiscipline.prototype.associate = function () {
  Employee.hasMany(BonusDiscipline, {
    as: "bonusDiscipline",
    foreignKey: "employee_id",
  });
  BonusDiscipline.belongsTo(Employee, { as: "employee" });
};
