/**
 * Market Insights Utilities - Tests
 *
 * Tests for utility functions including formatting, filtering, sorting, and aggregation.
 */

import {
  formatSalary,
  formatPercentage,
  formatJobCount,
  formatNumber,
  formatCompactNumber,
  filterSkillsByCategory,
  filterSkillsByDemandScore,
  filterSkillsByQuery,
  filterRolesByCategory,
  filterRolesByCompetition,
  sortSkillsByDemand,
  sortSkillsByGrowth,
  sortRolesBySalary,
  sortRolesByDemand,
  sortIndustriesByGrowth,
  sortLocationsByAdjustedSalary,
  aggregateSkillsByCategory,
  calculateMarketStatistics,
  classifyDemandLevel,
  classifyGrowthRate,
  searchMarketInsights,
} from '@/lib/market-insights-utils';

import {
  trendingSkills,
  inDemandRoles,
  industryGrowth,
  locationComparisons,
} from '@/data/market-insights';

describe('Market Insights Utilities', () => {
  describe('Display Helpers', () => {
    describe('formatSalary', () => {
      it('should format salary with dollar sign and commas', () => {
        expect(formatSalary(150000)).toBe('$150,000');
        expect(formatSalary(75000)).toBe('$75,000');
        expect(formatSalary(1000000)).toBe('$1,000,000');
      });

      it('should handle zero', () => {
        expect(formatSalary(0)).toBe('$0');
      });
    });

    describe('formatPercentage', () => {
      it('should format positive percentage with plus sign', () => {
        expect(formatPercentage(15.5)).toBe('+15.5%');
        expect(formatPercentage(0)).toBe('+0.0%');
      });

      it('should format negative percentage with minus sign', () => {
        expect(formatPercentage(-8.2)).toBe('-8.2%');
      });
    });

    describe('formatJobCount', () => {
      it('should format thousands with K suffix', () => {
        expect(formatJobCount(45000)).toBe('45.0K');
        expect(formatJobCount(1500)).toBe('1.5K');
      });

      it('should format millions with M suffix', () => {
        expect(formatJobCount(1500000)).toBe('1.5M');
      });

      it('should not add suffix for small numbers', () => {
        expect(formatJobCount(500)).toBe('500');
      });
    });

    describe('formatNumber', () => {
      it('should format numbers with commas', () => {
        expect(formatNumber(1234567)).toBe('1,234,567');
        expect(formatNumber(1000)).toBe('1,000');
      });
    });

    describe('formatCompactNumber', () => {
      it('should format large numbers compactly', () => {
        expect(formatCompactNumber(1234567)).toMatch(/1\.2M/);
        expect(formatCompactNumber(45000)).toMatch(/45K/);
      });
    });
  });

  describe('Filter Functions', () => {
    describe('filterSkillsByCategory', () => {
      it('should filter skills by single category', () => {
        const result = filterSkillsByCategory(trendingSkills, ['technology']);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((skill) => {
          expect(skill.category).toBe('technology');
        });
      });

      it('should filter skills by multiple categories', () => {
        const result = filterSkillsByCategory(trendingSkills, [
          'technology',
          'data-science',
        ]);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((skill) => {
          expect(['technology', 'data-science']).toContain(skill.category);
        });
      });

      it('should return all skills when categories array is empty', () => {
        const result = filterSkillsByCategory(trendingSkills, []);
        expect(result.length).toBe(trendingSkills.length);
      });
    });

    describe('filterSkillsByDemandScore', () => {
      it('should filter skills by minimum demand score', () => {
        const result = filterSkillsByDemandScore(trendingSkills, 90);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((skill) => {
          expect(skill.demandScore).toBeGreaterThanOrEqual(90);
        });
      });

      it('should return all skills when minScore is 0', () => {
        const result = filterSkillsByDemandScore(trendingSkills, 0);
        expect(result.length).toBe(trendingSkills.length);
      });
    });

    describe('filterSkillsByQuery', () => {
      it('should filter skills by name', () => {
        const result = filterSkillsByQuery(trendingSkills, 'python');
        expect(result.length).toBeGreaterThan(0);
      });

      it('should filter skills by related skill', () => {
        const result = filterSkillsByQuery(trendingSkills, 'tensorflow');
        expect(result.length).toBeGreaterThan(0);
      });

      it('should return all skills when query is empty', () => {
        const result = filterSkillsByQuery(trendingSkills, '');
        expect(result.length).toBe(trendingSkills.length);
      });

      it('should be case-insensitive', () => {
        const result1 = filterSkillsByQuery(trendingSkills, 'PYTHON');
        const result2 = filterSkillsByQuery(trendingSkills, 'python');
        expect(result1.length).toBe(result2.length);
      });
    });

    describe('filterRolesByCategory', () => {
      it('should filter roles by category', () => {
        const result = filterRolesByCategory(inDemandRoles, ['engineering']);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((role) => {
          expect(role.category).toBe('engineering');
        });
      });
    });

    describe('filterRolesByCompetition', () => {
      it('should filter roles by competition level', () => {
        const result = filterRolesByCompetition(inDemandRoles, ['low']);
        result.forEach((role) => {
          expect(role.competitionLevel).toBe('low');
        });
      });
    });
  });

  describe('Sort Functions', () => {
    describe('sortSkillsByDemand', () => {
      it('should sort skills by demand score descending', () => {
        const result = sortSkillsByDemand(trendingSkills, true);
        for (let i = 1; i < result.length; i++) {
          expect(result[i - 1].demandScore).toBeGreaterThanOrEqual(
            result[i].demandScore
          );
        }
      });

      it('should sort skills by demand score ascending', () => {
        const result = sortSkillsByDemand(trendingSkills, false);
        for (let i = 1; i < result.length; i++) {
          expect(result[i - 1].demandScore).toBeLessThanOrEqual(
            result[i].demandScore
          );
        }
      });

      it('should not mutate original array', () => {
        const original = [...trendingSkills];
        sortSkillsByDemand(trendingSkills, true);
        expect(trendingSkills).toEqual(original);
      });
    });

    describe('sortSkillsByGrowth', () => {
      it('should sort skills by growth percentage descending', () => {
        const result = sortSkillsByGrowth(trendingSkills, true);
        for (let i = 1; i < result.length; i++) {
          expect(result[i - 1].growthPercentage).toBeGreaterThanOrEqual(
            result[i].growthPercentage
          );
        }
      });
    });

    describe('sortRolesBySalary', () => {
      it('should sort roles by salary descending', () => {
        const result = sortRolesBySalary(inDemandRoles, true);
        for (let i = 1; i < result.length; i++) {
          expect(result[i - 1].avgSalary).toBeGreaterThanOrEqual(
            result[i].avgSalary
          );
        }
      });
    });

    describe('sortRolesByDemand', () => {
      it('should sort roles by demand score descending', () => {
        const result = sortRolesByDemand(inDemandRoles, true);
        for (let i = 1; i < result.length; i++) {
          expect(result[i - 1].demandScore).toBeGreaterThanOrEqual(
            result[i].demandScore
          );
        }
      });
    });

    describe('sortIndustriesByGrowth', () => {
      it('should sort industries by growth rate descending', () => {
        const result = sortIndustriesByGrowth(industryGrowth, true);
        for (let i = 1; i < result.length; i++) {
          expect(result[i - 1].growthRate).toBeGreaterThanOrEqual(
            result[i].growthRate
          );
        }
      });
    });

    describe('sortLocationsByAdjustedSalary', () => {
      it('should sort locations by adjusted salary descending', () => {
        const result = sortLocationsByAdjustedSalary(locationComparisons, true);
        for (let i = 1; i < result.length; i++) {
          expect(result[i - 1].adjustedSalary).toBeGreaterThanOrEqual(
            result[i].adjustedSalary
          );
        }
      });
    });
  });

  describe('Aggregation Functions', () => {
    describe('aggregateSkillsByCategory', () => {
      it('should aggregate skills by category', () => {
        const result = aggregateSkillsByCategory(trendingSkills);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((summary) => {
          expect(summary).toHaveProperty('category');
          expect(summary).toHaveProperty('totalSkills');
          expect(summary).toHaveProperty('avgDemandScore');
          expect(summary).toHaveProperty('avgGrowth');
          expect(summary).toHaveProperty('topSkill');
        });
      });

      it('should be sorted by average demand score', () => {
        const result = aggregateSkillsByCategory(trendingSkills);
        for (let i = 1; i < result.length; i++) {
          expect(result[i - 1].avgDemandScore).toBeGreaterThanOrEqual(
            result[i].avgDemandScore
          );
        }
      });
    });

    describe('calculateMarketStatistics', () => {
      it('should calculate market statistics', () => {
        const stats = calculateMarketStatistics(
          trendingSkills,
          inDemandRoles,
          industryGrowth,
          locationComparisons
        );

        expect(stats).toHaveProperty('totalSkillsTracked');
        expect(stats).toHaveProperty('totalRolesTracked');
        expect(stats).toHaveProperty('totalLocationsTracked');
        expect(stats).toHaveProperty('avgSalaryGrowth');
        expect(stats).toHaveProperty('topGrowingCategory');
        expect(stats).toHaveProperty('topGrowingIndustry');
        expect(stats).toHaveProperty('remoteJobsPercentage');
        expect(stats).toHaveProperty('highDemandSkillsCount');

        expect(stats.totalSkillsTracked).toBe(trendingSkills.length);
        expect(stats.totalRolesTracked).toBe(inDemandRoles.length);
        expect(stats.totalLocationsTracked).toBe(locationComparisons.length);
      });
    });
  });

  describe('Classification Functions', () => {
    describe('classifyDemandLevel', () => {
      it('should classify very high demand', () => {
        expect(classifyDemandLevel(95)).toBe('very-high');
        expect(classifyDemandLevel(90)).toBe('very-high');
      });

      it('should classify high demand', () => {
        expect(classifyDemandLevel(85)).toBe('high');
        expect(classifyDemandLevel(70)).toBe('high');
      });

      it('should classify medium demand', () => {
        expect(classifyDemandLevel(60)).toBe('medium');
        expect(classifyDemandLevel(40)).toBe('medium');
      });

      it('should classify low demand', () => {
        expect(classifyDemandLevel(30)).toBe('low');
        expect(classifyDemandLevel(0)).toBe('low');
      });
    });

    describe('classifyGrowthRate', () => {
      it('should classify high growth', () => {
        expect(classifyGrowthRate(30)).toBe('high-growth');
        expect(classifyGrowthRate(25)).toBe('high-growth');
      });

      it('should classify moderate growth', () => {
        expect(classifyGrowthRate(15)).toBe('moderate-growth');
        expect(classifyGrowthRate(10)).toBe('moderate-growth');
      });

      it('should classify stable', () => {
        expect(classifyGrowthRate(5)).toBe('stable');
        expect(classifyGrowthRate(0)).toBe('stable');
      });

      it('should classify declining', () => {
        expect(classifyGrowthRate(-5)).toBe('declining');
        expect(classifyGrowthRate(-10)).toBe('declining');
      });
    });
  });

  describe('Search Functions', () => {
    describe('searchMarketInsights', () => {
      it('should search across skills and roles', () => {
        const result = searchMarketInsights('python', trendingSkills, inDemandRoles);
        expect(result.skills.length).toBeGreaterThan(0);
      });

      it('should return all data when query is empty', () => {
        const result = searchMarketInsights('', trendingSkills, inDemandRoles);
        expect(result.skills.length).toBe(trendingSkills.length);
        expect(result.roles.length).toBe(inDemandRoles.length);
      });

      it('should be case-insensitive', () => {
        const result1 = searchMarketInsights('PYTHON', trendingSkills, inDemandRoles);
        const result2 = searchMarketInsights('python', trendingSkills, inDemandRoles);
        expect(result1.skills.length).toBe(result2.skills.length);
      });
    });
  });
});
