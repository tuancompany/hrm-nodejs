import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

import {
  ALL_VALID_ACCESS_TYPES,
  API_ERROR,
  TOKEN_CONFIG,
  USER_PERMISSION,
  USER_ROLE,
} from "../../../../shared/constants";
import { UserGateway } from "../user/user.gateway";
import { PermissionGateway } from "./../../modules/permission/permission.gateway";
import { UserDto } from "./../../../../shared/dtos/user.dto";
import { PermissionDto } from "./../../../../shared/dtos/permission.dto";
import { isEmpty } from "lodash";
import { ICreateUserResponse } from "./../../../../shared/interfaces/create-user.response";
import { JwtAuthentication } from "./../../../../shared/helpers/utils/jwt.utils";
import { SignInRequest, SignInResponse } from "./../../../../shared/interfaces/signin.request";
import { IGetUserResponse } from "./../../../../shared/interfaces/get-user.response";

export class AuthService {
  private userGateway: UserGateway;
  private permisstionGateway: PermissionGateway;
  private readonly jwtAuthentication: JwtAuthentication;
  constructor() {
    this.userGateway = new UserGateway();
    this.permisstionGateway = new PermissionGateway();
    this.jwtAuthentication = new JwtAuthentication();
  }

  public async createUser(input: UserDto): Promise<ICreateUserResponse> {
    try {
      
      const { role, email } = input;

      // Check user email exists -> return conflict 409 status code

      const existedUser = await this.userGateway.getUserByEmail(email);
      
      if (!isEmpty(existedUser)) {
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

  public async signIn(input: SignInRequest): Promise<SignInResponse> {
    const existedUser: IGetUserResponse = await this.userGateway.getUserByEmail(input.email);

    if(isEmpty(existedUser)) {
        throw API_ERROR.NOT_FOUND(`User id with email ${input.email} is not exists!`);
    }

    const userPassword = existedUser.password;
    const isMatchingPassword = bcrypt.compareSync(
        input.password,
        userPassword
    );

    if(!isMatchingPassword) {
        throw API_ERROR.UNAUTHORIZED(`Password incorrect!`);
    }

    // Check role to get access types.
    let accessTypes: string[];
    if(existedUser.role === USER_ROLE.ADMIN) {
        accessTypes = ALL_VALID_ACCESS_TYPES
    };

    // Tạm thời để vậy đã, sau này chia access types sau.
    accessTypes = ALL_VALID_ACCESS_TYPES;

    const token = this.jwtAuthentication.generateToken({
        name: input.name,
        userId: existedUser.id,
        accessTypes,
        expireTime: TOKEN_CONFIG.EXPIRE_TIME
    });

    const refreshToken = sign(
        {
            name: input.name,
            userId: existedUser.id,
            accessTypes,
        },
        TOKEN_CONFIG.REFRESH_TOKEN_KEY,
        {
            expiresIn: TOKEN_CONFIG.REFRESH_EXPIRE_TIME
        }
    );

    const response: SignInResponse = {
        id: existedUser.id,
        name: existedUser.name,
        email: existedUser.email,
        role: existedUser.role,
        token,
        refreshToken
    }

    return response;
  }
}
