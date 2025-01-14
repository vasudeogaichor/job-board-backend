import { Routes } from "../types/routes";

export const routes: Routes = {
  jobs: {
    "POST /": {
      handler: "JobController.createJob",
      middleware: ["validateCreateJob"], // Add middlewares if any
    },
    "GET /": {
      handler: "JobController.listJobs",
      middleware: [],
    },
    "GET /:jobId": {
      handler: "JobController.getJob",
      middleware: [],
    },
    "PUT /:jobId": {
      handler: "JobController.updateJob",
      middleware: [],
    },
    "DELETE /:jobId": {
      handler: "JobController.deleteJob",
      middleware: [],
    },
  },
};
