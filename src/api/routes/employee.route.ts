import express, { IRouter, Request, Response } from "express";
import { API_PREFIX } from "./../../../shared/constants";
import { EmployeeController } from "../modules/employee/employee.controller";

export class EmployeeRoute {
  private readonly router: IRouter;
  private employeeController: EmployeeController;
  constructor() {
    this.router = express.Router();
    this.employeeController = new EmployeeController();

    this.router.use(API_PREFIX.EMPLOYEE_PREFIX, this.router); // prefix for api employee

    this.router.post("/", async (req: Request, res: Response) => {
      try {
        const response = await this.employeeController.createEmployee(req);
        res.json({ data: response });
      } catch (error) {
        res.json({ error });
      }
    });

    this.router.get("/", async (req: Request, res: Response) => {
      try {
        const response = await this.employeeController.getEmployee(req);
        res.json({ data: response });
      } catch (error) {
        res.json({ error });
      }
    });
  }

  public routes(): IRouter {
    return this.router;
  }
}
