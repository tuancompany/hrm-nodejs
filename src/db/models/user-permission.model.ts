import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { PermissionDto } from "../../../shared/dtos/permission.dto";

export interface UserPermissionAttributes {
  id: string;
  licensed: number;
  userId: string;
  permissionId: string;
  permission?: PermissionDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPermissionCreationAttributes
  extends Optional<UserPermissionAttributes, "id"> {}

export const UserPermissionDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  licensed: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: "licensed"
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "user_id"
  },
  permissionId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "permission_id"
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

export class UserPermission
  extends Model<
    UserPermissionAttributes,
    UserPermissionCreationAttributes
  >
  implements UserPermissionAttributes
{
  public id: string;
  public licensed: number;
  public userId: string;
  public permissionId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {}
}
