/**
 * Job Market Insights - Main Hook
 *
 * This hook provides state management and operations for market insights.
 * It integrates all the utility functions and provides a unified API.
 */

import { useState, useCallback, useMemo } from 'react';

import type {
  TrendingSkill,
  SalaryTrend,
  InDemandRole,
  IndustryGrowth,
  LocationComparison,
  InsightCategory,
  MarketInsightsFilter,
  MarketInsightsSortOption,
  MarketStatistics,
  SkillDemandSummary,
  LocationMetrics,
} from '../types/market-insights';

import { DEFAULT_MARKET_INSIGHTS_FILTER } from '../types/market-insights';

import {
  trendingSkills as defaultSkills,
  salaryTrends as defaultSalaryTrends,
  inDemandRoles as defaultRoles,
  industryGrowth as defaultIndustries,
  locationComparisons as defaultLocations,
  getSkillById as querySkillById,
  getRoleById as queryRoleById,
  getLocationById as queryLocationById,
  compareLocations as queryCompareLocations,
} from '../data/market-insights';

import {
  filterSkillsByCategory,
  filterSkillsByDemandScore,
  filterSkillsByQuery,
  filterRolesByCategory,
  filterRolesByDemandScore,
  filterRolesByCompetition,
  filterRolesByQuery,
  filterSalaryTrendsByLocation,
  filterIndustriesByGrowth,
  filterLocationsByRegion,
  applySkillsSortOption,
  applyRolesSortOption,
  sortSkillsByDemand,
  sortRolesByDemand,
  sortIndustriesByGrowth,
  sortLocationsByRemote,
  sortLocationsByAdjustedSalary,
  aggregateSkillsByCategory,
  calculateAvgSalaryByCategory,
  calculateMarketStatistics,
  calculateLocationMetrics,
} from '../lib/market-insights-utils';

// ============================================================================
// Types
// ============================================================================

export interface UseMarketInsightsOptions {
  initialSkills?: TrendingSkill[];
  initialSalaryTrends?: SalaryTrend[];
  initialRoles?: InDemandRole[];
  initialIndustries?: IndustryGrowth[];
  initialLocations?: LocationComparison[];
}

export interface UseMarketInsightsReturn {
  // Raw Data
  skills: TrendingSkill[];
  salaryTrends: SalaryTrend[];
  roles: InDemandRole[];
  industries: IndustryGrowth[];
  locations: LocationComparison[];

  // Filtered Data
  filteredSkills: TrendingSkill[];
  filteredRoles: InDemandRole[];
  filteredSalaryTrends: SalaryTrend[];
  filteredIndustries: IndustryGrowth[];
  filteredLocations: LocationComparison[];

  // Filter State
  filter: MarketInsightsFilter;
  setFilter: (filter: MarketInsightsFilter) => void;
  updateFilter: (updates: Partial<MarketInsightsFilter>) => void;
  resetFilter: () => void;

  // Sorting
  sortOption: MarketInsightsSortOption;
  setSortOption: (option: MarketInsightsSortOption) => void;

  // Computed Data
  statistics: MarketStatistics;
  skillsByCategory: SkillDemandSummary[];
  avgSalaryByCategory: Record<InsightCategory, number | null>;
  locationMetrics: LocationMetrics[];

  // Top Items (memoized)
  topTrendingSkills: TrendingSkill[];
  topInDemandRoles: InDemandRole[];
  highGrowthIndustries: IndustryGrowth[];
  topRemoteLocations: LocationComparison[];

  // Query Functions
  getSkillById: (id: string) => TrendingSkill | undefined;
  getRoleById: (id: string) => InDemandRole | undefined;
  getLocationById: (id: string) => LocationComparison | undefined;
  getSalaryTrendForRole: (role: string) => SalaryTrend[];
  compareLocations: (
    loc1: string,
    loc2: string
  ) => { location1: LocationComparison | undefined; location2: LocationComparison | undefined };

  // Loading state
  isLoading: boolean;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useMarketInsights(
  options: UseMarketInsightsOptions = {}
): UseMarketInsightsReturn {
  const {
    initialSkills = defaultSkills,
    initialSalaryTrends = defaultSalaryTrends,
    initialRoles = defaultRoles,
    initialIndustries = defaultIndustries,
    initialLocations = defaultLocations,
  } = options;

  // State
  const [skills] = useState<TrendingSkill[]>(initialSkills);
  const [salaryTrends] = useState<SalaryTrend[]>(initialSalaryTrends);
  const [roles] = useState<InDemandRole[]>(initialRoles);
  const [industries] = useState<IndustryGrowth[]>(initialIndustries);
  const [locations] = useState<LocationComparison[]>(initialLocations);
  const [filter, setFilter] = useState<MarketInsightsFilter>(
    DEFAULT_MARKET_INSIGHTS_FILTER
  );
  const [sortOption, setSortOption] =
    useState<MarketInsightsSortOption>('demandScore-desc');
  const [isLoading] = useState(false);

  // ============================================================================
  // Filter Management
  // ============================================================================

  const updateFilter = useCallback((updates: Partial<MarketInsightsFilter>) => {
    setFilter((current) => ({ ...current, ...updates }));
  }, []);

  const resetFilter = useCallback(() => {
    setFilter(DEFAULT_MARKET_INSIGHTS_FILTER);
  }, []);

  // ============================================================================
  // Filtered Data
  // ============================================================================

  const filteredSkills = useMemo(() => {
    let result = skills;

    if (filter.categories && filter.categories.length > 0) {
      result = filterSkillsByCategory(result, filter.categories);
    }

    if (filter.minDemandScore && filter.minDemandScore > 0) {
      result = filterSkillsByDemandScore(result, filter.minDemandScore);
    }

    if (filter.searchQuery && filter.searchQuery.trim()) {
      result = filterSkillsByQuery(result, filter.searchQuery);
    }

    // Apply sorting
    result = applySkillsSortOption(result, sortOption);

    return result;
  }, [skills, filter, sortOption]);

  const filteredRoles = useMemo(() => {
    let result = roles;

    if (filter.categories && filter.categories.length > 0) {
      result = filterRolesByCategory(result, filter.categories);
    }

    if (filter.minDemandScore && filter.minDemandScore > 0) {
      result = filterRolesByDemandScore(result, filter.minDemandScore);
    }

    if (filter.competitionLevels && filter.competitionLevels.length > 0) {
      result = filterRolesByCompetition(result, filter.competitionLevels);
    }

    if (filter.searchQuery && filter.searchQuery.trim()) {
      result = filterRolesByQuery(result, filter.searchQuery);
    }

    // Apply sorting
    result = applyRolesSortOption(result, sortOption);

    return result;
  }, [roles, filter, sortOption]);

  const filteredSalaryTrends = useMemo(() => {
    let result = salaryTrends;

    if (filter.locations && filter.locations.length > 0) {
      result = filterSalaryTrendsByLocation(result, filter.locations);
    }

    return result;
  }, [salaryTrends, filter]);

  const filteredIndustries = useMemo(() => {
    let result = industries;

    // Filter by high-growth if minGrowthRate is set high
    if (filter.minGrowthRate && filter.minGrowthRate >= 25) {
      result = filterIndustriesByGrowth(result, ['high-growth']);
    } else if (filter.minGrowthRate && filter.minGrowthRate >= 10) {
      result = filterIndustriesByGrowth(result, ['high-growth', 'moderate-growth']);
    }

    return sortIndustriesByGrowth(result);
  }, [industries, filter]);

  const filteredLocations = useMemo(() => {
    let result = locations;

    if (filter.locations && filter.locations.length > 0) {
      result = filterLocationsByRegion(result, filter.locations);
    }

    return sortLocationsByAdjustedSalary(result);
  }, [locations, filter]);

  // ============================================================================
  // Computed Data
  // ============================================================================

  const statistics = useMemo(() => {
    return calculateMarketStatistics(skills, roles, industries, locations);
  }, [skills, roles, industries, locations]);

  const skillsByCategory = useMemo(() => {
    return aggregateSkillsByCategory(skills);
  }, [skills]);

  const avgSalaryByCategory = useMemo(() => {
    return calculateAvgSalaryByCategory(salaryTrends, roles);
  }, [salaryTrends, roles]);

  const locationMetrics = useMemo(() => {
    return calculateLocationMetrics(locations);
  }, [locations]);

  // ============================================================================
  // Top Items
  // ============================================================================

  const topTrendingSkills = useMemo(() => {
    return sortSkillsByDemand(skills, true).slice(0, 10);
  }, [skills]);

  const topInDemandRoles = useMemo(() => {
    return sortRolesByDemand(roles, true).slice(0, 10);
  }, [roles]);

  const highGrowthIndustries = useMemo(() => {
    return industries.filter((ind) => ind.indicator === 'high-growth');
  }, [industries]);

  const topRemoteLocations = useMemo(() => {
    return sortLocationsByRemote(locations, true).slice(0, 5);
  }, [locations]);

  // ============================================================================
  // Query Functions
  // ============================================================================

  const getSkillById = useCallback(
    (id: string): TrendingSkill | undefined => {
      return skills.find((skill) => skill.id === id) || querySkillById(id);
    },
    [skills]
  );

  const getRoleById = useCallback(
    (id: string): InDemandRole | undefined => {
      return roles.find((role) => role.id === id) || queryRoleById(id);
    },
    [roles]
  );

  const getLocationById = useCallback(
    (id: string): LocationComparison | undefined => {
      return (
        locations.find((loc) => loc.id === id) || queryLocationById(id)
      );
    },
    [locations]
  );

  const getSalaryTrendForRole = useCallback(
    (role: string): SalaryTrend[] => {
      const lowerRole = role.toLowerCase();
      return salaryTrends.filter((trend) =>
        trend.role.toLowerCase().includes(lowerRole)
      );
    },
    [salaryTrends]
  );

  const compareLocationsFunc = useCallback(
    (
      loc1: string,
      loc2: string
    ): {
      location1: LocationComparison | undefined;
      location2: LocationComparison | undefined;
    } => {
      return queryCompareLocations(loc1, loc2);
    },
    []
  );

  // ============================================================================
  // Return
  // ============================================================================

  return {
    // Raw Data
    skills,
    salaryTrends,
    roles,
    industries,
    locations,

    // Filtered Data
    filteredSkills,
    filteredRoles,
    filteredSalaryTrends,
    filteredIndustries,
    filteredLocations,

    // Filter State
    filter,
    setFilter,
    updateFilter,
    resetFilter,

    // Sorting
    sortOption,
    setSortOption,

    // Computed Data
    statistics,
    skillsByCategory,
    avgSalaryByCategory,
    locationMetrics,

    // Top Items
    topTrendingSkills,
    topInDemandRoles,
    highGrowthIndustries,
    topRemoteLocations,

    // Query Functions
    getSkillById,
    getRoleById,
    getLocationById,
    getSalaryTrendForRole,
    compareLocations: compareLocationsFunc,

    // Loading state
    isLoading,
  };
}

export default useMarketInsights;
