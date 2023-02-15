import { Environment } from "../../Environment";
import {
  createLogger,
  format,
  Logger as LoggerInstance,
  LoggerOptions,
  transports,
} from "winston";

export interface Logger {
  debug(message: string, metaData?: any): void;
  verbose(message: string, metaData?: any): void;
  info(message: string, metaData?: any): void;
  warn(message: string, metaData?: any): void;
  error(message: string, metaData?: any): void;
}

export class WinstonLogger implements Logger {
  private instance: LoggerInstance;
  private readonly env: string;

  constructor(environment: string) {
    this.env = environment;

    let options: LoggerOptions;

    switch (this.env) {

      case Environment.PRODUCTION: {
        options = {
            level: "info",
            format: format.json(),
            transports: [new transports.Console()]
        };
        break;
      }

      case Environment.TESTING: {
        options = {
            level: "info",
            format: format.json(),
            transports: [new transports.Console()]
        }
      }

      case Environment.STAGING: {
        options = {
          level: "info",
          format: format.simple(),
          transports: [new transports.Console()]
        };
        break;
      }

      case Environment.DEMO: {
        options = {
          level: "info",
          format: format.simple(),
          transports: [new transports.Console()]
        };
        break;
      };

      case Environment.DEVELOPMENT: 
        default: {
        options = {
          level: "debug",
          format: format.simple(),
          transports: [new transports.Console()]
        };
      }
    }
    this.instance = createLogger(options);
  }

  public debug(message: string, metaData?: any): void {
      this.instance.log("debug", message, metaData);
  }

  public verbose(message: string, metaData?: any): void { 
    this.instance.log("verbose", message, metaData)
  }

  public info(message: string, metaData?: any): void { 
    this.instance.log("info",`Logger: ${message}` , metaData)
  }

  public warn(message: string, metaData?: any): void { 
    this.instance.log("warn", message, metaData)
  }

  public error(message: string, metaData?: any): void { 
    this.instance.log("error", message, metaData)
  }
}
