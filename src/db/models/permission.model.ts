import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { User } from "./user.model";
import { UserPermission } from "./user-permission.model";
import { PermissionDetails } from './permission-details.model';

export interface PermissionAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, "id"> {}

export const PermissionDefinition = {
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

export class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Permission.prototype.associate = function () {
  User.belongsToMany(Permission, {
    through: UserPermission,
    foreignKey: "userId"
  });

  Permission.belongsToMany(User, {
    through: UserPermission,
    foreignKey: "permissionId",
  });

  Permission.hasMany(PermissionDetails, {
    foreignKey: "permissionId"
  });
};
