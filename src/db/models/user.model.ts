import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { PermissionDto } from "../../../shared/dtos/permission.dto";
import { Permission } from "./permission.model";
import { UserPermission } from "./user-permission.model";

export interface UserAttributes {
  permission?: PermissionDto[];
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  extraInfo: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export const UserDefinition = {
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
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "email",
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "pass_word",
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "role",
  },
  extraInfo: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "extra_info",
  },
  isDeleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: "is_deleted",
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

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public extraInfo: string;
  public isDeleted: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

User.prototype.associate = function () {
  User.belongsToMany(Permission, {
    through: UserPermission,
    foreignKey: "userId",
    as: "permission",
  });

  Permission.belongsToMany(User, {
    through: UserPermission,
    foreignKey: "permissionId",
    as: "user",
  });
};
