/**
 * Job Market Insights - Type Definitions
 *
 * This file contains all type definitions, interfaces, and constants
 * for the Job Market Insights feature.
 */

// ============================================================================
// Union Types
// ============================================================================

/**
 * Direction of skill trend in the market
 */
export type SkillTrendDirection = 'rising' | 'stable' | 'declining';

/**
 * Category of market insight
 */
export type InsightCategory =
  | 'technology'
  | 'design'
  | 'marketing'
  | 'sales'
  | 'finance'
  | 'healthcare'
  | 'engineering'
  | 'data-science'
  | 'product-management';

/**
 * Time period for data aggregation
 */
export type TimePeriod = 'monthly' | 'quarterly' | 'yearly';

/**
 * Growth indicator for industries
 */
export type GrowthIndicator = 'high-growth' | 'moderate-growth' | 'stable' | 'declining';

/**
 * Competition level for roles
 */
export type CompetitionLevel = 'low' | 'medium' | 'high' | 'very-high';

/**
 * Demand level classification
 */
export type DemandLevel = 'low' | 'medium' | 'high' | 'very-high';

/**
 * Sort options for market insights
 */
export type MarketInsightsSortOption =
  | 'demandScore-desc'
  | 'demandScore-asc'
  | 'growthPercentage-desc'
  | 'growthPercentage-asc'
  | 'salary-desc'
  | 'salary-asc'
  | 'jobCount-desc'
  | 'jobCount-asc'
  | 'name-asc'
  | 'name-desc';

// ============================================================================
// Core Interfaces
// ============================================================================

/**
 * Trending skill in the job market
 */
export interface TrendingSkill {
  id: string;
  name: string;
  category: InsightCategory;
  demandScore: number; // 0-100
  growthPercentage: number;
  direction: SkillTrendDirection;
  jobCount: number;
  avgSalaryImpact: number; // percentage impact on salary
  relatedSkills: string[];
}

/**
 * Data point for salary trends
 */
export interface SalaryDataPoint {
  date: string;
  median: number;
  p25: number; // 25th percentile
  p75: number; // 75th percentile
}

/**
 * Salary trend for a role/location combination
 */
export interface SalaryTrend {
  id: string;
  role: string;
  location: string;
  dataPoints: SalaryDataPoint[];
  currentMedian: number;
  changePercentage: number;
  period: TimePeriod;
}

/**
 * In-demand role in the job market
 */
export interface InDemandRole {
  id: string;
  title: string;
  category: InsightCategory;
  demandScore: number; // 0-100
  openPositions: number;
  growthRate: number;
  avgSalary: number;
  salaryRange: {
    min: number;
    max: number;
  };
  topSkills: string[];
  topLocations: string[];
  competitionLevel: CompetitionLevel;
  remotePercentage: number;
}

/**
 * Industry growth data
 */
export interface IndustryGrowth {
  id: string;
  industry: string;
  indicator: GrowthIndicator;
  growthRate: number;
  jobsCreated: number;
  topRoles: string[];
  description: string;
}

/**
 * Location comparison data
 */
export interface LocationComparison {
  id: string;
  location: string;
  region: string;
  avgSalary: number;
  costOfLivingIndex: number;
  adjustedSalary: number; // salary adjusted for COL
  remoteJobPercentage: number;
  topIndustries: string[];
  jobGrowthRate: number;
}

/**
 * Filter criteria for market insights
 */
export interface MarketInsightsFilter {
  categories?: InsightCategory[];
  locations?: string[];
  minDemandScore?: number;
  minGrowthRate?: number;
  competitionLevels?: CompetitionLevel[];
  includeRemote?: boolean;
  timePeriod?: TimePeriod;
  searchQuery?: string;
}

/**
 * Market statistics summary
 */
export interface MarketStatistics {
  totalSkillsTracked: number;
  totalRolesTracked: number;
  totalLocationsTracked: number;
  avgSalaryGrowth: number;
  topGrowingCategory: InsightCategory;
  topGrowingIndustry: string;
  remoteJobsPercentage: number;
  highDemandSkillsCount: number;
}

/**
 * Skill demand summary by category
 */
export interface SkillDemandSummary {
  category: InsightCategory;
  totalSkills: number;
  avgDemandScore: number;
  avgGrowth: number;
  topSkill: string;
}

/**
 * Location metrics for comparison
 */
export interface LocationMetrics {
  location: string;
  totalJobs: number;
  avgSalary: number;
  colIndex: number;
  salaryToCOLRatio: number;
}

// ============================================================================
// Configuration Constants
// ============================================================================

/**
 * Human-readable labels for insight categories
 */
export const INSIGHT_CATEGORY_LABELS: Record<InsightCategory, string> = {
  technology: 'Technology',
  design: 'Design',
  marketing: 'Marketing',
  sales: 'Sales',
  finance: 'Finance',
  healthcare: 'Healthcare',
  engineering: 'Engineering',
  'data-science': 'Data Science',
  'product-management': 'Product Management',
};

/**
 * Color codes for insight categories
 */
export const INSIGHT_CATEGORY_COLORS: Record<InsightCategory, string> = {
  technology: 'bg-blue-100 text-blue-800',
  design: 'bg-purple-100 text-purple-800',
  marketing: 'bg-pink-100 text-pink-800',
  sales: 'bg-orange-100 text-orange-800',
  finance: 'bg-green-100 text-green-800',
  healthcare: 'bg-red-100 text-red-800',
  engineering: 'bg-indigo-100 text-indigo-800',
  'data-science': 'bg-cyan-100 text-cyan-800',
  'product-management': 'bg-yellow-100 text-yellow-800',
};

/**
 * Configuration for trend directions
 */
export const TREND_DIRECTION_CONFIG: Record<
  SkillTrendDirection,
  { label: string; color: string; icon: string }
> = {
  rising: {
    label: 'Rising',
    color: 'text-green-600',
    icon: 'TrendingUp',
  },
  stable: {
    label: 'Stable',
    color: 'text-yellow-600',
    icon: 'Minus',
  },
  declining: {
    label: 'Declining',
    color: 'text-red-600',
    icon: 'TrendingDown',
  },
};

/**
 * Configuration for growth indicators
 */
export const GROWTH_INDICATOR_CONFIG: Record<
  GrowthIndicator,
  { label: string; color: string; bgColor: string }
> = {
  'high-growth': {
    label: 'High Growth',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  'moderate-growth': {
    label: 'Moderate Growth',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  stable: {
    label: 'Stable',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  declining: {
    label: 'Declining',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
};

/**
 * Configuration for competition levels
 */
export const COMPETITION_LEVEL_CONFIG: Record<
  CompetitionLevel,
  { label: string; color: string; bgColor: string }
> = {
  low: {
    label: 'Low Competition',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  medium: {
    label: 'Medium Competition',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  high: {
    label: 'High Competition',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
  },
  'very-high': {
    label: 'Very High Competition',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
};

/**
 * Configuration for demand levels
 */
export const DEMAND_LEVEL_CONFIG: Record<
  DemandLevel,
  { label: string; color: string; bgColor: string; minScore: number }
> = {
  low: {
    label: 'Low Demand',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    minScore: 0,
  },
  medium: {
    label: 'Medium Demand',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    minScore: 40,
  },
  high: {
    label: 'High Demand',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    minScore: 70,
  },
  'very-high': {
    label: 'Very High Demand',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    minScore: 90,
  },
};

/**
 * Sort option labels
 */
export const SORT_OPTION_LABELS: Record<MarketInsightsSortOption, string> = {
  'demandScore-desc': 'Demand (High to Low)',
  'demandScore-asc': 'Demand (Low to High)',
  'growthPercentage-desc': 'Growth (High to Low)',
  'growthPercentage-asc': 'Growth (Low to High)',
  'salary-desc': 'Salary (High to Low)',
  'salary-asc': 'Salary (Low to High)',
  'jobCount-desc': 'Jobs (Most to Least)',
  'jobCount-asc': 'Jobs (Least to Most)',
  'name-asc': 'Name (A-Z)',
  'name-desc': 'Name (Z-A)',
};

/**
 * All available insight categories
 */
export const ALL_INSIGHT_CATEGORIES: InsightCategory[] = [
  'technology',
  'design',
  'marketing',
  'sales',
  'finance',
  'healthcare',
  'engineering',
  'data-science',
  'product-management',
];

/**
 * Default filter values
 */
export const DEFAULT_MARKET_INSIGHTS_FILTER: MarketInsightsFilter = {
  categories: [],
  locations: [],
  minDemandScore: 0,
  minGrowthRate: undefined,
  competitionLevels: [],
  includeRemote: true,
  timePeriod: 'monthly',
  searchQuery: '',
};
