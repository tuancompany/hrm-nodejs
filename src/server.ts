import * as bodyParser from "body-parser";
import express from "express";
import * as http from "http";
import * as dotenv from "dotenv";
import cors from "cors";

import { EmployeeRoute } from "./api/routes/employee.route";
import { UserRoute } from "./api/routes/user.route";
import { AuthRoute } from "./api/routes/auth.route";
import { ManagerRoute } from "./api/routes/manager.route";

import { AuthenticationMiddleware } from "./api/middlewares/auth.middleware";
import { Sequelize, sequelize } from "./db/";
import { ALL_VALID_ACCESS_TYPES, API_PREFIX } from "./../shared/constants";

dotenv.config();
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
export class Server {
  private readonly app: express.Express;
  private readonly port: string;
  private readonly employeeRoute: EmployeeRoute;
  private readonly userRoute: UserRoute;
  private readonly authRoute: AuthRoute;
  private readonly managerRoute: ManagerRoute;
  private readonly authenticationMiddleware: AuthenticationMiddleware;
  private readonly sequelize: Sequelize;
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.sequelize == sequelize;
    this.employeeRoute = new EmployeeRoute();
    this.userRoute = new UserRoute();
    this.authRoute = new AuthRoute();
    this.managerRoute = new ManagerRoute();
    this.authenticationMiddleware = new AuthenticationMiddleware();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors(options));

    //***** */ Auth route: Auth route don't need to attach jwt token into its headers
    // ***** So that we put it above from authentication middleware
    this.app.use(API_PREFIX.ROOT_PREFIX, this.authRoute.routes());
    // Middlewares.
    this.app.use(this.authenticationMiddleware.authorize(ALL_VALID_ACCESS_TYPES));

    // Routes
    this.app.use(API_PREFIX.ROOT_PREFIX, this.employeeRoute.routes());
    this.app.use(API_PREFIX.ROOT_PREFIX, this.userRoute.routes());
    this.app.use(API_PREFIX.ROOT_PREFIX, this.managerRoute.routes());
  }

  public start(): http.Server {
    return this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }
}
