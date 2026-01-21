'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus, Briefcase, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingSkill,
  INSIGHT_CATEGORY_LABELS,
  INSIGHT_CATEGORY_COLORS,
  TREND_DIRECTION_CONFIG,
} from '@/types/market-insights';
import {
  formatPercentage,
  formatJobCount,
  classifyDemandLevel,
} from '@/lib/market-insights-utils';
import { DEMAND_LEVEL_CONFIG } from '@/types/market-insights';

interface TrendingSkillCardProps {
  skill: TrendingSkill;
  onSelect?: (skill: TrendingSkill) => void;
  variant?: 'default' | 'compact';
}

const TrendIcon: React.FC<{ direction: TrendingSkill['direction'] }> = ({
  direction,
}) => {
  switch (direction) {
    case 'rising':
      return <TrendingUp className="h-4 w-4" />;
    case 'declining':
      return <TrendingDown className="h-4 w-4" />;
    case 'stable':
    default:
      return <Minus className="h-4 w-4" />;
  }
};

export function TrendingSkillCard({
  skill,
  onSelect,
  variant = 'default',
}: TrendingSkillCardProps) {
  const trendConfig = TREND_DIRECTION_CONFIG[skill.direction];
  const categoryColor = INSIGHT_CATEGORY_COLORS[skill.category];
  const categoryLabel = INSIGHT_CATEGORY_LABELS[skill.category];
  const demandLevel = classifyDemandLevel(skill.demandScore);
  const demandConfig = DEMAND_LEVEL_CONFIG[demandLevel];

  const handleClick = () => {
    if (onSelect) {
      onSelect(skill);
    }
  };

  if (variant === 'compact') {
    return (
      <Card
        className={`hover:shadow-md transition-shadow ${onSelect ? 'cursor-pointer' : ''}`}
        onClick={handleClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">{skill.name}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className={categoryColor}>
                  {categoryLabel}
                </Badge>
                <span className={`flex items-center gap-1 text-xs ${trendConfig.color}`}>
                  <TrendIcon direction={skill.direction} />
                  {formatPercentage(skill.growthPercentage)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">{skill.demandScore}</span>
              <p className="text-xs text-muted-foreground">Demand</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${onSelect ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className={categoryColor}>
                {categoryLabel}
              </Badge>
            </div>
          </div>
          <div className={`flex items-center gap-1 ${trendConfig.color}`}>
            <TrendIcon direction={skill.direction} />
            <span className="text-sm font-medium">{trendConfig.label}</span>
          </div>
        </div>

        {/* Demand Score Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Demand Score</span>
            <span className="font-medium">{skill.demandScore}/100</span>
          </div>
          <Progress value={skill.demandScore} className="h-2" />
          <Badge
            variant="outline"
            className={`mt-2 ${demandConfig.bgColor} ${demandConfig.color} border-0`}
          >
            {demandConfig.label}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Growth</p>
              <p className={`text-sm font-medium ${trendConfig.color}`}>
                {formatPercentage(skill.growthPercentage)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Jobs</p>
              <p className="text-sm font-medium">{formatJobCount(skill.jobCount)}</p>
            </div>
          </div>
        </div>

        {/* Salary Impact */}
        <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-lg">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="text-sm text-muted-foreground">Avg. Salary Impact:</span>
          <span className="text-sm font-medium text-green-600">
            +{skill.avgSalaryImpact}%
          </span>
        </div>

        {/* Related Skills */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Related Skills</p>
          <div className="flex flex-wrap gap-1">
            {skill.relatedSkills.slice(0, 4).map((relatedSkill) => (
              <Badge key={relatedSkill} variant="outline" className="text-xs">
                {relatedSkill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TrendingSkillCard;
