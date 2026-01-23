// Mock Data for Career Goals Feature

import type {
  CareerGoal,
  Achievement,
  Milestone,
} from '@/types/career-goals';

// Helper functions for date generation
function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

// Sample Milestones
const reactMilestones: Milestone[] = [
  {
    id: 'milestone-1',
    title: 'Complete React fundamentals course',
    description: 'Finish the official React documentation tutorial',
    status: 'completed',
    dueDate: daysAgo(14),
    completedAt: daysAgo(16),
    order: 1,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(16),
  },
  {
    id: 'milestone-2',
    title: 'Build a personal project with hooks',
    description: 'Create a task management app using useState and useEffect',
    status: 'completed',
    dueDate: daysAgo(7),
    completedAt: daysAgo(8),
    order: 2,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(8),
  },
  {
    id: 'milestone-3',
    title: 'Learn advanced patterns',
    description: 'Study compound components, render props, and custom hooks',
    status: 'in-progress',
    dueDate: daysFromNow(7),
    order: 3,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(2),
  },
  {
    id: 'milestone-4',
    title: 'Contribute to open source',
    description: 'Make meaningful contributions to a React library',
    status: 'pending',
    dueDate: daysFromNow(21),
    order: 4,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(30),
  },
];

const networkingMilestones: Milestone[] = [
  {
    id: 'milestone-5',
    title: 'Update LinkedIn profile',
    description: 'Refresh headline, summary, and add recent projects',
    status: 'completed',
    dueDate: daysAgo(20),
    completedAt: daysAgo(22),
    order: 1,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(22),
  },
  {
    id: 'milestone-6',
    title: 'Connect with 50 industry professionals',
    description: 'Send personalized connection requests',
    status: 'in-progress',
    dueDate: daysFromNow(14),
    order: 2,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(3),
  },
  {
    id: 'milestone-7',
    title: 'Attend 3 tech meetups',
    description: 'Participate in local and virtual tech events',
    status: 'pending',
    dueDate: daysFromNow(30),
    order: 3,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(30),
  },
];

const certificationMilestones: Milestone[] = [
  {
    id: 'milestone-8',
    title: 'Complete AWS Cloud Practitioner course',
    status: 'completed',
    completedAt: daysAgo(45),
    order: 1,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(45),
  },
  {
    id: 'milestone-9',
    title: 'Pass practice exams with 80%+',
    status: 'completed',
    completedAt: daysAgo(30),
    order: 2,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(30),
  },
  {
    id: 'milestone-10',
    title: 'Schedule certification exam',
    status: 'completed',
    completedAt: daysAgo(25),
    order: 3,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(25),
  },
  {
    id: 'milestone-11',
    title: 'Pass AWS certification',
    status: 'completed',
    completedAt: daysAgo(15),
    order: 4,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(15),
  },
];

const jobSearchMilestones: Milestone[] = [
  {
    id: 'milestone-12',
    title: 'Update resume',
    status: 'completed',
    completedAt: daysAgo(10),
    order: 1,
    createdAt: daysAgo(14),
    updatedAt: daysAgo(10),
  },
  {
    id: 'milestone-13',
    title: 'Apply to 20 positions',
    description: 'Focus on senior frontend roles',
    status: 'in-progress',
    dueDate: daysFromNow(14),
    order: 2,
    createdAt: daysAgo(14),
    updatedAt: daysAgo(1),
  },
  {
    id: 'milestone-14',
    title: 'Complete 5 technical interviews',
    status: 'pending',
    dueDate: daysFromNow(30),
    order: 3,
    createdAt: daysAgo(14),
    updatedAt: daysAgo(14),
  },
  {
    id: 'milestone-15',
    title: 'Receive job offer',
    status: 'pending',
    dueDate: daysFromNow(45),
    order: 4,
    createdAt: daysAgo(14),
    updatedAt: daysAgo(14),
  },
];

const leadershipMilestones: Milestone[] = [
  {
    id: 'milestone-16',
    title: 'Read 3 leadership books',
    description: 'Start with "The Manager\'s Path"',
    status: 'in-progress',
    dueDate: daysFromNow(30),
    order: 1,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(5),
  },
  {
    id: 'milestone-17',
    title: 'Mentor a junior developer',
    status: 'pending',
    dueDate: daysFromNow(45),
    order: 2,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20),
  },
  {
    id: 'milestone-18',
    title: 'Lead a team project',
    status: 'pending',
    dueDate: daysFromNow(60),
    order: 3,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20),
  },
];

const blogMilestones: Milestone[] = [
  {
    id: 'milestone-19',
    title: 'Set up personal blog',
    status: 'completed',
    completedAt: daysAgo(25),
    order: 1,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(25),
  },
  {
    id: 'milestone-20',
    title: 'Write 5 technical articles',
    status: 'in-progress',
    dueDate: daysFromNow(30),
    order: 2,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(7),
  },
  {
    id: 'milestone-21',
    title: 'Reach 1000 blog visitors',
    status: 'pending',
    dueDate: daysFromNow(60),
    order: 3,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(30),
  },
];

// Sample Career Goals
export const sampleCareerGoals: CareerGoal[] = [
  {
    id: 'goal-1',
    title: 'Master Advanced React Patterns',
    description:
      'Deep dive into advanced React concepts including custom hooks, compound components, render props, and performance optimization techniques.',
    category: 'skill-development',
    status: 'active',
    priority: 'high',
    progress: 50,
    milestones: reactMilestones,
    startDate: daysAgo(30),
    targetDate: daysFromNow(30),
    tags: ['react', 'frontend', 'javascript'],
    createdAt: daysAgo(30),
    updatedAt: daysAgo(2),
  },
  {
    id: 'goal-2',
    title: 'Expand Professional Network',
    description:
      'Build meaningful connections with industry professionals through LinkedIn, tech meetups, and online communities.',
    category: 'networking',
    status: 'active',
    priority: 'medium',
    progress: 33,
    milestones: networkingMilestones,
    startDate: daysAgo(30),
    targetDate: daysFromNow(60),
    tags: ['networking', 'linkedin', 'career'],
    createdAt: daysAgo(30),
    updatedAt: daysAgo(3),
  },
  {
    id: 'goal-3',
    title: 'AWS Cloud Practitioner Certification',
    description:
      'Obtain AWS Cloud Practitioner certification to validate cloud computing knowledge and enhance career prospects.',
    category: 'certification',
    status: 'completed',
    priority: 'high',
    progress: 100,
    milestones: certificationMilestones,
    startDate: daysAgo(60),
    targetDate: daysAgo(7),
    completedAt: daysAgo(15),
    tags: ['aws', 'cloud', 'certification'],
    createdAt: daysAgo(60),
    updatedAt: daysAgo(15),
  },
  {
    id: 'goal-4',
    title: 'Land Senior Frontend Developer Role',
    description:
      'Secure a senior frontend developer position at a top tech company with competitive compensation and growth opportunities.',
    category: 'job-search',
    status: 'active',
    priority: 'high',
    progress: 25,
    milestones: jobSearchMilestones,
    startDate: daysAgo(14),
    targetDate: daysFromNow(60),
    tags: ['job-search', 'frontend', 'senior'],
    createdAt: daysAgo(14),
    updatedAt: daysAgo(1),
  },
  {
    id: 'goal-5',
    title: 'Develop Leadership Skills',
    description:
      'Build leadership and management skills to prepare for a tech lead or engineering manager role in the future.',
    category: 'career-advancement',
    status: 'active',
    priority: 'medium',
    progress: 0,
    milestones: leadershipMilestones,
    startDate: daysAgo(20),
    targetDate: daysFromNow(90),
    tags: ['leadership', 'management', 'career'],
    createdAt: daysAgo(20),
    updatedAt: daysAgo(5),
  },
  {
    id: 'goal-6',
    title: 'Build Personal Brand Through Blogging',
    description:
      'Establish thought leadership by writing technical articles and building an engaged audience.',
    category: 'personal-brand',
    status: 'active',
    priority: 'low',
    progress: 33,
    milestones: blogMilestones,
    startDate: daysAgo(30),
    targetDate: daysFromNow(90),
    tags: ['blogging', 'content', 'personal-brand'],
    createdAt: daysAgo(30),
    updatedAt: daysAgo(7),
  },
  {
    id: 'goal-7',
    title: 'Complete Computer Science Fundamentals',
    description:
      'Strengthen understanding of data structures, algorithms, and system design for technical interviews.',
    category: 'education',
    status: 'paused',
    priority: 'medium',
    progress: 40,
    milestones: [
      {
        id: 'milestone-22',
        title: 'Complete data structures course',
        status: 'completed',
        completedAt: daysAgo(40),
        order: 1,
        createdAt: daysAgo(60),
        updatedAt: daysAgo(40),
      },
      {
        id: 'milestone-23',
        title: 'Complete algorithms course',
        status: 'in-progress',
        dueDate: daysFromNow(14),
        order: 2,
        createdAt: daysAgo(60),
        updatedAt: daysAgo(30),
      },
      {
        id: 'milestone-24',
        title: 'Practice 100 LeetCode problems',
        status: 'pending',
        dueDate: daysFromNow(45),
        order: 3,
        createdAt: daysAgo(60),
        updatedAt: daysAgo(60),
      },
    ],
    startDate: daysAgo(60),
    targetDate: daysFromNow(45),
    tags: ['dsa', 'algorithms', 'interviews'],
    createdAt: daysAgo(60),
    updatedAt: daysAgo(30),
  },
  {
    id: 'goal-8',
    title: 'Improve Work-Life Balance',
    description:
      'Establish healthy boundaries and habits to maintain productivity while avoiding burnout.',
    category: 'work-life-balance',
    status: 'archived',
    priority: 'low',
    progress: 75,
    milestones: [
      {
        id: 'milestone-25',
        title: 'Establish morning routine',
        status: 'completed',
        completedAt: daysAgo(60),
        order: 1,
        createdAt: daysAgo(90),
        updatedAt: daysAgo(60),
      },
      {
        id: 'milestone-26',
        title: 'Set work hours boundaries',
        status: 'completed',
        completedAt: daysAgo(50),
        order: 2,
        createdAt: daysAgo(90),
        updatedAt: daysAgo(50),
      },
      {
        id: 'milestone-27',
        title: 'Regular exercise routine',
        status: 'completed',
        completedAt: daysAgo(45),
        order: 3,
        createdAt: daysAgo(90),
        updatedAt: daysAgo(45),
      },
      {
        id: 'milestone-28',
        title: 'Weekly disconnect day',
        status: 'skipped',
        order: 4,
        createdAt: daysAgo(90),
        updatedAt: daysAgo(30),
      },
    ],
    startDate: daysAgo(90),
    targetDate: daysAgo(30),
    tags: ['wellness', 'balance', 'productivity'],
    createdAt: daysAgo(90),
    updatedAt: daysAgo(30),
  },
];

// Sample Achievements
export const sampleAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    type: 'goal-completed',
    name: 'First Goal Completed',
    description: 'Completed your first career goal',
    icon: 'Trophy',
    color: 'bg-green-500',
    earnedAt: daysAgo(15),
  },
  {
    id: 'achievement-2',
    type: 'milestone-master',
    name: 'Milestone Master',
    description: 'Completed 10 milestones across all goals',
    icon: 'Target',
    color: 'bg-blue-500',
    earnedAt: daysAgo(10),
  },
  {
    id: 'achievement-3',
    type: 'category-expert',
    name: 'Skill Builder',
    description: 'Completed a goal in the Skill Development category',
    icon: 'BookOpen',
    color: 'bg-purple-500',
    earnedAt: daysAgo(15),
  },
  {
    id: 'achievement-4',
    type: 'early-bird',
    name: 'Early Bird',
    description: 'Completed a goal ahead of schedule',
    icon: 'Clock',
    color: 'bg-amber-500',
    earnedAt: daysAgo(15),
  },
  {
    id: 'achievement-5',
    type: 'streak',
    name: 'On Fire',
    description: 'Maintained a 3-week streak of completing milestones',
    icon: 'Flame',
    color: 'bg-orange-500',
    earnedAt: daysAgo(7),
  },
];

// Helper functions for data queries
export function getGoalById(
  goalId: string,
  goals: CareerGoal[] = sampleCareerGoals
): CareerGoal | undefined {
  return goals.find((goal) => goal.id === goalId);
}

export function getGoalsByStatus(
  status: CareerGoal['status'],
  goals: CareerGoal[] = sampleCareerGoals
): CareerGoal[] {
  return goals.filter((goal) => goal.status === status);
}

export function getGoalsByCategory(
  category: CareerGoal['category'],
  goals: CareerGoal[] = sampleCareerGoals
): CareerGoal[] {
  return goals.filter((goal) => goal.category === category);
}

export function getGoalsByPriority(
  priority: CareerGoal['priority'],
  goals: CareerGoal[] = sampleCareerGoals
): CareerGoal[] {
  return goals.filter((goal) => goal.priority === priority);
}

export function getMilestoneById(
  milestoneId: string,
  goals: CareerGoal[] = sampleCareerGoals
): { milestone: Milestone; goal: CareerGoal } | undefined {
  for (const goal of goals) {
    const milestone = goal.milestones.find((m) => m.id === milestoneId);
    if (milestone) {
      return { milestone, goal };
    }
  }
  return undefined;
}
