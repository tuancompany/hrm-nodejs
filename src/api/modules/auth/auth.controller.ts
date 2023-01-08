import { Request } from "express";
import joi from "joi";
import { ICreateUserResponse } from "./../../../../shared/interfaces/create-user.response";
import { SignInRequest } from "./../../../../shared/interfaces/signin.request";
import { AuthService } from './auth.service';
import {
  API_ERROR,
  USER_ROLE,
} from "../../../../shared/constants";

export class AuthController {
  private readonly authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  public async signIn(req: Request): Promise<any> {
    const body: SignInRequest = req.body;
    const response = await this.authService.signIn(body);
    return response;
  }

  public async createUser(req: Request): Promise<ICreateUserResponse> {
    
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

    try {
      const { error } = schema.validate(req.body);

      if (error) {
        throw API_ERROR.BAD_REQUEST(`Invalid request body: ${error}`);
      }

      const user = this.authService.createUser(req.body);
      return user;

    } catch (error) {
      throw error;
    }
  }

}
