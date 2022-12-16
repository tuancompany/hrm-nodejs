import { Request } from "express";
import { ICreateUserResponse } from "./../../../../shared/interfaces/create-user.response";
import { SignInRequest } from "./../../../../shared/interfaces/signin.request";
import { AuthService } from './auth.service';

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
    const user = this.authService.createUser(req.body);
    return user;
  }

}
