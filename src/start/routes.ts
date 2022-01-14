import { Express, json } from "express";
import error from "../middlewares/error";
import todos from "../routes/todo";
import cors from "cors";

export default function (app: Express) {
  app.use(cors());
  app.use(json());

  app.use("/todos", todos);
  app.use("*", (req, res) => {
    res.status(404).send("what???");
  });
  app.use(error);
}
