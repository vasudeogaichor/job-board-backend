import { Request, Response as ExpressResponse } from "express";
import { AppError, Response } from "../core";

export default class AuthController {
  static async createJob(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    return res.json(Response.success({ success: true }));
  }

  static async getJob(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    return res.json(Response.success({ success: true }));
  }

  static async listJobs(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    return res.json(Response.success({ success: true }));
  }

  static async updateJob(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    return res.json(Response.success({ success: true }));
  }

  static async deleteJob(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    return res.json(Response.success({ success: true }));
  }
}
