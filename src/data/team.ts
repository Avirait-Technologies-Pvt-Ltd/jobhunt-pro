import { TeamMember } from '@/types';

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Alexandra Chen',
    role: 'CEO & Founder',
    avatar: '/api/placeholder/200/200',
    bio: 'Alexandra founded JobHunt Pro with a vision to revolutionize the job search experience. With 15 years of experience in HR technology, she has helped thousands of professionals find meaningful work.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alexandrachen',
      twitter: 'https://twitter.com/alexandrachen'
    }
  },
  {
    id: 'team-2',
    name: 'Marcus Thompson',
    role: 'Chief Technology Officer',
    avatar: '/api/placeholder/200/200',
    bio: 'Marcus leads our engineering team with expertise in scalable systems and AI. Previously at Google and Amazon, he brings world-class technical leadership to JobHunt Pro.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/marcusthompson',
      twitter: 'https://twitter.com/marcusthompson'
    }
  },
  {
    id: 'team-3',
    name: 'Sarah Williams',
    role: 'Chief Product Officer',
    avatar: '/api/placeholder/200/200',
    bio: 'Sarah shapes the product vision at JobHunt Pro. Her background in UX design and product management ensures our platform delivers exceptional user experiences.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahwilliams'
    }
  },
  {
    id: 'team-4',
    name: 'David Rodriguez',
    role: 'Head of Engineering',
    avatar: '/api/placeholder/200/200',
    bio: 'David manages our talented engineering team. His expertise in full-stack development and agile methodologies keeps our platform running smoothly and evolving rapidly.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/davidrodriguez',
      twitter: 'https://twitter.com/davidrodriguez'
    }
  },
  {
    id: 'team-5',
    name: 'Emily Foster',
    role: 'Head of Customer Success',
    avatar: '/api/placeholder/200/200',
    bio: 'Emily ensures every job seeker has the support they need. Her team provides guidance, resources, and assistance throughout the job search journey.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emilyfoster'
    }
  },
  {
    id: 'team-6',
    name: 'James Park',
    role: 'Head of Business Development',
    avatar: '/api/placeholder/200/200',
    bio: 'James builds partnerships with companies looking to hire top talent. His network spans Fortune 500 companies to innovative startups across all industries.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/jamespark',
      twitter: 'https://twitter.com/jamespark'
    }
  },
  {
    id: 'team-7',
    name: 'Rachel Kim',
    role: 'Head of Marketing',
    avatar: '/api/placeholder/200/200',
    bio: 'Rachel leads our marketing efforts to connect job seekers with opportunities. Her data-driven approach has helped grow our platform to millions of users.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/rachelkim',
      twitter: 'https://twitter.com/rachelkim'
    }
  },
  {
    id: 'team-8',
    name: 'Michael Brown',
    role: 'Head of Data Science',
    avatar: '/api/placeholder/200/200',
    bio: 'Michael leads our data science initiatives, developing algorithms that match candidates with the right opportunities. His work powers our smart job recommendations.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michaelbrown'
    }
  }
];

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

export const getLeadershipTeam = (): TeamMember[] => {
  return teamMembers.slice(0, 4);
};
