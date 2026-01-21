/**
 * useMarketInsights Hook - Tests
 *
 * Tests for the market insights state management hook.
 */

import { renderHook, act } from '@testing-library/react';
import { useMarketInsights } from '@/hooks/useMarketInsights';
import { DEFAULT_MARKET_INSIGHTS_FILTER } from '@/types/market-insights';

describe('useMarketInsights Hook', () => {
  describe('Initial State', () => {
    it('should initialize with default data', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.skills.length).toBeGreaterThan(0);
      expect(result.current.salaryTrends.length).toBeGreaterThan(0);
      expect(result.current.roles.length).toBeGreaterThan(0);
      expect(result.current.industries.length).toBeGreaterThan(0);
      expect(result.current.locations.length).toBeGreaterThan(0);
    });

    it('should initialize with default filter', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.filter).toEqual(DEFAULT_MARKET_INSIGHTS_FILTER);
    });

    it('should initialize with default sort option', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.sortOption).toBe('demandScore-desc');
    });

    it('should not be loading initially', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.isLoading).toBe(false);
    });

    it('should initialize with custom data when provided', () => {
      const customSkills = [
        {
          id: 'custom_001',
          name: 'Custom Skill',
          category: 'technology' as const,
          demandScore: 80,
          growthPercentage: 10,
          direction: 'rising' as const,
          jobCount: 1000,
          avgSalaryImpact: 5,
          relatedSkills: [],
        },
      ];

      const { result } = renderHook(() =>
        useMarketInsights({ initialSkills: customSkills })
      );

      expect(result.current.skills).toEqual(customSkills);
    });
  });

  describe('Filtered Data', () => {
    it('should return all data when no filters applied', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.filteredSkills.length).toBe(
        result.current.skills.length
      );
      expect(result.current.filteredRoles.length).toBe(
        result.current.roles.length
      );
    });

    it('should filter skills by category', () => {
      const { result } = renderHook(() => useMarketInsights());

      act(() => {
        result.current.updateFilter({ categories: ['technology'] });
      });

      result.current.filteredSkills.forEach((skill) => {
        expect(skill.category).toBe('technology');
      });
    });

    it('should filter skills by demand score', () => {
      const { result } = renderHook(() => useMarketInsights());

      act(() => {
        result.current.updateFilter({ minDemandScore: 90 });
      });

      result.current.filteredSkills.forEach((skill) => {
        expect(skill.demandScore).toBeGreaterThanOrEqual(90);
      });
    });

    it('should filter skills by search query', () => {
      const { result } = renderHook(() => useMarketInsights());

      act(() => {
        result.current.updateFilter({ searchQuery: 'python' });
      });

      expect(result.current.filteredSkills.length).toBeGreaterThan(0);
      expect(result.current.filteredSkills.length).toBeLessThan(
        result.current.skills.length
      );
    });

    it('should filter roles by competition level', () => {
      const { result } = renderHook(() => useMarketInsights());

      act(() => {
        result.current.updateFilter({ competitionLevels: ['low'] });
      });

      result.current.filteredRoles.forEach((role) => {
        expect(role.competitionLevel).toBe('low');
      });
    });
  });

  describe('Filter Management', () => {
    it('should update filter', () => {
      const { result } = renderHook(() => useMarketInsights());

      act(() => {
        result.current.updateFilter({ minDemandScore: 80 });
      });

      expect(result.current.filter.minDemandScore).toBe(80);
    });

    it('should set filter completely', () => {
      const { result } = renderHook(() => useMarketInsights());
      const newFilter = {
        ...DEFAULT_MARKET_INSIGHTS_FILTER,
        categories: ['technology' as const],
        minDemandScore: 85,
      };

      act(() => {
        result.current.setFilter(newFilter);
      });

      expect(result.current.filter).toEqual(newFilter);
    });

    it('should reset filter', () => {
      const { result } = renderHook(() => useMarketInsights());

      act(() => {
        result.current.updateFilter({
          categories: ['technology'],
          minDemandScore: 90,
        });
      });

      act(() => {
        result.current.resetFilter();
      });

      expect(result.current.filter).toEqual(DEFAULT_MARKET_INSIGHTS_FILTER);
    });
  });

  describe('Sorting', () => {
    it('should change sort option', () => {
      const { result } = renderHook(() => useMarketInsights());

      act(() => {
        result.current.setSortOption('growthPercentage-desc');
      });

      expect(result.current.sortOption).toBe('growthPercentage-desc');
    });

    it('should sort skills by demand score descending', () => {
      const { result } = renderHook(() => useMarketInsights());

      act(() => {
        result.current.setSortOption('demandScore-desc');
      });

      const skills = result.current.filteredSkills;
      for (let i = 1; i < skills.length; i++) {
        expect(skills[i - 1].demandScore).toBeGreaterThanOrEqual(
          skills[i].demandScore
        );
      }
    });

    it('should sort skills by growth percentage', () => {
      const { result } = renderHook(() => useMarketInsights());

      act(() => {
        result.current.setSortOption('growthPercentage-desc');
      });

      const skills = result.current.filteredSkills;
      for (let i = 1; i < skills.length; i++) {
        expect(skills[i - 1].growthPercentage).toBeGreaterThanOrEqual(
          skills[i].growthPercentage
        );
      }
    });
  });

  describe('Computed Data', () => {
    it('should calculate statistics', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.statistics).toBeDefined();
      expect(result.current.statistics.totalSkillsTracked).toBeGreaterThan(0);
      expect(result.current.statistics.totalRolesTracked).toBeGreaterThan(0);
      expect(result.current.statistics.totalLocationsTracked).toBeGreaterThan(0);
    });

    it('should aggregate skills by category', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.skillsByCategory.length).toBeGreaterThan(0);

      result.current.skillsByCategory.forEach((summary) => {
        expect(summary).toHaveProperty('category');
        expect(summary).toHaveProperty('totalSkills');
        expect(summary).toHaveProperty('avgDemandScore');
        expect(summary).toHaveProperty('avgGrowth');
        expect(summary).toHaveProperty('topSkill');
      });
    });

    it('should calculate location metrics', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.locationMetrics.length).toBeGreaterThan(0);

      result.current.locationMetrics.forEach((metric) => {
        expect(metric).toHaveProperty('location');
        expect(metric).toHaveProperty('avgSalary');
        expect(metric).toHaveProperty('colIndex');
      });
    });
  });

  describe('Top Items', () => {
    it('should return top trending skills', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.topTrendingSkills.length).toBeLessThanOrEqual(10);
      expect(result.current.topTrendingSkills.length).toBeGreaterThan(0);

      // Should be sorted by demand score
      const skills = result.current.topTrendingSkills;
      for (let i = 1; i < skills.length; i++) {
        expect(skills[i - 1].demandScore).toBeGreaterThanOrEqual(
          skills[i].demandScore
        );
      }
    });

    it('should return top in-demand roles', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.topInDemandRoles.length).toBeLessThanOrEqual(10);
      expect(result.current.topInDemandRoles.length).toBeGreaterThan(0);
    });

    it('should return high growth industries', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.highGrowthIndustries.length).toBeGreaterThan(0);

      result.current.highGrowthIndustries.forEach((industry) => {
        expect(industry.indicator).toBe('high-growth');
      });
    });

    it('should return top remote locations', () => {
      const { result } = renderHook(() => useMarketInsights());

      expect(result.current.topRemoteLocations.length).toBeLessThanOrEqual(5);
      expect(result.current.topRemoteLocations.length).toBeGreaterThan(0);

      // Should be sorted by remote percentage
      const locations = result.current.topRemoteLocations;
      for (let i = 1; i < locations.length; i++) {
        expect(locations[i - 1].remoteJobPercentage).toBeGreaterThanOrEqual(
          locations[i].remoteJobPercentage
        );
      }
    });
  });

  describe('Query Functions', () => {
    it('should get skill by ID', () => {
      const { result } = renderHook(() => useMarketInsights());
      const skill = result.current.getSkillById('skill_001');

      expect(skill).toBeDefined();
      expect(skill?.id).toBe('skill_001');
    });

    it('should return undefined for non-existent skill', () => {
      const { result } = renderHook(() => useMarketInsights());
      const skill = result.current.getSkillById('non_existent');

      expect(skill).toBeUndefined();
    });

    it('should get role by ID', () => {
      const { result } = renderHook(() => useMarketInsights());
      const role = result.current.getRoleById('role_001');

      expect(role).toBeDefined();
      expect(role?.id).toBe('role_001');
    });

    it('should get location by ID', () => {
      const { result } = renderHook(() => useMarketInsights());
      const location = result.current.getLocationById('loc_001');

      expect(location).toBeDefined();
      expect(location?.id).toBe('loc_001');
    });

    it('should get salary trends for role', () => {
      const { result } = renderHook(() => useMarketInsights());
      const trends = result.current.getSalaryTrendForRole('software engineer');

      expect(trends.length).toBeGreaterThan(0);
    });

    it('should compare locations', () => {
      const { result } = renderHook(() => useMarketInsights());
      const comparison = result.current.compareLocations(
        'san francisco',
        'austin'
      );

      expect(comparison.location1).toBeDefined();
      expect(comparison.location2).toBeDefined();
    });
  });

  describe('Memoization', () => {
    it('should memoize statistics', () => {
      const { result, rerender } = renderHook(() => useMarketInsights());

      const stats1 = result.current.statistics;
      rerender();
      const stats2 = result.current.statistics;

      expect(stats1).toBe(stats2);
    });

    it('should recalculate filtered skills when filter changes', () => {
      const { result } = renderHook(() => useMarketInsights());

      const initialLength = result.current.filteredSkills.length;

      act(() => {
        result.current.updateFilter({ minDemandScore: 90 });
      });

      expect(result.current.filteredSkills.length).toBeLessThan(initialLength);
    });
  });
});
