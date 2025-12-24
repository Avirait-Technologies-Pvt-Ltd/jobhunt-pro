import { SalaryData, CityLivingCost } from '@/types';

export const salaryData: SalaryData[] = [
  {
    role: 'Software Engineer',
    category: 'Technology',
    experienceLevel: 'Entry Level',
    location: 'San Francisco, CA',
    salaryRange: { min: 100000, max: 140000, currency: 'USD', period: 'yearly' },
    median: 120000,
    percentile25: 105000,
    percentile75: 135000,
  },
  {
    role: 'Software Engineer',
    category: 'Technology',
    experienceLevel: 'Mid Level',
    location: 'San Francisco, CA',
    salaryRange: { min: 140000, max: 200000, currency: 'USD', period: 'yearly' },
    median: 165000,
    percentile25: 150000,
    percentile75: 185000,
  },
  {
    role: 'Software Engineer',
    category: 'Technology',
    experienceLevel: 'Senior Level',
    location: 'San Francisco, CA',
    salaryRange: { min: 180000, max: 280000, currency: 'USD', period: 'yearly' },
    median: 220000,
    percentile25: 195000,
    percentile75: 255000,
  },
  {
    role: 'Frontend Developer',
    category: 'Technology',
    experienceLevel: 'Entry Level',
    location: 'New York, NY',
    salaryRange: { min: 85000, max: 120000, currency: 'USD', period: 'yearly' },
    median: 100000,
    percentile25: 90000,
    percentile75: 115000,
  },
  {
    role: 'Frontend Developer',
    category: 'Technology',
    experienceLevel: 'Mid Level',
    location: 'New York, NY',
    salaryRange: { min: 120000, max: 170000, currency: 'USD', period: 'yearly' },
    median: 145000,
    percentile25: 130000,
    percentile75: 160000,
  },
  {
    role: 'Frontend Developer',
    category: 'Technology',
    experienceLevel: 'Senior Level',
    location: 'New York, NY',
    salaryRange: { min: 160000, max: 240000, currency: 'USD', period: 'yearly' },
    median: 195000,
    percentile25: 175000,
    percentile75: 220000,
  },
  {
    role: 'Backend Developer',
    category: 'Technology',
    experienceLevel: 'Entry Level',
    location: 'Austin, TX',
    salaryRange: { min: 75000, max: 110000, currency: 'USD', period: 'yearly' },
    median: 92000,
    percentile25: 82000,
    percentile75: 102000,
  },
  {
    role: 'Backend Developer',
    category: 'Technology',
    experienceLevel: 'Mid Level',
    location: 'Austin, TX',
    salaryRange: { min: 110000, max: 155000, currency: 'USD', period: 'yearly' },
    median: 130000,
    percentile25: 118000,
    percentile75: 145000,
  },
  {
    role: 'Data Scientist',
    category: 'Data Science',
    experienceLevel: 'Entry Level',
    location: 'Seattle, WA',
    salaryRange: { min: 95000, max: 130000, currency: 'USD', period: 'yearly' },
    median: 112000,
    percentile25: 102000,
    percentile75: 125000,
  },
  {
    role: 'Data Scientist',
    category: 'Data Science',
    experienceLevel: 'Senior Level',
    location: 'Seattle, WA',
    salaryRange: { min: 160000, max: 250000, currency: 'USD', period: 'yearly' },
    median: 200000,
    percentile25: 175000,
    percentile75: 230000,
  },
  {
    role: 'DevOps Engineer',
    category: 'Technology',
    experienceLevel: 'Mid Level',
    location: 'Denver, CO',
    salaryRange: { min: 110000, max: 160000, currency: 'USD', period: 'yearly' },
    median: 135000,
    percentile25: 120000,
    percentile75: 150000,
  },
  {
    role: 'Product Manager',
    category: 'Product Management',
    experienceLevel: 'Mid Level',
    location: 'San Francisco, CA',
    salaryRange: { min: 140000, max: 200000, currency: 'USD', period: 'yearly' },
    median: 170000,
    percentile25: 150000,
    percentile75: 185000,
  },
  {
    role: 'UX Designer',
    category: 'Design',
    experienceLevel: 'Mid Level',
    location: 'Los Angeles, CA',
    salaryRange: { min: 90000, max: 140000, currency: 'USD', period: 'yearly' },
    median: 115000,
    percentile25: 100000,
    percentile75: 130000,
  },
  {
    role: 'Machine Learning Engineer',
    category: 'Data Science',
    experienceLevel: 'Senior Level',
    location: 'San Francisco, CA',
    salaryRange: { min: 200000, max: 350000, currency: 'USD', period: 'yearly' },
    median: 265000,
    percentile25: 225000,
    percentile75: 310000,
  },
  {
    role: 'Full Stack Developer',
    category: 'Technology',
    experienceLevel: 'Mid Level',
    location: 'Remote',
    salaryRange: { min: 100000, max: 160000, currency: 'USD', period: 'yearly' },
    median: 130000,
    percentile25: 115000,
    percentile75: 145000,
  },
];

export const cityLivingCosts: CityLivingCost[] = [
  { city: 'San Francisco', country: 'USA', costIndex: 100, rentIndex: 100, groceriesIndex: 100, transportIndex: 100 },
  { city: 'New York', country: 'USA', costIndex: 95, rentIndex: 92, groceriesIndex: 98, transportIndex: 105 },
  { city: 'Seattle', country: 'USA', costIndex: 85, rentIndex: 78, groceriesIndex: 92, transportIndex: 88 },
  { city: 'Los Angeles', country: 'USA', costIndex: 82, rentIndex: 75, groceriesIndex: 95, transportIndex: 90 },
  { city: 'Austin', country: 'USA', costIndex: 65, rentIndex: 55, groceriesIndex: 88, transportIndex: 75 },
  { city: 'Denver', country: 'USA', costIndex: 68, rentIndex: 58, groceriesIndex: 90, transportIndex: 78 },
  { city: 'Chicago', country: 'USA', costIndex: 70, rentIndex: 60, groceriesIndex: 92, transportIndex: 95 },
  { city: 'Boston', country: 'USA', costIndex: 88, rentIndex: 82, groceriesIndex: 95, transportIndex: 98 },
  { city: 'Miami', country: 'USA', costIndex: 72, rentIndex: 65, groceriesIndex: 94, transportIndex: 82 },
  { city: 'Portland', country: 'USA', costIndex: 75, rentIndex: 68, groceriesIndex: 92, transportIndex: 85 },
  { city: 'Atlanta', country: 'USA', costIndex: 62, rentIndex: 52, groceriesIndex: 90, transportIndex: 78 },
  { city: 'Phoenix', country: 'USA', costIndex: 58, rentIndex: 48, groceriesIndex: 88, transportIndex: 72 },
];

export function getSalaryByRole(role: string): SalaryData[] {
  return salaryData.filter((s) => s.role.toLowerCase().includes(role.toLowerCase()));
}

export function getSalaryByLocation(location: string): SalaryData[] {
  return salaryData.filter((s) => s.location.toLowerCase().includes(location.toLowerCase()));
}

export function compareCities(city1: string, city2: string): { city1: CityLivingCost | undefined; city2: CityLivingCost | undefined } {
  return {
    city1: cityLivingCosts.find((c) => c.city.toLowerCase() === city1.toLowerCase()),
    city2: cityLivingCosts.find((c) => c.city.toLowerCase() === city2.toLowerCase()),
  };
}

export function getAverageSalaryByCategory(category: string): number {
  const filtered = salaryData.filter((s) => s.category === category);
  if (filtered.length === 0) return 0;
  return Math.round(filtered.reduce((sum, s) => sum + s.median, 0) / filtered.length);
}

export const roles = [...new Set(salaryData.map((s) => s.role))];
export const locations = [...new Set(salaryData.map((s) => s.location))];
export const categories = [...new Set(salaryData.map((s) => s.category))];
