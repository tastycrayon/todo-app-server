import { Response } from "express";

export default (res: Response) => {
  return res.status(404).send("Not found.");
};
