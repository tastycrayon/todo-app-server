const mongoose = require("mongoose");
import config from "./config";

export default async function () {
  try {
    await mongoose.connect(config.DATABASE, {});
    console.log("MongoDB Connected");
  } catch (err) {
    throw new Error("MongoDB Connection Failed");
  }
}
