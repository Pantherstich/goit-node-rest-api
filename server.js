import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const DB_HOST =
  process.env.DB_HOST ||
  "mongodb+srv://pantherstich:Mongo1232112321@cluster0.gfnn8zw.mongodb.net/contacts_reader?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

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
