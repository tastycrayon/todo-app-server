import { Router, Request, Response } from "express";
import Todo, { validate } from "../models/todo";
import wrap from "../middlewares/asyncHandler";
import validator from "../middlewares/validator";
import validateObjectId from "../middlewares/validateObjectId";
import handle404 from "../middlewares/handle404";

/* express v5 will have async handler built in
at that time remove both wrap() and app.use(error) */

const router = Router();

/* get all todos */
router.get(
  "/",
  wrap(async (req: Request, res: Response) => {
    const todos = await Todo.find().sort({ _id: "desc" });
    return res.json({ todos, total: todos?.length || 0 });
  })
);

/* get a single todo */
router.get(
  "/:id",
  validateObjectId,
  wrap(async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return handle404(res);
    res.json(todo);
  })
);

/* add new todo */
router.post(
  "/",
  validator(validate),
  wrap(async (req: Request, res: Response) => {
    const { title, completed } = req.body;
    const todo = new Todo({ title, completed });
    const result = await todo.save();
    return res.status(201).json(result);
  })
);

/*  update existing todo */
router.put(
  "/:id",
  validateObjectId,
  validator(validate),
  wrap(async (req: Request, res: Response) => {
    const { title, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        completed,
      },
      { new: true }
    );
    if (!todo) return handle404(res);
    return res.json(todo);
  })
);

/* remove existing todo */
router.delete(
  "/:id",
  validateObjectId,
  wrap(async (req: Request, res: Response) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) return handle404(res);

    return res.json(todo);
  })
);

export default router;
