import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export default function (req: Request, res: Response, next: NextFunction) {
  // if id is a valid object id then proceed to query it
  if (Types.ObjectId.isValid(req.params.id)) next();
  else return res.status(404).send("ID is not valid.");
}
