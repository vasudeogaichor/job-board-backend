console.clear();
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { routes } from "./config/routes";
import { RouteEngine, AppError, Response as AppResponse } from "./core";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeEngine = new RouteEngine(routes);

routeEngine
  .initialize()
  .then((router) => {
    app.use("/api", router);

    app.use(
      (err: Error, req: Request, res: Response, next: NextFunction): void => {
        if (err instanceof AppError) {
          res
            .status(err.statusCode)
            .json(AppResponse.error(err.message, err.errors));
        } else {
          console.error(err);
          res.status(500).json(AppResponse.error("Internal server error"));
        }
      }
    );
  })
  .catch((err) => {
    console.error("Error during route initialization:", err);
  });

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "UP",
    message: "Server is running successfully",
    timestamp: new Date().toISOString(),
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request Path: ${req.path}`);
  next();
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await AppDataSource.destroy();
  process.exit(0);
});

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to MySQL");

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    process.exit(1);
  }
};

startServer();
