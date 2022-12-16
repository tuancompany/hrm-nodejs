import {
    Model,
    Optional,
    DataTypes,
    ModelScopeOptions,
    ModelValidateOptions,
  } from "sequelize";
  import { Permission } from "./permission.model";
  
  export interface PermissionDetailsAttributes {
    id: string;
    permissionId: string;
    actionName: string;
    actionCode: string;
    checkAction: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface PermissionDetailsCreationAttributes
    extends Optional<PermissionDetailsAttributes, "id"> {}
  
  export const PermissionDetailsDefinition = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      field: "id",
    },
    permissionId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: "permission_id"
    },
    actionName: {
      allowNull: false,
      type: DataTypes.CHAR,
      field: "action_name"
    },
    actionCode: {
      allowNull: false,
      type: DataTypes.CHAR,
      field: "action_code"
    },
    checkAction: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "check_action"
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
  
  export class PermissionDetails
    extends Model<PermissionDetailsAttributes, PermissionDetailsCreationAttributes>
    implements PermissionDetailsAttributes
  {
    public id: string;
    public permissionId: string;
    public actionName: string;
    public actionCode: string;
    public checkAction: number;
    public createdAt: Date;
    public updatedAt: Date;
  
    static readonly scopes: ModelScopeOptions = {};
    static readonly validations: ModelValidateOptions = {};
    associate: () => void;
  }
  
  PermissionDetails.prototype.associate = function () {
    PermissionDetails.belongsTo(Permission, {
      as: 'permission'
    });
  };
  