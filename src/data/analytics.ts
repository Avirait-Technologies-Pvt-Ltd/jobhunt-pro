import { UserAnalytics } from '@/types';

export const userAnalytics: UserAnalytics = {
  profileViews: [
    { date: '2024-01-01', value: 12 },
    { date: '2024-01-02', value: 15 },
    { date: '2024-01-03', value: 8 },
    { date: '2024-01-04', value: 22 },
    { date: '2024-01-05', value: 18 },
    { date: '2024-01-06', value: 25 },
    { date: '2024-01-07', value: 14 },
    { date: '2024-01-08', value: 30 },
    { date: '2024-01-09', value: 28 },
    { date: '2024-01-10', value: 35 },
    { date: '2024-01-11', value: 42 },
    { date: '2024-01-12', value: 38 },
    { date: '2024-01-13', value: 20 },
    { date: '2024-01-14', value: 45 },
    { date: '2024-01-15', value: 50 },
  ],
  applicationStats: {
    total: 24,
    pending: 8,
    reviewed: 6,
    interviews: 5,
    offers: 2,
    rejected: 3,
  },
  applicationsByWeek: [
    { date: 'Week 1', value: 5 },
    { date: 'Week 2', value: 8 },
    { date: 'Week 3', value: 6 },
    { date: 'Week 4', value: 5 },
  ],
  responseRate: 42,
  averageResponseTime: 3.5,
  topSearchedSkills: [
    { skill: 'React', count: 156 },
    { skill: 'TypeScript', count: 142 },
    { skill: 'Node.js', count: 128 },
    { skill: 'Python', count: 98 },
    { skill: 'AWS', count: 87 },
    { skill: 'Docker', count: 76 },
    { skill: 'GraphQL', count: 65 },
    { skill: 'PostgreSQL', count: 54 },
  ],
  weeklyActivity: [
    { day: 'Mon', applications: 3, profileUpdates: 2 },
    { day: 'Tue', applications: 5, profileUpdates: 1 },
    { day: 'Wed', applications: 4, profileUpdates: 3 },
    { day: 'Thu', applications: 6, profileUpdates: 2 },
    { day: 'Fri', applications: 4, profileUpdates: 1 },
    { day: 'Sat', applications: 1, profileUpdates: 0 },
    { day: 'Sun', applications: 1, profileUpdates: 1 },
  ],
};

export function getProfileViewsTrend(): { current: number; previous: number; change: number } {
  const views = userAnalytics.profileViews;
  const midpoint = Math.floor(views.length / 2);
  const current = views.slice(midpoint).reduce((sum, v) => sum + v.value, 0);
  const previous = views.slice(0, midpoint).reduce((sum, v) => sum + v.value, 0);
  const change = previous > 0 ? Math.round(((current - previous) / previous) * 100) : 0;
  return { current, previous, change };
}

export function getTotalApplications(): number {
  return userAnalytics.applicationStats.total;
}

export function getSuccessRate(): number {
  const { total, offers, interviews } = userAnalytics.applicationStats;
  if (total === 0) return 0;
  return Math.round(((offers + interviews) / total) * 100);
}
