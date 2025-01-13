console.clear();
import "reflect-metadata";
import { DataSource } from "typeorm";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { routes } from "./config/routes";
import { RouteEngine, AppError, Response as AppResponse } from "./core";
import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeEngine = new RouteEngine(routes);

app.use((req, res, next) => {
  console.log("path - " + req.path);
  next();
});

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

const frontendPath = path.join(process.cwd(), "../frontend/dist");
// console.log("frontendPath - ", frontendPath);
// app.use(express.static(frontendPath));
app.use("/app", express.static(frontendPath));
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Server is running successfully",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res, next) => {
  console.log(`Request Path: ${req.path}`);
  next();
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await sequelize.close();
  process.exit(0);
});

// const AppDataSource = new DataSource({
//   type: "mysql",
//   host: process.env.DB_HOST || "localhost",
//   port: parseInt(process.env.DB_PORT || "3306", 10),
//   username: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME || "job_board",
//   synchronize: false,
//   logging: true,
//   entities: ["./src/entities/*.ts"], // Path to your TypeORM entity files
//   migrations: ["./src/migrations/*.ts"], // Path to your TypeORM migration files
// });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: console.log, // Disable logging by setting to `false`
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL");
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectToDatabase();

  const PORT = process.env.PORT || 3005;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
