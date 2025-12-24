import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Technology',
    icon: 'Monitor',
    jobCount: 1250,
    description: 'Software development, IT, and tech roles'
  },
  {
    id: 'cat-2',
    name: 'Design',
    icon: 'Palette',
    jobCount: 450,
    description: 'UI/UX, graphic design, and creative roles'
  },
  {
    id: 'cat-3',
    name: 'Marketing',
    icon: 'Megaphone',
    jobCount: 380,
    description: 'Digital marketing, SEO, and advertising'
  },
  {
    id: 'cat-4',
    name: 'Sales',
    icon: 'TrendingUp',
    jobCount: 520,
    description: 'Sales representatives and account managers'
  },
  {
    id: 'cat-5',
    name: 'Finance',
    icon: 'DollarSign',
    jobCount: 340,
    description: 'Banking, accounting, and financial services'
  },
  {
    id: 'cat-6',
    name: 'Healthcare',
    icon: 'Heart',
    jobCount: 680,
    description: 'Medical, nursing, and healthcare roles'
  },
  {
    id: 'cat-7',
    name: 'Education',
    icon: 'GraduationCap',
    jobCount: 290,
    description: 'Teaching, training, and education roles'
  },
  {
    id: 'cat-8',
    name: 'Engineering',
    icon: 'Wrench',
    jobCount: 410,
    description: 'Mechanical, electrical, and civil engineering'
  },
  {
    id: 'cat-9',
    name: 'Human Resources',
    icon: 'Users',
    jobCount: 180,
    description: 'HR, recruiting, and talent management'
  },
  {
    id: 'cat-10',
    name: 'Customer Service',
    icon: 'Headphones',
    jobCount: 350,
    description: 'Support, customer success, and service roles'
  },
  {
    id: 'cat-11',
    name: 'Legal',
    icon: 'Scale',
    jobCount: 120,
    description: 'Lawyers, paralegals, and legal professionals'
  },
  {
    id: 'cat-12',
    name: 'Operations',
    icon: 'Settings',
    jobCount: 280,
    description: 'Operations, logistics, and supply chain'
  },
  {
    id: 'cat-13',
    name: 'Data Science',
    icon: 'BarChart',
    jobCount: 320,
    description: 'Data analysis, ML, and AI roles'
  },
  {
    id: 'cat-14',
    name: 'Product Management',
    icon: 'Package',
    jobCount: 210,
    description: 'Product managers and product owners'
  },
  {
    id: 'cat-15',
    name: 'Content Writing',
    icon: 'FileText',
    jobCount: 190,
    description: 'Writers, editors, and content creators'
  },
  {
    id: 'cat-16',
    name: 'Other',
    icon: 'Briefcase',
    jobCount: 450,
    description: 'Various other professional roles'
  }
];

export const getCategoryByName = (name: string): Category | undefined => {
  return categories.find(cat => cat.name === name);
};

export const getTopCategories = (limit: number = 8): Category[] => {
  return [...categories].sort((a, b) => b.jobCount - a.jobCount).slice(0, limit);
};
