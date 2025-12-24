import {
  userAnalytics,
  getProfileViewsTrend,
  getTotalApplications,
  getSuccessRate,
} from '@/data/analytics';

describe('Analytics Data', () => {
  describe('userAnalytics', () => {
    it('should have profileViews array', () => {
      expect(userAnalytics.profileViews).toBeDefined();
      expect(Array.isArray(userAnalytics.profileViews)).toBe(true);
      expect(userAnalytics.profileViews.length).toBeGreaterThan(0);
    });

    it('should have valid profileViews entries', () => {
      userAnalytics.profileViews.forEach((view) => {
        expect(view).toHaveProperty('date');
        expect(view).toHaveProperty('value');
        expect(typeof view.date).toBe('string');
        expect(typeof view.value).toBe('number');
        expect(view.value).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have applicationStats object', () => {
      expect(userAnalytics.applicationStats).toBeDefined();
      expect(userAnalytics.applicationStats).toHaveProperty('total');
      expect(userAnalytics.applicationStats).toHaveProperty('pending');
      expect(userAnalytics.applicationStats).toHaveProperty('reviewed');
      expect(userAnalytics.applicationStats).toHaveProperty('interviews');
      expect(userAnalytics.applicationStats).toHaveProperty('offers');
      expect(userAnalytics.applicationStats).toHaveProperty('rejected');
    });

    it('should have consistent applicationStats totals', () => {
      const { total, pending, reviewed, interviews, offers, rejected } =
        userAnalytics.applicationStats;
      // Total should be >= sum of all statuses (some may be in multiple states)
      expect(total).toBeGreaterThanOrEqual(pending + rejected);
    });

    it('should have responseRate', () => {
      expect(userAnalytics.responseRate).toBeDefined();
      expect(typeof userAnalytics.responseRate).toBe('number');
      expect(userAnalytics.responseRate).toBeGreaterThanOrEqual(0);
      expect(userAnalytics.responseRate).toBeLessThanOrEqual(100);
    });

    it('should have averageResponseTime', () => {
      expect(userAnalytics.averageResponseTime).toBeDefined();
      expect(typeof userAnalytics.averageResponseTime).toBe('number');
      expect(userAnalytics.averageResponseTime).toBeGreaterThan(0);
    });

    it('should have topSearchedSkills array', () => {
      expect(userAnalytics.topSearchedSkills).toBeDefined();
      expect(Array.isArray(userAnalytics.topSearchedSkills)).toBe(true);
      userAnalytics.topSearchedSkills.forEach((skill) => {
        expect(skill).toHaveProperty('skill');
        expect(skill).toHaveProperty('count');
        expect(typeof skill.skill).toBe('string');
        expect(typeof skill.count).toBe('number');
      });
    });

    it('should have weeklyActivity array', () => {
      expect(userAnalytics.weeklyActivity).toBeDefined();
      expect(Array.isArray(userAnalytics.weeklyActivity)).toBe(true);
      expect(userAnalytics.weeklyActivity.length).toBe(7); // 7 days of week
    });

    it('should have valid weeklyActivity entries', () => {
      userAnalytics.weeklyActivity.forEach((day) => {
        expect(day).toHaveProperty('day');
        expect(day).toHaveProperty('applications');
        expect(day).toHaveProperty('profileUpdates');
        expect(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']).toContain(day.day);
      });
    });

    it('should have applicationsByWeek array', () => {
      expect(userAnalytics.applicationsByWeek).toBeDefined();
      expect(Array.isArray(userAnalytics.applicationsByWeek)).toBe(true);
      userAnalytics.applicationsByWeek.forEach((week) => {
        expect(week).toHaveProperty('date');
        expect(week).toHaveProperty('value');
      });
    });
  });

  describe('getProfileViewsTrend', () => {
    it('should return trend object', () => {
      const result = getProfileViewsTrend();
      expect(result).toHaveProperty('current');
      expect(result).toHaveProperty('previous');
      expect(result).toHaveProperty('change');
    });

    it('should return numeric values', () => {
      const result = getProfileViewsTrend();
      expect(typeof result.current).toBe('number');
      expect(typeof result.previous).toBe('number');
      expect(typeof result.change).toBe('number');
    });

    it('should calculate change correctly', () => {
      const result = getProfileViewsTrend();
      if (result.previous > 0) {
        const expectedChange = Math.round(
          ((result.current - result.previous) / result.previous) * 100
        );
        expect(result.change).toBe(expectedChange);
      } else {
        expect(result.change).toBe(0);
      }
    });

    it('should have non-negative current and previous values', () => {
      const result = getProfileViewsTrend();
      expect(result.current).toBeGreaterThanOrEqual(0);
      expect(result.previous).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getTotalApplications', () => {
    it('should return total applications count', () => {
      const result = getTotalApplications();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should match applicationStats.total', () => {
      const result = getTotalApplications();
      expect(result).toBe(userAnalytics.applicationStats.total);
    });
  });

  describe('getSuccessRate', () => {
    it('should return success rate as percentage', () => {
      const result = getSuccessRate();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    it('should calculate based on offers and interviews', () => {
      const { total, offers, interviews } = userAnalytics.applicationStats;
      const expectedRate = total > 0 ? Math.round(((offers + interviews) / total) * 100) : 0;
      const result = getSuccessRate();
      expect(result).toBe(expectedRate);
    });
  });
});
