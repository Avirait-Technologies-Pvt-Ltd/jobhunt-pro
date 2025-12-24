import { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'TechCorp Solutions',
    avatar: '/api/placeholder/100/100',
    content: 'JobHunt Pro made my job search incredibly easy. I found my dream role at a top tech company within just two weeks. The platform is intuitive and the job recommendations were spot on!',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Michael Chen',
    role: 'UX Designer',
    company: 'DesignHub Creative',
    avatar: '/api/placeholder/100/100',
    content: 'As a designer, I was looking for companies that truly value creativity. JobHunt Pro helped me connect with amazing design agencies. The company profiles gave me great insights before applying.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    company: 'MarketPro Agency',
    avatar: '/api/placeholder/100/100',
    content: 'I switched careers from sales to marketing using JobHunt Pro. The resume builder helped me highlight transferable skills, and I landed a managerial position in just a month!',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'David Kim',
    role: 'Data Scientist',
    company: 'DataDriven Analytics',
    avatar: '/api/placeholder/100/100',
    content: 'The advanced filters helped me find remote data science positions that matched my experience level. I appreciated how easy it was to track my applications and follow up.',
    rating: 4
  },
  {
    id: 'test-5',
    name: 'Amanda Foster',
    role: 'Registered Nurse',
    company: 'HealthPlus Medical',
    avatar: '/api/placeholder/100/100',
    content: 'JobHunt Pro has an excellent selection of healthcare positions. I found multiple nursing opportunities near my home and was able to compare benefits easily before making my decision.',
    rating: 5
  },
  {
    id: 'test-6',
    name: 'James Williams',
    role: 'Financial Analyst',
    company: 'FinanceFirst Bank',
    avatar: '/api/placeholder/100/100',
    content: 'The salary transparency on JobHunt Pro is fantastic. I knew exactly what to expect and was able to negotiate confidently. Highly recommend for finance professionals!',
    rating: 5
  },
  {
    id: 'test-7',
    name: 'Lisa Thompson',
    role: 'Product Manager',
    company: 'CloudNine Systems',
    avatar: '/api/placeholder/100/100',
    content: 'Coming from a startup, I wanted to join an established tech company. JobHunt Pro\'s company reviews and insights helped me find the perfect culture fit. Love my new role!',
    rating: 4
  },
  {
    id: 'test-8',
    name: 'Robert Martinez',
    role: 'DevOps Engineer',
    company: 'TechCorp Solutions',
    avatar: '/api/placeholder/100/100',
    content: 'The tech job listings on JobHunt Pro are always up-to-date. I received responses from 80% of the companies I applied to. The platform definitely stands out from others.',
    rating: 5
  },
  {
    id: 'test-9',
    name: 'Jennifer Lee',
    role: 'HR Manager',
    company: 'RetailMax Stores',
    avatar: '/api/placeholder/100/100',
    content: 'As someone in HR, I appreciate how JobHunt Pro presents candidate profiles. It made my own job search smooth, and now I recommend the platform to all our candidates.',
    rating: 5
  },
  {
    id: 'test-10',
    name: 'Christopher Brown',
    role: 'Mechanical Engineer',
    company: 'GreenEnergy Solutions',
    avatar: '/api/placeholder/100/100',
    content: 'Found an amazing opportunity in renewable energy through JobHunt Pro. The industry-specific filters helped me focus on sustainable companies that align with my values.',
    rating: 5
  }
];

export const getFeaturedTestimonials = (limit: number = 6): Testimonial[] => {
  return testimonials.filter(t => t.rating === 5).slice(0, limit);
};
