import { Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
}
