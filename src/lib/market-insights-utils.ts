/**
 * Job Market Insights - Utility Functions
 *
 * This file contains utility functions for formatting, filtering,
 * sorting, and aggregating market insights data.
 */

import type {
  TrendingSkill,
  SalaryTrend,
  InDemandRole,
  IndustryGrowth,
  LocationComparison,
  InsightCategory,
  GrowthIndicator,
  DemandLevel,
  MarketStatistics,
  SkillDemandSummary,
  LocationMetrics,
  MarketInsightsSortOption,
} from '../types/market-insights';

import { DEMAND_LEVEL_CONFIG } from '../types/market-insights';

// ============================================================================
// Display Helpers
// ============================================================================

/**
 * Format salary amount for display
 * @example formatSalary(150000) => "$150,000"
 */
export function formatSalary(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage with sign for display
 * @example formatPercentage(15.5) => "+15.5%"
 * @example formatPercentage(-8.2) => "-8.2%"
 */
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Format job count for display with K/M suffix
 * @example formatJobCount(45000) => "45.0K"
 * @example formatJobCount(1500000) => "1.5M"
 */
export function formatJobCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Format a number with commas
 * @example formatNumber(1234567) => "1,234,567"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Format a compact number
 * @example formatCompactNumber(1234567) => "1.2M"
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

// ============================================================================
// Filter Functions
// ============================================================================

/**
 * Filter skills by categories
 */
export function filterSkillsByCategory(
  skills: TrendingSkill[],
  categories: InsightCategory[]
): TrendingSkill[] {
  if (categories.length === 0) return skills;
  return skills.filter((skill) => categories.includes(skill.category));
}

/**
 * Filter skills by minimum demand score
 */
export function filterSkillsByDemandScore(
  skills: TrendingSkill[],
  minScore: number
): TrendingSkill[] {
  return skills.filter((skill) => skill.demandScore >= minScore);
}

/**
 * Filter skills by trend direction
 */
export function filterSkillsByDirection(
  skills: TrendingSkill[],
  directions: TrendingSkill['direction'][]
): TrendingSkill[] {
  if (directions.length === 0) return skills;
  return skills.filter((skill) => directions.includes(skill.direction));
}

/**
 * Filter skills by search query
 */
export function filterSkillsByQuery(
  skills: TrendingSkill[],
  query: string
): TrendingSkill[] {
  if (!query.trim()) return skills;
  const lowerQuery = query.toLowerCase();
  return skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.relatedSkills.some((rs) => rs.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Filter roles by categories
 */
export function filterRolesByCategory(
  roles: InDemandRole[],
  categories: InsightCategory[]
): InDemandRole[] {
  if (categories.length === 0) return roles;
  return roles.filter((role) => categories.includes(role.category));
}

/**
 * Filter roles by minimum demand score
 */
export function filterRolesByDemandScore(
  roles: InDemandRole[],
  minScore: number
): InDemandRole[] {
  return roles.filter((role) => role.demandScore >= minScore);
}

/**
 * Filter roles by competition level
 */
export function filterRolesByCompetition(
  roles: InDemandRole[],
  levels: InDemandRole['competitionLevel'][]
): InDemandRole[] {
  if (levels.length === 0) return roles;
  return roles.filter((role) => levels.includes(role.competitionLevel));
}

/**
 * Filter roles by search query
 */
export function filterRolesByQuery(
  roles: InDemandRole[],
  query: string
): InDemandRole[] {
  if (!query.trim()) return roles;
  const lowerQuery = query.toLowerCase();
  return roles.filter(
    (role) =>
      role.title.toLowerCase().includes(lowerQuery) ||
      role.topSkills.some((skill) => skill.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Filter salary trends by locations
 */
export function filterSalaryTrendsByLocation(
  trends: SalaryTrend[],
  locations: string[]
): SalaryTrend[] {
  if (locations.length === 0) return trends;
  const lowerLocations = locations.map((l) => l.toLowerCase());
  return trends.filter((trend) =>
    lowerLocations.some((loc) => trend.location.toLowerCase().includes(loc))
  );
}

/**
 * Filter salary trends by roles
 */
export function filterSalaryTrendsByRole(
  trends: SalaryTrend[],
  roles: string[]
): SalaryTrend[] {
  if (roles.length === 0) return trends;
  const lowerRoles = roles.map((r) => r.toLowerCase());
  return trends.filter((trend) =>
    lowerRoles.some((role) => trend.role.toLowerCase().includes(role))
  );
}

/**
 * Filter industries by growth indicator
 */
export function filterIndustriesByGrowth(
  industries: IndustryGrowth[],
  indicators: GrowthIndicator[]
): IndustryGrowth[] {
  if (indicators.length === 0) return industries;
  return industries.filter((industry) => indicators.includes(industry.indicator));
}

/**
 * Filter locations by region
 */
export function filterLocationsByRegion(
  locations: LocationComparison[],
  regions: string[]
): LocationComparison[] {
  if (regions.length === 0) return locations;
  const lowerRegions = regions.map((r) => r.toLowerCase());
  return locations.filter((loc) =>
    lowerRegions.includes(loc.region.toLowerCase())
  );
}

/**
 * Filter locations by minimum adjusted salary
 */
export function filterLocationsByMinSalary(
  locations: LocationComparison[],
  minSalary: number
): LocationComparison[] {
  return locations.filter((loc) => loc.adjustedSalary >= minSalary);
}

// ============================================================================
// Sort Functions
// ============================================================================

/**
 * Sort skills by demand score
 */
export function sortSkillsByDemand(
  skills: TrendingSkill[],
  descending: boolean = true
): TrendingSkill[] {
  return [...skills].sort((a, b) =>
    descending ? b.demandScore - a.demandScore : a.demandScore - b.demandScore
  );
}

/**
 * Sort skills by growth percentage
 */
export function sortSkillsByGrowth(
  skills: TrendingSkill[],
  descending: boolean = true
): TrendingSkill[] {
  return [...skills].sort((a, b) =>
    descending
      ? b.growthPercentage - a.growthPercentage
      : a.growthPercentage - b.growthPercentage
  );
}

/**
 * Sort skills by job count
 */
export function sortSkillsByJobCount(
  skills: TrendingSkill[],
  descending: boolean = true
): TrendingSkill[] {
  return [...skills].sort((a, b) =>
    descending ? b.jobCount - a.jobCount : a.jobCount - b.jobCount
  );
}

/**
 * Sort skills by name
 */
export function sortSkillsByName(
  skills: TrendingSkill[],
  descending: boolean = false
): TrendingSkill[] {
  return [...skills].sort((a, b) =>
    descending ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
  );
}

/**
 * Sort roles by salary
 */
export function sortRolesBySalary(
  roles: InDemandRole[],
  descending: boolean = true
): InDemandRole[] {
  return [...roles].sort((a, b) =>
    descending ? b.avgSalary - a.avgSalary : a.avgSalary - b.avgSalary
  );
}

/**
 * Sort roles by demand score
 */
export function sortRolesByDemand(
  roles: InDemandRole[],
  descending: boolean = true
): InDemandRole[] {
  return [...roles].sort((a, b) =>
    descending ? b.demandScore - a.demandScore : a.demandScore - b.demandScore
  );
}

/**
 * Sort roles by growth rate
 */
export function sortRolesByGrowth(
  roles: InDemandRole[],
  descending: boolean = true
): InDemandRole[] {
  return [...roles].sort((a, b) =>
    descending ? b.growthRate - a.growthRate : a.growthRate - b.growthRate
  );
}

/**
 * Sort roles by title
 */
export function sortRolesByTitle(
  roles: InDemandRole[],
  descending: boolean = false
): InDemandRole[] {
  return [...roles].sort((a, b) =>
    descending ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
  );
}

/**
 * Sort industries by growth rate
 */
export function sortIndustriesByGrowth(
  industries: IndustryGrowth[],
  descending: boolean = true
): IndustryGrowth[] {
  return [...industries].sort((a, b) =>
    descending ? b.growthRate - a.growthRate : a.growthRate - b.growthRate
  );
}

/**
 * Sort locations by adjusted salary
 */
export function sortLocationsByAdjustedSalary(
  locations: LocationComparison[],
  descending: boolean = true
): LocationComparison[] {
  return [...locations].sort((a, b) =>
    descending
      ? b.adjustedSalary - a.adjustedSalary
      : a.adjustedSalary - b.adjustedSalary
  );
}

/**
 * Sort locations by remote job percentage
 */
export function sortLocationsByRemote(
  locations: LocationComparison[],
  descending: boolean = true
): LocationComparison[] {
  return [...locations].sort((a, b) =>
    descending
      ? b.remoteJobPercentage - a.remoteJobPercentage
      : a.remoteJobPercentage - b.remoteJobPercentage
  );
}

/**
 * Apply sort option to skills
 */
export function applySkillsSortOption(
  skills: TrendingSkill[],
  sortOption: MarketInsightsSortOption
): TrendingSkill[] {
  switch (sortOption) {
    case 'demandScore-desc':
      return sortSkillsByDemand(skills, true);
    case 'demandScore-asc':
      return sortSkillsByDemand(skills, false);
    case 'growthPercentage-desc':
      return sortSkillsByGrowth(skills, true);
    case 'growthPercentage-asc':
      return sortSkillsByGrowth(skills, false);
    case 'jobCount-desc':
      return sortSkillsByJobCount(skills, true);
    case 'jobCount-asc':
      return sortSkillsByJobCount(skills, false);
    case 'name-asc':
      return sortSkillsByName(skills, false);
    case 'name-desc':
      return sortSkillsByName(skills, true);
    default:
      return skills;
  }
}

/**
 * Apply sort option to roles
 */
export function applyRolesSortOption(
  roles: InDemandRole[],
  sortOption: MarketInsightsSortOption
): InDemandRole[] {
  switch (sortOption) {
    case 'demandScore-desc':
      return sortRolesByDemand(roles, true);
    case 'demandScore-asc':
      return sortRolesByDemand(roles, false);
    case 'growthPercentage-desc':
      return sortRolesByGrowth(roles, true);
    case 'growthPercentage-asc':
      return sortRolesByGrowth(roles, false);
    case 'salary-desc':
      return sortRolesBySalary(roles, true);
    case 'salary-asc':
      return sortRolesBySalary(roles, false);
    case 'name-asc':
      return sortRolesByTitle(roles, false);
    case 'name-desc':
      return sortRolesByTitle(roles, true);
    default:
      return roles;
  }
}

// ============================================================================
// Aggregation Functions
// ============================================================================

/**
 * Aggregate skills by category
 */
export function aggregateSkillsByCategory(
  skills: TrendingSkill[]
): SkillDemandSummary[] {
  const categoryMap = new Map<
    InsightCategory,
    { skills: TrendingSkill[]; totalDemand: number; totalGrowth: number }
  >();

  for (const skill of skills) {
    const existing = categoryMap.get(skill.category) || {
      skills: [],
      totalDemand: 0,
      totalGrowth: 0,
    };
    existing.skills.push(skill);
    existing.totalDemand += skill.demandScore;
    existing.totalGrowth += skill.growthPercentage;
    categoryMap.set(skill.category, existing);
  }

  const summaries: SkillDemandSummary[] = [];

  for (const [category, data] of categoryMap.entries()) {
    const topSkill = data.skills.reduce((top, skill) =>
      skill.demandScore > top.demandScore ? skill : top
    );

    summaries.push({
      category,
      totalSkills: data.skills.length,
      avgDemandScore: Math.round(data.totalDemand / data.skills.length),
      avgGrowth: Math.round((data.totalGrowth / data.skills.length) * 10) / 10,
      topSkill: topSkill.name,
    });
  }

  return summaries.sort((a, b) => b.avgDemandScore - a.avgDemandScore);
}

/**
 * Calculate average salary by category from salary trends
 */
export function calculateAvgSalaryByCategory(
  trends: SalaryTrend[],
  roles: InDemandRole[]
): Record<InsightCategory, number | null> {
  const result: Record<InsightCategory, number | null> = {
    technology: null,
    design: null,
    marketing: null,
    sales: null,
    finance: null,
    healthcare: null,
    engineering: null,
    'data-science': null,
    'product-management': null,
  };

  // Map roles to categories
  const roleToCategory = new Map<string, InsightCategory>();
  for (const role of roles) {
    roleToCategory.set(role.title.toLowerCase(), role.category);
  }

  // Group salaries by category
  const categorySalaries: Record<InsightCategory, number[]> = {
    technology: [],
    design: [],
    marketing: [],
    sales: [],
    finance: [],
    healthcare: [],
    engineering: [],
    'data-science': [],
    'product-management': [],
  };

  for (const trend of trends) {
    const lowerRole = trend.role.toLowerCase();
    for (const [role, category] of roleToCategory.entries()) {
      if (lowerRole.includes(role) || role.includes(lowerRole)) {
        categorySalaries[category].push(trend.currentMedian);
        break;
      }
    }
  }

  // Calculate averages
  for (const category of Object.keys(categorySalaries) as InsightCategory[]) {
    const salaries = categorySalaries[category];
    if (salaries.length > 0) {
      result[category] = Math.round(
        salaries.reduce((sum, s) => sum + s, 0) / salaries.length
      );
    }
  }

  return result;
}

/**
 * Calculate market statistics
 */
export function calculateMarketStatistics(
  skills: TrendingSkill[],
  roles: InDemandRole[],
  industries: IndustryGrowth[],
  locations: LocationComparison[]
): MarketStatistics {
  // Find top growing category
  const categorySummaries = aggregateSkillsByCategory(skills);
  const topGrowingCategorySummary = [...categorySummaries].sort(
    (a, b) => b.avgGrowth - a.avgGrowth
  )[0];

  // Find top growing industry
  const sortedIndustries = sortIndustriesByGrowth(industries);
  const topGrowingIndustry = sortedIndustries[0];

  // Calculate average salary growth
  const avgSalaryGrowth =
    roles.reduce((sum, role) => sum + role.growthRate, 0) / roles.length;

  // Calculate remote jobs percentage
  const avgRemotePercentage =
    locations.reduce((sum, loc) => sum + loc.remoteJobPercentage, 0) /
    locations.length;

  // Count high demand skills
  const highDemandSkillsCount = skills.filter(
    (skill) => skill.demandScore >= 85
  ).length;

  return {
    totalSkillsTracked: skills.length,
    totalRolesTracked: roles.length,
    totalLocationsTracked: locations.length,
    avgSalaryGrowth: Math.round(avgSalaryGrowth * 10) / 10,
    topGrowingCategory: topGrowingCategorySummary?.category || 'technology',
    topGrowingIndustry: topGrowingIndustry?.industry || '',
    remoteJobsPercentage: Math.round(avgRemotePercentage),
    highDemandSkillsCount,
  };
}

/**
 * Calculate location metrics
 */
export function calculateLocationMetrics(
  locations: LocationComparison[]
): LocationMetrics[] {
  return locations.map((loc) => ({
    location: loc.location,
    totalJobs: Math.round(loc.avgSalary / 100), // Simplified calculation
    avgSalary: loc.avgSalary,
    colIndex: loc.costOfLivingIndex,
    salaryToCOLRatio: Math.round((loc.avgSalary / loc.costOfLivingIndex) * 10) / 10,
  }));
}

// ============================================================================
// Classification Functions
// ============================================================================

/**
 * Classify demand level based on score
 */
export function classifyDemandLevel(score: number): DemandLevel {
  if (score >= DEMAND_LEVEL_CONFIG['very-high'].minScore) return 'very-high';
  if (score >= DEMAND_LEVEL_CONFIG.high.minScore) return 'high';
  if (score >= DEMAND_LEVEL_CONFIG.medium.minScore) return 'medium';
  return 'low';
}

/**
 * Classify growth rate into growth indicator
 */
export function classifyGrowthRate(rate: number): GrowthIndicator {
  if (rate >= 25) return 'high-growth';
  if (rate >= 10) return 'moderate-growth';
  if (rate >= 0) return 'stable';
  return 'declining';
}

/**
 * Get demand level color class
 */
export function getDemandLevelColorClass(level: DemandLevel): string {
  return DEMAND_LEVEL_CONFIG[level].bgColor + ' ' + DEMAND_LEVEL_CONFIG[level].color;
}

/**
 * Check if a skill is trending up
 */
export function isSkillTrendingUp(skill: TrendingSkill): boolean {
  return skill.direction === 'rising' && skill.growthPercentage > 0;
}

/**
 * Check if a role is high demand
 */
export function isRoleHighDemand(role: InDemandRole): boolean {
  return role.demandScore >= 85;
}

// ============================================================================
// Comparison Functions
// ============================================================================

/**
 * Compare two locations
 */
export function compareLocationSalaries(
  loc1: LocationComparison,
  loc2: LocationComparison
): {
  salaryDifference: number;
  adjustedSalaryDifference: number;
  colDifference: number;
  betterAdjusted: string;
} {
  return {
    salaryDifference: loc1.avgSalary - loc2.avgSalary,
    adjustedSalaryDifference: loc1.adjustedSalary - loc2.adjustedSalary,
    colDifference: loc1.costOfLivingIndex - loc2.costOfLivingIndex,
    betterAdjusted:
      loc1.adjustedSalary > loc2.adjustedSalary ? loc1.location : loc2.location,
  };
}

/**
 * Calculate salary with cost of living adjustment
 */
export function calculateAdjustedSalary(
  salary: number,
  costOfLivingIndex: number
): number {
  return Math.round((salary / costOfLivingIndex) * 100);
}

// ============================================================================
// Search Functions
// ============================================================================

/**
 * Search across all market insights data
 */
export function searchMarketInsights(
  query: string,
  skills: TrendingSkill[],
  roles: InDemandRole[]
): {
  skills: TrendingSkill[];
  roles: InDemandRole[];
} {
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) {
    return { skills, roles };
  }

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.relatedSkills.some((rs) => rs.toLowerCase().includes(lowerQuery))
  );

  const filteredRoles = roles.filter(
    (role) =>
      role.title.toLowerCase().includes(lowerQuery) ||
      role.topSkills.some((skill) => skill.toLowerCase().includes(lowerQuery)) ||
      role.topLocations.some((loc) => loc.toLowerCase().includes(lowerQuery))
  );

  return {
    skills: filteredSkills,
    roles: filteredRoles,
  };
}
