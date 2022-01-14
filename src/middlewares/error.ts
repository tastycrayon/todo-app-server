import { Errback, Request, Response, NextFunction } from "express";
import { logger } from "../start/logger";

export default function (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(err);
  res.status(500).send("Something failed.");
}
