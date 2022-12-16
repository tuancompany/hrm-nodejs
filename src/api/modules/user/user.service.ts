import joi from "joi";
import bcrypt from "bcryptjs";
import {
  API_ERROR,
  USER_PERMISSION,
  USER_ROLE,
} from "../../../../shared/constants";
import { UserGateway } from "./user.gateway";
import { PermissionGateway } from "./../../modules/permission/permission.gateway";
import { UserDto } from "./../../../../shared/dtos/user.dto";
import { PermissionDto } from "./../../../../shared/dtos/permission.dto";
import { isEmpty } from "lodash";
import { ICreateUserResponse } from "./../../../../shared/interfaces/create-user.response";

const schema = joi.object({
  name: joi.string().required().max(15).min(0),
  email: joi.string().required(),
  password: joi.string().required(),
  role: joi
    .string()
    .required()
    .valid(USER_ROLE.ADMIN, USER_ROLE.MEMBER, USER_ROLE.VIEWER),
  extraInfo: joi.object(),
});

export class UserService {
  private userGateway: UserGateway;
  private permisstionGateway: PermissionGateway;
  constructor() {
    this.userGateway = new UserGateway();
    this.permisstionGateway = new PermissionGateway();
  }

  public async createUser(input: UserDto): Promise<ICreateUserResponse> {
    try {
      const { error } = schema.validate(input);
      
      const { role, email } = input;

      if (error) {
        throw API_ERROR.BAD_REQUEST(`Invalid request body: ${error}`);
      }

      // Check user email exists -> return conflict 409 status code

      const userExists = await this.userGateway.getUserByEmail(email);
      
      if (!isEmpty(userExists)) {
        throw API_ERROR.CONFLICT(`User with email ${email} is already exists!`);
      }

      // If role == "Admin" => email must be ended with @admin.gmail.hrm.com
      if (role === USER_ROLE.ADMIN && !email.includes("@admin.gmail.hrm.com")) {
        throw API_ERROR.BAD_REQUEST(
          `Invalid email: ${email}. Admin role email must be ended with @admin.gmail.hrm.com`
        );
      }
      // Admin -> Full permission
      // Member -> Read, Edit
      // Viewer -> Read only.
      let permissionsName: string[];

      if (role === USER_ROLE.ADMIN) {
        permissionsName = [
          USER_PERMISSION.FULL,
          USER_PERMISSION.ADMIN,
          USER_PERMISSION.READ_ONLY,
          USER_PERMISSION.EDIT,
          USER_PERMISSION.CREATE,
        ];
      }

      if(role === USER_ROLE.MEMBER) {
        permissionsName = [
            USER_PERMISSION.READ_ONLY,
            USER_PERMISSION.EDIT
        ]
      }

      if(role === USER_ROLE.VIEWER) {
        permissionsName = [
            USER_PERMISSION.READ_ONLY
        ]
      };

      const permissions: PermissionDto[] =
        await this.permisstionGateway.getPermissionsByName(permissionsName);
      
      if(isEmpty(permissions)) {
        throw API_ERROR.NOT_FOUND('Not found permissions');
      }

      const userCreate: UserDto = {
        id: input.id,
        name: input.name.trim(),
        email: input.email.trim(),
        password: bcrypt.hashSync(input.password),
        role: input.role,
        extraInfo: JSON.stringify(input.extraInfo),
      };

      const response = await this.userGateway.createUser({
        user: userCreate,
        permissions
      });
      
      return response;
    } catch (error) {
      throw error;
    }
  }
}