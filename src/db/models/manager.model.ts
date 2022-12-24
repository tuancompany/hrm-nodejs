import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";

import { Department } from "./department.model";
import { Part } from "./part.model";
import { Position } from "./position.model";
import { Degree } from "./degree.model";
import { Employee } from "./employee.model";

export interface ManagerAttributes {
  id: string;
  name: string;
  gender: string;
  dob: Date;
  phoneNumber: string;
  email: string;
  dateJoined: Date;
  dateLeft: Date;
  active: boolean;
  departmentId: string;
  partId: string;
  positionId: string;
  degreeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ManagerCreationAttributes
  extends Optional<ManagerAttributes, "id"> {}

export const ManagerDefinition = {
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
  gender: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "gender",
  },
  dob: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "dob",
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "phone_number",
  },
  citizenIdentification: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "citizen_identification",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "address",
  },
  basicSalary: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "basic_salary",
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "image_url",
  },
  dateJoined: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "date_joined",
  },
  dateLeft: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "date_left",
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "active",
  },
  managerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "manager_id",
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "department_id",
  },
  partId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "part_id",
  },
  positionId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "position_id",
  },
  degreeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "degree_id",
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

export class Manager
  extends Model<ManagerAttributes, ManagerCreationAttributes>
  implements ManagerAttributes
{
  public id: string;
  public name: string;
  public gender: string;
  public dob: Date;
  public phoneNumber: string;
  public email: string;
  public dateJoined: Date;
  public dateLeft: Date;
  public active: boolean;
  public departmentId: string;
  public partId: string;
  public positionId: string;
  public degreeId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Manager.prototype.associate = function () {
  Manager.belongsTo(Department, { as: "department" });
  Manager.belongsTo(Part, { as: "part" });
  
  Part.hasMany(Manager, { foreignKey: "partId" });
  Manager.belongsTo(Position, { as: "position" });

  Position.hasMany(Manager, { foreignKey: "positionId" });
  Manager.belongsTo(Degree, { as: "degree" });

  Manager.hasMany(Employee, { foreignKey: "managerId" });
  Employee.belongsTo(Manager, { as: "manager" });
};
