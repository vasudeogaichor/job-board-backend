import { Request, Response, NextFunction } from "express";
import { AppError } from "../core";
import validator from "validator";

interface LoginRequestBody {
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
}

export default function validateCreateJob(
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction
): void {
  const { title, company, location, salary, description } = req.body;
  const errors: string[] = [];

  const missingFields = Object.entries({ title, company, location, salary })
    .filter(([_, value]) => !value)
    .map(([key]) => `${key} is required`);
  errors.push(...missingFields);

  if (errors.length > 0) {
    throw AppError.badRequest("Invalid input", errors);
  }

  next();
}
