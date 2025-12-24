import { Company } from '@/types';

export const companies: Company[] = [
  {
    id: 'comp-1',
    name: 'TechCorp Solutions',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Technology',
    size: '501-1000',
    founded: 2010,
    website: 'https://techcorp.example.com',
    description: 'TechCorp Solutions is a leading technology company specializing in cloud computing, artificial intelligence, and enterprise software solutions. We help businesses transform their digital infrastructure and achieve operational excellence through innovative technology.',
    mission: 'To empower businesses worldwide with cutting-edge technology solutions that drive growth and innovation.',
    culture: 'We foster a culture of innovation, collaboration, and continuous learning. Our team members are encouraged to think outside the box and bring their unique perspectives to solve complex challenges.',
    benefits: [
      'Competitive salary and equity packages',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO policy',
      'Remote work flexibility',
      '401(k) matching up to 6%',
      'Professional development budget',
      'Home office stipend',
      'Wellness programs',
      'Parental leave',
      'Company retreats'
    ],
    locations: [
      { city: 'San Francisco', country: 'USA', address: '100 Tech Street', isHeadquarters: true },
      { city: 'New York', country: 'USA', address: '200 Innovation Ave', isHeadquarters: false },
      { city: 'London', country: 'UK', address: '50 Digital Lane', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
      facebook: 'https://facebook.com/techcorp'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.5,
    reviewCount: 342,
    openPositions: 25,
    verified: true
  },
  {
    id: 'comp-2',
    name: 'DesignHub Creative',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Design',
    size: '51-200',
    founded: 2015,
    website: 'https://designhub.example.com',
    description: 'DesignHub Creative is an award-winning design agency specializing in brand identity, UI/UX design, and creative marketing solutions. We partner with startups and Fortune 500 companies to create memorable brand experiences.',
    mission: 'To transform ideas into beautiful, functional designs that connect brands with their audiences.',
    culture: 'Creativity flows through everything we do. We believe in pushing boundaries, embracing diversity of thought, and creating an environment where designers can do their best work.',
    benefits: [
      'Competitive salary',
      'Health and dental insurance',
      'Flexible working hours',
      'Creative sabbatical program',
      'Design conference budget',
      'Latest design tools and software',
      'Friday team lunches',
      'Art gallery memberships'
    ],
    locations: [
      { city: 'Los Angeles', country: 'USA', address: '500 Creative Blvd', isHeadquarters: true },
      { city: 'Austin', country: 'USA', address: '123 Design District', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/designhub',
      twitter: 'https://twitter.com/designhub',
      instagram: 'https://instagram.com/designhub'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.8,
    reviewCount: 128,
    openPositions: 12,
    verified: true
  },
  {
    id: 'comp-3',
    name: 'FinanceFirst Bank',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Finance',
    size: '1000+',
    founded: 1985,
    website: 'https://financefirst.example.com',
    description: 'FinanceFirst Bank is a leading financial institution providing banking, investment, and wealth management services to individuals and businesses. With over 35 years of experience, we are committed to financial excellence.',
    mission: 'To provide innovative financial solutions that help our customers achieve their financial goals.',
    culture: 'We value integrity, excellence, and customer focus. Our team members are empowered to make decisions that benefit our customers while maintaining the highest ethical standards.',
    benefits: [
      'Competitive compensation packages',
      'Comprehensive benefits',
      'Pension plan with employer matching',
      'Performance bonuses',
      'Professional certifications support',
      'Career advancement programs',
      'Banking product discounts',
      'Gym membership subsidy'
    ],
    locations: [
      { city: 'New York', country: 'USA', address: '1 Wall Street', isHeadquarters: true },
      { city: 'Chicago', country: 'USA', address: '200 Financial Ave', isHeadquarters: false },
      { city: 'Miami', country: 'USA', address: '300 Banking Blvd', isHeadquarters: false },
      { city: 'Dallas', country: 'USA', address: '400 Commerce St', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/financefirst',
      twitter: 'https://twitter.com/financefirst'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.2,
    reviewCount: 567,
    openPositions: 45,
    verified: true
  },
  {
    id: 'comp-4',
    name: 'HealthPlus Medical',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Healthcare',
    size: '1000+',
    founded: 1990,
    website: 'https://healthplus.example.com',
    description: 'HealthPlus Medical is a comprehensive healthcare provider operating hospitals, clinics, and medical research facilities across the country. We are dedicated to improving patient outcomes through innovative care.',
    mission: 'To provide exceptional healthcare services that improve the quality of life for our patients and communities.',
    culture: 'Patient care is at the heart of everything we do. We foster a supportive environment where medical professionals can focus on what matters most - healing and helping others.',
    benefits: [
      'Competitive medical salaries',
      'Full health benefits',
      'Continuing medical education',
      'Malpractice insurance',
      'Retirement plans',
      'Flexible scheduling',
      'Research opportunities',
      'On-site childcare'
    ],
    locations: [
      { city: 'Boston', country: 'USA', address: '100 Medical Center Way', isHeadquarters: true },
      { city: 'Philadelphia', country: 'USA', address: '200 Health Ave', isHeadquarters: false },
      { city: 'Seattle', country: 'USA', address: '300 Care Blvd', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/healthplus',
      twitter: 'https://twitter.com/healthplus',
      facebook: 'https://facebook.com/healthplus'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.4,
    reviewCount: 423,
    openPositions: 78,
    verified: true
  },
  {
    id: 'comp-5',
    name: 'EduLearn Academy',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Education',
    size: '201-500',
    founded: 2012,
    website: 'https://edulearn.example.com',
    description: 'EduLearn Academy is an innovative online education platform providing courses in technology, business, and creative skills. We have helped over 2 million learners advance their careers through quality education.',
    mission: 'To make quality education accessible to everyone, everywhere.',
    culture: 'We believe in the power of education to transform lives. Our team is passionate about creating engaging learning experiences that empower students to achieve their goals.',
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Free access to all courses',
      'Remote-first culture',
      'Learning stipend',
      'Flexible hours',
      'Stock options',
      'Sabbatical program'
    ],
    locations: [
      { city: 'San Francisco', country: 'USA', address: '50 Learning Lane', isHeadquarters: true },
      { city: 'Remote', country: 'Global', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/edulearn',
      twitter: 'https://twitter.com/edulearn',
      facebook: 'https://facebook.com/edulearn'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.6,
    reviewCount: 189,
    openPositions: 18,
    verified: true
  },
  {
    id: 'comp-6',
    name: 'GreenEnergy Solutions',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Engineering',
    size: '201-500',
    founded: 2008,
    website: 'https://greenenergy.example.com',
    description: 'GreenEnergy Solutions is a renewable energy company specializing in solar, wind, and battery storage solutions. We are committed to accelerating the transition to sustainable energy.',
    mission: 'To create a sustainable future through innovative clean energy solutions.',
    culture: 'We are driven by our passion for sustainability and innovation. Our team works collaboratively to solve the worlds most pressing energy challenges.',
    benefits: [
      'Competitive compensation',
      'Health and wellness benefits',
      'Electric vehicle subsidy',
      'Solar panel installation discount',
      'Stock options',
      'Professional development',
      'Flexible work arrangements',
      'Volunteer time off'
    ],
    locations: [
      { city: 'Denver', country: 'USA', address: '100 Green Way', isHeadquarters: true },
      { city: 'Phoenix', country: 'USA', address: '200 Solar Drive', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/greenenergy',
      twitter: 'https://twitter.com/greenenergy'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.7,
    reviewCount: 156,
    openPositions: 22,
    verified: true
  },
  {
    id: 'comp-7',
    name: 'MarketPro Agency',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Marketing',
    size: '51-200',
    founded: 2014,
    website: 'https://marketpro.example.com',
    description: 'MarketPro Agency is a full-service digital marketing agency helping brands grow through SEO, social media, content marketing, and paid advertising. We have delivered results for over 500 clients worldwide.',
    mission: 'To help brands connect with their audiences through strategic, data-driven marketing.',
    culture: 'We thrive on creativity and results. Our team is made up of marketing experts who love testing new ideas and pushing the boundaries of digital marketing.',
    benefits: [
      'Competitive salary plus bonuses',
      'Health insurance',
      'Remote work options',
      'Marketing certifications budget',
      'Company parties and events',
      'Casual dress code',
      'Free snacks and beverages',
      'Career growth opportunities'
    ],
    locations: [
      { city: 'Chicago', country: 'USA', address: '300 Marketing Blvd', isHeadquarters: true },
      { city: 'Atlanta', country: 'USA', address: '150 Digital Ave', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/marketpro',
      twitter: 'https://twitter.com/marketpro',
      instagram: 'https://instagram.com/marketpro'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.3,
    reviewCount: 98,
    openPositions: 8,
    verified: true
  },
  {
    id: 'comp-8',
    name: 'DataDriven Analytics',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Technology',
    size: '51-200',
    founded: 2016,
    website: 'https://datadriven.example.com',
    description: 'DataDriven Analytics is a data science and analytics company helping organizations make better decisions through advanced analytics, machine learning, and business intelligence solutions.',
    mission: 'To unlock the power of data for businesses worldwide.',
    culture: 'We are a team of curious minds who love solving complex problems with data. We encourage experimentation, continuous learning, and knowledge sharing.',
    benefits: [
      'Competitive salary',
      'Equity participation',
      'Health and dental coverage',
      'Remote-first policy',
      'Conference attendance',
      'Learning budget',
      'Latest hardware',
      'Team building activities'
    ],
    locations: [
      { city: 'Seattle', country: 'USA', address: '400 Data Drive', isHeadquarters: true },
      { city: 'Toronto', country: 'Canada', address: '100 Analytics Way', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/datadriven',
      twitter: 'https://twitter.com/datadriven'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.6,
    reviewCount: 87,
    openPositions: 15,
    verified: true
  },
  {
    id: 'comp-9',
    name: 'LegalEase Partners',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Legal',
    size: '201-500',
    founded: 1995,
    website: 'https://legalease.example.com',
    description: 'LegalEase Partners is a prestigious law firm providing comprehensive legal services including corporate law, litigation, intellectual property, and employment law to clients worldwide.',
    mission: 'To provide exceptional legal services with integrity and excellence.',
    culture: 'We uphold the highest standards of legal practice while fostering a collegial and supportive work environment. We believe in mentoring the next generation of legal professionals.',
    benefits: [
      'Top-tier compensation',
      'Comprehensive benefits package',
      'Bar association dues paid',
      'CLE credits support',
      'Partnership track',
      'Billable hour bonuses',
      'Pro bono opportunities',
      'Mentorship program'
    ],
    locations: [
      { city: 'Washington DC', country: 'USA', address: '500 Legal Ave', isHeadquarters: true },
      { city: 'New York', country: 'USA', address: '200 Law Street', isHeadquarters: false },
      { city: 'Los Angeles', country: 'USA', address: '300 Justice Blvd', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/legalease'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.1,
    reviewCount: 234,
    openPositions: 32,
    verified: true
  },
  {
    id: 'comp-10',
    name: 'RetailMax Stores',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Retail',
    size: '1000+',
    founded: 1975,
    website: 'https://retailmax.example.com',
    description: 'RetailMax Stores is one of the largest retail chains in the country, offering a wide range of products from electronics to home goods. With over 500 stores nationwide, we serve millions of customers daily.',
    mission: 'To provide quality products at affordable prices while delivering exceptional customer service.',
    culture: 'Customer satisfaction drives everything we do. We value teamwork, initiative, and a positive attitude in all our team members.',
    benefits: [
      'Competitive hourly rates',
      'Health benefits for full-time',
      'Employee discounts',
      'Flexible scheduling',
      'Career advancement',
      'Training programs',
      '401(k) plan',
      'Paid time off'
    ],
    locations: [
      { city: 'Minneapolis', country: 'USA', address: '1 Retail Plaza', isHeadquarters: true },
      { city: 'Multiple Cities', country: 'USA', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/retailmax',
      twitter: 'https://twitter.com/retailmax',
      facebook: 'https://facebook.com/retailmax'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 3.8,
    reviewCount: 892,
    openPositions: 156,
    verified: true
  },
  {
    id: 'comp-11',
    name: 'CloudNine Systems',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Technology',
    size: '201-500',
    founded: 2013,
    website: 'https://cloudnine.example.com',
    description: 'CloudNine Systems provides enterprise cloud infrastructure and DevOps solutions. We help companies modernize their infrastructure, improve deployment processes, and achieve better scalability.',
    mission: 'To simplify cloud computing for businesses of all sizes.',
    culture: 'We embrace automation, innovation, and continuous improvement. Our engineering-first culture encourages technical excellence and creative problem-solving.',
    benefits: [
      'Competitive salary',
      'Stock options',
      'Unlimited PTO',
      'Remote work',
      'Home office budget',
      'Learning allowance',
      'Health coverage',
      'Team offsites'
    ],
    locations: [
      { city: 'Portland', country: 'USA', address: '100 Cloud Way', isHeadquarters: true },
      { city: 'Remote', country: 'Global', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/cloudnine',
      twitter: 'https://twitter.com/cloudnine'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.7,
    reviewCount: 143,
    openPositions: 19,
    verified: true
  },
  {
    id: 'comp-12',
    name: 'FoodieDelight Restaurants',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Hospitality',
    size: '501-1000',
    founded: 2005,
    website: 'https://foodiedelight.example.com',
    description: 'FoodieDelight Restaurants operates a chain of premium casual dining restaurants known for innovative cuisine and exceptional service. We have 75 locations across major cities.',
    mission: 'To create memorable dining experiences through great food and warm hospitality.',
    culture: 'We are passionate about food and hospitality. Our team members are empowered to go above and beyond to create special moments for our guests.',
    benefits: [
      'Competitive wages plus tips',
      'Meal discounts',
      'Flexible scheduling',
      'Health benefits',
      'Growth opportunities',
      'Training programs',
      'Employee events',
      'Recognition programs'
    ],
    locations: [
      { city: 'Nashville', country: 'USA', address: '200 Culinary Ave', isHeadquarters: true },
      { city: 'Multiple Cities', country: 'USA', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/foodiedelight',
      instagram: 'https://instagram.com/foodiedelight',
      facebook: 'https://facebook.com/foodiedelight'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.0,
    reviewCount: 267,
    openPositions: 42,
    verified: true
  },
  {
    id: 'comp-13',
    name: 'SecureNet Cybersecurity',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Technology',
    size: '51-200',
    founded: 2011,
    website: 'https://securenet.example.com',
    description: 'SecureNet Cybersecurity provides enterprise-grade security solutions including threat detection, incident response, and security consulting. We protect organizations from evolving cyber threats.',
    mission: 'To make the digital world safer for businesses and their customers.',
    culture: 'We are a team of security experts who take pride in protecting organizations from cyber threats. We encourage continuous learning and staying ahead of the latest security trends.',
    benefits: [
      'Premium compensation',
      'Security certifications paid',
      'Conference attendance',
      'Health benefits',
      'Remote options',
      'Flexible hours',
      'Stock options',
      'Research time'
    ],
    locations: [
      { city: 'Washington DC', country: 'USA', address: '300 Security Blvd', isHeadquarters: true },
      { city: 'Austin', country: 'USA', address: '150 Cyber Lane', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/securenet',
      twitter: 'https://twitter.com/securenet'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.5,
    reviewCount: 76,
    openPositions: 11,
    verified: true
  },
  {
    id: 'comp-14',
    name: 'MediaWave Entertainment',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Media',
    size: '201-500',
    founded: 2009,
    website: 'https://mediawave.example.com',
    description: 'MediaWave Entertainment is a digital media company producing content for streaming platforms, podcasts, and social media. We create engaging content that reaches millions of viewers worldwide.',
    mission: 'To entertain and inspire audiences through compelling digital content.',
    culture: 'Creativity is our currency. We encourage bold ideas, collaboration, and pushing the boundaries of digital entertainment.',
    benefits: [
      'Competitive salary',
      'Health coverage',
      'Creative projects',
      'Flexible schedule',
      'Streaming subscriptions',
      'Industry events',
      'Modern studio space',
      'Team celebrations'
    ],
    locations: [
      { city: 'Los Angeles', country: 'USA', address: '500 Media Row', isHeadquarters: true },
      { city: 'New York', country: 'USA', address: '300 Content Ave', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/mediawave',
      twitter: 'https://twitter.com/mediawave',
      instagram: 'https://instagram.com/mediawave'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.3,
    reviewCount: 134,
    openPositions: 14,
    verified: true
  },
  {
    id: 'comp-15',
    name: 'BuildRight Construction',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Construction',
    size: '501-1000',
    founded: 1982,
    website: 'https://buildright.example.com',
    description: 'BuildRight Construction is a leading construction company specializing in commercial, residential, and infrastructure projects. With 40 years of experience, we have completed over 2,000 projects.',
    mission: 'To build quality structures that stand the test of time.',
    culture: 'Safety and quality are non-negotiable. We value skilled craftsmanship, teamwork, and integrity in every project we undertake.',
    benefits: [
      'Competitive pay',
      'Health and safety gear',
      'Training and certifications',
      'Overtime opportunities',
      '401(k) plan',
      'Tool allowance',
      'Career advancement',
      'Union benefits (where applicable)'
    ],
    locations: [
      { city: 'Houston', country: 'USA', address: '100 Build Ave', isHeadquarters: true },
      { city: 'Dallas', country: 'USA', address: '200 Construction Way', isHeadquarters: false },
      { city: 'Phoenix', country: 'USA', address: '300 Builder Blvd', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/buildright',
      facebook: 'https://facebook.com/buildright'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.0,
    reviewCount: 289,
    openPositions: 67,
    verified: true
  },
  {
    id: 'comp-16',
    name: 'PharmaLife Sciences',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Healthcare',
    size: '1000+',
    founded: 1960,
    website: 'https://pharmalife.example.com',
    description: 'PharmaLife Sciences is a global pharmaceutical company developing and manufacturing innovative medicines and vaccines. Our research has led to breakthrough treatments for various diseases.',
    mission: 'To discover and develop medicines that improve patients lives worldwide.',
    culture: 'Scientific excellence drives our work. We foster an environment where researchers can pursue groundbreaking discoveries while maintaining the highest ethical standards.',
    benefits: [
      'Industry-leading compensation',
      'Comprehensive benefits',
      'Research funding',
      'Publication opportunities',
      'Patent bonuses',
      'Sabbatical program',
      'Global mobility',
      'Continuing education'
    ],
    locations: [
      { city: 'Cambridge', country: 'USA', address: '1 Pharma Drive', isHeadquarters: true },
      { city: 'San Diego', country: 'USA', address: '100 Research Blvd', isHeadquarters: false },
      { city: 'Basel', country: 'Switzerland', address: '50 Science Park', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/pharmalife',
      twitter: 'https://twitter.com/pharmalife'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.3,
    reviewCount: 512,
    openPositions: 89,
    verified: true
  },
  {
    id: 'comp-17',
    name: 'TravelGo Adventures',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Travel',
    size: '51-200',
    founded: 2017,
    website: 'https://travelgo.example.com',
    description: 'TravelGo Adventures is a travel technology company offering curated travel experiences, booking services, and travel planning tools. We help millions of travelers discover amazing destinations.',
    mission: 'To make travel more accessible, enjoyable, and memorable for everyone.',
    culture: 'Were travelers at heart. Our team is passionate about exploring the world and helping others create unforgettable travel experiences.',
    benefits: [
      'Competitive salary',
      'Travel credits',
      'Remote work',
      'Health insurance',
      'Flexible PTO',
      'Team travel trips',
      'Modern workspace',
      'Professional development'
    ],
    locations: [
      { city: 'Miami', country: 'USA', address: '200 Travel Way', isHeadquarters: true },
      { city: 'Remote', country: 'Global', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/travelgo',
      twitter: 'https://twitter.com/travelgo',
      instagram: 'https://instagram.com/travelgo'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.5,
    reviewCount: 67,
    openPositions: 9,
    verified: true
  },
  {
    id: 'comp-18',
    name: 'AutoDrive Motors',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Automotive',
    size: '1000+',
    founded: 1950,
    website: 'https://autodrive.example.com',
    description: 'AutoDrive Motors is a major automotive manufacturer known for reliable vehicles and innovation in electric and autonomous driving technology. We produce over 2 million vehicles annually.',
    mission: 'To lead the automotive industry toward a sustainable and autonomous future.',
    culture: 'Engineering excellence meets environmental responsibility. We encourage innovation while maintaining our commitment to quality and safety.',
    benefits: [
      'Competitive compensation',
      'Comprehensive benefits',
      'Vehicle discounts',
      'Retirement plans',
      'Profit sharing',
      'Training programs',
      'Career mobility',
      'On-site amenities'
    ],
    locations: [
      { city: 'Detroit', country: 'USA', address: '1 Auto Drive', isHeadquarters: true },
      { city: 'Los Angeles', country: 'USA', address: '500 EV Way', isHeadquarters: false },
      { city: 'Munich', country: 'Germany', address: '100 Motor Strasse', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/autodrive',
      twitter: 'https://twitter.com/autodrive',
      facebook: 'https://facebook.com/autodrive'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.1,
    reviewCount: 678,
    openPositions: 124,
    verified: true
  },
  {
    id: 'comp-19',
    name: 'GameForge Studios',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Gaming',
    size: '201-500',
    founded: 2007,
    website: 'https://gameforge.example.com',
    description: 'GameForge Studios is an award-winning game development company creating AAA titles for console, PC, and mobile platforms. Our games have been played by over 100 million gamers worldwide.',
    mission: 'To create immersive gaming experiences that inspire and entertain players.',
    culture: 'Were gamers making games for gamers. Our studio encourages creativity, collaboration, and a passion for interactive entertainment.',
    benefits: [
      'Competitive salary',
      'Game royalties',
      'Health benefits',
      'Flexible hours',
      'Game room access',
      'Gaming hardware',
      'Conference attendance',
      'Creative sabbaticals'
    ],
    locations: [
      { city: 'San Francisco', country: 'USA', address: '300 Game Way', isHeadquarters: true },
      { city: 'Montreal', country: 'Canada', address: '100 Studio Ave', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/gameforge',
      twitter: 'https://twitter.com/gameforge',
      instagram: 'https://instagram.com/gameforge'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.4,
    reviewCount: 198,
    openPositions: 28,
    verified: true
  },
  {
    id: 'comp-20',
    name: 'FreshFarm Organics',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Agriculture',
    size: '51-200',
    founded: 2010,
    website: 'https://freshfarm.example.com',
    description: 'FreshFarm Organics is a sustainable agriculture company producing organic produce and developing innovative farming technologies. We supply fresh, healthy food to communities across the country.',
    mission: 'To grow healthy food sustainably while supporting local communities.',
    culture: 'We believe in working with nature, not against it. Our team is committed to sustainable practices and innovation in agriculture.',
    benefits: [
      'Competitive wages',
      'Health coverage',
      'Fresh produce access',
      'Outdoor work environment',
      'Training programs',
      'Seasonal bonuses',
      'Community involvement',
      'Growth opportunities'
    ],
    locations: [
      { city: 'Sacramento', country: 'USA', address: '1 Farm Road', isHeadquarters: true },
      { city: 'Fresno', country: 'USA', address: '100 Organic Way', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/freshfarm',
      instagram: 'https://instagram.com/freshfarm',
      facebook: 'https://facebook.com/freshfarm'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.2,
    reviewCount: 54,
    openPositions: 16,
    verified: true
  },
  {
    id: 'comp-21',
    name: 'AeroSpace Dynamics',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Aerospace',
    size: '1000+',
    founded: 1965,
    website: 'https://aerospace.example.com',
    description: 'AeroSpace Dynamics is a leading aerospace and defense contractor designing and manufacturing aircraft, spacecraft, and defense systems. We are at the forefront of aerospace innovation.',
    mission: 'To push the boundaries of flight and space exploration.',
    culture: 'Precision engineering meets bold innovation. We attract the brightest minds who want to work on the most challenging aerospace projects.',
    benefits: [
      'Premium compensation',
      'Comprehensive benefits',
      'Security clearance support',
      'Advanced research opportunities',
      'Patent programs',
      'Retirement plans',
      'Tuition assistance',
      'Relocation support'
    ],
    locations: [
      { city: 'Seattle', country: 'USA', address: '1 Aerospace Blvd', isHeadquarters: true },
      { city: 'Los Angeles', country: 'USA', address: '200 Flight Way', isHeadquarters: false },
      { city: 'Houston', country: 'USA', address: '300 Space Center', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/aerospace',
      twitter: 'https://twitter.com/aerospace'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.2,
    reviewCount: 445,
    openPositions: 76,
    verified: true
  },
  {
    id: 'comp-22',
    name: 'PetCare Plus',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Pet Care',
    size: '201-500',
    founded: 2012,
    website: 'https://petcareplus.example.com',
    description: 'PetCare Plus is a premium pet services company offering veterinary care, grooming, boarding, and pet supplies. We treat every pet like family.',
    mission: 'To provide exceptional care and services that keep pets healthy and happy.',
    culture: 'Were pet lovers working for pet lovers. Our team is dedicated to the well-being of animals and the families who love them.',
    benefits: [
      'Competitive pay',
      'Health insurance',
      'Pet care discounts',
      'Flexible scheduling',
      'Training certifications',
      'Pet-friendly workplace',
      'Career growth',
      'Team events'
    ],
    locations: [
      { city: 'San Diego', country: 'USA', address: '100 Pet Way', isHeadquarters: true },
      { city: 'Multiple Cities', country: 'USA', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/petcareplus',
      instagram: 'https://instagram.com/petcareplus',
      facebook: 'https://facebook.com/petcareplus'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.6,
    reviewCount: 123,
    openPositions: 34,
    verified: true
  },
  {
    id: 'comp-23',
    name: 'InsureSafe Group',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Insurance',
    size: '501-1000',
    founded: 1980,
    website: 'https://insuresafe.example.com',
    description: 'InsureSafe Group is a comprehensive insurance provider offering auto, home, life, and business insurance. We have been protecting families and businesses for over 40 years.',
    mission: 'To provide peace of mind through reliable insurance coverage and exceptional service.',
    culture: 'Trust and integrity are the foundation of our business. We value our employees and customers equally, creating long-lasting relationships built on reliability.',
    benefits: [
      'Competitive salary',
      'Comprehensive benefits',
      'Insurance discounts',
      'Retirement matching',
      'Career development',
      'Work-life balance',
      'Performance bonuses',
      'Community service days'
    ],
    locations: [
      { city: 'Hartford', country: 'USA', address: '1 Insurance Plaza', isHeadquarters: true },
      { city: 'Charlotte', country: 'USA', address: '200 Coverage Ave', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/insuresafe',
      twitter: 'https://twitter.com/insuresafe'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 3.9,
    reviewCount: 234,
    openPositions: 28,
    verified: true
  },
  {
    id: 'comp-24',
    name: 'FitLife Wellness',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Health & Wellness',
    size: '201-500',
    founded: 2015,
    website: 'https://fitlife.example.com',
    description: 'FitLife Wellness operates a chain of premium fitness centers and wellness spas. We offer state-of-the-art equipment, expert trainers, and holistic wellness programs.',
    mission: 'To inspire and support people on their journey to better health and wellness.',
    culture: 'Were passionate about fitness and helping others achieve their health goals. Our team embodies the active, healthy lifestyle we promote.',
    benefits: [
      'Competitive wages',
      'Free gym membership',
      'Health insurance',
      'Fitness certifications',
      'Flexible schedules',
      'Wellness perks',
      'Team workouts',
      'Career advancement'
    ],
    locations: [
      { city: 'Denver', country: 'USA', address: '500 Fitness Blvd', isHeadquarters: true },
      { city: 'Multiple Cities', country: 'USA', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/fitlife',
      instagram: 'https://instagram.com/fitlife',
      facebook: 'https://facebook.com/fitlife'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.3,
    reviewCount: 167,
    openPositions: 45,
    verified: true
  },
  {
    id: 'comp-25',
    name: 'LogiTrans Shipping',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Logistics',
    size: '1000+',
    founded: 1970,
    website: 'https://logitrans.example.com',
    description: 'LogiTrans Shipping is a global logistics and supply chain company providing freight, warehousing, and distribution services. We move millions of packages daily across the world.',
    mission: 'To deliver goods safely and efficiently, connecting businesses with their customers.',
    culture: 'Reliability and efficiency drive our operations. We value hard work, safety, and continuous improvement in everything we do.',
    benefits: [
      'Competitive compensation',
      'Health and safety benefits',
      'Retirement plans',
      'Overtime opportunities',
      'CDL training',
      'Career advancement',
      'Employee discounts',
      'Performance bonuses'
    ],
    locations: [
      { city: 'Memphis', country: 'USA', address: '1 Logistics Way', isHeadquarters: true },
      { city: 'Louisville', country: 'USA', address: '200 Shipping Blvd', isHeadquarters: false },
      { city: 'Chicago', country: 'USA', address: '300 Distribution Ave', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/logitrans',
      twitter: 'https://twitter.com/logitrans'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 3.7,
    reviewCount: 567,
    openPositions: 234,
    verified: true
  },
  {
    id: 'comp-26',
    name: 'StyleHub Fashion',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Fashion',
    size: '201-500',
    founded: 2008,
    website: 'https://stylehub.example.com',
    description: 'StyleHub Fashion is a contemporary fashion brand known for sustainable, trendy clothing and accessories. We design and produce fashion that looks good and does good.',
    mission: 'To make sustainable fashion accessible and stylish for everyone.',
    culture: 'Creativity meets sustainability. Our team is passionate about fashion, innovation, and making a positive impact on the environment.',
    benefits: [
      'Competitive salary',
      'Health benefits',
      'Fashion discounts',
      'Creative environment',
      'Industry events',
      'Flexible work',
      'Travel opportunities',
      'Sample sales'
    ],
    locations: [
      { city: 'New York', country: 'USA', address: '100 Fashion Ave', isHeadquarters: true },
      { city: 'Los Angeles', country: 'USA', address: '200 Style Blvd', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/stylehub',
      instagram: 'https://instagram.com/stylehub',
      twitter: 'https://twitter.com/stylehub'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.1,
    reviewCount: 89,
    openPositions: 17,
    verified: true
  },
  {
    id: 'comp-27',
    name: 'RealEstate Pro',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Real Estate',
    size: '501-1000',
    founded: 1992,
    website: 'https://realestatepro.example.com',
    description: 'RealEstate Pro is a full-service real estate company offering residential and commercial property services including sales, rentals, property management, and investment consulting.',
    mission: 'To help people find their perfect property and build lasting wealth through real estate.',
    culture: 'Were driven by results and relationships. Our agents are supported with the best tools and training to succeed in a competitive market.',
    benefits: [
      'Competitive commission',
      'Health benefits',
      'Training programs',
      'Lead generation',
      'Marketing support',
      'Technology tools',
      'Mentorship',
      'Flexible schedule'
    ],
    locations: [
      { city: 'Los Angeles', country: 'USA', address: '1 Property Plaza', isHeadquarters: true },
      { city: 'Multiple Cities', country: 'USA', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/realestatepro',
      instagram: 'https://instagram.com/realestatepro',
      facebook: 'https://facebook.com/realestatepro'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.0,
    reviewCount: 312,
    openPositions: 56,
    verified: true
  },
  {
    id: 'comp-28',
    name: 'CryptoVault Exchange',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Fintech',
    size: '51-200',
    founded: 2018,
    website: 'https://cryptovault.example.com',
    description: 'CryptoVault Exchange is a secure cryptocurrency trading platform supporting hundreds of digital assets. We make crypto trading accessible, safe, and easy for everyone.',
    mission: 'To democratize access to digital assets through a secure, user-friendly platform.',
    culture: 'Were building the future of finance. Our team is made up of blockchain enthusiasts, security experts, and fintech innovators.',
    benefits: [
      'Competitive salary',
      'Crypto bonuses',
      'Stock options',
      'Health coverage',
      'Remote-first',
      'Learning budget',
      'Hardware stipend',
      'Team retreats'
    ],
    locations: [
      { city: 'San Francisco', country: 'USA', address: '100 Crypto Way', isHeadquarters: true },
      { city: 'Remote', country: 'Global', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/cryptovault',
      twitter: 'https://twitter.com/cryptovault'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.4,
    reviewCount: 45,
    openPositions: 12,
    verified: true
  },
  {
    id: 'comp-29',
    name: 'EcoClean Services',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Cleaning Services',
    size: '201-500',
    founded: 2006,
    website: 'https://ecoclean.example.com',
    description: 'EcoClean Services provides eco-friendly commercial and residential cleaning services using sustainable products and practices. We care for your space and the environment.',
    mission: 'To provide exceptional cleaning services while protecting the environment.',
    culture: 'We take pride in our work and our environmental commitment. Our team is dedicated to delivering spotless results using green practices.',
    benefits: [
      'Competitive hourly rates',
      'Health benefits',
      'Paid training',
      'Flexible schedules',
      'Equipment provided',
      'Transportation support',
      'Career growth',
      'Team bonuses'
    ],
    locations: [
      { city: 'Portland', country: 'USA', address: '100 Clean Way', isHeadquarters: true },
      { city: 'Multiple Cities', country: 'USA', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/ecoclean',
      facebook: 'https://facebook.com/ecoclean'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.2,
    reviewCount: 78,
    openPositions: 89,
    verified: true
  },
  {
    id: 'comp-30',
    name: 'SmartHome Tech',
    logo: '/api/placeholder/100/100',
    banner: '/api/placeholder/1200/300',
    industry: 'Technology',
    size: '51-200',
    founded: 2014,
    website: 'https://smarthome.example.com',
    description: 'SmartHome Tech designs and manufactures innovative smart home devices and IoT solutions. Our products make homes safer, more efficient, and more connected.',
    mission: 'To create smart home technology that simplifies and improves everyday life.',
    culture: 'Innovation happens at the intersection of hardware and software. Our team loves building products that people use every day.',
    benefits: [
      'Competitive salary',
      'Stock options',
      'Health coverage',
      'Product discounts',
      'Remote work',
      'Hardware budget',
      'Learning opportunities',
      'Team events'
    ],
    locations: [
      { city: 'San Jose', country: 'USA', address: '200 Smart Way', isHeadquarters: true },
      { city: 'Shenzhen', country: 'China', address: '100 Tech Park', isHeadquarters: false }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/smarthome',
      twitter: 'https://twitter.com/smarthome'
    },
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    rating: 4.3,
    reviewCount: 67,
    openPositions: 14,
    verified: true
  }
];

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

export const getCompaniesByIndustry = (industry: string): Company[] => {
  return companies.filter(company => company.industry === industry);
};

export const getFeaturedCompanies = (limit: number = 10): Company[] => {
  return companies.filter(c => c.verified).slice(0, limit);
};

export const searchCompanies = (query: string): Company[] => {
  const lowerQuery = query.toLowerCase();
  return companies.filter(
    company =>
      company.name.toLowerCase().includes(lowerQuery) ||
      company.industry.toLowerCase().includes(lowerQuery) ||
      company.description.toLowerCase().includes(lowerQuery)
  );
};
