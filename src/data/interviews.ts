import { Interview } from '@/types';

export const interviews: Interview[] = [
  {
    id: 'int-1',
    jobId: 'job-1',
    jobTitle: 'Senior Frontend Developer',
    companyId: 'techcorp',
    companyName: 'TechCorp Inc.',
    companyLogo: '/logos/techcorp.png',
    type: 'video',
    date: '2024-01-22',
    time: '10:00',
    duration: 60,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    interviewers: ['Sarah Mitchell (HR)', 'John Davis (Engineering Manager)'],
    notes: 'Prepare to discuss React architecture and team leadership experience.',
    status: 'scheduled',
    prepChecklist: [
      { id: 'prep-1-1', text: 'Research company background', completed: true },
      { id: 'prep-1-2', text: 'Review job description', completed: true },
      { id: 'prep-1-3', text: 'Prepare questions for interviewer', completed: false },
      { id: 'prep-1-4', text: 'Test video/audio setup', completed: false },
      { id: 'prep-1-5', text: 'Review recent projects', completed: true },
    ],
  },
  {
    id: 'int-2',
    jobId: 'job-2',
    jobTitle: 'Full Stack Developer',
    companyId: 'innovatetech',
    companyName: 'InnovateTech',
    companyLogo: '/logos/innovatetech.png',
    type: 'technical',
    date: '2024-01-18',
    time: '14:00',
    duration: 90,
    meetingLink: 'https://zoom.us/j/123456789',
    interviewers: ['Michael Chen (Lead Engineer)', 'Lisa Wang (Staff Engineer)'],
    notes: 'Technical interview with live coding. Expect system design questions.',
    status: 'scheduled',
    prepChecklist: [
      { id: 'prep-2-1', text: 'Practice coding problems', completed: true },
      { id: 'prep-2-2', text: 'Review system design patterns', completed: true },
      { id: 'prep-2-3', text: 'Brush up on algorithms', completed: true },
      { id: 'prep-2-4', text: 'Prepare development environment', completed: false },
    ],
  },
  {
    id: 'int-3',
    jobId: 'job-3',
    jobTitle: 'DevOps Engineer',
    companyId: 'cloudscale',
    companyName: 'CloudScale',
    companyLogo: '/logos/cloudscale.png',
    type: 'onsite',
    date: '2024-01-25',
    time: '09:00',
    duration: 240,
    location: '123 Tech Street, San Francisco, CA 94105',
    interviewers: ['James Wilson (VP Engineering)', 'Team Panel'],
    notes: 'Full day onsite with multiple rounds. Lunch with the team included.',
    status: 'scheduled',
    prepChecklist: [
      { id: 'prep-3-1', text: 'Plan route to office', completed: false },
      { id: 'prep-3-2', text: 'Prepare portfolio presentation', completed: true },
      { id: 'prep-3-3', text: 'Review AWS/Kubernetes concepts', completed: true },
      { id: 'prep-3-4', text: 'Prepare behavioral examples', completed: false },
      { id: 'prep-3-5', text: 'Print extra resumes', completed: false },
    ],
  },
  {
    id: 'int-4',
    jobId: 'job-4',
    jobTitle: 'ML Engineer',
    companyId: 'financeai',
    companyName: 'FinanceAI',
    companyLogo: '/logos/financeai.png',
    type: 'phone',
    date: '2024-01-16',
    time: '11:00',
    duration: 30,
    interviewers: ['David Park (Recruiter)'],
    notes: 'Initial phone screen to discuss role and salary expectations.',
    status: 'completed',
    prepChecklist: [
      { id: 'prep-4-1', text: 'Research salary ranges', completed: true },
      { id: 'prep-4-2', text: 'Prepare elevator pitch', completed: true },
      { id: 'prep-4-3', text: 'List questions about role', completed: true },
    ],
  },
  {
    id: 'int-5',
    jobId: 'job-5',
    jobTitle: 'Backend Developer',
    companyId: 'healthtech',
    companyName: 'HealthTech Pro',
    companyLogo: '/logos/healthtech.png',
    type: 'behavioral',
    date: '2024-01-19',
    time: '15:00',
    duration: 45,
    meetingLink: 'https://teams.microsoft.com/meet/abc123',
    interviewers: ['Amanda Foster (HR)', 'Robert Kim (Hiring Manager)'],
    notes: 'Focus on teamwork and problem-solving scenarios.',
    status: 'scheduled',
    prepChecklist: [
      { id: 'prep-5-1', text: 'Prepare STAR examples', completed: true },
      { id: 'prep-5-2', text: 'Review company values', completed: false },
      { id: 'prep-5-3', text: 'Practice common behavioral questions', completed: true },
    ],
  },
  {
    id: 'int-6',
    jobId: 'job-6',
    jobTitle: 'React Native Developer',
    companyId: 'startuphub',
    companyName: 'StartupHub',
    companyLogo: '/logos/startuphub.png',
    type: 'video',
    date: '2024-01-10',
    time: '13:00',
    duration: 45,
    meetingLink: 'https://meet.google.com/xyz-uvwx-yz',
    interviewers: ['Lisa Thompson (Tech Lead)'],
    notes: 'Discussed mobile development experience and React Native projects.',
    status: 'completed',
    prepChecklist: [
      { id: 'prep-6-1', text: 'Review React Native basics', completed: true },
      { id: 'prep-6-2', text: 'Prepare mobile portfolio', completed: true },
    ],
  },
  {
    id: 'int-7',
    jobId: 'job-7',
    jobTitle: 'Platform Engineer',
    companyId: 'techunicorn',
    companyName: 'TechUnicorn',
    companyLogo: '/logos/techunicorn.png',
    type: 'technical',
    date: '2024-01-08',
    time: '10:00',
    duration: 60,
    meetingLink: 'https://zoom.us/j/987654321',
    interviewers: ['Steven Clark (Engineering Manager)'],
    notes: 'Great conversation about platform architecture.',
    status: 'completed',
    prepChecklist: [
      { id: 'prep-7-1', text: 'Review distributed systems', completed: true },
      { id: 'prep-7-2', text: 'Prepare architecture diagrams', completed: true },
    ],
  },
  {
    id: 'int-8',
    jobId: 'job-8',
    jobTitle: 'Data Scientist',
    companyId: 'dataflow',
    companyName: 'DataFlow Systems',
    companyLogo: '/logos/dataflow.png',
    type: 'phone',
    date: '2024-01-05',
    time: '16:00',
    duration: 30,
    interviewers: ['Emily Rodriguez (Recruiter)'],
    notes: 'Position filled with another candidate.',
    status: 'cancelled',
    prepChecklist: [],
  },
  {
    id: 'int-9',
    jobId: 'job-9',
    jobTitle: 'Senior Software Engineer',
    companyId: 'ecommerce',
    companyName: 'E-Commerce Giant',
    companyLogo: '/logos/ecommerce.png',
    type: 'video',
    date: '2024-01-28',
    time: '11:00',
    duration: 60,
    meetingLink: 'https://chime.aws/meeting123',
    interviewers: ['Jennifer Lee (Principal Engineer)'],
    notes: 'Final round interview. Focus on leadership and architecture.',
    status: 'scheduled',
    prepChecklist: [
      { id: 'prep-9-1', text: 'Review previous interview notes', completed: true },
      { id: 'prep-9-2', text: 'Prepare leadership examples', completed: false },
      { id: 'prep-9-3', text: 'Research team structure', completed: false },
    ],
  },
  {
    id: 'int-10',
    jobId: 'job-10',
    jobTitle: 'Founding Engineer',
    companyId: 'aistartup',
    companyName: 'AI Startup',
    companyLogo: '/logos/aistartup.png',
    type: 'video',
    date: '2024-01-30',
    time: '14:00',
    duration: 90,
    meetingLink: 'https://meet.google.com/founder-call',
    interviewers: ['Chris Martinez (VP Engineering)', 'CEO'],
    notes: 'Discussion about co-founder/founding engineer opportunity.',
    status: 'scheduled',
    prepChecklist: [
      { id: 'prep-10-1', text: 'Research founder backgrounds', completed: true },
      { id: 'prep-10-2', text: 'Prepare equity questions', completed: false },
      { id: 'prep-10-3', text: 'Review startup landscape', completed: false },
      { id: 'prep-10-4', text: 'Prepare vision presentation', completed: false },
    ],
  },
];

export function getInterviewById(id: string): Interview | undefined {
  return interviews.find((interview) => interview.id === id);
}

export function getUpcomingInterviews(): Interview[] {
  const now = new Date();
  return interviews
    .filter((interview) => {
      const interviewDate = new Date(`${interview.date}T${interview.time}`);
      return interviewDate > now && interview.status === 'scheduled';
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
}

export function getPastInterviews(): Interview[] {
  const now = new Date();
  return interviews
    .filter((interview) => {
      const interviewDate = new Date(`${interview.date}T${interview.time}`);
      return interviewDate <= now || interview.status !== 'scheduled';
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
}

export function getInterviewsByDate(date: string): Interview[] {
  return interviews.filter((interview) => interview.date === date);
}

export function getInterviewStats() {
  return {
    total: interviews.length,
    scheduled: interviews.filter((i) => i.status === 'scheduled').length,
    completed: interviews.filter((i) => i.status === 'completed').length,
    cancelled: interviews.filter((i) => i.status === 'cancelled').length,
  };
}
