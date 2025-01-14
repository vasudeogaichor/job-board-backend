import { Routes } from "../types/routes";

export const routes: Routes = {
  jobs: {
    'POST /': {
      handler: 'JobController.createJob',
      middleware: [],
    }
  }
};
