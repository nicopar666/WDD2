import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  connectDb();
  console.log(`Running on port: ${PORT}`);
});
