import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "example",
  database: process.env.DB_NAME || "job_board",
  synchronize: true,
  logging: true,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
