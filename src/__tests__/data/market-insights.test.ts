/**
 * Market Insights Data - Tests
 *
 * Tests for sample data and query helper functions.
 */

import {
  trendingSkills,
  salaryTrends,
  inDemandRoles,
  industryGrowth,
  locationComparisons,
  getSkillsByCategory,
  getTopTrendingSkills,
  getSkillsByMinDemand,
  getSalaryTrendsByRole,
  getSalaryTrendsByLocation,
  getTopInDemandRoles,
  getRolesByCategory,
  getHighGrowthIndustries,
  getIndustriesByGrowth,
  compareLocations,
  getLocationsByRegion,
  getTopRemoteLocations,
  getLocationsByMinAdjustedSalary,
  getSkillById,
  getRoleById,
  getIndustryById,
  getLocationById,
  searchSkills,
  searchRoles,
} from '@/data/market-insights';

describe('Market Insights Data', () => {
  describe('Sample Data Structure', () => {
    it('should have trending skills data', () => {
      expect(trendingSkills).toBeDefined();
      expect(Array.isArray(trendingSkills)).toBe(true);
      expect(trendingSkills.length).toBeGreaterThan(0);
    });

    it('should have salary trends data', () => {
      expect(salaryTrends).toBeDefined();
      expect(Array.isArray(salaryTrends)).toBe(true);
      expect(salaryTrends.length).toBeGreaterThan(0);
    });

    it('should have in-demand roles data', () => {
      expect(inDemandRoles).toBeDefined();
      expect(Array.isArray(inDemandRoles)).toBe(true);
      expect(inDemandRoles.length).toBeGreaterThan(0);
    });

    it('should have industry growth data', () => {
      expect(industryGrowth).toBeDefined();
      expect(Array.isArray(industryGrowth)).toBe(true);
      expect(industryGrowth.length).toBeGreaterThan(0);
    });

    it('should have location comparisons data', () => {
      expect(locationComparisons).toBeDefined();
      expect(Array.isArray(locationComparisons)).toBe(true);
      expect(locationComparisons.length).toBeGreaterThan(0);
    });

    it('should have valid skill data structure', () => {
      const skill = trendingSkills[0];
      expect(skill).toHaveProperty('id');
      expect(skill).toHaveProperty('name');
      expect(skill).toHaveProperty('category');
      expect(skill).toHaveProperty('demandScore');
      expect(skill).toHaveProperty('growthPercentage');
      expect(skill).toHaveProperty('direction');
      expect(skill).toHaveProperty('jobCount');
      expect(skill).toHaveProperty('avgSalaryImpact');
      expect(skill).toHaveProperty('relatedSkills');
    });

    it('should have valid salary trend data structure', () => {
      const trend = salaryTrends[0];
      expect(trend).toHaveProperty('id');
      expect(trend).toHaveProperty('role');
      expect(trend).toHaveProperty('location');
      expect(trend).toHaveProperty('dataPoints');
      expect(trend).toHaveProperty('currentMedian');
      expect(trend).toHaveProperty('changePercentage');
      expect(trend.dataPoints.length).toBeGreaterThan(0);
    });

    it('should have valid role data structure', () => {
      const role = inDemandRoles[0];
      expect(role).toHaveProperty('id');
      expect(role).toHaveProperty('title');
      expect(role).toHaveProperty('category');
      expect(role).toHaveProperty('demandScore');
      expect(role).toHaveProperty('openPositions');
      expect(role).toHaveProperty('avgSalary');
      expect(role).toHaveProperty('topSkills');
      expect(role).toHaveProperty('competitionLevel');
    });
  });

  describe('Query Helpers - Skills', () => {
    it('should get skills by category', () => {
      const techSkills = getSkillsByCategory('technology');
      expect(techSkills.length).toBeGreaterThan(0);
      techSkills.forEach((skill) => {
        expect(skill.category).toBe('technology');
      });
    });

    it('should get top trending skills', () => {
      const topSkills = getTopTrendingSkills(5);
      expect(topSkills.length).toBeLessThanOrEqual(5);
      // Should be sorted by demand score descending
      for (let i = 1; i < topSkills.length; i++) {
        expect(topSkills[i - 1].demandScore).toBeGreaterThanOrEqual(
          topSkills[i].demandScore
        );
      }
    });

    it('should get skills by minimum demand', () => {
      const highDemandSkills = getSkillsByMinDemand(90);
      highDemandSkills.forEach((skill) => {
        expect(skill.demandScore).toBeGreaterThanOrEqual(90);
      });
    });

    it('should get skill by ID', () => {
      const skill = getSkillById('skill_001');
      expect(skill).toBeDefined();
      expect(skill?.id).toBe('skill_001');
    });

    it('should return undefined for non-existent skill ID', () => {
      const skill = getSkillById('non_existent');
      expect(skill).toBeUndefined();
    });

    it('should search skills by name', () => {
      const results = searchSkills('python');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should search skills by related skill', () => {
      const results = searchSkills('tensorflow');
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('Query Helpers - Salary Trends', () => {
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
  });

  describe('Query Helpers - Roles', () => {
    it('should get top in-demand roles', () => {
      const topRoles = getTopInDemandRoles(5);
      expect(topRoles.length).toBeLessThanOrEqual(5);
      // Should be sorted by demand score descending
      for (let i = 1; i < topRoles.length; i++) {
        expect(topRoles[i - 1].demandScore).toBeGreaterThanOrEqual(
          topRoles[i].demandScore
        );
      }
    });

    it('should get roles by category', () => {
      const dataScienceRoles = getRolesByCategory('data-science');
      expect(dataScienceRoles.length).toBeGreaterThan(0);
      dataScienceRoles.forEach((role) => {
        expect(role.category).toBe('data-science');
      });
    });

    it('should get role by ID', () => {
      const role = getRoleById('role_001');
      expect(role).toBeDefined();
      expect(role?.id).toBe('role_001');
    });

    it('should search roles by title', () => {
      const results = searchRoles('engineer');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should search roles by skill', () => {
      const results = searchRoles('python');
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('Query Helpers - Industries', () => {
    it('should get high growth industries', () => {
      const highGrowth = getHighGrowthIndustries();
      expect(highGrowth.length).toBeGreaterThan(0);
      highGrowth.forEach((industry) => {
        expect(industry.indicator).toBe('high-growth');
      });
    });

    it('should get industries by growth indicator', () => {
      const stableIndustries = getIndustriesByGrowth('stable');
      stableIndustries.forEach((industry) => {
        expect(industry.indicator).toBe('stable');
      });
    });

    it('should get industry by ID', () => {
      const industry = getIndustryById('industry_001');
      expect(industry).toBeDefined();
      expect(industry?.id).toBe('industry_001');
    });
  });

  describe('Query Helpers - Locations', () => {
    it('should compare two locations', () => {
      const result = compareLocations('san francisco', 'austin');
      expect(result.location1).toBeDefined();
      expect(result.location2).toBeDefined();
      expect(result.location1?.location.toLowerCase()).toContain('san francisco');
      expect(result.location2?.location.toLowerCase()).toContain('austin');
    });

    it('should get locations by region', () => {
      const westCoast = getLocationsByRegion('West Coast');
      expect(westCoast.length).toBeGreaterThan(0);
      westCoast.forEach((loc) => {
        expect(loc.region).toBe('West Coast');
      });
    });

    it('should get top remote locations', () => {
      const topRemote = getTopRemoteLocations(3);
      expect(topRemote.length).toBeLessThanOrEqual(3);
      // Should be sorted by remote percentage descending
      for (let i = 1; i < topRemote.length; i++) {
        expect(topRemote[i - 1].remoteJobPercentage).toBeGreaterThanOrEqual(
          topRemote[i].remoteJobPercentage
        );
      }
    });

    it('should get locations by minimum adjusted salary', () => {
      const highSalaryLocations = getLocationsByMinAdjustedSalary(120000);
      highSalaryLocations.forEach((loc) => {
        expect(loc.adjustedSalary).toBeGreaterThanOrEqual(120000);
      });
    });

    it('should get location by ID', () => {
      const location = getLocationById('loc_001');
      expect(location).toBeDefined();
      expect(location?.id).toBe('loc_001');
    });
  });
});
