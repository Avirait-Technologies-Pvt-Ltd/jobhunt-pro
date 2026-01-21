'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Briefcase,
  Building2,
  MapPin,
  Download,
  Filter,
  DollarSign,
  BarChart3,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

import { TrendingSkillCard, SalaryTrendChart } from '@/components/market-insights';
import { useMarketInsights } from '@/hooks/useMarketInsights';
import {
  formatSalary,
  formatPercentage,
  formatJobCount,
  formatCompactNumber,
} from '@/lib/market-insights-utils';
import {
  INSIGHT_CATEGORY_LABELS,
  INSIGHT_CATEGORY_COLORS,
  GROWTH_INDICATOR_CONFIG,
  COMPETITION_LEVEL_CONFIG,
} from '@/types/market-insights';

export default function MarketInsightsPage() {
  const {
    filteredSkills,
    filteredRoles,
    filteredSalaryTrends,
    filteredIndustries,
    filteredLocations,
    statistics,
    topTrendingSkills,
    topInDemandRoles,
    highGrowthIndustries,
  } = useMarketInsights();

  const [activeTab, setActiveTab] = useState('skills');

  const handleExport = () => {
    toast.success('Market insights data exported to CSV');
  };

  const handleFilter = () => {
    toast.info('Filter functionality coming soon');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Market Insights</h1>
          <p className="text-muted-foreground">
            Explore trending skills, salary trends, and in-demand roles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trending Skills</p>
                <p className="text-3xl font-bold">{statistics.highDemandSkillsCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">High demand skills</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Salary Growth</p>
                <p className="text-3xl font-bold">{formatPercentage(statistics.avgSalaryGrowth)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">Year-over-year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Role</p>
                <p className="text-xl font-bold truncate">{topInDemandRoles[0]?.title || 'N/A'}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-muted-foreground">
                {formatCompactNumber(topInDemandRoles[0]?.openPositions || 0)} open positions
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Growing Industry</p>
                <p className="text-xl font-bold truncate">{statistics.topGrowingIndustry}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Building2 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">
                {formatPercentage(highGrowthIndustries[0]?.growthRate || 0)} growth
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="skills">
            <Zap className="mr-2 h-4 w-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="salaries">
            <DollarSign className="mr-2 h-4 w-4" />
            Salaries
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Briefcase className="mr-2 h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="industries">
            <Building2 className="mr-2 h-4 w-4" />
            Industries
          </TabsTrigger>
          <TabsTrigger value="locations">
            <MapPin className="mr-2 h-4 w-4" />
            Locations
          </TabsTrigger>
        </TabsList>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.slice(0, 12).map((skill) => (
              <TrendingSkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </TabsContent>

        {/* Salaries Tab */}
        <TabsContent value="salaries" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredSalaryTrends.slice(0, 6).map((trend) => (
              <SalaryTrendChart key={trend.id} trend={trend} />
            ))}
          </div>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoles.slice(0, 12).map((role) => {
              const competitionConfig = COMPETITION_LEVEL_CONFIG[role.competitionLevel];
              const categoryColor = INSIGHT_CATEGORY_COLORS[role.category];

              return (
                <Card key={role.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{role.title}</h3>
                        <Badge variant="secondary" className={`mt-1 ${categoryColor}`}>
                          {INSIGHT_CATEGORY_LABELS[role.category]}
                        </Badge>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${competitionConfig.bgColor} ${competitionConfig.color} border-0`}
                      >
                        {competitionConfig.label}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Demand Score</span>
                        <span className="font-medium">{role.demandScore}/100</span>
                      </div>
                      <Progress value={role.demandScore} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Avg Salary</p>
                        <p className="text-sm font-medium">{formatSalary(role.avgSalary)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Open Positions</p>
                        <p className="text-sm font-medium">
                          {formatJobCount(role.openPositions)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Growth Rate</p>
                        <p className="text-sm font-medium text-green-600">
                          {formatPercentage(role.growthRate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Remote %</p>
                        <p className="text-sm font-medium">{role.remotePercentage}%</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Top Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {role.topSkills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Industries Tab */}
        <TabsContent value="industries" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredIndustries.map((industry) => {
              const growthConfig = GROWTH_INDICATOR_CONFIG[industry.indicator];

              return (
                <Card key={industry.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold">{industry.industry}</h3>
                      <Badge
                        variant="outline"
                        className={`${growthConfig.bgColor} ${growthConfig.color} border-0`}
                      >
                        {growthConfig.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {industry.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Growth Rate</p>
                        <p
                          className={`text-lg font-bold ${
                            industry.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {formatPercentage(industry.growthRate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Jobs Created</p>
                        <p className="text-lg font-bold">
                          {formatCompactNumber(Math.abs(industry.jobsCreated))}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Top Roles</p>
                      <div className="flex flex-wrap gap-1">
                        {industry.topRoles.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Locations Tab */}
        <TabsContent value="locations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{location.location}</h3>
                      <p className="text-sm text-muted-foreground">{location.region}</p>
                    </div>
                    <Badge variant="outline">
                      {location.remoteJobPercentage}% Remote
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Avg Salary</span>
                        <span className="text-sm font-medium">
                          {formatSalary(location.avgSalary)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">COL Index</span>
                        <span className="text-sm font-medium">{location.costOfLivingIndex}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-sm font-medium">Adjusted Salary</span>
                        <span className="text-sm font-bold text-green-600">
                          {formatSalary(location.adjustedSalary)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Job Growth</span>
                        <span className="font-medium text-green-600">
                          {formatPercentage(location.jobGrowthRate)}
                        </span>
                      </div>
                      <Progress value={Math.min(location.jobGrowthRate * 4, 100)} className="h-2" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Top Industries</p>
                      <div className="flex flex-wrap gap-1">
                        {location.topIndustries.map((industry) => (
                          <Badge key={industry} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Market Summary
          </CardTitle>
          <CardDescription>Key insights from the job market</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Top Growing Category</span>
              </div>
              <p className="text-sm text-green-700">
                {INSIGHT_CATEGORY_LABELS[statistics.topGrowingCategory]} skills are seeing the
                highest growth with strong salary premiums.
              </p>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Remote Opportunities</span>
              </div>
              <p className="text-sm text-blue-700">
                {statistics.remoteJobsPercentage}% of tracked positions offer remote work
                options.
              </p>
            </div>
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-800">Skills in Demand</span>
              </div>
              <p className="text-sm text-purple-700">
                {statistics.highDemandSkillsCount} skills have demand scores above 85,
                indicating strong market need.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
