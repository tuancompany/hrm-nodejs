import express, { IRouter, Request, Response } from "express";
import { AuthController } from "../modules/auth/auth.controller";
import { API_PREFIX } from "./../../../shared/constants";

export class AuthRoute {
  private readonly router: IRouter;
  private authController: AuthController;
  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();

    this.router.use(API_PREFIX.AUTH_PREFIX, this.router); // prefix for api auth.

    this.router.post('/sign-up', async (req: Request, res: Response) => {
      try {
        const user = await this.authController.createUser(req);
        res.json({
          data: user
        });
      } catch (error) {
        res.json({
          error
        })
      }
    });

    this.router.post("/sign-in", async (req: Request, res: Response) => {
      try {
        const response = await this.authController.signIn(req);
        res.json({
          data: response,
        });
      } catch (error) {
        res.json({
          error,
        });
      }
    });
  }

  public routes(): IRouter {
    return this.router;
  }
}
