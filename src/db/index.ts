"use strict";

import { Sequelize } from "sequelize";
import { Employee, EmployeeDefinition } from "./models/employee.model";
import {
  AdvanceSalary,
  AdvanceSalaryDefinition,
} from "./models/advance-salary.model";
import { Allowance, AllowanceDefinition } from "./models/allowance.model";
import {
  BonusDiscipline,
  BonusDisciplineDefinition,
} from "./models/bonus-discipline.model";
import { Contract, ContractDefinition } from "./models/contract.model";
import { Degree, DegreeDefinition } from "./models/degree.model";
import { Department, DepartmentDefinition } from "./models/department.model";
import {
  EmployeeAllowance,
  EmployeeAllowanceDefinition,
} from "./models/employee-allowance.model";
import { Insurance, InsuranceDefinition } from "./models/insurance.model";
import {
  OvertimeType,
  OvertimeTypeDefinition,
} from "./models/overtime-type.model";
import { Overtime, OvertimeDefinition } from "./models/overtime.model";
import { Part, PartDefinition } from "./models/part.model";
import { Position, PositionDefinition } from "./models/position.model";
import {
  TimeKeepingType,
  TimeKeepingTypeDefinition,
} from "./models/timekeeping-type.model";
import { TimeKeeping, TimeKeepingDefinition } from "./models/timekeeping.model";
import { User, UserDefinition } from "./models/user.model";
import {
  UserPermission,
  UserPermissionDefinition,
} from "./models/user-permission.model";
import { Permission, PermissionDefinition } from "./models/permission.model";
import {
  PermissionDetails,
  PermissionDetailsDefinition,
} from "./models/permission-details.model";

const env = process.env.NODE_ENV || "development";

const config = require(__dirname + "/config/database")[env];

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  // sequelize.sync({force: true});
}

const modelsInit = [
  {
    model: Employee,
    definition: EmployeeDefinition,
    tableName: "Employee",
  },
  {
    model: AdvanceSalary,
    definition: AdvanceSalaryDefinition,
    tableName: "AdvanceSalary",
  },
  {
    model: Allowance,
    definition: AllowanceDefinition,
    tableName: "Allowance",
  },
  {
    model: BonusDiscipline,
    definition: BonusDisciplineDefinition,
    tableName: "BonusDiscipline",
  },
  {
    model: Contract,
    definition: ContractDefinition,
    tableName: "Contract",
  },
  {
    model: Degree,
    definition: DegreeDefinition,
    tableName: "Degree",
  },
  {
    model: Department,
    definition: DepartmentDefinition,
    tableName: "Department",
  },
  {
    model: EmployeeAllowance,
    definition: EmployeeAllowanceDefinition,
    tableName: "EmployeeAllowance",
  },
  {
    model: Insurance,
    definition: InsuranceDefinition,
    tableName: "Insurance",
  },
  {
    model: Overtime,
    definition: OvertimeDefinition,
    tableName: "Overtime",
  },
  {
    model: OvertimeType,
    definition: OvertimeTypeDefinition,
    tableName: "OvertimeType",
  },
  {
    model: Part,
    definition: PartDefinition,
    tableName: "Part",
  },
  {
    model: Position,
    definition: PositionDefinition,
    tableName: "Position",
  },
  {
    model: TimeKeepingType,
    definition: TimeKeepingTypeDefinition,
    tableName: "TimeKeepingType",
  },
  {
    model: TimeKeeping,
    definition: TimeKeepingDefinition,
    tableName: "TimeKeeping",
  },
  {
    model: User,
    definition: UserDefinition,
    tableName: "User"
  },
  {
    model: UserPermission,
    definition: UserPermissionDefinition,
    tableName: "UserPermission"
  },
  {
    model: Permission,
    definition: PermissionDefinition,
    tableName: "Permission"
  },
  {
    model: PermissionDetails,
    definition: PermissionDetailsDefinition,
    tableName: "PermissionDetails"
  },

];

modelsInit.forEach((modelInit) => {
  modelInit.model.init(modelInit.definition, {
    sequelize,
    tableName: modelInit.tableName,
    scopes: modelInit.model.scopes,
    validate: modelInit.model.validations,
  });
});

const modelsAssociate = [
  Employee,
  AdvanceSalary,
  BonusDiscipline,
  OvertimeType,
  Overtime,
  Part,
  Position,
  TimeKeepingType,
  TimeKeeping,
  User,
  Permission,
  PermissionDetails
];

modelsAssociate.forEach((model) => {
  model.prototype.associate();
});

export { Sequelize, sequelize };
