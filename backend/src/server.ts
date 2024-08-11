import { configDotenv } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

configDotenv({ path: process.cwd() + "/private/.env" });

//express app
const app = express();

// middleware
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.path);
  next();
});

// routes

// connect to db
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "successfully connected to db. listening for requests on port " +
          process.env.PORT
      );
    });
  })
  .catch((error: Error) => {
    console.error(error);
  });
