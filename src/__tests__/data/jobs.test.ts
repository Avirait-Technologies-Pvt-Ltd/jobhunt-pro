import {
  jobs,
  getJobById,
  getJobsByCompany,
  getFeaturedJobs,
  getRecentJobs,
  getUrgentJobs,
  searchJobs,
  filterJobs,
  getJobCategories,
  getJobLocations,
} from '@/data/jobs';

describe('Jobs Data', () => {
  describe('jobs array', () => {
    it('should have jobs defined', () => {
      expect(jobs).toBeDefined();
      expect(Array.isArray(jobs)).toBe(true);
    });

    it('should have at least 10 jobs', () => {
      expect(jobs.length).toBeGreaterThanOrEqual(10);
    });

    it('should have required properties on each job', () => {
      jobs.forEach((job) => {
        expect(job).toHaveProperty('id');
        expect(job).toHaveProperty('title');
        expect(job).toHaveProperty('company');
        expect(job).toHaveProperty('location');
        expect(job).toHaveProperty('type');
        expect(job).toHaveProperty('salary');
        expect(job).toHaveProperty('description');
        expect(job).toHaveProperty('skills');
      });
    });

    it('should have valid salary objects', () => {
      jobs.forEach((job) => {
        expect(job.salary).toHaveProperty('min');
        expect(job.salary).toHaveProperty('max');
        expect(job.salary).toHaveProperty('currency');
        expect(typeof job.salary.min).toBe('number');
        expect(typeof job.salary.max).toBe('number');
        expect(job.salary.min).toBeLessThanOrEqual(job.salary.max);
      });
    });

    it('should have valid company objects', () => {
      jobs.forEach((job) => {
        expect(job.company).toHaveProperty('id');
        expect(job.company).toHaveProperty('name');
        expect(job.company).toHaveProperty('logo');
      });
    });
  });

  describe('getJobById', () => {
    it('should return a job when valid id is provided', () => {
      const firstJob = jobs[0];
      const result = getJobById(firstJob.id);
      expect(result).toBeDefined();
      expect(result?.id).toBe(firstJob.id);
    });

    it('should return undefined for invalid id', () => {
      const result = getJobById('non-existent-id');
      expect(result).toBeUndefined();
    });

    it('should return the correct job details', () => {
      const firstJob = jobs[0];
      const result = getJobById(firstJob.id);
      expect(result?.title).toBe(firstJob.title);
      expect(result?.company.name).toBe(firstJob.company.name);
    });
  });

  describe('getJobsByCompany', () => {
    it('should return jobs for a valid company id', () => {
      const firstJob = jobs[0];
      const result = getJobsByCompany(firstJob.company.id);
      expect(Array.isArray(result)).toBe(true);
      result.forEach((job) => {
        expect(job.company.id).toBe(firstJob.company.id);
      });
    });

    it('should return empty array for non-existent company', () => {
      const result = getJobsByCompany('non-existent-company');
      expect(result).toEqual([]);
    });
  });

  describe('getFeaturedJobs', () => {
    it('should return featured jobs with default limit', () => {
      const result = getFeaturedJobs();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(6);
    });

    it('should return specified number of jobs', () => {
      const result = getFeaturedJobs(3);
      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('should only return featured jobs', () => {
      const result = getFeaturedJobs();
      result.forEach((job) => {
        expect(job.featured).toBe(true);
      });
    });
  });

  describe('getRecentJobs', () => {
    it('should return recent jobs with default limit', () => {
      const result = getRecentJobs();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(10);
    });

    it('should return jobs sorted by date', () => {
      const result = getRecentJobs();
      for (let i = 1; i < result.length; i++) {
        const prevDate = new Date(result[i - 1].postedDate);
        const currDate = new Date(result[i].postedDate);
        expect(prevDate.getTime()).toBeGreaterThanOrEqual(currDate.getTime());
      }
    });

    it('should respect limit parameter', () => {
      const result = getRecentJobs(5);
      expect(result.length).toBeLessThanOrEqual(5);
    });
  });

  describe('getUrgentJobs', () => {
    it('should return urgent jobs', () => {
      const result = getUrgentJobs();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should only return urgent jobs', () => {
      const result = getUrgentJobs();
      result.forEach((job) => {
        expect(job.urgent).toBe(true);
      });
    });
  });

  describe('searchJobs', () => {
    it('should find jobs by title', () => {
      const firstJob = jobs[0];
      const searchTerm = firstJob.title.split(' ')[0];
      const result = searchJobs(searchTerm);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should be case insensitive', () => {
      const firstJob = jobs[0];
      const searchTerm = firstJob.title.toUpperCase();
      const result = searchJobs(searchTerm);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should find jobs by company name', () => {
      const firstJob = jobs[0];
      const result = searchJobs(firstJob.company.name);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty array for no matches', () => {
      const result = searchJobs('xyznonexistentterm123');
      expect(result).toEqual([]);
    });
  });

  describe('filterJobs', () => {
    it('should filter by job type', () => {
      const result = filterJobs({ type: 'Full-time' });
      result.forEach((job) => {
        expect(job.type).toBe('Full-time');
      });
    });

    it('should filter by experience level', () => {
      const result = filterJobs({ experienceLevel: 'Senior' });
      result.forEach((job) => {
        expect(job.experienceLevel).toBe('Senior');
      });
    });

    it('should filter by remote', () => {
      const result = filterJobs({ remote: true });
      result.forEach((job) => {
        expect(job.remote).toBe(true);
      });
    });

    it('should filter by salary range', () => {
      const result = filterJobs({ salaryMin: 100000 });
      result.forEach((job) => {
        expect(job.salary.max).toBeGreaterThanOrEqual(100000);
      });
    });

    it('should combine multiple filters', () => {
      const result = filterJobs({
        type: 'Full-time',
        remote: true,
      });
      result.forEach((job) => {
        expect(job.type).toBe('Full-time');
        expect(job.remote).toBe(true);
      });
    });

    it('should return all jobs when no filters provided', () => {
      const result = filterJobs({});
      expect(result.length).toBe(jobs.length);
    });
  });

  describe('getJobCategories', () => {
    it('should return an array of categories', () => {
      const result = getJobCategories();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return unique categories', () => {
      const result = getJobCategories();
      const uniqueCategories = [...new Set(result)];
      expect(result.length).toBe(uniqueCategories.length);
    });
  });

  describe('getJobLocations', () => {
    it('should return an array of locations', () => {
      const result = getJobLocations();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return unique locations', () => {
      const result = getJobLocations();
      const uniqueLocations = [...new Set(result)];
      expect(result.length).toBe(uniqueLocations.length);
    });
  });
});
