import * as bodyParser from "body-parser";
import express from "express";
import * as http from "http";
import * as dotenv from "dotenv";
import { EmployeeRoute } from "./api/routes/employee.route";
import { UserRoute } from "./api/routes/user.route";


import { AuthenticationMiddleware } from "./api/middlewares/auth.middleware";
import { JwtAuthentication } from './../shared/helpers/utils/jwt.utils';
import { Sequelize, sequelize } from "./db/";
import { ALL_VALID_ACCESS_TYPES, API_PREFIX } from "./../shared/constants";

dotenv.config();
export class Server {
  private readonly app: express.Express;
  private readonly port: string;
  private readonly employeeRoute: EmployeeRoute;
  private readonly userRoute: UserRoute
  private readonly authenticationMiddleware: AuthenticationMiddleware;
  private readonly jwtAuthentication: JwtAuthentication;
  private readonly sequelize: Sequelize;
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.sequelize == sequelize;
    this.employeeRoute = new EmployeeRoute();
    this.userRoute = new UserRoute();
    this.authenticationMiddleware = new AuthenticationMiddleware();
    this.jwtAuthentication = new JwtAuthentication();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Middlewares.
    this.app.use(this.authenticationMiddleware.authorize(ALL_VALID_ACCESS_TYPES));

    // Routes
    this.app.use(API_PREFIX.ROOT_PREFIX, this.employeeRoute.routes());
    this.app.use(API_PREFIX.ROOT_PREFIX, this.userRoute.routes());
  }

  public start(): http.Server {
    console.log('jwt', this.jwtAuthentication.generateToken());
    return this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }
}
// https://www.pgadmin.org/docs/pgadmin4/6.8/erd_tool.html
// youtube.com/watch?v=o23LBJ-9jsU
// https://www.youtube.com/watch?v=pRE2yns9bd0 // QLNS
// https://khalilstemmler.com/articles/sequelize-tags-junction-pattern/

// https://viblo.asia/p/sequelize-typescript-purrrrfect-naQZRQ8qKvx
// https://sequelize.org/docs/v6/other-topics/query-interface/

//https://sebhastian.com/sequelize-belongstomany/

//https://viblo.asia/p/bai-toan-phan-quyen-van-de-muon-thuo-1VgZvw9mlAw
