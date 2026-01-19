import {
  AssessmentQuestion,
  AssessmentSession,
  AssessmentResult,
  UserAnswer,
  SkillAssessment,
  CategoryScore,
  QuestionResult,
  SkillCategory,
  AssessmentDifficulty,
  UserSkillLevel,
  SkillGap,
  RequiredSkill,
  SkillMatch,
  CategoryPerformance,
  UserAssessmentStats,
  AssessmentHistory,
  SKILL_CATEGORY_LABELS,
  ASSESSMENT_DIFFICULTY_CONFIG,
} from '@/types/skill-assessment';

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a unique result ID
 */
export function generateResultId(): string {
  return `result-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffle questions for an assessment
 */
export function shuffleQuestions(questions: AssessmentQuestion[]): AssessmentQuestion[] {
  return shuffleArray(questions);
}

/**
 * Calculate score from user answers
 */
export function calculateScore(
  questions: AssessmentQuestion[],
  answers: UserAnswer[]
): number {
  let totalPoints = 0;

  answers.forEach((answer) => {
    if (answer.isCorrect) {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question) {
        totalPoints += question.points;
      }
    }
  });

  return totalPoints;
}

/**
 * Calculate percentage score
 */
export function calculatePercentage(score: number, totalPoints: number): number {
  if (totalPoints === 0) return 0;
  return Math.round((score / totalPoints) * 100);
}

/**
 * Check if a user passed the assessment
 */
export function checkPassed(percentage: number, passingScore: number): boolean {
  return percentage >= passingScore;
}

/**
 * Calculate total points for a set of questions
 */
export function calculateTotalPoints(questions: AssessmentQuestion[]): number {
  return questions.reduce((total, q) => total + q.points, 0);
}

/**
 * Check if an answer is correct
 */
export function isAnswerCorrect(
  question: AssessmentQuestion,
  selectedAnswer: number | null
): boolean {
  if (selectedAnswer === null) return false;
  return question.correctAnswer === selectedAnswer;
}

/**
 * Calculate score breakdown by category
 */
export function calculateCategoryBreakdown(
  questions: AssessmentQuestion[],
  answers: UserAnswer[]
): CategoryScore[] {
  const categoryMap = new Map<SkillCategory, { correct: number; total: number }>();

  questions.forEach((question) => {
    const current = categoryMap.get(question.category) || { correct: 0, total: 0 };
    current.total++;

    const answer = answers.find((a) => a.questionId === question.id);
    if (answer?.isCorrect) {
      current.correct++;
    }

    categoryMap.set(question.category, current);
  });

  return Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    correct: data.correct,
    total: data.total,
    percentage: Math.round((data.correct / data.total) * 100),
  }));
}

/**
 * Generate detailed question results
 */
export function generateQuestionResults(
  questions: AssessmentQuestion[],
  answers: UserAnswer[]
): QuestionResult[] {
  return questions.map((question) => {
    const answer = answers.find((a) => a.questionId === question.id);
    const isCorrect = answer?.isCorrect ?? false;

    return {
      questionId: question.id,
      question: question.question,
      userAnswer: answer?.selectedAnswer ?? null,
      correctAnswer: question.correctAnswer,
      isCorrect,
      points: question.points,
      earnedPoints: isCorrect ? question.points : 0,
      timeSpent: answer?.timeSpent ?? 0,
      explanation: question.explanation,
    };
  });
}

/**
 * Generate assessment result from a completed session
 */
export function generateAssessmentResult(
  session: AssessmentSession,
  assessment: SkillAssessment
): AssessmentResult {
  const score = calculateScore(assessment.questions, session.answers);
  const totalPoints = calculateTotalPoints(assessment.questions);
  const percentage = calculatePercentage(score, totalPoints);
  const passed = checkPassed(percentage, assessment.passingScore);
  const correctAnswers = session.answers.filter((a) => a.isCorrect).length;

  return {
    id: generateResultId(),
    sessionId: session.id,
    assessmentId: assessment.id,
    assessmentTitle: assessment.title,
    userId: session.userId,
    score,
    totalPoints,
    percentage,
    passed,
    correctAnswers,
    totalQuestions: assessment.questions.length,
    timeSpent: session.totalTimeSpent,
    completedAt: session.completedAt || new Date().toISOString(),
    badge: passed ? assessment.badge : undefined,
    categoryBreakdown: calculateCategoryBreakdown(assessment.questions, session.answers),
    questionResults: generateQuestionResults(assessment.questions, session.answers),
  };
}

/**
 * Format duration in seconds to MM:SS
 */
export function formatDuration(seconds: number): string {
  if (seconds < 0) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format time spent in a compact way (e.g., "1:30" or "45s")
 */
export function formatTimeSpent(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (secs === 0) {
    return `${minutes}m`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format duration to human-readable string
 */
export function formatDurationLong(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Get category label for display
 */
export function getCategoryLabel(category: SkillCategory): string {
  return SKILL_CATEGORY_LABELS[category] || category;
}

/**
 * Get difficulty configuration
 */
export function getDifficultyConfig(difficulty: AssessmentDifficulty): {
  label: string;
  color: string;
  points: number;
} {
  return ASSESSMENT_DIFFICULTY_CONFIG[difficulty];
}

/**
 * Calculate user skill level from assessment results
 */
export function calculateSkillLevel(
  results: AssessmentResult[],
  category: SkillCategory
): number {
  const categoryResults = results.filter((r) =>
    r.categoryBreakdown.some((cb) => cb.category === category)
  );

  if (categoryResults.length === 0) return 0;

  // Weight recent results more heavily
  const weightedScores = categoryResults.map((result, index) => {
    const categoryScore = result.categoryBreakdown.find((cb) => cb.category === category);
    const weight = 1 + index * 0.1; // More recent = higher weight
    return (categoryScore?.percentage || 0) * weight;
  });

  const totalWeight = categoryResults.reduce((sum, _, index) => sum + 1 + index * 0.1, 0);
  const weightedAverage = weightedScores.reduce((sum, score) => sum + score, 0) / totalWeight;

  return Math.round(weightedAverage);
}

/**
 * Calculate skill gap between user level and required level
 */
export function calculateSkillGap(
  userLevel: number,
  requiredLevel: number
): number {
  return Math.max(0, requiredLevel - userLevel);
}

/**
 * Determine gap priority based on size and importance
 */
export function determineGapPriority(
  gap: number,
  importance: 'required' | 'preferred' | 'nice-to-have'
): 'high' | 'medium' | 'low' {
  if (importance === 'required') {
    if (gap > 30) return 'high';
    if (gap > 15) return 'medium';
    return 'low';
  }

  if (importance === 'preferred') {
    if (gap > 40) return 'high';
    if (gap > 25) return 'medium';
    return 'low';
  }

  // nice-to-have
  if (gap > 50) return 'medium';
  return 'low';
}

/**
 * Analyze skill gaps for a job
 */
export function analyzeSkillGaps(
  requiredSkills: RequiredSkill[],
  userSkills: UserSkillLevel[],
  recommendedAssessments: Map<SkillCategory, string[]>
): SkillGap[] {
  return requiredSkills.map((required) => {
    const userSkill = userSkills.find(
      (us) => us.skill.toLowerCase() === required.skill.toLowerCase()
    );
    const currentLevel = userSkill?.level || 0;
    const gap = calculateSkillGap(currentLevel, required.requiredLevel);

    return {
      skill: required.skill,
      category: required.category,
      currentLevel,
      requiredLevel: required.requiredLevel,
      gap,
      recommendedAssessments: recommendedAssessments.get(required.category) || [],
      priority: determineGapPriority(gap, required.importance),
    };
  });
}

/**
 * Calculate overall job match percentage
 */
export function calculateJobMatch(
  requiredSkills: RequiredSkill[],
  userSkills: UserSkillLevel[]
): number {
  if (requiredSkills.length === 0) return 100;

  let totalWeight = 0;
  let weightedScore = 0;

  const importanceWeights = { required: 3, preferred: 2, 'nice-to-have': 1 };

  requiredSkills.forEach((required) => {
    const weight = importanceWeights[required.importance];
    totalWeight += weight;

    const userSkill = userSkills.find(
      (us) => us.skill.toLowerCase() === required.skill.toLowerCase()
    );
    const userLevel = userSkill?.level || 0;

    // Calculate match percentage for this skill (capped at 100%)
    const matchPercent = Math.min(100, (userLevel / required.requiredLevel) * 100);
    weightedScore += matchPercent * weight;
  });

  return Math.round(weightedScore / totalWeight);
}

/**
 * Generate skill match analysis for a job
 */
export function generateSkillMatch(
  jobId: string,
  jobTitle: string,
  requiredSkills: RequiredSkill[],
  userSkills: UserSkillLevel[],
  assessmentsByCategory: Map<SkillCategory, string[]>
): SkillMatch {
  const overallMatch = calculateJobMatch(requiredSkills, userSkills);
  const gaps = analyzeSkillGaps(requiredSkills, userSkills, assessmentsByCategory);

  return {
    jobId,
    jobTitle,
    requiredSkills,
    userSkills,
    overallMatch,
    gaps: gaps.filter((g) => g.gap > 0), // Only include actual gaps
  };
}

/**
 * Calculate performance trend from history
 */
export function calculateTrend(
  scores: number[]
): 'improving' | 'stable' | 'declining' {
  if (scores.length < 2) return 'stable';

  // Compare recent half to older half
  const midpoint = Math.floor(scores.length / 2);
  const recentScores = scores.slice(midpoint);
  const olderScores = scores.slice(0, midpoint);

  const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
  const olderAvg = olderScores.reduce((a, b) => a + b, 0) / olderScores.length;

  const difference = recentAvg - olderAvg;

  if (difference > 5) return 'improving';
  if (difference < -5) return 'declining';
  return 'stable';
}

/**
 * Calculate category performance from assessment history
 */
export function calculateCategoryPerformance(
  history: AssessmentHistory[],
  category: SkillCategory
): CategoryPerformance | null {
  const categoryHistory = history.filter((h) => h.category === category);

  if (categoryHistory.length === 0) return null;

  const allAttempts = categoryHistory.flatMap((h) => h.attempts);
  const scores = allAttempts.map((a) => a.percentage);
  const totalQuestions = categoryHistory.reduce(
    (sum, h) => sum + h.attempts.length * 10, // Estimate
    0
  );

  return {
    category,
    assessmentsCompleted: categoryHistory.length,
    averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    bestScore: Math.max(...scores),
    totalQuestionsPracticed: totalQuestions,
    correctAnswers: Math.round(
      (scores.reduce((a, b) => a + b, 0) / 100) * totalQuestions
    ),
    trend: calculateTrend(scores),
  };
}

/**
 * Get score color based on percentage
 */
export function getScoreColor(percentage: number): string {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 80) return 'text-green-500';
  if (percentage >= 70) return 'text-yellow-600';
  if (percentage >= 60) return 'text-yellow-500';
  if (percentage >= 50) return 'text-orange-500';
  return 'text-red-500';
}

/**
 * Get score background color based on percentage
 */
export function getScoreBgColor(percentage: number): string {
  if (percentage >= 90) return 'bg-green-100';
  if (percentage >= 80) return 'bg-green-50';
  if (percentage >= 70) return 'bg-yellow-100';
  if (percentage >= 60) return 'bg-yellow-50';
  if (percentage >= 50) return 'bg-orange-100';
  return 'bg-red-100';
}

/**
 * Get score label based on percentage
 */
export function getScoreLabel(percentage: number): string {
  if (percentage >= 90) return 'Excellent';
  if (percentage >= 80) return 'Very Good';
  if (percentage >= 70) return 'Good';
  if (percentage >= 60) return 'Satisfactory';
  if (percentage >= 50) return 'Needs Improvement';
  return 'Needs More Practice';
}

/**
 * Get trend display configuration
 */
export function getTrendDisplay(trend: 'improving' | 'stable' | 'declining'): {
  icon: string;
  color: string;
  label: string;
} {
  switch (trend) {
    case 'improving':
      return { icon: '↑', color: 'text-green-600', label: 'Improving' };
    case 'stable':
      return { icon: '→', color: 'text-yellow-600', label: 'Stable' };
    case 'declining':
      return { icon: '↓', color: 'text-red-600', label: 'Needs Attention' };
  }
}

/**
 * Get priority display configuration
 */
export function getPriorityDisplay(priority: 'high' | 'medium' | 'low'): {
  color: string;
  bgColor: string;
  label: string;
} {
  switch (priority) {
    case 'high':
      return { color: 'text-red-600', bgColor: 'bg-red-100', label: 'High Priority' };
    case 'medium':
      return { color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Medium Priority' };
    case 'low':
      return { color: 'text-green-600', bgColor: 'bg-green-100', label: 'Low Priority' };
  }
}

/**
 * Calculate streak days
 */
export function calculateStreak(assessmentDates: string[]): number {
  if (assessmentDates.length === 0) return 0;

  const sortedDates = assessmentDates
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = today;

  for (const date of sortedDates) {
    const assessmentDate = new Date(date);
    assessmentDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (currentDate.getTime() - assessmentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0 || diffDays === 1) {
      streak++;
      currentDate = assessmentDate;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Calculate user assessment statistics
 */
export function calculateUserStats(
  results: AssessmentResult[],
  history: AssessmentHistory[]
): UserAssessmentStats {
  const completedAssessments = results.length;
  const passedAssessments = results.filter((r) => r.passed).length;
  const totalPoints = results.reduce((sum, r) => sum + r.score, 0);
  const averageScore =
    completedAssessments > 0
      ? Math.round(
          results.reduce((sum, r) => sum + r.percentage, 0) / completedAssessments
        )
      : 0;
  const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);

  // Extract unique badges
  const badgesEarned = results
    .filter((r) => r.badge)
    .map((r) => r.badge!)
    .filter((badge, index, self) => self.findIndex((b) => b.id === badge.id) === index);

  // Calculate category performance
  const categories = new Set<SkillCategory>();
  results.forEach((r) => r.categoryBreakdown.forEach((cb) => categories.add(cb.category)));

  const categoryPerformance = Array.from(categories)
    .map((category) => calculateCategoryPerformance(history, category))
    .filter((cp): cp is CategoryPerformance => cp !== null);

  // Calculate streak
  const assessmentDates = results.map((r) => r.completedAt);
  const streak = calculateStreak(assessmentDates);

  return {
    totalAssessmentsCompleted: completedAssessments,
    totalAssessmentsPassed: passedAssessments,
    totalPointsEarned: totalPoints,
    averageScore,
    totalTimeSpent: totalTime,
    badgesEarned,
    categoryPerformance,
    recentResults: results.slice(-5).reverse(),
    streak,
    lastAssessmentDate: results.length > 0 ? results[results.length - 1].completedAt : undefined,
  };
}

/**
 * Validate session settings
 */
export function validateSessionSettings(settings: {
  shuffleQuestions: boolean;
  showTimer: boolean;
  allowSkip: boolean;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Settings are optional booleans, so just validate they are booleans if provided
  if (typeof settings.shuffleQuestions !== 'boolean') {
    errors.push('shuffleQuestions must be a boolean');
  }
  if (typeof settings.showTimer !== 'boolean') {
    errors.push('showTimer must be a boolean');
  }
  if (typeof settings.allowSkip !== 'boolean') {
    errors.push('allowSkip must be a boolean');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format relative date
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      if (diffMinutes < 1) return 'Just now';
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }

  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
  if (diffDays < 365)
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) !== 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
}

/**
 * Get recommended assessments based on skill gaps
 */
export function getRecommendedAssessments(
  gaps: SkillGap[],
  availableAssessments: { id: string; category: SkillCategory; title: string }[]
): { assessmentId: string; title: string; reason: string }[] {
  const recommendations: { assessmentId: string; title: string; reason: string }[] = [];

  // Sort gaps by priority
  const sortedGaps = [...gaps].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  sortedGaps.forEach((gap) => {
    const matchingAssessments = availableAssessments.filter(
      (a) => a.category === gap.category
    );

    matchingAssessments.forEach((assessment) => {
      if (!recommendations.find((r) => r.assessmentId === assessment.id)) {
        recommendations.push({
          assessmentId: assessment.id,
          title: assessment.title,
          reason: `Improve your ${gap.skill} skills (current: ${gap.currentLevel}%, needed: ${gap.requiredLevel}%)`,
        });
      }
    });
  });

  return recommendations.slice(0, 5); // Return top 5 recommendations
}
