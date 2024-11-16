import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import dataRoutes from "./routes/dataRoutes";
import path, { dirname } from "path";
import { hostname } from "os";
import { fileURLToPath } from "url";

dotenv.config({ path: process.cwd() + "../.env" });

//express app
const app = express();

// middleware
app.use(express.json());

// for production
if (process.env.NODE_ENV === "production") {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, "../../frontend/build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
  });
}

// logging requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.info(req.method, req.path);
  next();
});

// routes
app.use("/api/data", dataRoutes);

// listen for requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info("http://" + hostname + ":" + port);
});
