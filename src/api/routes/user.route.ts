import express, { IRouter, Request, Response } from "express";
import { UserController } from "../modules/user/user.controller";
import { API_PREFIX } from "./../../../shared/constants";

export class UserRoute {
  private readonly router: IRouter;
  private userController: UserController;
  constructor() {
    this.router = express.Router();
    this.userController = new UserController();

    this.router.use(API_PREFIX.USER_PREFIX, this.router); // prefix for api user.

    this.router.post("/login", async (req: Request, res: Response) => {
      try {
        const token = await this.userController.login(req);
        res.json({
          data: token,
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
