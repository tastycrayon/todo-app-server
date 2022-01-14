declare module "winston" {
  export interface LoggerOptions {
    handleRejections?: boolean;
    rejectionHandlers?: any;
  }
}

import { createLogger, transports, format } from "winston";
import config from "./config";

export const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [new transports.File({ filename: "combined.log" })],
  handleExceptions: true,
  handleRejections: true,
  exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
  exitOnError: true,
});

if (config.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default function () {
  process.on("uncaughtException", (err) => {
    logger
      .error({ level: "error", message: err.message })
      .on("finish", () => process.exit(1));
  });
  process.on("unhandledRejection", (err: Error) => {
    logger
      .error({ level: "error", message: err.message })
      .on("finish", () => process.exit(1));
  });
}
