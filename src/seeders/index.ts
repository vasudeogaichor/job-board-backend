import { Job } from '../entities/Job';
import { AppDataSource } from '../config/data-source';

const seedJobs = async () => {
  await AppDataSource.initialize();
  const jobRepository = AppDataSource.getRepository(Job);

  const jobs = [
    {
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Remote',
      salary: 100000,
      description: 'Develop and maintain software applications.',
    },
    {
      title: 'Product Manager',
      company: 'Biz Group',
      location: 'New York, NY',
      salary: 120000,
      description: 'Oversee product lifecycle and manage teams.',
    },
  ];

  await jobRepository.save(jobs);
  console.log('Jobs seeded!');
  await AppDataSource.destroy();
};

seedJobs();