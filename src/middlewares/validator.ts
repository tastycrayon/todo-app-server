import { Request, Response, NextFunction, RequestHandler } from "express";
import { ValidationResult, ErrorReport } from "joi";

type Validator = (data: any) => ValidationResult;

export default function (validate: Validator) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validate(req.body);
    // if validation fails then send errors
    if (error)
      return res.status(400).json(error?.details.map((e) => e.message));

    req.body = value;
    next();
  };
}
