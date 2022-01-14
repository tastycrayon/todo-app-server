import { config } from "dotenv";

config();

const options = {
  DATABASE: process.env.DATABASE,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};

if (!options.DATABASE) throw new Error("Fatal Error: Database is not defined");

export default options;
