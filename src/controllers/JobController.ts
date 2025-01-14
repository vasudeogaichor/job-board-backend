import { Request, Response as ExpressResponse } from "express";
import { AppError, Response } from "../core";
import { Job } from "../entities/Job";
import { AppDataSource } from "../config/data-source";
const jobRepository = AppDataSource.getRepository(Job);

export default class AuthController {
  // Create new job
  static async createJob(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    try {
      const job = jobRepository.create(req.body);
      const savedJob = await jobRepository.save(job);
      return res.json(Response.success({ ...savedJob }));
    } catch (error: any) {
      throw AppError.badRequest("Bad Request", error.message);
    }
  }

  // Retrieve single job by id
  static async getJob(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    const job = await jobRepository.findOneBy({
      id: parseInt(req.params.jobId),
    });
    if (!job) {
      throw AppError.notFound();
    } else {
      return res.json(Response.success(job));
    }
  }

  // Retrieve all jobs/ filter jobs by query params
  static async listJobs(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    try {
      const jobs = await jobRepository.find();
      return res.json(Response.success(jobs));
    } catch (error: any) {
      throw AppError.badRequest("Bad Request", error.message);
    }
  }

  // Update single job by id
  static async updateJob(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    try {
      const job = await jobRepository.findOneBy({
        id: parseInt(req.params.jobId),
      });
      if (!job) {
        throw AppError.badRequest("Job not found");
      }
      jobRepository.merge(job, req.body);
      const updatedJob = await jobRepository.save(job);
      return res.json(Response.success(updatedJob));
    } catch (error: any) {
      throw AppError.badRequest("Bad Request", error.message);
    }
  }

  // Delete single job by id
  static async deleteJob(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    return res.json(Response.success({ success: true }));
  }
}
