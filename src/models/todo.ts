import { model, Schema } from "mongoose";
import { ITodo } from "../interfaces/todo";
import Joi from "joi";

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const validate = function (data: ITodo) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    completed: Joi.boolean().default(false),
  });
  return schema.validate(data);
};

export default model<ITodo>("Todo", TodoSchema);
