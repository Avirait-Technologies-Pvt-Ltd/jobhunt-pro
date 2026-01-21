/**
 * Salary Trends - Tests
 *
 * Tests for salary trend calculations and data processing.
 */

import {
  salaryTrends,
  getSalaryTrendsByRole,
  getSalaryTrendsByLocation,
} from '@/data/market-insights';

import {
  formatSalary,
  formatPercentage,
  filterSalaryTrendsByLocation,
  filterSalaryTrendsByRole,
  calculateAdjustedSalary,
} from '@/lib/market-insights-utils';

describe('Salary Trends', () => {
  describe('Salary Trend Data Structure', () => {
    it('should have valid salary trend data', () => {
      expect(salaryTrends.length).toBeGreaterThan(0);

      salaryTrends.forEach((trend) => {
        expect(trend).toHaveProperty('id');
        expect(trend).toHaveProperty('role');
        expect(trend).toHaveProperty('location');
        expect(trend).toHaveProperty('dataPoints');
        expect(trend).toHaveProperty('currentMedian');
        expect(trend).toHaveProperty('changePercentage');
        expect(trend).toHaveProperty('period');
      });
    });

    it('should have valid data points in each trend', () => {
      salaryTrends.forEach((trend) => {
        expect(trend.dataPoints.length).toBeGreaterThan(0);

        trend.dataPoints.forEach((dp) => {
          expect(dp).toHaveProperty('date');
          expect(dp).toHaveProperty('median');
          expect(dp).toHaveProperty('p25');
          expect(dp).toHaveProperty('p75');

          // p25 should be less than median, median less than p75
          expect(dp.p25).toBeLessThanOrEqual(dp.median);
          expect(dp.median).toBeLessThanOrEqual(dp.p75);
        });
      });
    });

    it('should have positive salary values', () => {
      salaryTrends.forEach((trend) => {
        expect(trend.currentMedian).toBeGreaterThan(0);

        trend.dataPoints.forEach((dp) => {
          expect(dp.median).toBeGreaterThan(0);
          expect(dp.p25).toBeGreaterThan(0);
          expect(dp.p75).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Query Helpers', () => {
    it('should get salary trends by role', () => {
      const trends = getSalaryTrendsByRole('software engineer');
      expect(trends.length).toBeGreaterThan(0);

      trends.forEach((trend) => {
        expect(trend.role.toLowerCase()).toContain('software engineer');
      });
    });

    it('should get salary trends by location', () => {
      const trends = getSalaryTrendsByLocation('san francisco');
      expect(trends.length).toBeGreaterThan(0);

      trends.forEach((trend) => {
        expect(trend.location.toLowerCase()).toContain('san francisco');
      });
    });

    it('should return empty array for non-existent role', () => {
      const trends = getSalaryTrendsByRole('non-existent-role-xyz');
      expect(trends.length).toBe(0);
    });

    it('should return empty array for non-existent location', () => {
      const trends = getSalaryTrendsByLocation('non-existent-city');
      expect(trends.length).toBe(0);
    });
  });

  describe('Filter Functions', () => {
    it('should filter salary trends by location', () => {
      const filtered = filterSalaryTrendsByLocation(salaryTrends, ['san francisco']);
      expect(filtered.length).toBeGreaterThan(0);

      filtered.forEach((trend) => {
        expect(trend.location.toLowerCase()).toContain('san francisco');
      });
    });

    it('should filter salary trends by multiple locations', () => {
      const filtered = filterSalaryTrendsByLocation(salaryTrends, [
        'san francisco',
        'seattle',
      ]);
      expect(filtered.length).toBeGreaterThan(0);

      filtered.forEach((trend) => {
        const location = trend.location.toLowerCase();
        expect(
          location.includes('san francisco') || location.includes('seattle')
        ).toBe(true);
      });
    });

    it('should return all trends when locations array is empty', () => {
      const filtered = filterSalaryTrendsByLocation(salaryTrends, []);
      expect(filtered.length).toBe(salaryTrends.length);
    });

    it('should filter salary trends by role', () => {
      const filtered = filterSalaryTrendsByRole(salaryTrends, ['software engineer']);
      expect(filtered.length).toBeGreaterThan(0);

      filtered.forEach((trend) => {
        expect(trend.role.toLowerCase()).toContain('software engineer');
      });
    });
  });

  describe('Salary Calculations', () => {
    it('should format salary correctly', () => {
      expect(formatSalary(150000)).toBe('$150,000');
      expect(formatSalary(95000)).toBe('$95,000');
      expect(formatSalary(200000)).toBe('$200,000');
    });

    it('should format percentage change correctly', () => {
      expect(formatPercentage(8.5)).toBe('+8.5%');
      expect(formatPercentage(-3.2)).toBe('-3.2%');
      expect(formatPercentage(0)).toBe('+0.0%');
    });

    it('should calculate adjusted salary for cost of living', () => {
      // San Francisco COL index is around 189 (high COL)
      const adjustedSF = calculateAdjustedSalary(180000, 189);
      expect(adjustedSF).toBeGreaterThan(0);
      expect(adjustedSF).toBeLessThan(180000);

      // Austin COL index is around 120 (above average but lower than SF)
      // Adjusted salary = (salary / COL) * 100
      // For COL > 100, adjusted salary will be less than nominal
      const adjustedAustin = calculateAdjustedSalary(155000, 120);
      expect(adjustedAustin).toBeGreaterThan(0);
      // 155000 / 120 * 100 = 129167, which is less than 155000
      expect(adjustedAustin).toBeLessThan(155000);

      // For a location with COL < 100, adjusted salary would be higher
      const adjustedLowCOL = calculateAdjustedSalary(100000, 80);
      expect(adjustedLowCOL).toBeGreaterThan(100000); // 100000 / 80 * 100 = 125000
    });
  });

  describe('Salary Trend Analysis', () => {
    it('should identify roles with positive salary growth', () => {
      const positiveGrowth = salaryTrends.filter(
        (trend) => trend.changePercentage > 0
      );
      expect(positiveGrowth.length).toBeGreaterThan(0);
    });

    it('should find highest paying roles', () => {
      const sorted = [...salaryTrends].sort(
        (a, b) => b.currentMedian - a.currentMedian
      );
      const highest = sorted[0];

      expect(highest.currentMedian).toBeGreaterThan(0);
      salaryTrends.forEach((trend) => {
        expect(highest.currentMedian).toBeGreaterThanOrEqual(trend.currentMedian);
      });
    });

    it('should find roles with highest growth', () => {
      const sorted = [...salaryTrends].sort(
        (a, b) => b.changePercentage - a.changePercentage
      );
      const highestGrowth = sorted[0];

      expect(highestGrowth.changePercentage).toBeGreaterThan(0);
    });

    it('should have consistent data over time', () => {
      salaryTrends.forEach((trend) => {
        const dataPoints = trend.dataPoints;

        // Data points should be in chronological order
        for (let i = 1; i < dataPoints.length; i++) {
          const prevDate = new Date(dataPoints[i - 1].date);
          const currDate = new Date(dataPoints[i].date);
          expect(currDate.getTime()).toBeGreaterThanOrEqual(prevDate.getTime());
        }
      });
    });
  });

  describe('Remote vs Location-based Salaries', () => {
    it('should have remote salary data', () => {
      const remoteTrends = salaryTrends.filter((trend) =>
        trend.location.toLowerCase().includes('remote')
      );
      expect(remoteTrends.length).toBeGreaterThan(0);
    });

    it('should compare remote vs location-based salaries', () => {
      const remoteTrend = salaryTrends.find((trend) =>
        trend.location.toLowerCase().includes('remote')
      );
      const sfTrend = salaryTrends.find((trend) =>
        trend.location.toLowerCase().includes('san francisco')
      );

      expect(remoteTrend).toBeDefined();
      expect(sfTrend).toBeDefined();

      if (remoteTrend && sfTrend && remoteTrend.role === sfTrend.role) {
        // San Francisco typically has higher nominal salaries
        expect(sfTrend.currentMedian).toBeGreaterThan(0);
        expect(remoteTrend.currentMedian).toBeGreaterThan(0);
      }
    });
  });
});
