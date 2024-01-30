import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const DB_HOST =
  process.env.DB_HOST ||
  "mongodb+srv://Igor:Mongo1232112321@cluster0.gfnn8zw.mongodb.net/";
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
