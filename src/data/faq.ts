import { FAQ } from '@/types';

export const faqs: FAQ[] = [
  // General Questions
  {
    id: 'faq-1',
    question: 'What is JobHunt Pro?',
    answer: 'JobHunt Pro is a comprehensive job search platform that connects job seekers with employers. We offer advanced job search features, company profiles, resume building tools, and career resources to help you find your dream job.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'Is JobHunt Pro free to use?',
    answer: 'Yes, JobHunt Pro is completely free for job seekers. You can create a profile, search for jobs, apply to positions, and access all our career resources at no cost.',
    category: 'General'
  },
  {
    id: 'faq-3',
    question: 'How do I create an account?',
    answer: 'Click the "Sign Up" button on the homepage. You can register using your email address. Once registered, complete your profile to start applying for jobs.',
    category: 'General'
  },
  {
    id: 'faq-4',
    question: 'Can I use JobHunt Pro on my mobile device?',
    answer: 'Yes, JobHunt Pro is fully responsive and works great on mobile devices. You can search for jobs, apply to positions, and manage your profile from your smartphone or tablet.',
    category: 'General'
  },

  // Job Search
  {
    id: 'faq-5',
    question: 'How do I search for jobs?',
    answer: 'Use our search bar on the Jobs page to enter keywords, job titles, or company names. You can filter results by location, job type, experience level, salary range, and more.',
    category: 'Job Search'
  },
  {
    id: 'faq-6',
    question: 'Can I save jobs to apply later?',
    answer: 'Yes, click the bookmark icon on any job listing to save it. You can find all your saved jobs in your dashboard under "Saved Jobs."',
    category: 'Job Search'
  },
  {
    id: 'faq-7',
    question: 'How do I apply for a job?',
    answer: 'Click on a job listing to view details, then click the "Apply Now" button. You may need to complete your profile and upload a resume before applying.',
    category: 'Job Search'
  },
  {
    id: 'faq-8',
    question: 'How can I find remote jobs?',
    answer: 'Use the "Remote" filter in the job search to find remote positions. Many job listings also indicate if they offer remote or hybrid work options.',
    category: 'Job Search'
  },
  {
    id: 'faq-9',
    question: 'Can I set up job alerts?',
    answer: 'Yes, you can set up job alerts in your account settings. We will email you when new jobs matching your criteria are posted.',
    category: 'Job Search'
  },

  // Profile & Resume
  {
    id: 'faq-10',
    question: 'How do I complete my profile?',
    answer: 'Go to your Dashboard and click on "Profile." Fill in your personal information, work experience, education, skills, and upload a profile photo. A complete profile increases your visibility to employers.',
    category: 'Profile & Resume'
  },
  {
    id: 'faq-11',
    question: 'Can I upload my resume?',
    answer: 'Yes, you can upload your resume in PDF or Word format in the Profile section. You can also use our Resume Builder to create a professional resume.',
    category: 'Profile & Resume'
  },
  {
    id: 'faq-12',
    question: 'How does the Resume Builder work?',
    answer: 'Our Resume Builder guides you through creating a professional resume. Choose from multiple templates, fill in your details, preview your resume, and download it as a PDF.',
    category: 'Profile & Resume'
  },
  {
    id: 'faq-13',
    question: 'Who can see my profile?',
    answer: 'You can control your profile visibility in Settings. Options include Public (visible to all), Recruiters Only (visible to verified employers), or Private (visible only to you).',
    category: 'Profile & Resume'
  },
  {
    id: 'faq-14',
    question: 'Can I have multiple resumes?',
    answer: 'Yes, you can save multiple versions of your resume for different types of positions. This allows you to tailor your application to specific roles.',
    category: 'Profile & Resume'
  },

  // Applications
  {
    id: 'faq-15',
    question: 'How do I track my applications?',
    answer: 'Visit your Dashboard and click on "Applied Jobs." You will see all your applications with their current status, including Applied, Under Review, Interview Scheduled, and more.',
    category: 'Applications'
  },
  {
    id: 'faq-16',
    question: 'Can I withdraw my application?',
    answer: 'Yes, you can withdraw an application by going to Applied Jobs, selecting the application, and clicking "Withdraw Application." Note that you cannot reapply to the same position.',
    category: 'Applications'
  },
  {
    id: 'faq-17',
    question: 'What do the application statuses mean?',
    answer: 'Applied: Your application was submitted. Under Review: Employer is reviewing. Interview Scheduled: You have an interview. Offer Extended: You received an offer. Rejected: Unfortunately not selected.',
    category: 'Applications'
  },
  {
    id: 'faq-18',
    question: 'Why haven\'t I heard back from employers?',
    answer: 'Response times vary by employer and can take several weeks. Ensure your profile is complete, your resume is tailored, and follow up appropriately if you haven\'t heard back after 2 weeks.',
    category: 'Applications'
  },

  // Account & Security
  {
    id: 'faq-19',
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the sign-in page. Enter your email address, and we will send you a link to reset your password.',
    category: 'Account & Security'
  },
  {
    id: 'faq-20',
    question: 'How do I delete my account?',
    answer: 'Go to Settings in your Dashboard and click "Delete Account." Please note that this action is permanent and cannot be undone.',
    category: 'Account & Security'
  },
  {
    id: 'faq-21',
    question: 'Is my personal information secure?',
    answer: 'Yes, we take security seriously. Your data is encrypted and stored securely. We never share your personal information without your consent. Read our Privacy Policy for details.',
    category: 'Account & Security'
  },
  {
    id: 'faq-22',
    question: 'How do I update my email address?',
    answer: 'Go to Settings in your Dashboard and click "Change Email." You will need to verify your new email address before the change takes effect.',
    category: 'Account & Security'
  },

  // Companies
  {
    id: 'faq-23',
    question: 'How do I learn about a company?',
    answer: 'Visit the Companies page and search for any company. Company profiles include information about culture, benefits, open positions, and employee reviews.',
    category: 'Companies'
  },
  {
    id: 'faq-24',
    question: 'Can I follow companies?',
    answer: 'Yes, click the "Follow" button on any company profile to receive updates about new job postings and company news.',
    category: 'Companies'
  },
  {
    id: 'faq-25',
    question: 'How can I leave a company review?',
    answer: 'If you have worked at a company, you can leave a review from the company profile page. Reviews help other job seekers make informed decisions.',
    category: 'Companies'
  },

  // Support
  {
    id: 'faq-26',
    question: 'How do I contact customer support?',
    answer: 'Visit our Contact Us page or email support@jobhuntpro.com. Our support team is available Monday-Friday, 9 AM - 6 PM EST.',
    category: 'Support'
  },
  {
    id: 'faq-27',
    question: 'I found a bug or issue. How do I report it?',
    answer: 'Please email bugs@jobhuntpro.com with details about the issue, including screenshots if possible. We appreciate your help in improving our platform.',
    category: 'Support'
  },
  {
    id: 'faq-28',
    question: 'Do you offer career coaching services?',
    answer: 'While we don\'t offer direct coaching, our blog and resources section contains expert advice on resumes, interviews, and career development.',
    category: 'Support'
  }
];

export const getFaqsByCategory = (category: string): FAQ[] => {
  return faqs.filter(faq => faq.category === category);
};

export const getFaqCategories = (): string[] => {
  const categories = new Set(faqs.map(faq => faq.category));
  return Array.from(categories);
};

export const searchFaqs = (query: string): FAQ[] => {
  const lowerQuery = query.toLowerCase();
  return faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery)
  );
};

export const faqCategories = [
  'All',
  'General',
  'Job Search',
  'Applications',
  'Profile',
  'Companies',
  'Support',
];
