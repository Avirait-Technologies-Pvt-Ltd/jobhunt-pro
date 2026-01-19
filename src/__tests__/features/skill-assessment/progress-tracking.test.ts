import {
  calculateTrend,
  calculateCategoryPerformance,
  calculateStreak,
  calculateUserStats,
  formatDuration,
  formatDurationLong,
  formatRelativeDate,
  getTrendDisplay,
  getCategoryLabel,
  getDifficultyConfig,
} from '@/lib/assessment-utils';
import {
  AssessmentHistory,
  AssessmentResult,
  CategoryPerformance,
  UserAssessmentStats,
  AssessmentBadge,
} from '@/types/skill-assessment';

describe('Progress Tracking - Utility Functions', () => {
  describe('calculateTrend', () => {
    it('should return stable for single score', () => {
      const trend = calculateTrend([80]);
      expect(trend).toBe('stable');
    });

    it('should return stable for empty scores', () => {
      const trend = calculateTrend([]);
      expect(trend).toBe('stable');
    });

    it('should return improving for increasing scores', () => {
      const trend = calculateTrend([60, 65, 70, 75, 80, 85]);
      expect(trend).toBe('improving');
    });

    it('should return declining for decreasing scores', () => {
      const trend = calculateTrend([90, 85, 80, 75, 70, 65]);
      expect(trend).toBe('declining');
    });

    it('should return stable for consistent scores', () => {
      const trend = calculateTrend([75, 76, 74, 75, 76, 75]);
      expect(trend).toBe('stable');
    });

    it('should detect improvement with small difference threshold', () => {
      const trend = calculateTrend([70, 72, 75, 78, 80, 83]);
      expect(trend).toBe('improving');
    });

    it('should handle two scores', () => {
      expect(calculateTrend([60, 80])).toBe('improving');
      expect(calculateTrend([80, 60])).toBe('declining');
      expect(calculateTrend([70, 72])).toBe('stable');
    });
  });

  describe('calculateCategoryPerformance', () => {
    const sampleHistory: AssessmentHistory[] = [
      {
        assessmentId: 'assessment-1',
        assessmentTitle: 'JavaScript Basics',
        category: 'programming',
        attempts: [
          {
            id: 'attempt-1',
            sessionId: 'session-1',
            score: 80,
            percentage: 80,
            passed: true,
            timeSpent: 200,
            completedAt: '2024-03-01T10:00:00Z',
          },
          {
            id: 'attempt-2',
            sessionId: 'session-2',
            score: 90,
            percentage: 90,
            passed: true,
            timeSpent: 180,
            completedAt: '2024-03-05T10:00:00Z',
          },
        ],
        bestScore: 90,
        lastAttemptDate: '2024-03-05T10:00:00Z',
        hasPassed: true,
      },
      {
        assessmentId: 'assessment-2',
        assessmentTitle: 'React Fundamentals',
        category: 'frontend',
        attempts: [
          {
            id: 'attempt-3',
            sessionId: 'session-3',
            score: 70,
            percentage: 70,
            passed: true,
            timeSpent: 250,
            completedAt: '2024-03-03T10:00:00Z',
          },
        ],
        bestScore: 70,
        lastAttemptDate: '2024-03-03T10:00:00Z',
        hasPassed: true,
      },
    ];

    it('should return null for category with no history', () => {
      const performance = calculateCategoryPerformance(sampleHistory, 'database');
      expect(performance).toBeNull();
    });

    it('should calculate performance for existing category', () => {
      const performance = calculateCategoryPerformance(sampleHistory, 'programming');

      expect(performance).not.toBeNull();
      expect(performance?.category).toBe('programming');
      expect(performance?.assessmentsCompleted).toBe(1);
    });

    it('should calculate average score', () => {
      const performance = calculateCategoryPerformance(sampleHistory, 'programming');

      // Average of 80 and 90 = 85
      expect(performance?.averageScore).toBe(85);
    });

    it('should find best score', () => {
      const performance = calculateCategoryPerformance(sampleHistory, 'programming');

      expect(performance?.bestScore).toBe(90);
    });

    it('should determine trend from history', () => {
      const performance = calculateCategoryPerformance(sampleHistory, 'programming');

      // Scores went from 80 to 90, should be improving
      expect(performance?.trend).toBeDefined();
    });

    it('should calculate for frontend category', () => {
      const performance = calculateCategoryPerformance(sampleHistory, 'frontend');

      expect(performance).not.toBeNull();
      expect(performance?.category).toBe('frontend');
      expect(performance?.assessmentsCompleted).toBe(1);
      expect(performance?.bestScore).toBe(70);
    });
  });

  describe('calculateStreak', () => {
    // Mock current date for consistent testing
    const RealDate = Date;

    beforeAll(() => {
      const mockDate = new RealDate('2024-03-10T12:00:00Z');
      jest.spyOn(global, 'Date').mockImplementation((arg) => {
        if (arg) {
          return new RealDate(arg);
        }
        return mockDate;
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should return 0 for empty dates', () => {
      const streak = calculateStreak([]);
      expect(streak).toBe(0);
    });

    it('should return 1 for assessment today', () => {
      const streak = calculateStreak(['2024-03-10T10:00:00Z']);
      expect(streak).toBe(1);
    });

    it('should count consecutive days', () => {
      const dates = [
        '2024-03-10T10:00:00Z',
        '2024-03-09T14:00:00Z',
        '2024-03-08T09:00:00Z',
      ];
      const streak = calculateStreak(dates);
      expect(streak).toBe(3);
    });

    it('should break streak on gap', () => {
      const dates = [
        '2024-03-10T10:00:00Z',
        '2024-03-09T14:00:00Z',
        '2024-03-07T09:00:00Z', // Gap on 8th
      ];
      const streak = calculateStreak(dates);
      expect(streak).toBe(2);
    });

    it('should handle multiple assessments on same day', () => {
      const dates = [
        '2024-03-10T10:00:00Z',
        '2024-03-10T14:00:00Z',
        '2024-03-09T09:00:00Z',
      ];
      const streak = calculateStreak(dates);
      expect(streak).toBeGreaterThanOrEqual(2);
    });

    it('should handle unsorted dates', () => {
      const dates = [
        '2024-03-08T10:00:00Z',
        '2024-03-10T14:00:00Z',
        '2024-03-09T09:00:00Z',
      ];
      const streak = calculateStreak(dates);
      expect(streak).toBe(3);
    });
  });

  describe('calculateUserStats', () => {
    const sampleBadge: AssessmentBadge = {
      id: 'badge-1',
      name: 'JS Beginner',
      icon: 'code',
      color: 'yellow',
      description: 'Completed JS basics',
    };

    const sampleResults: AssessmentResult[] = [
      {
        id: 'result-1',
        sessionId: 'session-1',
        assessmentId: 'assessment-1',
        assessmentTitle: 'JavaScript Basics',
        userId: 'user-1',
        score: 80,
        totalPoints: 100,
        percentage: 80,
        passed: true,
        correctAnswers: 8,
        totalQuestions: 10,
        timeSpent: 200,
        completedAt: '2024-03-08T10:00:00Z',
        badge: sampleBadge,
        categoryBreakdown: [{ category: 'programming', correct: 8, total: 10, percentage: 80 }],
        questionResults: [],
      },
      {
        id: 'result-2',
        sessionId: 'session-2',
        assessmentId: 'assessment-2',
        assessmentTitle: 'React Fundamentals',
        userId: 'user-1',
        score: 70,
        totalPoints: 100,
        percentage: 70,
        passed: true,
        correctAnswers: 7,
        totalQuestions: 10,
        timeSpent: 250,
        completedAt: '2024-03-09T10:00:00Z',
        categoryBreakdown: [{ category: 'frontend', correct: 7, total: 10, percentage: 70 }],
        questionResults: [],
      },
      {
        id: 'result-3',
        sessionId: 'session-3',
        assessmentId: 'assessment-3',
        assessmentTitle: 'SQL Basics',
        userId: 'user-1',
        score: 50,
        totalPoints: 100,
        percentage: 50,
        passed: false,
        correctAnswers: 5,
        totalQuestions: 10,
        timeSpent: 300,
        completedAt: '2024-03-10T10:00:00Z',
        categoryBreakdown: [{ category: 'database', correct: 5, total: 10, percentage: 50 }],
        questionResults: [],
      },
    ];

    const sampleHistory: AssessmentHistory[] = [];

    it('should calculate total assessments completed', () => {
      const stats = calculateUserStats(sampleResults, sampleHistory);
      expect(stats.totalAssessmentsCompleted).toBe(3);
    });

    it('should calculate total assessments passed', () => {
      const stats = calculateUserStats(sampleResults, sampleHistory);
      expect(stats.totalAssessmentsPassed).toBe(2);
    });

    it('should calculate total points earned', () => {
      const stats = calculateUserStats(sampleResults, sampleHistory);
      expect(stats.totalPointsEarned).toBe(200); // 80 + 70 + 50
    });

    it('should calculate average score', () => {
      const stats = calculateUserStats(sampleResults, sampleHistory);
      // (80 + 70 + 50) / 3 = 66.67, rounded to 67
      expect(stats.averageScore).toBe(67);
    });

    it('should calculate total time spent', () => {
      const stats = calculateUserStats(sampleResults, sampleHistory);
      expect(stats.totalTimeSpent).toBe(750); // 200 + 250 + 300
    });

    it('should collect unique badges', () => {
      const stats = calculateUserStats(sampleResults, sampleHistory);
      expect(stats.badgesEarned.length).toBe(1);
      expect(stats.badgesEarned[0].id).toBe('badge-1');
    });

    it('should include recent results', () => {
      const stats = calculateUserStats(sampleResults, sampleHistory);
      expect(stats.recentResults.length).toBeGreaterThan(0);
    });

    it('should return last assessment date', () => {
      const stats = calculateUserStats(sampleResults, sampleHistory);
      expect(stats.lastAssessmentDate).toBe('2024-03-10T10:00:00Z');
    });

    it('should handle empty results', () => {
      const stats = calculateUserStats([], []);

      expect(stats.totalAssessmentsCompleted).toBe(0);
      expect(stats.totalAssessmentsPassed).toBe(0);
      expect(stats.totalPointsEarned).toBe(0);
      expect(stats.averageScore).toBe(0);
      expect(stats.badgesEarned).toEqual([]);
      expect(stats.lastAssessmentDate).toBeUndefined();
    });
  });

  describe('formatDuration', () => {
    it('should format seconds correctly', () => {
      expect(formatDuration(0)).toBe('0:00');
      expect(formatDuration(30)).toBe('0:30');
      expect(formatDuration(59)).toBe('0:59');
    });

    it('should format minutes correctly', () => {
      expect(formatDuration(60)).toBe('1:00');
      expect(formatDuration(90)).toBe('1:30');
      expect(formatDuration(120)).toBe('2:00');
    });

    it('should format multiple minutes', () => {
      expect(formatDuration(300)).toBe('5:00');
      expect(formatDuration(305)).toBe('5:05');
      expect(formatDuration(3600)).toBe('60:00');
    });

    it('should handle negative values', () => {
      expect(formatDuration(-10)).toBe('0:00');
    });

    it('should pad seconds with zero', () => {
      expect(formatDuration(61)).toBe('1:01');
      expect(formatDuration(65)).toBe('1:05');
    });
  });

  describe('formatDurationLong', () => {
    it('should format seconds', () => {
      expect(formatDurationLong(1)).toBe('1 second');
      expect(formatDurationLong(30)).toBe('30 seconds');
      expect(formatDurationLong(59)).toBe('59 seconds');
    });

    it('should format minutes', () => {
      expect(formatDurationLong(60)).toBe('1 minute');
      expect(formatDurationLong(120)).toBe('2 minutes');
      expect(formatDurationLong(300)).toBe('5 minutes');
    });

    it('should format minutes and seconds', () => {
      expect(formatDurationLong(90)).toBe('1m 30s');
      expect(formatDurationLong(125)).toBe('2m 5s');
    });

    it('should handle zero', () => {
      expect(formatDurationLong(0)).toBe('0 seconds');
    });
  });

  describe('formatRelativeDate', () => {
    const RealDate = Date;

    beforeAll(() => {
      const mockDate = new RealDate('2024-03-10T12:00:00Z');
      jest.spyOn(global, 'Date').mockImplementation((arg) => {
        if (arg) {
          return new RealDate(arg);
        }
        return mockDate;
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should return "Just now" for very recent dates', () => {
      const result = formatRelativeDate('2024-03-10T11:59:30Z');
      expect(result).toBe('Just now');
    });

    it('should return minutes ago', () => {
      const result = formatRelativeDate('2024-03-10T11:50:00Z');
      expect(result).toContain('minute');
    });

    it('should return hours ago', () => {
      const result = formatRelativeDate('2024-03-10T09:00:00Z');
      expect(result).toContain('hour');
    });

    it('should return "Yesterday" for previous day', () => {
      const result = formatRelativeDate('2024-03-09T10:00:00Z');
      expect(result).toBe('Yesterday');
    });

    it('should return days ago', () => {
      const result = formatRelativeDate('2024-03-06T10:00:00Z');
      expect(result).toBe('4 days ago');
    });

    it('should return weeks ago', () => {
      const result = formatRelativeDate('2024-02-25T10:00:00Z');
      expect(result).toContain('week');
    });

    it('should return months ago', () => {
      const result = formatRelativeDate('2024-01-10T10:00:00Z');
      expect(result).toContain('month');
    });
  });

  describe('getTrendDisplay', () => {
    it('should return improving display', () => {
      const display = getTrendDisplay('improving');
      expect(display.icon).toBe('↑');
      expect(display.color).toBe('text-green-600');
      expect(display.label).toBe('Improving');
    });

    it('should return stable display', () => {
      const display = getTrendDisplay('stable');
      expect(display.icon).toBe('→');
      expect(display.color).toBe('text-yellow-600');
      expect(display.label).toBe('Stable');
    });

    it('should return declining display', () => {
      const display = getTrendDisplay('declining');
      expect(display.icon).toBe('↓');
      expect(display.color).toBe('text-red-600');
      expect(display.label).toBe('Needs Attention');
    });
  });

  describe('getCategoryLabel', () => {
    it('should return correct labels for categories', () => {
      expect(getCategoryLabel('programming')).toBe('Programming');
      expect(getCategoryLabel('frontend')).toBe('Frontend Development');
      expect(getCategoryLabel('backend')).toBe('Backend Development');
      expect(getCategoryLabel('database')).toBe('Database');
      expect(getCategoryLabel('soft-skills')).toBe('Soft Skills');
      expect(getCategoryLabel('leadership')).toBe('Leadership');
    });
  });

  describe('getDifficultyConfig', () => {
    it('should return config for beginner', () => {
      const config = getDifficultyConfig('beginner');
      expect(config.label).toBe('Beginner');
      expect(config.color).toContain('green');
      expect(config.points).toBe(10);
    });

    it('should return config for intermediate', () => {
      const config = getDifficultyConfig('intermediate');
      expect(config.label).toBe('Intermediate');
      expect(config.color).toContain('yellow');
      expect(config.points).toBe(20);
    });

    it('should return config for advanced', () => {
      const config = getDifficultyConfig('advanced');
      expect(config.label).toBe('Advanced');
      expect(config.color).toContain('red');
      expect(config.points).toBe(30);
    });
  });
});
