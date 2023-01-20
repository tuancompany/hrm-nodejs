import express, { IRouter, Request, Response } from "express";
import { API_PREFIX, VALID_ACCESS_TYPES } from "./../../../shared/constants";
import { ManagerController } from "../modules/manager/manager.controller";
import { AuthenticationMiddleware } from "../middlewares/auth.middleware";

export class ManagerRoute {
  private readonly router: IRouter;
  private managerController: ManagerController;
  private readonly authenticationMiddleware: AuthenticationMiddleware;
  constructor() {
    this.router = express.Router();
    this.managerController = new ManagerController();
    this.authenticationMiddleware = new AuthenticationMiddleware();

    this.router.use(API_PREFIX.MANAGER_PREFIX, this.router); // prefix for api manager

    this.router
      .route("/:managerId/approved")
      .post(
        this.authenticationMiddleware.authorize([
          VALID_ACCESS_TYPES.APPROVED_REQUEST_ACTION,
        ]),
        async (req: Request, res: Response) => {
          try {
            const response = await this.managerController.approveActionRequest(
              req
            );
            res.json({
              status: 200,
              data: response,
            });
          } catch (error) {
            res.json({ error });
          }
        }
      );
    this.router.route(
      "/"
    ).get(
      this.authenticationMiddleware.authorize([
        VALID_ACCESS_TYPES.GET_MANAGERS
      ]),
      async (req: Request, res: Response) => {
        try {
          const response = await this.managerController.getManagers(req);
          res.json({
            status: 200,
            data: response
          })
        } catch (error) {
          res.json({ error })
        }
      }
    )
  }

  public routes(): IRouter {
    return this.router;
  }
}
