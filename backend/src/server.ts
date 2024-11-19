import express, { NextFunction, Request, Response } from "express";
import dataRoutes from "./routes/dataRoutes";
import { join } from "path";
import { hostname } from "os";
import { configDotenv } from "dotenv";

configDotenv({ path: process.cwd() + "../.env" });

//express app
const app = express();

// middleware
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.info(req.method, req.path);
  next();
});

// api routes
app.use("/api/data", dataRoutes);

// for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(process.cwd(), "../frontend/build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(join(process.cwd(), "../frontend/build", "index.html"));
  });
}

// start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info("http://" + hostname + ":" + port);
});
