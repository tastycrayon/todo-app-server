import { Request, Response, NextFunction, RequestHandler } from "express";

type requestHandler = (req: Request, res: Response) => RequestHandler;

export default function (fn: requestHandler | Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (err) {
      next(err);
    }
  };
}
