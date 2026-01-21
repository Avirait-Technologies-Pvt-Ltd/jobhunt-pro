/**
 * Job Market Insights - Sample Data and Query Helpers
 *
 * This file contains sample market insights data for development and testing,
 * as well as helper functions for querying and manipulating the data.
 */

import type {
  TrendingSkill,
  SalaryTrend,
  InDemandRole,
  IndustryGrowth,
  LocationComparison,
  InsightCategory,
  SalaryDataPoint,
} from '../types/market-insights';

// ============================================================================
// Helper to Create Dates
// ============================================================================

function monthsAgo(months: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split('T')[0];
}

function generateSalaryDataPoints(
  baseMedian: number,
  months: number,
  growthRate: number
): SalaryDataPoint[] {
  const points: SalaryDataPoint[] = [];
  const monthlyGrowth = growthRate / 12 / 100;

  for (let i = months; i >= 0; i--) {
    const factor = 1 + monthlyGrowth * (months - i);
    const median = Math.round(baseMedian * factor);
    points.push({
      date: monthsAgo(i),
      median,
      p25: Math.round(median * 0.8),
      p75: Math.round(median * 1.25),
    });
  }

  return points;
}

// ============================================================================
// Sample Trending Skills
// ============================================================================

export const trendingSkills: TrendingSkill[] = [
  {
    id: 'skill_001',
    name: 'Artificial Intelligence',
    category: 'technology',
    demandScore: 98,
    growthPercentage: 45.2,
    direction: 'rising',
    jobCount: 125000,
    avgSalaryImpact: 25,
    relatedSkills: ['Machine Learning', 'Python', 'TensorFlow', 'Deep Learning'],
  },
  {
    id: 'skill_002',
    name: 'Machine Learning',
    category: 'data-science',
    demandScore: 95,
    growthPercentage: 38.5,
    direction: 'rising',
    jobCount: 98000,
    avgSalaryImpact: 22,
    relatedSkills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics'],
  },
  {
    id: 'skill_003',
    name: 'Cloud Computing',
    category: 'technology',
    demandScore: 92,
    growthPercentage: 28.3,
    direction: 'rising',
    jobCount: 156000,
    avgSalaryImpact: 18,
    relatedSkills: ['AWS', 'Azure', 'GCP', 'Kubernetes'],
  },
  {
    id: 'skill_004',
    name: 'React',
    category: 'technology',
    demandScore: 90,
    growthPercentage: 15.8,
    direction: 'rising',
    jobCount: 89000,
    avgSalaryImpact: 12,
    relatedSkills: ['JavaScript', 'TypeScript', 'Next.js', 'Redux'],
  },
  {
    id: 'skill_005',
    name: 'Cybersecurity',
    category: 'technology',
    demandScore: 94,
    growthPercentage: 32.1,
    direction: 'rising',
    jobCount: 78000,
    avgSalaryImpact: 20,
    relatedSkills: ['Network Security', 'Penetration Testing', 'SIEM', 'Compliance'],
  },
  {
    id: 'skill_006',
    name: 'Data Engineering',
    category: 'data-science',
    demandScore: 88,
    growthPercentage: 35.2,
    direction: 'rising',
    jobCount: 67000,
    avgSalaryImpact: 19,
    relatedSkills: ['SQL', 'Spark', 'Airflow', 'Python'],
  },
  {
    id: 'skill_007',
    name: 'Product Management',
    category: 'product-management',
    demandScore: 85,
    growthPercentage: 18.5,
    direction: 'rising',
    jobCount: 54000,
    avgSalaryImpact: 15,
    relatedSkills: ['Agile', 'User Research', 'Analytics', 'Strategy'],
  },
  {
    id: 'skill_008',
    name: 'UX Design',
    category: 'design',
    demandScore: 83,
    growthPercentage: 22.4,
    direction: 'rising',
    jobCount: 48000,
    avgSalaryImpact: 14,
    relatedSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
  },
  {
    id: 'skill_009',
    name: 'DevOps',
    category: 'engineering',
    demandScore: 89,
    growthPercentage: 25.6,
    direction: 'rising',
    jobCount: 72000,
    avgSalaryImpact: 17,
    relatedSkills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
  },
  {
    id: 'skill_010',
    name: 'TypeScript',
    category: 'technology',
    demandScore: 87,
    growthPercentage: 42.3,
    direction: 'rising',
    jobCount: 76000,
    avgSalaryImpact: 13,
    relatedSkills: ['JavaScript', 'React', 'Node.js', 'Angular'],
  },
  {
    id: 'skill_011',
    name: 'Python',
    category: 'technology',
    demandScore: 93,
    growthPercentage: 12.5,
    direction: 'stable',
    jobCount: 185000,
    avgSalaryImpact: 15,
    relatedSkills: ['Django', 'FastAPI', 'Data Science', 'Automation'],
  },
  {
    id: 'skill_012',
    name: 'Kubernetes',
    category: 'engineering',
    demandScore: 86,
    growthPercentage: 38.7,
    direction: 'rising',
    jobCount: 52000,
    avgSalaryImpact: 21,
    relatedSkills: ['Docker', 'Cloud', 'DevOps', 'Microservices'],
  },
  {
    id: 'skill_013',
    name: 'Digital Marketing',
    category: 'marketing',
    demandScore: 75,
    growthPercentage: 8.2,
    direction: 'stable',
    jobCount: 95000,
    avgSalaryImpact: 8,
    relatedSkills: ['SEO', 'Content Marketing', 'Analytics', 'Social Media'],
  },
  {
    id: 'skill_014',
    name: 'Financial Analysis',
    category: 'finance',
    demandScore: 78,
    growthPercentage: 5.5,
    direction: 'stable',
    jobCount: 62000,
    avgSalaryImpact: 12,
    relatedSkills: ['Excel', 'Financial Modeling', 'Accounting', 'Forecasting'],
  },
  {
    id: 'skill_015',
    name: 'Healthcare IT',
    category: 'healthcare',
    demandScore: 82,
    growthPercentage: 28.9,
    direction: 'rising',
    jobCount: 45000,
    avgSalaryImpact: 16,
    relatedSkills: ['HIPAA', 'EHR Systems', 'Healthcare Analytics', 'Interoperability'],
  },
  {
    id: 'skill_016',
    name: 'Sales Operations',
    category: 'sales',
    demandScore: 72,
    growthPercentage: 11.3,
    direction: 'stable',
    jobCount: 38000,
    avgSalaryImpact: 10,
    relatedSkills: ['Salesforce', 'CRM', 'Analytics', 'Process Optimization'],
  },
  {
    id: 'skill_017',
    name: 'Blockchain',
    category: 'technology',
    demandScore: 68,
    growthPercentage: -8.5,
    direction: 'declining',
    jobCount: 18000,
    avgSalaryImpact: 22,
    relatedSkills: ['Solidity', 'Smart Contracts', 'Cryptocurrency', 'Web3'],
  },
  {
    id: 'skill_018',
    name: 'Natural Language Processing',
    category: 'data-science',
    demandScore: 91,
    growthPercentage: 52.1,
    direction: 'rising',
    jobCount: 35000,
    avgSalaryImpact: 28,
    relatedSkills: ['Python', 'Transformers', 'LLMs', 'Text Analytics'],
  },
  {
    id: 'skill_019',
    name: 'Golang',
    category: 'technology',
    demandScore: 81,
    growthPercentage: 28.4,
    direction: 'rising',
    jobCount: 32000,
    avgSalaryImpact: 18,
    relatedSkills: ['Microservices', 'Kubernetes', 'Cloud', 'APIs'],
  },
  {
    id: 'skill_020',
    name: 'Rust',
    category: 'technology',
    demandScore: 76,
    growthPercentage: 45.8,
    direction: 'rising',
    jobCount: 15000,
    avgSalaryImpact: 20,
    relatedSkills: ['Systems Programming', 'WebAssembly', 'Performance', 'Safety'],
  },
  {
    id: 'skill_021',
    name: 'GraphQL',
    category: 'technology',
    demandScore: 74,
    growthPercentage: 18.2,
    direction: 'rising',
    jobCount: 28000,
    avgSalaryImpact: 11,
    relatedSkills: ['APIs', 'React', 'Node.js', 'Apollo'],
  },
  {
    id: 'skill_022',
    name: 'Legacy Systems',
    category: 'technology',
    demandScore: 55,
    growthPercentage: -12.3,
    direction: 'declining',
    jobCount: 42000,
    avgSalaryImpact: 5,
    relatedSkills: ['COBOL', 'Mainframe', 'Migration', 'Enterprise'],
  },
];

// ============================================================================
// Sample Salary Trends
// ============================================================================

export const salaryTrends: SalaryTrend[] = [
  {
    id: 'salary_001',
    role: 'Software Engineer',
    location: 'San Francisco, CA',
    dataPoints: generateSalaryDataPoints(180000, 11, 8.5),
    currentMedian: 195000,
    changePercentage: 8.5,
    period: 'monthly',
  },
  {
    id: 'salary_002',
    role: 'Software Engineer',
    location: 'New York, NY',
    dataPoints: generateSalaryDataPoints(165000, 11, 7.2),
    currentMedian: 177000,
    changePercentage: 7.2,
    period: 'monthly',
  },
  {
    id: 'salary_003',
    role: 'Software Engineer',
    location: 'Austin, TX',
    dataPoints: generateSalaryDataPoints(145000, 11, 12.5),
    currentMedian: 163000,
    changePercentage: 12.5,
    period: 'monthly',
  },
  {
    id: 'salary_004',
    role: 'Data Scientist',
    location: 'San Francisco, CA',
    dataPoints: generateSalaryDataPoints(175000, 11, 10.2),
    currentMedian: 193000,
    changePercentage: 10.2,
    period: 'monthly',
  },
  {
    id: 'salary_005',
    role: 'Data Scientist',
    location: 'Seattle, WA',
    dataPoints: generateSalaryDataPoints(160000, 11, 9.8),
    currentMedian: 176000,
    changePercentage: 9.8,
    period: 'monthly',
  },
  {
    id: 'salary_006',
    role: 'Product Manager',
    location: 'San Francisco, CA',
    dataPoints: generateSalaryDataPoints(185000, 11, 6.5),
    currentMedian: 197000,
    changePercentage: 6.5,
    period: 'monthly',
  },
  {
    id: 'salary_007',
    role: 'Product Manager',
    location: 'New York, NY',
    dataPoints: generateSalaryDataPoints(170000, 11, 5.8),
    currentMedian: 180000,
    changePercentage: 5.8,
    period: 'monthly',
  },
  {
    id: 'salary_008',
    role: 'UX Designer',
    location: 'San Francisco, CA',
    dataPoints: generateSalaryDataPoints(140000, 11, 7.5),
    currentMedian: 150500,
    changePercentage: 7.5,
    period: 'monthly',
  },
  {
    id: 'salary_009',
    role: 'DevOps Engineer',
    location: 'Remote',
    dataPoints: generateSalaryDataPoints(155000, 11, 11.2),
    currentMedian: 172000,
    changePercentage: 11.2,
    period: 'monthly',
  },
  {
    id: 'salary_010',
    role: 'Machine Learning Engineer',
    location: 'San Francisco, CA',
    dataPoints: generateSalaryDataPoints(200000, 11, 15.5),
    currentMedian: 231000,
    changePercentage: 15.5,
    period: 'monthly',
  },
  {
    id: 'salary_011',
    role: 'Frontend Developer',
    location: 'Remote',
    dataPoints: generateSalaryDataPoints(125000, 11, 8.8),
    currentMedian: 136000,
    changePercentage: 8.8,
    period: 'monthly',
  },
  {
    id: 'salary_012',
    role: 'Backend Developer',
    location: 'Seattle, WA',
    dataPoints: generateSalaryDataPoints(165000, 11, 7.5),
    currentMedian: 177000,
    changePercentage: 7.5,
    period: 'monthly',
  },
];

// ============================================================================
// Sample In-Demand Roles
// ============================================================================

export const inDemandRoles: InDemandRole[] = [
  {
    id: 'role_001',
    title: 'AI/ML Engineer',
    category: 'data-science',
    demandScore: 98,
    openPositions: 45000,
    growthRate: 48.5,
    avgSalary: 195000,
    salaryRange: { min: 150000, max: 280000 },
    topSkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'],
    topLocations: ['San Francisco', 'New York', 'Seattle', 'Remote'],
    competitionLevel: 'medium',
    remotePercentage: 65,
  },
  {
    id: 'role_002',
    title: 'Full Stack Developer',
    category: 'technology',
    demandScore: 92,
    openPositions: 78000,
    growthRate: 22.3,
    avgSalary: 155000,
    salaryRange: { min: 100000, max: 220000 },
    topSkills: ['React', 'Node.js', 'TypeScript', 'SQL', 'AWS'],
    topLocations: ['San Francisco', 'New York', 'Austin', 'Remote'],
    competitionLevel: 'high',
    remotePercentage: 72,
  },
  {
    id: 'role_003',
    title: 'Cloud Solutions Architect',
    category: 'engineering',
    demandScore: 94,
    openPositions: 35000,
    growthRate: 32.1,
    avgSalary: 185000,
    salaryRange: { min: 140000, max: 260000 },
    topSkills: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Architecture'],
    topLocations: ['Seattle', 'San Francisco', 'New York', 'Remote'],
    competitionLevel: 'medium',
    remotePercentage: 58,
  },
  {
    id: 'role_004',
    title: 'Cybersecurity Analyst',
    category: 'technology',
    demandScore: 93,
    openPositions: 42000,
    growthRate: 35.8,
    avgSalary: 145000,
    salaryRange: { min: 95000, max: 200000 },
    topSkills: ['Security Operations', 'SIEM', 'Threat Detection', 'Compliance', 'Incident Response'],
    topLocations: ['Washington DC', 'New York', 'San Francisco', 'Remote'],
    competitionLevel: 'low',
    remotePercentage: 45,
  },
  {
    id: 'role_005',
    title: 'Data Engineer',
    category: 'data-science',
    demandScore: 90,
    openPositions: 52000,
    growthRate: 38.2,
    avgSalary: 165000,
    salaryRange: { min: 120000, max: 230000 },
    topSkills: ['Python', 'SQL', 'Spark', 'Airflow', 'Data Modeling'],
    topLocations: ['San Francisco', 'New York', 'Seattle', 'Remote'],
    competitionLevel: 'medium',
    remotePercentage: 68,
  },
  {
    id: 'role_006',
    title: 'Product Manager',
    category: 'product-management',
    demandScore: 88,
    openPositions: 38000,
    growthRate: 18.5,
    avgSalary: 175000,
    salaryRange: { min: 120000, max: 250000 },
    topSkills: ['Product Strategy', 'User Research', 'Agile', 'Analytics', 'Roadmapping'],
    topLocations: ['San Francisco', 'New York', 'Boston', 'Remote'],
    competitionLevel: 'very-high',
    remotePercentage: 55,
  },
  {
    id: 'role_007',
    title: 'Senior UX Designer',
    category: 'design',
    demandScore: 85,
    openPositions: 28000,
    growthRate: 24.6,
    avgSalary: 145000,
    salaryRange: { min: 100000, max: 200000 },
    topSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
    topLocations: ['San Francisco', 'New York', 'Los Angeles', 'Remote'],
    competitionLevel: 'high',
    remotePercentage: 70,
  },
  {
    id: 'role_008',
    title: 'DevOps Engineer',
    category: 'engineering',
    demandScore: 91,
    openPositions: 48000,
    growthRate: 28.4,
    avgSalary: 160000,
    salaryRange: { min: 115000, max: 220000 },
    topSkills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS'],
    topLocations: ['San Francisco', 'Seattle', 'Austin', 'Remote'],
    competitionLevel: 'medium',
    remotePercentage: 75,
  },
  {
    id: 'role_009',
    title: 'Healthcare Data Analyst',
    category: 'healthcare',
    demandScore: 82,
    openPositions: 25000,
    growthRate: 32.5,
    avgSalary: 110000,
    salaryRange: { min: 75000, max: 155000 },
    topSkills: ['SQL', 'Healthcare Analytics', 'HIPAA', 'Tableau', 'Clinical Data'],
    topLocations: ['Boston', 'Chicago', 'Remote', 'Philadelphia'],
    competitionLevel: 'low',
    remotePercentage: 50,
  },
  {
    id: 'role_010',
    title: 'Growth Marketing Manager',
    category: 'marketing',
    demandScore: 78,
    openPositions: 22000,
    growthRate: 15.8,
    avgSalary: 125000,
    salaryRange: { min: 85000, max: 180000 },
    topSkills: ['Digital Marketing', 'SEO', 'Analytics', 'A/B Testing', 'Content Strategy'],
    topLocations: ['San Francisco', 'New York', 'Los Angeles', 'Remote'],
    competitionLevel: 'high',
    remotePercentage: 62,
  },
  {
    id: 'role_011',
    title: 'Financial Analyst',
    category: 'finance',
    demandScore: 76,
    openPositions: 35000,
    growthRate: 8.2,
    avgSalary: 95000,
    salaryRange: { min: 65000, max: 140000 },
    topSkills: ['Financial Modeling', 'Excel', 'SQL', 'Forecasting', 'Reporting'],
    topLocations: ['New York', 'Chicago', 'Boston', 'San Francisco'],
    competitionLevel: 'high',
    remotePercentage: 35,
  },
  {
    id: 'role_012',
    title: 'Sales Engineer',
    category: 'sales',
    demandScore: 80,
    openPositions: 18000,
    growthRate: 22.1,
    avgSalary: 140000,
    salaryRange: { min: 100000, max: 200000 },
    topSkills: ['Technical Sales', 'Product Demo', 'API Knowledge', 'CRM', 'Negotiation'],
    topLocations: ['San Francisco', 'New York', 'Austin', 'Remote'],
    competitionLevel: 'medium',
    remotePercentage: 55,
  },
  {
    id: 'role_013',
    title: 'Backend Engineer',
    category: 'technology',
    demandScore: 89,
    openPositions: 62000,
    growthRate: 18.9,
    avgSalary: 165000,
    salaryRange: { min: 110000, max: 230000 },
    topSkills: ['Python', 'Java', 'Golang', 'SQL', 'Microservices'],
    topLocations: ['San Francisco', 'Seattle', 'New York', 'Remote'],
    competitionLevel: 'medium',
    remotePercentage: 68,
  },
  {
    id: 'role_014',
    title: 'Site Reliability Engineer',
    category: 'engineering',
    demandScore: 87,
    openPositions: 22000,
    growthRate: 35.2,
    avgSalary: 175000,
    salaryRange: { min: 130000, max: 250000 },
    topSkills: ['Kubernetes', 'Monitoring', 'Automation', 'Python', 'Linux'],
    topLocations: ['San Francisco', 'Seattle', 'New York', 'Remote'],
    competitionLevel: 'low',
    remotePercentage: 70,
  },
  {
    id: 'role_015',
    title: 'Mobile Developer',
    category: 'technology',
    demandScore: 84,
    openPositions: 32000,
    growthRate: 12.5,
    avgSalary: 150000,
    salaryRange: { min: 100000, max: 210000 },
    topSkills: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Mobile Architecture'],
    topLocations: ['San Francisco', 'New York', 'Los Angeles', 'Remote'],
    competitionLevel: 'medium',
    remotePercentage: 65,
  },
];

// ============================================================================
// Sample Industry Growth
// ============================================================================

export const industryGrowth: IndustryGrowth[] = [
  {
    id: 'industry_001',
    industry: 'Artificial Intelligence',
    indicator: 'high-growth',
    growthRate: 42.5,
    jobsCreated: 285000,
    topRoles: ['AI/ML Engineer', 'Data Scientist', 'Research Scientist'],
    description: 'AI continues to transform industries with explosive job growth',
  },
  {
    id: 'industry_002',
    industry: 'Cloud Computing',
    indicator: 'high-growth',
    growthRate: 28.8,
    jobsCreated: 420000,
    topRoles: ['Cloud Architect', 'DevOps Engineer', 'SRE'],
    description: 'Cloud adoption accelerating across all sectors',
  },
  {
    id: 'industry_003',
    industry: 'Cybersecurity',
    indicator: 'high-growth',
    growthRate: 35.2,
    jobsCreated: 180000,
    topRoles: ['Security Analyst', 'Security Engineer', 'CISO'],
    description: 'Critical need for security professionals amid rising threats',
  },
  {
    id: 'industry_004',
    industry: 'Healthcare Technology',
    indicator: 'high-growth',
    growthRate: 32.1,
    jobsCreated: 150000,
    topRoles: ['Healthcare Data Analyst', 'Health IT Specialist', 'Clinical Informatics'],
    description: 'Digital transformation of healthcare driving demand',
  },
  {
    id: 'industry_005',
    industry: 'FinTech',
    indicator: 'moderate-growth',
    growthRate: 18.5,
    jobsCreated: 95000,
    topRoles: ['Backend Engineer', 'Data Engineer', 'Product Manager'],
    description: 'Continued innovation in digital finance services',
  },
  {
    id: 'industry_006',
    industry: 'E-Commerce',
    indicator: 'moderate-growth',
    growthRate: 15.2,
    jobsCreated: 220000,
    topRoles: ['Full Stack Developer', 'Data Analyst', 'Supply Chain Analyst'],
    description: 'Steady growth as online retail matures',
  },
  {
    id: 'industry_007',
    industry: 'EdTech',
    indicator: 'moderate-growth',
    growthRate: 22.8,
    jobsCreated: 65000,
    topRoles: ['Product Manager', 'UX Designer', 'Full Stack Developer'],
    description: 'Online learning platforms continue expansion',
  },
  {
    id: 'industry_008',
    industry: 'Clean Energy',
    indicator: 'high-growth',
    growthRate: 38.5,
    jobsCreated: 125000,
    topRoles: ['Energy Analyst', 'Software Engineer', 'Project Manager'],
    description: 'Renewable energy sector experiencing rapid growth',
  },
  {
    id: 'industry_009',
    industry: 'Traditional Banking',
    indicator: 'stable',
    growthRate: 3.2,
    jobsCreated: 45000,
    topRoles: ['Financial Analyst', 'Risk Analyst', 'Compliance Officer'],
    description: 'Stable employment with gradual digital transformation',
  },
  {
    id: 'industry_010',
    industry: 'Traditional Retail',
    indicator: 'declining',
    growthRate: -5.8,
    jobsCreated: -35000,
    topRoles: ['Store Manager', 'Sales Associate', 'Inventory Specialist'],
    description: 'Continued shift to e-commerce affecting traditional retail',
  },
  {
    id: 'industry_011',
    industry: 'Gaming',
    indicator: 'moderate-growth',
    growthRate: 16.5,
    jobsCreated: 55000,
    topRoles: ['Game Developer', 'Unity Developer', '3D Artist'],
    description: 'Gaming industry continues steady expansion',
  },
  {
    id: 'industry_012',
    industry: 'Autonomous Vehicles',
    indicator: 'high-growth',
    growthRate: 45.2,
    jobsCreated: 42000,
    topRoles: ['Robotics Engineer', 'ML Engineer', 'Computer Vision Engineer'],
    description: 'Self-driving technology advancing rapidly',
  },
];

// ============================================================================
// Sample Location Comparisons
// ============================================================================

export const locationComparisons: LocationComparison[] = [
  {
    id: 'loc_001',
    location: 'San Francisco, CA',
    region: 'West Coast',
    avgSalary: 185000,
    costOfLivingIndex: 189.3,
    adjustedSalary: 97700,
    remoteJobPercentage: 72,
    topIndustries: ['Technology', 'FinTech', 'AI'],
    jobGrowthRate: 8.5,
  },
  {
    id: 'loc_002',
    location: 'New York, NY',
    region: 'East Coast',
    avgSalary: 168000,
    costOfLivingIndex: 187.2,
    adjustedSalary: 89700,
    remoteJobPercentage: 58,
    topIndustries: ['Finance', 'Technology', 'Media'],
    jobGrowthRate: 6.2,
  },
  {
    id: 'loc_003',
    location: 'Seattle, WA',
    region: 'West Coast',
    avgSalary: 175000,
    costOfLivingIndex: 172.5,
    adjustedSalary: 101400,
    remoteJobPercentage: 68,
    topIndustries: ['Technology', 'Cloud', 'E-Commerce'],
    jobGrowthRate: 9.8,
  },
  {
    id: 'loc_004',
    location: 'Austin, TX',
    region: 'South',
    avgSalary: 155000,
    costOfLivingIndex: 119.8,
    adjustedSalary: 129400,
    remoteJobPercentage: 65,
    topIndustries: ['Technology', 'Clean Energy', 'Healthcare'],
    jobGrowthRate: 15.2,
  },
  {
    id: 'loc_005',
    location: 'Denver, CO',
    region: 'Mountain',
    avgSalary: 145000,
    costOfLivingIndex: 128.5,
    adjustedSalary: 112800,
    remoteJobPercentage: 70,
    topIndustries: ['Technology', 'Aerospace', 'Healthcare'],
    jobGrowthRate: 11.5,
  },
  {
    id: 'loc_006',
    location: 'Boston, MA',
    region: 'East Coast',
    avgSalary: 162000,
    costOfLivingIndex: 152.4,
    adjustedSalary: 106300,
    remoteJobPercentage: 55,
    topIndustries: ['Healthcare', 'FinTech', 'EdTech'],
    jobGrowthRate: 7.8,
  },
  {
    id: 'loc_007',
    location: 'Chicago, IL',
    region: 'Midwest',
    avgSalary: 138000,
    costOfLivingIndex: 107.3,
    adjustedSalary: 128600,
    remoteJobPercentage: 52,
    topIndustries: ['Finance', 'Manufacturing', 'Healthcare'],
    jobGrowthRate: 5.2,
  },
  {
    id: 'loc_008',
    location: 'Remote (US)',
    region: 'Remote',
    avgSalary: 148000,
    costOfLivingIndex: 100.0,
    adjustedSalary: 148000,
    remoteJobPercentage: 100,
    topIndustries: ['Technology', 'SaaS', 'Consulting'],
    jobGrowthRate: 22.5,
  },
  {
    id: 'loc_009',
    location: 'Los Angeles, CA',
    region: 'West Coast',
    avgSalary: 158000,
    costOfLivingIndex: 166.2,
    adjustedSalary: 95100,
    remoteJobPercentage: 60,
    topIndustries: ['Entertainment', 'Technology', 'Aerospace'],
    jobGrowthRate: 6.8,
  },
  {
    id: 'loc_010',
    location: 'Atlanta, GA',
    region: 'South',
    avgSalary: 135000,
    costOfLivingIndex: 108.6,
    adjustedSalary: 124300,
    remoteJobPercentage: 58,
    topIndustries: ['FinTech', 'Logistics', 'Healthcare'],
    jobGrowthRate: 10.2,
  },
  {
    id: 'loc_011',
    location: 'Miami, FL',
    region: 'South',
    avgSalary: 128000,
    costOfLivingIndex: 132.5,
    adjustedSalary: 96600,
    remoteJobPercentage: 55,
    topIndustries: ['FinTech', 'Healthcare', 'Tourism'],
    jobGrowthRate: 8.5,
  },
  {
    id: 'loc_012',
    location: 'Raleigh, NC',
    region: 'South',
    avgSalary: 132000,
    costOfLivingIndex: 103.2,
    adjustedSalary: 127900,
    remoteJobPercentage: 62,
    topIndustries: ['Technology', 'Biotech', 'Healthcare'],
    jobGrowthRate: 13.8,
  },
];

// ============================================================================
// Query Helper Functions
// ============================================================================

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: InsightCategory): TrendingSkill[] {
  return trendingSkills.filter((skill) => skill.category === category);
}

/**
 * Get top trending skills by demand score
 */
export function getTopTrendingSkills(limit: number = 10): TrendingSkill[] {
  return [...trendingSkills]
    .sort((a, b) => b.demandScore - a.demandScore)
    .slice(0, limit);
}

/**
 * Get skills by minimum demand score
 */
export function getSkillsByMinDemand(minScore: number): TrendingSkill[] {
  return trendingSkills.filter((skill) => skill.demandScore >= minScore);
}

/**
 * Get salary trends by role
 */
export function getSalaryTrendsByRole(role: string): SalaryTrend[] {
  const lowerRole = role.toLowerCase();
  return salaryTrends.filter((trend) =>
    trend.role.toLowerCase().includes(lowerRole)
  );
}

/**
 * Get salary trends by location
 */
export function getSalaryTrendsByLocation(location: string): SalaryTrend[] {
  const lowerLocation = location.toLowerCase();
  return salaryTrends.filter((trend) =>
    trend.location.toLowerCase().includes(lowerLocation)
  );
}

/**
 * Get top in-demand roles
 */
export function getTopInDemandRoles(limit: number = 10): InDemandRole[] {
  return [...inDemandRoles]
    .sort((a, b) => b.demandScore - a.demandScore)
    .slice(0, limit);
}

/**
 * Get roles by category
 */
export function getRolesByCategory(category: InsightCategory): InDemandRole[] {
  return inDemandRoles.filter((role) => role.category === category);
}

/**
 * Get high growth industries
 */
export function getHighGrowthIndustries(): IndustryGrowth[] {
  return industryGrowth.filter(
    (industry) => industry.indicator === 'high-growth'
  );
}

/**
 * Get industries by growth indicator
 */
export function getIndustriesByGrowth(
  indicator: IndustryGrowth['indicator']
): IndustryGrowth[] {
  return industryGrowth.filter((industry) => industry.indicator === indicator);
}

/**
 * Compare two locations
 */
export function compareLocations(
  loc1: string,
  loc2: string
): { location1: LocationComparison | undefined; location2: LocationComparison | undefined } {
  const location1 = locationComparisons.find((loc) =>
    loc.location.toLowerCase().includes(loc1.toLowerCase())
  );
  const location2 = locationComparisons.find((loc) =>
    loc.location.toLowerCase().includes(loc2.toLowerCase())
  );
  return { location1, location2 };
}

/**
 * Get locations by region
 */
export function getLocationsByRegion(region: string): LocationComparison[] {
  return locationComparisons.filter((loc) =>
    loc.region.toLowerCase() === region.toLowerCase()
  );
}

/**
 * Get top remote-friendly locations
 */
export function getTopRemoteLocations(limit: number = 5): LocationComparison[] {
  return [...locationComparisons]
    .sort((a, b) => b.remoteJobPercentage - a.remoteJobPercentage)
    .slice(0, limit);
}

/**
 * Get locations by minimum adjusted salary
 */
export function getLocationsByMinAdjustedSalary(
  minSalary: number
): LocationComparison[] {
  return locationComparisons.filter((loc) => loc.adjustedSalary >= minSalary);
}

/**
 * Get skill by ID
 */
export function getSkillById(id: string): TrendingSkill | undefined {
  return trendingSkills.find((skill) => skill.id === id);
}

/**
 * Get role by ID
 */
export function getRoleById(id: string): InDemandRole | undefined {
  return inDemandRoles.find((role) => role.id === id);
}

/**
 * Get industry by ID
 */
export function getIndustryById(id: string): IndustryGrowth | undefined {
  return industryGrowth.find((industry) => industry.id === id);
}

/**
 * Get location by ID
 */
export function getLocationById(id: string): LocationComparison | undefined {
  return locationComparisons.find((loc) => loc.id === id);
}

/**
 * Search skills by name
 */
export function searchSkills(query: string): TrendingSkill[] {
  const lowerQuery = query.toLowerCase();
  return trendingSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.relatedSkills.some((rs) => rs.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Search roles by title
 */
export function searchRoles(query: string): InDemandRole[] {
  const lowerQuery = query.toLowerCase();
  return inDemandRoles.filter(
    (role) =>
      role.title.toLowerCase().includes(lowerQuery) ||
      role.topSkills.some((skill) => skill.toLowerCase().includes(lowerQuery))
  );
}

// ============================================================================
// Exports
// ============================================================================

export default {
  trendingSkills,
  salaryTrends,
  inDemandRoles,
  industryGrowth,
  locationComparisons,
};
