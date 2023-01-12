import express, { IRouter, Request, Response } from "express";
import { API_PREFIX, VALID_ACCESS_TYPES } from "./../../../shared/constants";
import { EmployeeController } from "../modules/employee/employee.controller";
import { AuthenticationMiddleware } from "../middlewares/auth.middleware";

export class EmployeeRoute {
  private readonly router: IRouter;
  private employeeController: EmployeeController;
  private readonly authenticationMiddleware: AuthenticationMiddleware;
  constructor() {
    this.router = express.Router();
    this.employeeController = new EmployeeController();
    this.authenticationMiddleware = new AuthenticationMiddleware();

    this.router.use(API_PREFIX.EMPLOYEE_PREFIX, this.router); // prefix for api employee

    this.router
      .route("/")
      .post(
        this.authenticationMiddleware.authorize([
          VALID_ACCESS_TYPES.CREATE_EMPLOYEES,
        ]),
        async (req: Request, res: Response) => {
          try {
            const response = await this.employeeController.createEmployee(req);
            res.json({
              status: 201,
              data: response,
            });
          } catch (error) {
            res.json({ error });
          }
        }
      );

    this.router
      .route("/")
      .get(
        this.authenticationMiddleware.authorize([
          VALID_ACCESS_TYPES.GET_EMPLOYEES,
        ]),
        async (req: Request, res: Response) => {
          try {
            const response = await this.employeeController.getEmployee(req);
            res.json({
              status: 200,
              data: response,
            });
          } catch (error) {
            res.json({ error });
          }
        }
      );

    this.router
      .route("/:employeeId")
      .delete(
        this.authenticationMiddleware.authorize([
          VALID_ACCESS_TYPES.DELETE_EMPLOYEE,
        ]),
        async (req: Request, res: Response) => {
          try {
            const response = await this.employeeController.deleteEmployee(req);
            res.json({
              status: 200,
              data: response,
            });
          } catch (error) {
            res.json({ error });
          }
        }
      );

    this.router
      .route("/:employeeId")
      .put(
        this.authenticationMiddleware.authorize([
          VALID_ACCESS_TYPES.UPDATE_EMPLOYEE,
        ]),
        async (req: Request, res: Response) => {
          try {
            const response = await this.employeeController.updateEmployee(req);
            res.json({
              status: 200,
              data: response,
            });
          } catch (error) {
            res.json({
              error,
            });
          }
        }
      );

    this.router.route("/:employeeId/overtime/request").post(
      this.authenticationMiddleware.authorize([
        VALID_ACCESS_TYPES.REQUEST_EMPLOYEE
      ]),
      async (req: Request, res: Response) => {
        try {
          const response = await this.employeeController.requestAction(req);
          res.json({
            status: 200,
            data: response
          })
        } catch (error) {
          res.json({
            error
          })
        }
      }
    );

    this.router.route("/:employeeId/dayoff/request").post(
      this.authenticationMiddleware.authorize([
        VALID_ACCESS_TYPES.REQUEST_EMPLOYEE
      ]),
      async (req: Request, res: Response) => {
        try {
          const response = await this.employeeController.requestAction(req);
          res.json({
            status: 200,
            data: response
          })
        } catch (error) {
          res.json({
            error
          })
        }
      }
    )
  }

  public routes(): IRouter {
    return this.router;
  }
}
