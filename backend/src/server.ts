import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import itemRoutes from "./routes/itemRoutes";
import path, { dirname } from "path";
import { hostname } from "os";
import { fileURLToPath } from "url";

dotenv.config({ path: process.cwd() + "/private/.env" });

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
  console.log(req.method, req.path);
  next();
});

// routes
app.use("/api/items", itemRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("http://" + hostname + ":" + process.env.PORT);
});
