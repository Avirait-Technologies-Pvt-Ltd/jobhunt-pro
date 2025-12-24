import { Job } from '@/types';
import { companies } from './companies';

export const jobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: companies[0],
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 150000, max: 200000, currency: 'USD', period: 'yearly' },
    description: 'We are looking for a Senior Frontend Developer to join our engineering team. You will be responsible for building and maintaining our web applications using React, TypeScript, and modern frontend technologies. You will work closely with designers and backend engineers to deliver exceptional user experiences.',
    requirements: [
      '5+ years of experience in frontend development',
      'Expert knowledge of React and TypeScript',
      'Experience with state management (Redux, Zustand, or similar)',
      'Strong understanding of web performance optimization',
      'Experience with testing frameworks (Jest, Cypress)',
      'Excellent communication and collaboration skills'
    ],
    responsibilities: [
      'Develop and maintain high-quality web applications',
      'Collaborate with design team to implement pixel-perfect UIs',
      'Write clean, maintainable, and well-tested code',
      'Mentor junior developers and conduct code reviews',
      'Participate in architectural decisions and technical planning',
      'Optimize applications for maximum performance'
    ],
    benefits: ['Health Insurance', 'Remote Work', '401k Match', 'Unlimited PTO', 'Stock Options'],
    skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'GraphQL', 'Jest'],
    category: 'Technology',
    remote: true,
    urgent: false,
    featured: true,
    applicants: 45,
    postedDate: '2024-12-20',
    deadline: '2025-01-20',
    status: 'active'
  },
  {
    id: 'job-2',
    title: 'UX/UI Designer',
    company: companies[1],
    location: 'Los Angeles, CA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 90000, max: 130000, currency: 'USD', period: 'yearly' },
    description: 'Join our creative team as a UX/UI Designer. You will be responsible for creating beautiful and intuitive user interfaces for our clients across various industries. This role requires a strong portfolio demonstrating your design skills and user-centered approach.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma and Adobe Creative Suite',
      'Strong portfolio showcasing web and mobile designs',
      'Understanding of user research and usability testing',
      'Knowledge of design systems and component libraries',
      'Excellent visual design skills'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Develop and maintain design systems',
      'Collaborate with developers to ensure design implementation',
      'Present designs to clients and stakeholders',
      'Stay updated on design trends and best practices'
    ],
    benefits: ['Health Insurance', 'Creative Sabbatical', 'Design Conference Budget', 'Flexible Hours'],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
    category: 'Design',
    remote: false,
    urgent: true,
    featured: true,
    applicants: 67,
    postedDate: '2024-12-18',
    deadline: '2025-01-15',
    status: 'active'
  },
  {
    id: 'job-3',
    title: 'Financial Analyst',
    company: companies[2],
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 85000, max: 120000, currency: 'USD', period: 'yearly' },
    description: 'We are seeking a Financial Analyst to join our corporate finance team. You will analyze financial data, prepare reports, and provide insights to support strategic decision-making. This role offers excellent growth opportunities in a leading financial institution.',
    requirements: [
      'Bachelor\'s degree in Finance, Accounting, or related field',
      '3+ years of financial analysis experience',
      'Advanced Excel and financial modeling skills',
      'Experience with financial software (Bloomberg, FactSet)',
      'CFA or MBA preferred',
      'Strong analytical and problem-solving skills'
    ],
    responsibilities: [
      'Analyze financial statements and market trends',
      'Build and maintain financial models',
      'Prepare reports and presentations for leadership',
      'Support budgeting and forecasting processes',
      'Identify opportunities for cost savings and revenue growth',
      'Collaborate with cross-functional teams on strategic initiatives'
    ],
    benefits: ['Competitive Bonus', 'Pension Plan', 'Professional Development', 'Gym Subsidy'],
    skills: ['Financial Modeling', 'Excel', 'Bloomberg', 'SQL', 'PowerBI', 'Valuation'],
    category: 'Finance',
    remote: false,
    urgent: false,
    featured: true,
    applicants: 89,
    postedDate: '2024-12-15',
    deadline: '2025-01-30',
    status: 'active'
  },
  {
    id: 'job-4',
    title: 'Registered Nurse (RN)',
    company: companies[3],
    location: 'Boston, MA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 75000, max: 95000, currency: 'USD', period: 'yearly' },
    description: 'HealthPlus Medical is hiring Registered Nurses for our state-of-the-art medical facility. Join our compassionate team dedicated to providing exceptional patient care. Multiple shifts available with opportunities for career advancement.',
    requirements: [
      'Active RN license in Massachusetts',
      'BSN preferred, ADN accepted',
      '2+ years of clinical nursing experience',
      'BLS and ACLS certifications',
      'Strong patient care and communication skills',
      'Ability to work rotating shifts'
    ],
    responsibilities: [
      'Provide direct patient care and treatment',
      'Administer medications and monitor patient conditions',
      'Collaborate with physicians and healthcare team',
      'Document patient information accurately',
      'Educate patients and families on health management',
      'Maintain compliance with healthcare regulations'
    ],
    benefits: ['Health Benefits', 'CME Credits', 'Tuition Reimbursement', 'Retirement Plan'],
    skills: ['Patient Care', 'Clinical Skills', 'Electronic Health Records', 'Critical Thinking', 'Team Collaboration'],
    category: 'Healthcare',
    remote: false,
    urgent: true,
    featured: false,
    applicants: 34,
    postedDate: '2024-12-22',
    deadline: '2025-02-01',
    status: 'active'
  },
  {
    id: 'job-5',
    title: 'Backend Engineer',
    company: companies[0],
    location: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 140000, max: 180000, currency: 'USD', period: 'yearly' },
    description: 'We are looking for a Senior Backend Engineer to design and build scalable APIs and services. You will work on high-traffic systems that serve millions of users. Experience with distributed systems and cloud architecture is essential.',
    requirements: [
      '5+ years of backend development experience',
      'Proficiency in Python, Go, or Node.js',
      'Experience with PostgreSQL, MongoDB, and Redis',
      'Knowledge of AWS or GCP services',
      'Understanding of microservices architecture',
      'Experience with CI/CD pipelines'
    ],
    responsibilities: [
      'Design and implement RESTful and GraphQL APIs',
      'Build and maintain microservices',
      'Optimize database performance and queries',
      'Implement security best practices',
      'Write comprehensive tests and documentation',
      'Participate in on-call rotations'
    ],
    benefits: ['Remote Work', 'Stock Options', 'Unlimited PTO', 'Home Office Stipend'],
    skills: ['Python', 'Go', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'],
    category: 'Technology',
    remote: true,
    urgent: false,
    featured: true,
    applicants: 78,
    postedDate: '2024-12-19',
    deadline: '2025-01-25',
    status: 'active'
  },
  {
    id: 'job-6',
    title: 'Digital Marketing Manager',
    company: companies[6],
    location: 'Chicago, IL',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 80000, max: 110000, currency: 'USD', period: 'yearly' },
    description: 'MarketPro Agency is seeking a Digital Marketing Manager to lead campaigns for our diverse client portfolio. You will develop strategies, manage teams, and drive measurable results across digital channels.',
    requirements: [
      '4+ years of digital marketing experience',
      'Experience managing paid and organic campaigns',
      'Proficiency in Google Analytics, Ads, and Meta Business Suite',
      'Strong understanding of SEO and content marketing',
      'Excellent project management skills',
      'Data-driven decision making ability'
    ],
    responsibilities: [
      'Develop and execute digital marketing strategies',
      'Manage PPC, SEO, and social media campaigns',
      'Analyze campaign performance and optimize ROI',
      'Lead and mentor marketing team members',
      'Present reports and insights to clients',
      'Stay current with digital marketing trends'
    ],
    benefits: ['Performance Bonuses', 'Remote Options', 'Marketing Certifications', 'Team Events'],
    skills: ['Google Analytics', 'SEO', 'PPC', 'Social Media Marketing', 'Content Strategy', 'HubSpot'],
    category: 'Marketing',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 56,
    postedDate: '2024-12-17',
    deadline: '2025-01-20',
    status: 'active'
  },
  {
    id: 'job-7',
    title: 'Data Scientist',
    company: companies[7],
    location: 'Seattle, WA',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 130000, max: 170000, currency: 'USD', period: 'yearly' },
    description: 'DataDriven Analytics is hiring a Senior Data Scientist to develop machine learning models and drive insights from complex datasets. You will work on challenging problems across various industries.',
    requirements: [
      'MS/PhD in Computer Science, Statistics, or related field',
      '4+ years of data science experience',
      'Expert in Python and machine learning libraries',
      'Experience with deep learning frameworks',
      'Strong statistical analysis skills',
      'Excellent communication and visualization skills'
    ],
    responsibilities: [
      'Develop and deploy machine learning models',
      'Analyze large datasets to extract insights',
      'Build data pipelines and feature engineering',
      'Collaborate with stakeholders on business problems',
      'Present findings to technical and non-technical audiences',
      'Mentor junior data scientists'
    ],
    benefits: ['Equity', 'Remote-First', 'Conference Budget', 'Learning Stipend'],
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Spark', 'Statistics'],
    category: 'Data Science',
    remote: true,
    urgent: false,
    featured: true,
    applicants: 92,
    postedDate: '2024-12-16',
    deadline: '2025-01-28',
    status: 'active'
  },
  {
    id: 'job-8',
    title: 'Product Manager',
    company: companies[10],
    location: 'Portland, OR',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 120000, max: 160000, currency: 'USD', period: 'yearly' },
    description: 'CloudNine Systems is looking for a Product Manager to lead our cloud infrastructure products. You will define product vision, work with engineering teams, and deliver features that delight customers.',
    requirements: [
      '5+ years of product management experience',
      'Technical background or experience with cloud products',
      'Strong analytical and problem-solving skills',
      'Excellent communication and stakeholder management',
      'Experience with agile methodologies',
      'Track record of successful product launches'
    ],
    responsibilities: [
      'Define product roadmap and strategy',
      'Gather and prioritize product requirements',
      'Work closely with engineering and design teams',
      'Analyze user feedback and market trends',
      'Define success metrics and track KPIs',
      'Communicate product vision to stakeholders'
    ],
    benefits: ['Stock Options', 'Remote Work', 'Unlimited PTO', 'Home Office Budget'],
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research', 'Roadmapping', 'JIRA'],
    category: 'Product Management',
    remote: true,
    urgent: false,
    featured: false,
    applicants: 43,
    postedDate: '2024-12-21',
    deadline: '2025-01-31',
    status: 'active'
  },
  {
    id: 'job-9',
    title: 'Corporate Attorney',
    company: companies[8],
    location: 'Washington, DC',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 180000, max: 250000, currency: 'USD', period: 'yearly' },
    description: 'LegalEase Partners is seeking a Corporate Attorney to join our M&A practice. You will advise clients on complex transactions, negotiate deals, and provide strategic legal counsel.',
    requirements: [
      'JD from accredited law school',
      'Active bar admission',
      '6+ years of corporate law experience',
      'M&A transaction experience',
      'Strong negotiation and drafting skills',
      'Business development experience preferred'
    ],
    responsibilities: [
      'Advise clients on M&A transactions',
      'Draft and negotiate transaction documents',
      'Conduct due diligence reviews',
      'Manage deal processes and timelines',
      'Mentor junior attorneys',
      'Develop client relationships'
    ],
    benefits: ['Partnership Track', 'Comprehensive Benefits', 'Bar Dues Paid', 'CLE Budget'],
    skills: ['M&A', 'Corporate Law', 'Contract Negotiation', 'Due Diligence', 'Securities Law'],
    category: 'Legal',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 28,
    postedDate: '2024-12-14',
    deadline: '2025-02-15',
    status: 'active'
  },
  {
    id: 'job-10',
    title: 'Customer Success Manager',
    company: companies[4],
    location: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 70000, max: 95000, currency: 'USD', period: 'yearly' },
    description: 'EduLearn Academy is hiring a Customer Success Manager to ensure our learners and enterprise clients achieve their goals. You will be the primary point of contact for key accounts.',
    requirements: [
      '3+ years of customer success or account management',
      'Experience in EdTech or SaaS industry',
      'Strong relationship building skills',
      'Data-driven approach to customer health',
      'Excellent communication skills',
      'Experience with CRM tools'
    ],
    responsibilities: [
      'Manage portfolio of enterprise accounts',
      'Drive product adoption and engagement',
      'Identify upsell and expansion opportunities',
      'Conduct business reviews with stakeholders',
      'Advocate for customer needs internally',
      'Reduce churn and increase retention'
    ],
    benefits: ['Remote Work', 'Free Course Access', 'Learning Stipend', 'Stock Options'],
    skills: ['Customer Success', 'Account Management', 'Salesforce', 'Data Analysis', 'Communication'],
    category: 'Customer Service',
    remote: true,
    urgent: false,
    featured: false,
    applicants: 61,
    postedDate: '2024-12-20',
    deadline: '2025-01-25',
    status: 'active'
  },
  {
    id: 'job-11',
    title: 'Solar Installation Technician',
    company: companies[5],
    location: 'Denver, CO',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: { min: 45000, max: 60000, currency: 'USD', period: 'yearly' },
    description: 'GreenEnergy Solutions is hiring Solar Installation Technicians to join our growing team. No prior solar experience required - we provide comprehensive training. Great opportunity to start a career in renewable energy.',
    requirements: [
      'High school diploma or equivalent',
      'Valid driver\'s license',
      'Comfortable working at heights',
      'Basic electrical knowledge preferred',
      'Physical fitness for outdoor work',
      'Strong work ethic and reliability'
    ],
    responsibilities: [
      'Install residential and commercial solar systems',
      'Mount solar panels on rooftops',
      'Connect electrical components',
      'Ensure installations meet safety standards',
      'Complete installation documentation',
      'Provide excellent customer service'
    ],
    benefits: ['Paid Training', 'Health Benefits', 'EV Subsidy', 'Career Growth'],
    skills: ['Installation', 'Electrical', 'Safety Compliance', 'Problem Solving'],
    category: 'Engineering',
    remote: false,
    urgent: true,
    featured: false,
    applicants: 23,
    postedDate: '2024-12-22',
    deadline: '2025-01-15',
    status: 'active'
  },
  {
    id: 'job-12',
    title: 'DevOps Engineer',
    company: companies[10],
    location: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 110000, max: 150000, currency: 'USD', period: 'yearly' },
    description: 'CloudNine Systems is seeking a DevOps Engineer to build and maintain our infrastructure. You will work on CI/CD pipelines, container orchestration, and cloud automation.',
    requirements: [
      '3+ years of DevOps or SRE experience',
      'Strong Kubernetes and Docker experience',
      'Proficiency with AWS or GCP',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Scripting skills (Python, Bash)',
      'Experience with monitoring tools'
    ],
    responsibilities: [
      'Build and maintain CI/CD pipelines',
      'Manage Kubernetes clusters',
      'Implement infrastructure as code',
      'Automate deployment processes',
      'Monitor system performance and reliability',
      'Participate in incident response'
    ],
    benefits: ['Remote Work', 'Stock Options', 'Unlimited PTO', 'Learning Budget'],
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD', 'Python'],
    category: 'Technology',
    remote: true,
    urgent: false,
    featured: true,
    applicants: 67,
    postedDate: '2024-12-18',
    deadline: '2025-01-22',
    status: 'active'
  },
  {
    id: 'job-13',
    title: 'Content Writer',
    company: companies[13],
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: { min: 50000, max: 70000, currency: 'USD', period: 'yearly' },
    description: 'MediaWave Entertainment is looking for a creative Content Writer to produce engaging content for our digital platforms. Perfect for aspiring writers who want to work in entertainment media.',
    requirements: [
      'Bachelor\'s degree in English, Journalism, or related field',
      '1+ years of writing experience',
      'Excellent writing and editing skills',
      'Understanding of SEO principles',
      'Ability to meet deadlines',
      'Passion for entertainment and pop culture'
    ],
    responsibilities: [
      'Write articles, scripts, and social media content',
      'Research trending topics and news',
      'Edit and proofread content',
      'Collaborate with video and design teams',
      'Optimize content for search engines',
      'Manage content calendar'
    ],
    benefits: ['Creative Environment', 'Streaming Subscriptions', 'Industry Events', 'Flexible Hours'],
    skills: ['Writing', 'Editing', 'SEO', 'Research', 'Social Media', 'CMS'],
    category: 'Content Writing',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 112,
    postedDate: '2024-12-21',
    deadline: '2025-01-18',
    status: 'active'
  },
  {
    id: 'job-14',
    title: 'Human Resources Manager',
    company: companies[9],
    location: 'Minneapolis, MN',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 85000, max: 115000, currency: 'USD', period: 'yearly' },
    description: 'RetailMax Stores is seeking an HR Manager to oversee human resources operations for our regional stores. You will manage recruitment, employee relations, and HR compliance.',
    requirements: [
      'Bachelor\'s degree in HR or related field',
      '5+ years of HR management experience',
      'PHR or SHRM-CP certification preferred',
      'Retail industry experience a plus',
      'Strong knowledge of employment law',
      'Excellent interpersonal skills'
    ],
    responsibilities: [
      'Oversee recruitment and onboarding',
      'Manage employee relations and conflict resolution',
      'Ensure HR compliance and policy adherence',
      'Develop training and development programs',
      'Handle performance management processes',
      'Partner with leadership on workforce planning'
    ],
    benefits: ['Comprehensive Benefits', 'Employee Discount', '401k Match', 'Career Growth'],
    skills: ['HR Management', 'Recruitment', 'Employee Relations', 'HRIS', 'Compliance', 'Training'],
    category: 'Human Resources',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 34,
    postedDate: '2024-12-19',
    deadline: '2025-01-30',
    status: 'active'
  },
  {
    id: 'job-15',
    title: 'Mobile App Developer',
    company: companies[18],
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 120000, max: 160000, currency: 'USD', period: 'yearly' },
    description: 'GameForge Studios is looking for a Mobile App Developer to build engaging mobile games. You will work with our game design team to create immersive gaming experiences.',
    requirements: [
      '3+ years of mobile development experience',
      'Proficiency in Swift or Kotlin',
      'Experience with Unity or Unreal Engine',
      'Understanding of mobile game mechanics',
      'Knowledge of mobile performance optimization',
      'Published games in app stores preferred'
    ],
    responsibilities: [
      'Develop mobile games for iOS and Android',
      'Implement game mechanics and features',
      'Optimize game performance',
      'Integrate analytics and monetization',
      'Debug and fix issues',
      'Collaborate with designers and artists'
    ],
    benefits: ['Game Royalties', 'Gaming Hardware', 'Creative Projects', 'Team Events'],
    skills: ['Swift', 'Kotlin', 'Unity', 'C#', 'Mobile Development', 'Game Development'],
    category: 'Technology',
    remote: false,
    urgent: false,
    featured: true,
    applicants: 54,
    postedDate: '2024-12-17',
    deadline: '2025-01-25',
    status: 'active'
  },
  {
    id: 'job-16',
    title: 'Cybersecurity Analyst',
    company: companies[12],
    location: 'Austin, TX',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 95000, max: 130000, currency: 'USD', period: 'yearly' },
    description: 'SecureNet Cybersecurity is hiring a Cybersecurity Analyst to monitor, detect, and respond to security threats. You will protect our clients from evolving cyber threats.',
    requirements: [
      '3+ years of cybersecurity experience',
      'Security certifications (CISSP, CEH, Security+)',
      'Experience with SIEM tools',
      'Knowledge of threat detection and response',
      'Understanding of network security',
      'Incident response experience'
    ],
    responsibilities: [
      'Monitor security events and alerts',
      'Investigate and respond to security incidents',
      'Conduct threat hunting activities',
      'Perform vulnerability assessments',
      'Document security procedures',
      'Provide security recommendations'
    ],
    benefits: ['Certifications Paid', 'Conference Attendance', 'Remote Options', 'Research Time'],
    skills: ['Security Monitoring', 'SIEM', 'Incident Response', 'Network Security', 'Threat Analysis'],
    category: 'Technology',
    remote: false,
    urgent: true,
    featured: false,
    applicants: 41,
    postedDate: '2024-12-22',
    deadline: '2025-01-20',
    status: 'active'
  },
  {
    id: 'job-17',
    title: 'Executive Chef',
    company: companies[11],
    location: 'Nashville, TN',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 75000, max: 100000, currency: 'USD', period: 'yearly' },
    description: 'FoodieDelight Restaurants is seeking an Executive Chef to lead our flagship location. You will create innovative menus, manage kitchen operations, and deliver exceptional dining experiences.',
    requirements: [
      'Culinary degree or equivalent experience',
      '7+ years of culinary experience',
      '3+ years in leadership role',
      'Strong menu development skills',
      'Food safety certification',
      'Excellent leadership and communication'
    ],
    responsibilities: [
      'Create and develop seasonal menus',
      'Manage kitchen staff and operations',
      'Ensure food quality and consistency',
      'Control food costs and inventory',
      'Maintain health and safety standards',
      'Train and mentor kitchen team'
    ],
    benefits: ['Meal Benefits', 'Health Insurance', 'Performance Bonuses', 'Creative Freedom'],
    skills: ['Culinary Arts', 'Menu Development', 'Kitchen Management', 'Food Safety', 'Team Leadership'],
    category: 'Other',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 19,
    postedDate: '2024-12-16',
    deadline: '2025-01-28',
    status: 'active'
  },
  {
    id: 'job-18',
    title: 'Project Manager',
    company: companies[14],
    location: 'Houston, TX',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 90000, max: 125000, currency: 'USD', period: 'yearly' },
    description: 'BuildRight Construction is hiring a Project Manager to oversee commercial construction projects. You will manage budgets, schedules, and teams to deliver projects on time.',
    requirements: [
      'Bachelor\'s degree in Construction Management or related',
      '5+ years of construction project management',
      'PMP certification preferred',
      'Experience with commercial construction',
      'Strong budget management skills',
      'Excellent communication abilities'
    ],
    responsibilities: [
      'Plan and manage construction projects',
      'Develop and monitor project schedules',
      'Manage project budgets and costs',
      'Coordinate with contractors and subcontractors',
      'Ensure safety and quality standards',
      'Report progress to stakeholders'
    ],
    benefits: ['Competitive Pay', '401k', 'Health Benefits', 'Vehicle Allowance'],
    skills: ['Project Management', 'Construction', 'Budgeting', 'Scheduling', 'AutoCAD', 'MS Project'],
    category: 'Operations',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 27,
    postedDate: '2024-12-15',
    deadline: '2025-02-01',
    status: 'active'
  },
  {
    id: 'job-19',
    title: 'Research Scientist',
    company: companies[15],
    location: 'Cambridge, MA',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 110000, max: 150000, currency: 'USD', period: 'yearly' },
    description: 'PharmaLife Sciences is seeking a Research Scientist to join our drug discovery team. You will conduct research to develop new therapeutic treatments.',
    requirements: [
      'PhD in Biology, Chemistry, or related field',
      '3+ years of pharmaceutical research',
      'Experience with drug discovery processes',
      'Strong laboratory and analytical skills',
      'Publication record preferred',
      'Excellent scientific communication'
    ],
    responsibilities: [
      'Conduct drug discovery research',
      'Design and execute experiments',
      'Analyze and interpret research data',
      'Write scientific reports and publications',
      'Collaborate with cross-functional teams',
      'Present findings at conferences'
    ],
    benefits: ['Research Funding', 'Publication Bonus', 'Sabbatical', 'Global Mobility'],
    skills: ['Drug Discovery', 'Laboratory Research', 'Data Analysis', 'Scientific Writing', 'Collaboration'],
    category: 'Healthcare',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 33,
    postedDate: '2024-12-14',
    deadline: '2025-02-15',
    status: 'active'
  },
  {
    id: 'job-20',
    title: 'Sales Representative',
    company: companies[9],
    location: 'Multiple Locations',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: { min: 40000, max: 55000, currency: 'USD', period: 'yearly' },
    description: 'RetailMax Stores is hiring Sales Representatives for our retail locations nationwide. This is a great opportunity to start your retail career with room for growth.',
    requirements: [
      'High school diploma or equivalent',
      'Customer service experience preferred',
      'Strong communication skills',
      'Ability to work flexible hours',
      'Team player attitude',
      'Basic math skills'
    ],
    responsibilities: [
      'Assist customers with purchases',
      'Maintain product knowledge',
      'Process transactions accurately',
      'Stock and organize merchandise',
      'Meet sales targets',
      'Provide excellent customer service'
    ],
    benefits: ['Employee Discount', 'Flexible Hours', 'Health Benefits', 'Career Growth'],
    skills: ['Customer Service', 'Sales', 'Communication', 'Product Knowledge', 'Cash Handling'],
    category: 'Sales',
    remote: false,
    urgent: true,
    featured: false,
    applicants: 156,
    postedDate: '2024-12-23',
    deadline: '2025-01-15',
    status: 'active'
  },
  {
    id: 'job-21',
    title: 'Full Stack Developer',
    company: companies[0],
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 120000, max: 160000, currency: 'USD', period: 'yearly' },
    description: 'TechCorp Solutions is looking for a Full Stack Developer to build and maintain web applications. You will work across the entire technology stack.',
    requirements: [
      '4+ years of full stack development',
      'Proficiency in React and Node.js',
      'Experience with SQL and NoSQL databases',
      'Understanding of cloud services',
      'Strong problem-solving skills',
      'Experience with agile development'
    ],
    responsibilities: [
      'Develop frontend and backend features',
      'Design and implement APIs',
      'Write clean and maintainable code',
      'Participate in code reviews',
      'Troubleshoot and debug issues',
      'Collaborate with cross-functional teams'
    ],
    benefits: ['Health Insurance', 'Remote Options', '401k Match', 'Learning Budget'],
    skills: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'TypeScript'],
    category: 'Technology',
    remote: false,
    urgent: false,
    featured: true,
    applicants: 87,
    postedDate: '2024-12-20',
    deadline: '2025-01-28',
    status: 'active'
  },
  {
    id: 'job-22',
    title: 'Graphic Designer',
    company: companies[1],
    location: 'Austin, TX',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: { min: 55000, max: 75000, currency: 'USD', period: 'yearly' },
    description: 'DesignHub Creative is hiring a Graphic Designer to create visual content for our clients. Ideal for creative individuals with a strong portfolio.',
    requirements: [
      'Bachelor\'s degree in Graphic Design or related',
      '1+ years of design experience',
      'Proficiency in Adobe Creative Suite',
      'Strong typography and layout skills',
      'Creative portfolio required',
      'Attention to detail'
    ],
    responsibilities: [
      'Create visual designs for various media',
      'Design logos, brochures, and marketing materials',
      'Collaborate with clients on creative direction',
      'Prepare files for print and digital',
      'Maintain brand consistency',
      'Meet project deadlines'
    ],
    benefits: ['Design Conference Budget', 'Creative Tools', 'Flexible Hours', 'Team Lunches'],
    skills: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Typography', 'Branding', 'Print Design'],
    category: 'Design',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 78,
    postedDate: '2024-12-18',
    deadline: '2025-01-22',
    status: 'active'
  },
  {
    id: 'job-23',
    title: 'Accountant',
    company: companies[2],
    location: 'Chicago, IL',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 65000, max: 85000, currency: 'USD', period: 'yearly' },
    description: 'FinanceFirst Bank is seeking an Accountant to join our finance team. You will handle financial reporting, reconciliations, and compliance.',
    requirements: [
      'Bachelor\'s degree in Accounting',
      'CPA preferred',
      '3+ years of accounting experience',
      'Strong knowledge of GAAP',
      'Proficiency in accounting software',
      'Excellent attention to detail'
    ],
    responsibilities: [
      'Prepare financial statements',
      'Perform account reconciliations',
      'Support month-end close process',
      'Ensure compliance with regulations',
      'Assist with audits',
      'Analyze financial data'
    ],
    benefits: ['Comprehensive Benefits', '401k Match', 'Professional Development', 'Banking Perks'],
    skills: ['Accounting', 'GAAP', 'Financial Reporting', 'Excel', 'SAP', 'Reconciliation'],
    category: 'Finance',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 45,
    postedDate: '2024-12-17',
    deadline: '2025-01-25',
    status: 'active'
  },
  {
    id: 'job-24',
    title: 'Physical Therapist',
    company: companies[3],
    location: 'Philadelphia, PA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 80000, max: 100000, currency: 'USD', period: 'yearly' },
    description: 'HealthPlus Medical is hiring a Physical Therapist to help patients recover from injuries and improve mobility. Join our rehabilitation team.',
    requirements: [
      'Doctorate in Physical Therapy (DPT)',
      'State PT license',
      '2+ years of clinical experience',
      'Manual therapy skills',
      'Strong patient communication',
      'Team collaboration abilities'
    ],
    responsibilities: [
      'Evaluate patient conditions',
      'Develop treatment plans',
      'Administer physical therapy treatments',
      'Document patient progress',
      'Educate patients on exercises',
      'Collaborate with healthcare team'
    ],
    benefits: ['Health Benefits', 'CEU Credits', 'Retirement Plan', 'Flexible Schedule'],
    skills: ['Physical Therapy', 'Patient Care', 'Manual Therapy', 'Exercise Prescription', 'Documentation'],
    category: 'Healthcare',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 21,
    postedDate: '2024-12-19',
    deadline: '2025-02-01',
    status: 'active'
  },
  {
    id: 'job-25',
    title: 'Machine Learning Engineer',
    company: companies[7],
    location: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 150000, max: 200000, currency: 'USD', period: 'yearly' },
    description: 'DataDriven Analytics is seeking a Machine Learning Engineer to build and deploy ML systems at scale. You will work on cutting-edge AI projects.',
    requirements: [
      'MS/PhD in Computer Science or related',
      '5+ years of ML engineering experience',
      'Expert in Python and ML frameworks',
      'Experience deploying ML models to production',
      'Strong software engineering skills',
      'Knowledge of MLOps practices'
    ],
    responsibilities: [
      'Design and implement ML systems',
      'Build scalable ML pipelines',
      'Optimize model performance',
      'Deploy models to production',
      'Monitor and maintain ML systems',
      'Research new ML techniques'
    ],
    benefits: ['Equity', 'Remote-First', 'Research Time', 'Conference Budget'],
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Kubernetes'],
    category: 'Data Science',
    remote: true,
    urgent: false,
    featured: true,
    applicants: 65,
    postedDate: '2024-12-21',
    deadline: '2025-01-30',
    status: 'active'
  },
  {
    id: 'job-26',
    title: 'Social Media Manager',
    company: companies[6],
    location: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 60000, max: 85000, currency: 'USD', period: 'yearly' },
    description: 'MarketPro Agency is looking for a Social Media Manager to manage client accounts and create engaging social content.',
    requirements: [
      '3+ years of social media management',
      'Experience with all major platforms',
      'Content creation skills',
      'Understanding of social analytics',
      'Strong writing abilities',
      'Experience with social tools'
    ],
    responsibilities: [
      'Manage multiple client social accounts',
      'Create and schedule social content',
      'Engage with followers and community',
      'Analyze performance metrics',
      'Develop social strategies',
      'Report on campaign results'
    ],
    benefits: ['Remote Work', 'Flexible Hours', 'Marketing Certifications', 'Team Events'],
    skills: ['Social Media', 'Content Creation', 'Analytics', 'Copywriting', 'Hootsuite', 'Canva'],
    category: 'Marketing',
    remote: true,
    urgent: false,
    featured: false,
    applicants: 89,
    postedDate: '2024-12-16',
    deadline: '2025-01-20',
    status: 'active'
  },
  {
    id: 'job-27',
    title: 'Quality Assurance Engineer',
    company: companies[0],
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 100000, max: 140000, currency: 'USD', period: 'yearly' },
    description: 'TechCorp Solutions is hiring a QA Engineer to ensure the quality of our software products. You will design and execute test strategies.',
    requirements: [
      '3+ years of QA experience',
      'Experience with automated testing',
      'Knowledge of test frameworks (Selenium, Cypress)',
      'API testing experience',
      'Strong analytical skills',
      'SDLC understanding'
    ],
    responsibilities: [
      'Design and execute test plans',
      'Develop automated tests',
      'Report and track bugs',
      'Perform regression testing',
      'Collaborate with development team',
      'Improve testing processes'
    ],
    benefits: ['Health Insurance', 'Remote Options', '401k', 'Learning Budget'],
    skills: ['QA Testing', 'Selenium', 'Cypress', 'API Testing', 'Automation', 'JIRA'],
    category: 'Technology',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 52,
    postedDate: '2024-12-18',
    deadline: '2025-01-24',
    status: 'active'
  },
  {
    id: 'job-28',
    title: 'Business Development Manager',
    company: companies[4],
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 100000, max: 140000, currency: 'USD', period: 'yearly' },
    description: 'EduLearn Academy is seeking a Business Development Manager to drive enterprise partnerships and revenue growth.',
    requirements: [
      '5+ years of B2B sales experience',
      'EdTech or SaaS background preferred',
      'Strong negotiation skills',
      'Experience with enterprise sales cycles',
      'Track record of meeting quotas',
      'Excellent presentation skills'
    ],
    responsibilities: [
      'Identify and pursue enterprise opportunities',
      'Build relationships with decision makers',
      'Negotiate and close deals',
      'Develop partnership strategies',
      'Manage sales pipeline',
      'Collaborate with marketing team'
    ],
    benefits: ['Commission', 'Stock Options', 'Remote Options', 'Travel Budget'],
    skills: ['Business Development', 'Sales', 'Negotiation', 'CRM', 'Enterprise Sales', 'Partnerships'],
    category: 'Sales',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 38,
    postedDate: '2024-12-19',
    deadline: '2025-01-28',
    status: 'active'
  },
  {
    id: 'job-29',
    title: 'Electrical Engineer',
    company: companies[5],
    location: 'Phoenix, AZ',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 85000, max: 115000, currency: 'USD', period: 'yearly' },
    description: 'GreenEnergy Solutions is hiring an Electrical Engineer to design and optimize renewable energy systems.',
    requirements: [
      'Bachelor\'s degree in Electrical Engineering',
      'PE license preferred',
      '3+ years of electrical design experience',
      'Experience with solar or wind systems',
      'Knowledge of NEC and safety codes',
      'CAD software proficiency'
    ],
    responsibilities: [
      'Design electrical systems for renewable projects',
      'Perform electrical calculations and analysis',
      'Create technical drawings and specifications',
      'Ensure code compliance',
      'Coordinate with project teams',
      'Support installation and commissioning'
    ],
    benefits: ['Health Benefits', 'EV Subsidy', 'Stock Options', 'Professional Development'],
    skills: ['Electrical Design', 'AutoCAD', 'Solar Systems', 'Power Systems', 'NEC', 'Project Management'],
    category: 'Engineering',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 29,
    postedDate: '2024-12-17',
    deadline: '2025-01-26',
    status: 'active'
  },
  {
    id: 'job-30',
    title: 'Technical Writer',
    company: companies[10],
    location: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 75000, max: 100000, currency: 'USD', period: 'yearly' },
    description: 'CloudNine Systems is looking for a Technical Writer to create documentation for our cloud products.',
    requirements: [
      '3+ years of technical writing experience',
      'Experience with developer documentation',
      'Understanding of cloud technologies',
      'Strong writing and editing skills',
      'Ability to learn technical concepts quickly',
      'Experience with docs-as-code tools'
    ],
    responsibilities: [
      'Write API documentation and guides',
      'Create tutorials and how-to articles',
      'Maintain documentation site',
      'Work with engineers on technical accuracy',
      'Improve documentation processes',
      'Gather user feedback on docs'
    ],
    benefits: ['Remote Work', 'Unlimited PTO', 'Learning Budget', 'Home Office Stipend'],
    skills: ['Technical Writing', 'Documentation', 'Markdown', 'Git', 'API Documentation', 'Cloud'],
    category: 'Content Writing',
    remote: true,
    urgent: false,
    featured: false,
    applicants: 44,
    postedDate: '2024-12-20',
    deadline: '2025-01-25',
    status: 'active'
  },
  {
    id: 'job-31',
    title: 'Operations Manager',
    company: companies[24],
    location: 'Memphis, TN',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 85000, max: 115000, currency: 'USD', period: 'yearly' },
    description: 'LogiTrans Shipping is seeking an Operations Manager to oversee warehouse and distribution operations.',
    requirements: [
      'Bachelor\'s degree in Business or Logistics',
      '5+ years of operations management',
      'Experience in logistics/supply chain',
      'Strong leadership skills',
      'Knowledge of WMS systems',
      'Lean/Six Sigma certification preferred'
    ],
    responsibilities: [
      'Manage warehouse operations',
      'Optimize processes for efficiency',
      'Lead and develop operations team',
      'Ensure safety compliance',
      'Monitor KPIs and performance',
      'Coordinate with other departments'
    ],
    benefits: ['Competitive Salary', 'Health Benefits', '401k', 'Performance Bonus'],
    skills: ['Operations Management', 'Logistics', 'Team Leadership', 'Process Improvement', 'WMS', 'Analytics'],
    category: 'Operations',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 31,
    postedDate: '2024-12-16',
    deadline: '2025-01-28',
    status: 'active'
  },
  {
    id: 'job-32',
    title: 'iOS Developer',
    company: companies[29],
    location: 'San Jose, CA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 130000, max: 170000, currency: 'USD', period: 'yearly' },
    description: 'SmartHome Tech is hiring an iOS Developer to build our smart home mobile application.',
    requirements: [
      '4+ years of iOS development',
      'Expert in Swift and SwiftUI',
      'Experience with IoT integrations',
      'Knowledge of Bluetooth/WiFi protocols',
      'App Store submission experience',
      'Strong UI/UX sensibility'
    ],
    responsibilities: [
      'Develop and maintain iOS app',
      'Implement smart home device integrations',
      'Optimize app performance',
      'Write clean, testable code',
      'Collaborate with hardware team',
      'Handle App Store releases'
    ],
    benefits: ['Stock Options', 'Product Discounts', 'Health Coverage', 'Learning Budget'],
    skills: ['Swift', 'SwiftUI', 'iOS', 'Core Bluetooth', 'REST APIs', 'Git'],
    category: 'Technology',
    remote: false,
    urgent: false,
    featured: true,
    applicants: 47,
    postedDate: '2024-12-21',
    deadline: '2025-01-27',
    status: 'active'
  },
  {
    id: 'job-33',
    title: 'Paralegal',
    company: companies[8],
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 60000, max: 80000, currency: 'USD', period: 'yearly' },
    description: 'LegalEase Partners is seeking a Paralegal to support our corporate practice group with transaction support.',
    requirements: [
      'Paralegal certificate or Bachelor\'s degree',
      '3+ years of paralegal experience',
      'Corporate/transactional experience preferred',
      'Strong research and writing skills',
      'Attention to detail',
      'Proficiency in legal research tools'
    ],
    responsibilities: [
      'Support attorneys on transactions',
      'Conduct legal research',
      'Draft and review documents',
      'Manage document databases',
      'Coordinate with clients',
      'Assist with due diligence'
    ],
    benefits: ['Comprehensive Benefits', 'Professional Development', 'Retirement Plan', 'Transit Benefits'],
    skills: ['Legal Research', 'Document Review', 'Corporate Law', 'Westlaw', 'Filing', 'Organization'],
    category: 'Legal',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 36,
    postedDate: '2024-12-18',
    deadline: '2025-01-24',
    status: 'active'
  },
  {
    id: 'job-34',
    title: 'Veterinarian',
    company: companies[21],
    location: 'San Diego, CA',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 100000, max: 140000, currency: 'USD', period: 'yearly' },
    description: 'PetCare Plus is hiring a Veterinarian to provide excellent medical care to our furry patients.',
    requirements: [
      'DVM from accredited veterinary school',
      'State veterinary license',
      '3+ years of clinical experience',
      'Surgery and diagnostic skills',
      'Excellent client communication',
      'Compassionate patient care'
    ],
    responsibilities: [
      'Provide medical care to animals',
      'Perform surgeries and procedures',
      'Diagnose and treat conditions',
      'Communicate with pet owners',
      'Maintain medical records',
      'Mentor veterinary staff'
    ],
    benefits: ['Health Insurance', 'Pet Care Discounts', 'CE Budget', 'Retirement Plan'],
    skills: ['Veterinary Medicine', 'Surgery', 'Diagnostics', 'Client Communication', 'Animal Care'],
    category: 'Healthcare',
    remote: false,
    urgent: true,
    featured: false,
    applicants: 14,
    postedDate: '2024-12-22',
    deadline: '2025-02-01',
    status: 'active'
  },
  {
    id: 'job-35',
    title: 'Real Estate Agent',
    company: companies[26],
    location: 'Los Angeles, CA',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: { min: 50000, max: 150000, currency: 'USD', period: 'yearly' },
    description: 'RealEstate Pro is hiring Real Estate Agents to join our growing team. Great earning potential with commission-based compensation.',
    requirements: [
      'Real estate license required',
      'Sales experience preferred',
      'Strong networking abilities',
      'Excellent communication skills',
      'Self-motivated and driven',
      'Valid driver\'s license'
    ],
    responsibilities: [
      'Generate and nurture leads',
      'Show properties to clients',
      'Negotiate and close deals',
      'Build client relationships',
      'Market listings effectively',
      'Stay updated on market trends'
    ],
    benefits: ['Commission', 'Lead Generation', 'Marketing Support', 'Training'],
    skills: ['Sales', 'Negotiation', 'Marketing', 'Client Relations', 'Real Estate', 'Networking'],
    category: 'Sales',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 67,
    postedDate: '2024-12-19',
    deadline: '2025-01-30',
    status: 'active'
  },
  {
    id: 'job-36',
    title: 'Insurance Claims Adjuster',
    company: companies[22],
    location: 'Hartford, CT',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: { min: 50000, max: 70000, currency: 'USD', period: 'yearly' },
    description: 'InsureSafe Group is hiring Claims Adjusters to investigate and settle insurance claims.',
    requirements: [
      'Bachelor\'s degree preferred',
      '1+ years of claims or related experience',
      'Strong analytical skills',
      'Excellent communication abilities',
      'Valid driver\'s license',
      'Customer service orientation'
    ],
    responsibilities: [
      'Investigate insurance claims',
      'Interview claimants and witnesses',
      'Review documentation and evidence',
      'Determine claim settlements',
      'Negotiate with claimants',
      'Document claim files'
    ],
    benefits: ['Health Benefits', 'Insurance Discounts', '401k Match', 'Training Program'],
    skills: ['Claims Processing', 'Investigation', 'Negotiation', 'Documentation', 'Customer Service'],
    category: 'Finance',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 42,
    postedDate: '2024-12-17',
    deadline: '2025-01-23',
    status: 'active'
  },
  {
    id: 'job-37',
    title: 'Personal Trainer',
    company: companies[23],
    location: 'Denver, CO',
    type: 'Part-time',
    experienceLevel: 'Entry Level',
    salary: { min: 35000, max: 60000, currency: 'USD', period: 'yearly' },
    description: 'FitLife Wellness is hiring Personal Trainers to help our members achieve their fitness goals.',
    requirements: [
      'Personal training certification (NASM, ACE, etc.)',
      'CPR/AED certification',
      'Passion for fitness and health',
      'Strong interpersonal skills',
      'Ability to motivate clients',
      'Flexible schedule availability'
    ],
    responsibilities: [
      'Conduct fitness assessments',
      'Design personalized workout programs',
      'Train clients one-on-one or in groups',
      'Track client progress',
      'Provide nutrition guidance',
      'Maintain safe training environment'
    ],
    benefits: ['Free Gym Membership', 'Certifications', 'Flexible Schedule', 'Commission'],
    skills: ['Personal Training', 'Fitness', 'Nutrition', 'Motivation', 'Program Design'],
    category: 'Other',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 53,
    postedDate: '2024-12-20',
    deadline: '2025-01-25',
    status: 'active'
  },
  {
    id: 'job-38',
    title: 'Blockchain Developer',
    company: companies[27],
    location: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 160000, max: 220000, currency: 'USD', period: 'yearly' },
    description: 'CryptoVault Exchange is hiring a Blockchain Developer to build and maintain our trading platform infrastructure.',
    requirements: [
      '5+ years of software development',
      '3+ years of blockchain development',
      'Experience with Ethereum and Solidity',
      'Knowledge of DeFi protocols',
      'Strong security mindset',
      'Cryptography fundamentals'
    ],
    responsibilities: [
      'Develop smart contracts',
      'Build blockchain integrations',
      'Implement security best practices',
      'Optimize transaction processing',
      'Research new blockchain technologies',
      'Conduct code audits'
    ],
    benefits: ['Crypto Bonuses', 'Stock Options', 'Remote-First', 'Learning Budget'],
    skills: ['Blockchain', 'Solidity', 'Ethereum', 'Smart Contracts', 'Web3', 'Security'],
    category: 'Technology',
    remote: true,
    urgent: false,
    featured: true,
    applicants: 38,
    postedDate: '2024-12-21',
    deadline: '2025-01-28',
    status: 'active'
  },
  {
    id: 'job-39',
    title: 'Fashion Designer',
    company: companies[25],
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 70000, max: 95000, currency: 'USD', period: 'yearly' },
    description: 'StyleHub Fashion is seeking a Fashion Designer to create sustainable clothing collections.',
    requirements: [
      'Bachelor\'s degree in Fashion Design',
      '3+ years of fashion design experience',
      'Strong portfolio of original designs',
      'Knowledge of sustainable materials',
      'Proficiency in design software',
      'Understanding of manufacturing'
    ],
    responsibilities: [
      'Design seasonal collections',
      'Create technical sketches and specs',
      'Source sustainable materials',
      'Collaborate with production team',
      'Stay current on fashion trends',
      'Present designs to stakeholders'
    ],
    benefits: ['Fashion Discounts', 'Industry Events', 'Creative Freedom', 'Sample Sales'],
    skills: ['Fashion Design', 'Adobe Illustrator', 'Pattern Making', 'Sustainable Fashion', 'Trend Forecasting'],
    category: 'Design',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 61,
    postedDate: '2024-12-18',
    deadline: '2025-01-24',
    status: 'active'
  },
  {
    id: 'job-40',
    title: 'Aerospace Engineer',
    company: companies[20],
    location: 'Seattle, WA',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 120000, max: 160000, currency: 'USD', period: 'yearly' },
    description: 'AeroSpace Dynamics is hiring an Aerospace Engineer to work on next-generation aircraft systems.',
    requirements: [
      'MS in Aerospace Engineering',
      '5+ years of aerospace experience',
      'Experience with aircraft systems',
      'Knowledge of FAA regulations',
      'CAD and simulation tools proficiency',
      'Security clearance eligibility'
    ],
    responsibilities: [
      'Design aircraft components and systems',
      'Perform engineering analysis',
      'Conduct testing and validation',
      'Ensure regulatory compliance',
      'Collaborate with multidisciplinary teams',
      'Support production and certification'
    ],
    benefits: ['Premium Compensation', 'Retirement Plan', 'Tuition Assistance', 'Patent Program'],
    skills: ['Aerospace Engineering', 'CATIA', 'MATLAB', 'CFD', 'FEA', 'Systems Engineering'],
    category: 'Engineering',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 28,
    postedDate: '2024-12-15',
    deadline: '2025-02-01',
    status: 'active'
  },
  {
    id: 'job-41',
    title: 'Travel Consultant',
    company: companies[16],
    location: 'Miami, FL',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: { min: 45000, max: 60000, currency: 'USD', period: 'yearly' },
    description: 'TravelGo Adventures is hiring Travel Consultants to help customers plan their dream vacations.',
    requirements: [
      'Passion for travel',
      'Excellent customer service skills',
      'Knowledge of booking systems preferred',
      'Strong communication abilities',
      'Detail-oriented',
      'Flexible schedule'
    ],
    responsibilities: [
      'Assist customers with travel planning',
      'Book flights, hotels, and activities',
      'Provide destination recommendations',
      'Handle travel changes and issues',
      'Stay updated on travel trends',
      'Meet sales targets'
    ],
    benefits: ['Travel Credits', 'Remote Work', 'Health Insurance', 'Team Trips'],
    skills: ['Customer Service', 'Travel Planning', 'Sales', 'GDS Systems', 'Communication'],
    category: 'Customer Service',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 72,
    postedDate: '2024-12-20',
    deadline: '2025-01-22',
    status: 'active'
  },
  {
    id: 'job-42',
    title: 'Automotive Technician',
    company: companies[17],
    location: 'Detroit, MI',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 55000, max: 80000, currency: 'USD', period: 'yearly' },
    description: 'AutoDrive Motors is seeking an Automotive Technician to maintain and repair vehicles at our service center.',
    requirements: [
      'ASE certification',
      '3+ years of automotive experience',
      'Diagnostic skills',
      'Knowledge of hybrid/EV systems a plus',
      'Valid driver\'s license',
      'Own tools preferred'
    ],
    responsibilities: [
      'Diagnose vehicle issues',
      'Perform repairs and maintenance',
      'Complete quality inspections',
      'Document service records',
      'Stay current on new technologies',
      'Provide excellent customer service'
    ],
    benefits: ['Health Benefits', 'Vehicle Discounts', 'Tool Allowance', 'Training'],
    skills: ['Automotive Repair', 'Diagnostics', 'Electrical Systems', 'Hybrid/EV', 'Customer Service'],
    category: 'Other',
    remote: false,
    urgent: true,
    featured: false,
    applicants: 24,
    postedDate: '2024-12-22',
    deadline: '2025-01-18',
    status: 'active'
  },
  {
    id: 'job-43',
    title: 'Game Designer',
    company: companies[18],
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 90000, max: 130000, currency: 'USD', period: 'yearly' },
    description: 'GameForge Studios is hiring a Game Designer to create engaging gameplay experiences for our upcoming titles.',
    requirements: [
      '3+ years of game design experience',
      'Published game titles',
      'Strong understanding of game mechanics',
      'Experience with game engines',
      'Excellent documentation skills',
      'Creative problem solving'
    ],
    responsibilities: [
      'Design game mechanics and systems',
      'Create game design documents',
      'Balance gameplay elements',
      'Prototype and iterate on ideas',
      'Collaborate with artists and developers',
      'Playtest and gather feedback'
    ],
    benefits: ['Game Royalties', 'Creative Freedom', 'Gaming Hardware', 'Team Events'],
    skills: ['Game Design', 'Unity', 'Unreal Engine', 'Level Design', 'Documentation', 'Prototyping'],
    category: 'Design',
    remote: false,
    urgent: false,
    featured: true,
    applicants: 87,
    postedDate: '2024-12-19',
    deadline: '2025-01-26',
    status: 'active'
  },
  {
    id: 'job-44',
    title: 'Farm Manager',
    company: companies[19],
    location: 'Sacramento, CA',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 65000, max: 90000, currency: 'USD', period: 'yearly' },
    description: 'FreshFarm Organics is seeking a Farm Manager to oversee our organic farming operations.',
    requirements: [
      'Bachelor\'s in Agriculture or related',
      '5+ years of farming experience',
      'Organic certification knowledge',
      'Team management experience',
      'Equipment operation skills',
      'Business management abilities'
    ],
    responsibilities: [
      'Manage daily farm operations',
      'Supervise farm workers',
      'Plan crop rotations',
      'Ensure organic compliance',
      'Manage budgets and resources',
      'Coordinate with buyers'
    ],
    benefits: ['Health Coverage', 'Fresh Produce', 'Housing Assistance', 'Seasonal Bonuses'],
    skills: ['Farm Management', 'Organic Farming', 'Team Leadership', 'Budgeting', 'Equipment Operation'],
    category: 'Operations',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 16,
    postedDate: '2024-12-17',
    deadline: '2025-01-30',
    status: 'active'
  },
  {
    id: 'job-45',
    title: 'Video Editor',
    company: companies[13],
    location: 'Los Angeles, CA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 65000, max: 90000, currency: 'USD', period: 'yearly' },
    description: 'MediaWave Entertainment is hiring a Video Editor to create compelling video content for our digital platforms.',
    requirements: [
      '3+ years of video editing experience',
      'Proficiency in Premiere Pro and After Effects',
      'Strong storytelling abilities',
      'Color grading experience',
      'Motion graphics skills a plus',
      'Portfolio of work required'
    ],
    responsibilities: [
      'Edit video content for various platforms',
      'Add graphics and effects',
      'Color correct and grade footage',
      'Manage media assets',
      'Collaborate with producers and directors',
      'Meet production deadlines'
    ],
    benefits: ['Creative Environment', 'Latest Software', 'Industry Events', 'Flexible Hours'],
    skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics', 'Color Grading'],
    category: 'Design',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 68,
    postedDate: '2024-12-18',
    deadline: '2025-01-22',
    status: 'active'
  },
  {
    id: 'job-46',
    title: 'Cleaning Team Lead',
    company: companies[28],
    location: 'Portland, OR',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 45000, max: 55000, currency: 'USD', period: 'yearly' },
    description: 'EcoClean Services is hiring a Cleaning Team Lead to supervise our eco-friendly cleaning crews.',
    requirements: [
      '2+ years of cleaning experience',
      '1+ years of supervisory experience',
      'Knowledge of green cleaning practices',
      'Valid driver\'s license',
      'Strong organizational skills',
      'Reliability and professionalism'
    ],
    responsibilities: [
      'Lead and train cleaning team',
      'Inspect completed work',
      'Manage cleaning supplies',
      'Handle customer concerns',
      'Schedule team assignments',
      'Ensure safety compliance'
    ],
    benefits: ['Health Benefits', 'Paid Training', 'Team Bonuses', 'Career Growth'],
    skills: ['Team Leadership', 'Cleaning', 'Customer Service', 'Organization', 'Training'],
    category: 'Operations',
    remote: false,
    urgent: true,
    featured: false,
    applicants: 31,
    postedDate: '2024-12-22',
    deadline: '2025-01-15',
    status: 'active'
  },
  {
    id: 'job-47',
    title: 'Hardware Engineer',
    company: companies[29],
    location: 'San Jose, CA',
    type: 'Full-time',
    experienceLevel: 'Senior Level',
    salary: { min: 140000, max: 180000, currency: 'USD', period: 'yearly' },
    description: 'SmartHome Tech is hiring a Hardware Engineer to design IoT devices for smart homes.',
    requirements: [
      'BS/MS in Electrical Engineering',
      '5+ years of hardware design',
      'Experience with PCB design',
      'Knowledge of wireless protocols',
      'Embedded systems experience',
      'Product development background'
    ],
    responsibilities: [
      'Design electronic circuits',
      'Create PCB layouts',
      'Prototype and test designs',
      'Work with firmware team',
      'Support manufacturing',
      'Ensure regulatory compliance'
    ],
    benefits: ['Stock Options', 'Product Discounts', 'Health Coverage', 'Patent Bonus'],
    skills: ['Hardware Design', 'PCB Design', 'Altium', 'IoT', 'Embedded Systems', 'RF'],
    category: 'Engineering',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 22,
    postedDate: '2024-12-19',
    deadline: '2025-01-28',
    status: 'active'
  },
  {
    id: 'job-48',
    title: 'Recruiter',
    company: companies[0],
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 75000, max: 100000, currency: 'USD', period: 'yearly' },
    description: 'TechCorp Solutions is hiring a Technical Recruiter to attract top engineering talent.',
    requirements: [
      '3+ years of recruiting experience',
      'Tech industry recruiting background',
      'Experience with ATS systems',
      'Strong sourcing skills',
      'Excellent communication',
      'Data-driven approach'
    ],
    responsibilities: [
      'Source and recruit engineering candidates',
      'Conduct initial screenings',
      'Manage candidate pipeline',
      'Partner with hiring managers',
      'Improve recruiting processes',
      'Track recruiting metrics'
    ],
    benefits: ['Health Insurance', 'Remote Options', '401k', 'Commission'],
    skills: ['Technical Recruiting', 'Sourcing', 'LinkedIn Recruiter', 'ATS', 'Interviewing'],
    category: 'Human Resources',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 45,
    postedDate: '2024-12-20',
    deadline: '2025-01-25',
    status: 'active'
  },
  {
    id: 'job-49',
    title: 'Delivery Driver',
    company: companies[24],
    location: 'Multiple Locations',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: { min: 40000, max: 55000, currency: 'USD', period: 'yearly' },
    description: 'LogiTrans Shipping is hiring Delivery Drivers to join our logistics team.',
    requirements: [
      'Valid driver\'s license',
      'Clean driving record',
      'Ability to lift packages',
      'Customer service skills',
      'Navigation abilities',
      'Reliable and punctual'
    ],
    responsibilities: [
      'Deliver packages to customers',
      'Load and unload vehicles',
      'Plan efficient routes',
      'Obtain delivery signatures',
      'Maintain vehicle cleanliness',
      'Provide excellent service'
    ],
    benefits: ['Health Benefits', 'Overtime Pay', 'Performance Bonus', 'Career Growth'],
    skills: ['Driving', 'Navigation', 'Customer Service', 'Time Management', 'Physical Fitness'],
    category: 'Operations',
    remote: false,
    urgent: true,
    featured: false,
    applicants: 89,
    postedDate: '2024-12-23',
    deadline: '2025-01-10',
    status: 'active'
  },
  {
    id: 'job-50',
    title: 'UX Researcher',
    company: companies[1],
    location: 'Los Angeles, CA',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: { min: 85000, max: 120000, currency: 'USD', period: 'yearly' },
    description: 'DesignHub Creative is seeking a UX Researcher to conduct user research and drive design decisions.',
    requirements: [
      '3+ years of UX research experience',
      'Experience with qualitative and quantitative methods',
      'Strong analytical skills',
      'Excellent presentation abilities',
      'Knowledge of research tools',
      'Design thinking background'
    ],
    responsibilities: [
      'Plan and conduct user research',
      'Analyze and synthesize findings',
      'Create personas and journey maps',
      'Present insights to stakeholders',
      'Collaborate with design team',
      'Track UX metrics'
    ],
    benefits: ['Health Insurance', 'Research Conference Budget', 'Flexible Hours', 'Team Lunches'],
    skills: ['User Research', 'Usability Testing', 'Surveys', 'Analytics', 'Presentation', 'Figma'],
    category: 'Design',
    remote: false,
    urgent: false,
    featured: false,
    applicants: 41,
    postedDate: '2024-12-21',
    deadline: '2025-01-27',
    status: 'active'
  }
];

export const getJobById = (id: string): Job | undefined => {
  return jobs.find(job => job.id === id);
};

export const getJobsByCompany = (companyId: string): Job[] => {
  return jobs.filter(job => job.company.id === companyId);
};

export const getFeaturedJobs = (limit: number = 6): Job[] => {
  return jobs.filter(job => job.featured).slice(0, limit);
};

export const getRecentJobs = (limit: number = 10): Job[] => {
  return [...jobs]
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, limit);
};

export const getUrgentJobs = (): Job[] => {
  return jobs.filter(job => job.urgent);
};

export const searchJobs = (query: string): Job[] => {
  const lowerQuery = query.toLowerCase();
  return jobs.filter(
    job =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.name.toLowerCase().includes(lowerQuery) ||
      job.location.toLowerCase().includes(lowerQuery) ||
      job.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
  );
};

export const filterJobs = (filters: {
  keyword?: string;
  location?: string;
  type?: string[];
  experienceLevel?: string[];
  category?: string[];
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
}): Job[] => {
  return jobs.filter(job => {
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const matchesKeyword =
        job.title.toLowerCase().includes(keyword) ||
        job.company.name.toLowerCase().includes(keyword) ||
        job.skills.some(skill => skill.toLowerCase().includes(keyword));
      if (!matchesKeyword) return false;
    }

    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    if (filters.type && filters.type.length > 0 && !filters.type.includes(job.type)) {
      return false;
    }

    if (filters.experienceLevel && filters.experienceLevel.length > 0 && !filters.experienceLevel.includes(job.experienceLevel)) {
      return false;
    }

    if (filters.category && filters.category.length > 0 && !filters.category.includes(job.category)) {
      return false;
    }

    if (filters.remote !== undefined && job.remote !== filters.remote) {
      return false;
    }

    if (filters.salaryMin && job.salary.max < filters.salaryMin) {
      return false;
    }

    if (filters.salaryMax && job.salary.min > filters.salaryMax) {
      return false;
    }

    return true;
  });
};

export const getJobCategories = (): string[] => {
  const categories = new Set(jobs.map(job => job.category));
  return Array.from(categories);
};

export const getJobLocations = (): string[] => {
  const locations = new Set(jobs.map(job => job.location));
  return Array.from(locations);
};
