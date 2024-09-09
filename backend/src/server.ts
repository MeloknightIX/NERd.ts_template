import { configDotenv } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import itemRoutes from "./routes/itemRoutes";

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
app.use("/api/items", itemRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(
    "successfully connected to db. listening for requests on port " +
      process.env.PORT
  );
});
