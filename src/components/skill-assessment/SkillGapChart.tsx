'use client';

import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  SkillGap,
  SkillMatch,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_COLORS,
} from '@/types/skill-assessment';
import { cn } from '@/lib/utils';

interface SkillGapChartProps {
  skillGaps: SkillGap[];
  onSelectAssessment?: (assessmentId: string) => void;
}

export function SkillGapChart({ skillGaps, onSelectAssessment }: SkillGapChartProps) {
  const sortedGaps = [...skillGaps].sort((a, b) => b.gap - a.gap);

  const getPriorityConfig = (priority: SkillGap['priority']) => {
    const configs = {
      high: { color: 'text-red-600', bg: 'bg-red-100', label: 'High Priority' },
      medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Medium Priority' },
      low: { color: 'text-green-600', bg: 'bg-green-100', label: 'Low Priority' },
    };
    return configs[priority];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Skill Gap Analysis
        </CardTitle>
        <CardDescription>
          Areas where you can improve based on assessment results
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedGaps.length === 0 ? (
          <div className="text-center py-6">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-500" />
            <p className="font-medium">No skill gaps identified!</p>
            <p className="text-sm text-muted-foreground">
              Your skills meet or exceed the requirements.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedGaps.map((gap) => {
              const priorityConfig = getPriorityConfig(gap.priority);
              const categoryColor = SKILL_CATEGORY_COLORS[gap.category];

              return (
                <div key={gap.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{gap.skill}</span>
                      <Badge variant="outline" className={categoryColor}>
                        {SKILL_CATEGORY_LABELS[gap.category]}
                      </Badge>
                    </div>
                    <Badge variant="outline" className={cn(priorityConfig.color, priorityConfig.bg)}>
                      {priorityConfig.label}
                    </Badge>
                  </div>

                  <div className="relative">
                    <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                      {/* Current level */}
                      <div
                        className="h-full bg-blue-500 rounded-l-full"
                        style={{ width: `${gap.currentLevel}%` }}
                      />
                      {/* Required level marker */}
                      <div
                        className="absolute top-0 h-full w-0.5 bg-red-500"
                        style={{ left: `${gap.requiredLevel}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Current: {gap.currentLevel}%</span>
                      <span className="text-red-600">Required: {gap.requiredLevel}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-red-500" />
                    <span>Gap: {gap.gap} points</span>
                    {gap.recommendedAssessments.length > 0 && (
                      <>
                        <span className="mx-1">|</span>
                        <span>
                          {gap.recommendedAssessments.length} recommended assessment
                          {gap.recommendedAssessments.length !== 1 ? 's' : ''}
                        </span>
                      </>
                    )}
                  </div>

                  {onSelectAssessment && gap.recommendedAssessments.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {gap.recommendedAssessments.slice(0, 3).map((assessmentId) => (
                        <button
                          key={assessmentId}
                          onClick={() => onSelectAssessment(assessmentId)}
                          className="text-xs text-primary hover:underline"
                        >
                          Take assessment
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface JobMatchCardProps {
  skillMatch: SkillMatch;
  onViewJob?: (jobId: string) => void;
  onTakeAssessment?: (assessmentId: string) => void;
}

export function JobMatchCard({
  skillMatch,
  onViewJob,
  onTakeAssessment,
}: JobMatchCardProps) {
  const getMatchStatus = (match: number) => {
    if (match >= 80) return { label: 'Excellent Match', color: 'text-green-600', bg: 'bg-green-100' };
    if (match >= 60) return { label: 'Good Match', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (match >= 40) return { label: 'Partial Match', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Skills Gap', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const matchStatus = getMatchStatus(skillMatch.overallMatch);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{skillMatch.jobTitle}</CardTitle>
            <CardDescription>Job skill match analysis</CardDescription>
          </div>
          <Badge variant="outline" className={cn(matchStatus.color, matchStatus.bg)}>
            {skillMatch.overallMatch}% {matchStatus.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={skillMatch.overallMatch} className="h-3 mb-4" />

        {/* Required Skills */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Required Skills</h4>
          {skillMatch.requiredSkills.map((skill) => {
            const userSkill = skillMatch.userSkills.find((us) => us.skill === skill.skill);
            const hasSkill = userSkill && userSkill.level >= skill.requiredLevel;

            return (
              <div key={skill.skill} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {hasSkill ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span>{skill.skill}</span>
                  <Badge variant="outline" className="text-xs">
                    {skill.importance}
                  </Badge>
                </div>
                <span className="text-muted-foreground">
                  {userSkill?.level ?? 0}/{skill.requiredLevel}
                </span>
              </div>
            );
          })}
        </div>

        {/* Skill Gaps */}
        {skillMatch.gaps.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Skills to Improve
            </h4>
            <div className="space-y-2">
              {skillMatch.gaps.slice(0, 3).map((gap) => (
                <div key={gap.skill} className="text-sm">
                  <span>{gap.skill}</span>
                  <span className="text-muted-foreground ml-2">
                    ({gap.gap} points gap)
                  </span>
                  {onTakeAssessment && gap.recommendedAssessments.length > 0 && (
                    <button
                      onClick={() => onTakeAssessment(gap.recommendedAssessments[0])}
                      className="ml-2 text-primary hover:underline text-xs"
                    >
                      Practice
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {onViewJob && (
          <div className="mt-4">
            <button
              onClick={() => onViewJob(skillMatch.jobId)}
              className="text-primary hover:underline text-sm"
            >
              View Job Details
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
