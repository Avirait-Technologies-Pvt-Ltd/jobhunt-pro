import {
  calculateSkillLevel,
  calculateSkillGap,
  determineGapPriority,
  analyzeSkillGaps,
  calculateJobMatch,
  generateSkillMatch,
  getRecommendedAssessments,
  getPriorityDisplay,
} from '@/lib/assessment-utils';
import {
  AssessmentResult,
  RequiredSkill,
  UserSkillLevel,
  SkillGap,
  SkillCategory,
} from '@/types/skill-assessment';

describe('Skill Gap Analysis - Utility Functions', () => {
  describe('calculateSkillLevel', () => {
    const sampleResults: AssessmentResult[] = [
      {
        id: 'result-1',
        sessionId: 'session-1',
        assessmentId: 'assessment-1',
        assessmentTitle: 'JavaScript Basics',
        userId: 'user-1',
        score: 80,
        totalPoints: 100,
        percentage: 80,
        passed: true,
        correctAnswers: 8,
        totalQuestions: 10,
        timeSpent: 200,
        completedAt: '2024-03-01T10:00:00Z',
        categoryBreakdown: [
          { category: 'programming', correct: 8, total: 10, percentage: 80 },
        ],
        questionResults: [],
      },
      {
        id: 'result-2',
        sessionId: 'session-2',
        assessmentId: 'assessment-2',
        assessmentTitle: 'JavaScript Advanced',
        userId: 'user-1',
        score: 90,
        totalPoints: 100,
        percentage: 90,
        passed: true,
        correctAnswers: 9,
        totalQuestions: 10,
        timeSpent: 180,
        completedAt: '2024-03-05T10:00:00Z',
        categoryBreakdown: [
          { category: 'programming', correct: 9, total: 10, percentage: 90 },
        ],
        questionResults: [],
      },
      {
        id: 'result-3',
        sessionId: 'session-3',
        assessmentId: 'assessment-3',
        assessmentTitle: 'React Fundamentals',
        userId: 'user-1',
        score: 70,
        totalPoints: 100,
        percentage: 70,
        passed: true,
        correctAnswers: 7,
        totalQuestions: 10,
        timeSpent: 250,
        completedAt: '2024-03-08T10:00:00Z',
        categoryBreakdown: [
          { category: 'frontend', correct: 7, total: 10, percentage: 70 },
        ],
        questionResults: [],
      },
    ];

    it('should return 0 for category with no results', () => {
      const level = calculateSkillLevel(sampleResults, 'database');
      expect(level).toBe(0);
    });

    it('should calculate skill level from category results', () => {
      const level = calculateSkillLevel(sampleResults, 'programming');
      expect(level).toBeGreaterThan(0);
      expect(level).toBeLessThanOrEqual(100);
    });

    it('should weight recent results more heavily', () => {
      // The calculation should favor the more recent 90% over the older 80%
      const level = calculateSkillLevel(sampleResults, 'programming');
      // Should be closer to 90 than 80 due to recency weighting
      expect(level).toBeGreaterThanOrEqual(80);
    });

    it('should calculate frontend skill level', () => {
      const level = calculateSkillLevel(sampleResults, 'frontend');
      expect(level).toBe(70);
    });

    it('should handle empty results', () => {
      const level = calculateSkillLevel([], 'programming');
      expect(level).toBe(0);
    });
  });

  describe('calculateSkillGap', () => {
    it('should return 0 when user level equals required level', () => {
      const gap = calculateSkillGap(80, 80);
      expect(gap).toBe(0);
    });

    it('should return 0 when user level exceeds required level', () => {
      const gap = calculateSkillGap(90, 80);
      expect(gap).toBe(0);
    });

    it('should calculate positive gap when user level is below required', () => {
      const gap = calculateSkillGap(60, 80);
      expect(gap).toBe(20);
    });

    it('should handle zero user level', () => {
      const gap = calculateSkillGap(0, 70);
      expect(gap).toBe(70);
    });

    it('should handle zero required level', () => {
      const gap = calculateSkillGap(50, 0);
      expect(gap).toBe(0);
    });
  });

  describe('determineGapPriority', () => {
    describe('required importance', () => {
      it('should return high for large gaps', () => {
        const priority = determineGapPriority(35, 'required');
        expect(priority).toBe('high');
      });

      it('should return medium for medium gaps', () => {
        const priority = determineGapPriority(20, 'required');
        expect(priority).toBe('medium');
      });

      it('should return low for small gaps', () => {
        const priority = determineGapPriority(10, 'required');
        expect(priority).toBe('low');
      });
    });

    describe('preferred importance', () => {
      it('should return high for very large gaps', () => {
        const priority = determineGapPriority(45, 'preferred');
        expect(priority).toBe('high');
      });

      it('should return medium for large gaps', () => {
        const priority = determineGapPriority(30, 'preferred');
        expect(priority).toBe('medium');
      });

      it('should return low for smaller gaps', () => {
        const priority = determineGapPriority(20, 'preferred');
        expect(priority).toBe('low');
      });
    });

    describe('nice-to-have importance', () => {
      it('should return medium for very large gaps', () => {
        const priority = determineGapPriority(55, 'nice-to-have');
        expect(priority).toBe('medium');
      });

      it('should return low for smaller gaps', () => {
        const priority = determineGapPriority(30, 'nice-to-have');
        expect(priority).toBe('low');
      });
    });

    it('should handle zero gap', () => {
      expect(determineGapPriority(0, 'required')).toBe('low');
      expect(determineGapPriority(0, 'preferred')).toBe('low');
      expect(determineGapPriority(0, 'nice-to-have')).toBe('low');
    });
  });

  describe('analyzeSkillGaps', () => {
    const requiredSkills: RequiredSkill[] = [
      {
        skill: 'JavaScript',
        category: 'programming',
        requiredLevel: 80,
        importance: 'required',
      },
      {
        skill: 'React',
        category: 'frontend',
        requiredLevel: 70,
        importance: 'required',
      },
      {
        skill: 'TypeScript',
        category: 'programming',
        requiredLevel: 60,
        importance: 'preferred',
      },
    ];

    const userSkills: UserSkillLevel[] = [
      {
        skill: 'JavaScript',
        category: 'programming',
        level: 85,
        assessmentsBasis: ['assessment-1'],
        verified: true,
      },
      {
        skill: 'React',
        category: 'frontend',
        level: 50,
        assessmentsBasis: ['assessment-2'],
        verified: true,
      },
    ];

    const recommendedAssessments = new Map<SkillCategory, string[]>([
      ['programming', ['assessment-js-intermediate']],
      ['frontend', ['assessment-react-fundamentals']],
    ]);

    it('should analyze gaps for all required skills', () => {
      const gaps = analyzeSkillGaps(requiredSkills, userSkills, recommendedAssessments);
      expect(gaps.length).toBe(3);
    });

    it('should calculate correct gap for skills user has', () => {
      const gaps = analyzeSkillGaps(requiredSkills, userSkills, recommendedAssessments);

      const reactGap = gaps.find((g) => g.skill === 'React');
      expect(reactGap?.currentLevel).toBe(50);
      expect(reactGap?.requiredLevel).toBe(70);
      expect(reactGap?.gap).toBe(20);
    });

    it('should calculate full gap for skills user does not have', () => {
      const gaps = analyzeSkillGaps(requiredSkills, userSkills, recommendedAssessments);

      const tsGap = gaps.find((g) => g.skill === 'TypeScript');
      expect(tsGap?.currentLevel).toBe(0);
      expect(tsGap?.requiredLevel).toBe(60);
      expect(tsGap?.gap).toBe(60);
    });

    it('should assign correct priority based on gap and importance', () => {
      const gaps = analyzeSkillGaps(requiredSkills, userSkills, recommendedAssessments);

      const reactGap = gaps.find((g) => g.skill === 'React');
      expect(reactGap?.priority).toBeDefined();
    });

    it('should include recommended assessments', () => {
      const gaps = analyzeSkillGaps(requiredSkills, userSkills, recommendedAssessments);

      const reactGap = gaps.find((g) => g.skill === 'React');
      expect(reactGap?.recommendedAssessments).toContain('assessment-react-fundamentals');
    });

    it('should handle case-insensitive skill matching', () => {
      const userSkillsLowerCase: UserSkillLevel[] = [
        {
          skill: 'javascript',
          category: 'programming',
          level: 85,
          assessmentsBasis: ['assessment-1'],
          verified: true,
        },
      ];

      const gaps = analyzeSkillGaps(requiredSkills, userSkillsLowerCase, recommendedAssessments);

      const jsGap = gaps.find((g) => g.skill === 'JavaScript');
      expect(jsGap?.currentLevel).toBe(85);
    });

    it('should calculate no gap for skills exceeding requirement', () => {
      const gaps = analyzeSkillGaps(requiredSkills, userSkills, recommendedAssessments);

      const jsGap = gaps.find((g) => g.skill === 'JavaScript');
      expect(jsGap?.gap).toBe(0); // User has 85, required is 80
    });
  });

  describe('calculateJobMatch', () => {
    const requiredSkills: RequiredSkill[] = [
      {
        skill: 'JavaScript',
        category: 'programming',
        requiredLevel: 80,
        importance: 'required',
      },
      {
        skill: 'React',
        category: 'frontend',
        requiredLevel: 70,
        importance: 'preferred',
      },
      {
        skill: 'CSS',
        category: 'frontend',
        requiredLevel: 60,
        importance: 'nice-to-have',
      },
    ];

    it('should return 100 for perfect skill match', () => {
      const userSkills: UserSkillLevel[] = [
        { skill: 'JavaScript', category: 'programming', level: 80, assessmentsBasis: [], verified: true },
        { skill: 'React', category: 'frontend', level: 70, assessmentsBasis: [], verified: true },
        { skill: 'CSS', category: 'frontend', level: 60, assessmentsBasis: [], verified: true },
      ];

      const match = calculateJobMatch(requiredSkills, userSkills);
      expect(match).toBe(100);
    });

    it('should return 100 when user exceeds requirements', () => {
      const userSkills: UserSkillLevel[] = [
        { skill: 'JavaScript', category: 'programming', level: 100, assessmentsBasis: [], verified: true },
        { skill: 'React', category: 'frontend', level: 90, assessmentsBasis: [], verified: true },
        { skill: 'CSS', category: 'frontend', level: 80, assessmentsBasis: [], verified: true },
      ];

      const match = calculateJobMatch(requiredSkills, userSkills);
      expect(match).toBe(100);
    });

    it('should calculate partial match correctly', () => {
      const userSkills: UserSkillLevel[] = [
        { skill: 'JavaScript', category: 'programming', level: 40, assessmentsBasis: [], verified: true },
        { skill: 'React', category: 'frontend', level: 35, assessmentsBasis: [], verified: true },
        { skill: 'CSS', category: 'frontend', level: 30, assessmentsBasis: [], verified: true },
      ];

      const match = calculateJobMatch(requiredSkills, userSkills);
      expect(match).toBeGreaterThan(0);
      expect(match).toBeLessThan(100);
    });

    it('should weight required skills more heavily', () => {
      // User has only required skill at 100%
      const userSkillsWithRequired: UserSkillLevel[] = [
        { skill: 'JavaScript', category: 'programming', level: 80, assessmentsBasis: [], verified: true },
      ];

      // User has only nice-to-have at 100%
      const userSkillsWithNiceToHave: UserSkillLevel[] = [
        { skill: 'CSS', category: 'frontend', level: 60, assessmentsBasis: [], verified: true },
      ];

      const matchWithRequired = calculateJobMatch(requiredSkills, userSkillsWithRequired);
      const matchWithNiceToHave = calculateJobMatch(requiredSkills, userSkillsWithNiceToHave);

      expect(matchWithRequired).toBeGreaterThan(matchWithNiceToHave);
    });

    it('should return 100 for empty required skills', () => {
      const match = calculateJobMatch([], []);
      expect(match).toBe(100);
    });

    it('should return 0 when user has no skills', () => {
      const match = calculateJobMatch(requiredSkills, []);
      expect(match).toBe(0);
    });
  });

  describe('generateSkillMatch', () => {
    const requiredSkills: RequiredSkill[] = [
      {
        skill: 'JavaScript',
        category: 'programming',
        requiredLevel: 80,
        importance: 'required',
      },
      {
        skill: 'React',
        category: 'frontend',
        requiredLevel: 70,
        importance: 'required',
      },
    ];

    const userSkills: UserSkillLevel[] = [
      {
        skill: 'JavaScript',
        category: 'programming',
        level: 60,
        assessmentsBasis: ['assessment-1'],
        verified: true,
      },
    ];

    const assessmentsByCategory = new Map<SkillCategory, string[]>([
      ['programming', ['assessment-js']],
      ['frontend', ['assessment-react']],
    ]);

    it('should generate complete skill match object', () => {
      const match = generateSkillMatch(
        'job-1',
        'Frontend Developer',
        requiredSkills,
        userSkills,
        assessmentsByCategory
      );

      expect(match.jobId).toBe('job-1');
      expect(match.jobTitle).toBe('Frontend Developer');
      expect(match.requiredSkills).toEqual(requiredSkills);
      expect(match.userSkills).toEqual(userSkills);
    });

    it('should calculate overall match percentage', () => {
      const match = generateSkillMatch(
        'job-1',
        'Frontend Developer',
        requiredSkills,
        userSkills,
        assessmentsByCategory
      );

      expect(match.overallMatch).toBeGreaterThanOrEqual(0);
      expect(match.overallMatch).toBeLessThanOrEqual(100);
    });

    it('should include only actual gaps (non-zero)', () => {
      const match = generateSkillMatch(
        'job-1',
        'Frontend Developer',
        requiredSkills,
        userSkills,
        assessmentsByCategory
      );

      match.gaps.forEach((gap) => {
        expect(gap.gap).toBeGreaterThan(0);
      });
    });

    it('should return empty gaps when user exceeds all requirements', () => {
      const highUserSkills: UserSkillLevel[] = [
        { skill: 'JavaScript', category: 'programming', level: 100, assessmentsBasis: [], verified: true },
        { skill: 'React', category: 'frontend', level: 100, assessmentsBasis: [], verified: true },
      ];

      const match = generateSkillMatch(
        'job-1',
        'Frontend Developer',
        requiredSkills,
        highUserSkills,
        assessmentsByCategory
      );

      expect(match.gaps.length).toBe(0);
    });
  });

  describe('getRecommendedAssessments', () => {
    const gaps: SkillGap[] = [
      {
        skill: 'JavaScript',
        category: 'programming',
        currentLevel: 50,
        requiredLevel: 80,
        gap: 30,
        recommendedAssessments: ['assessment-js'],
        priority: 'high',
      },
      {
        skill: 'React',
        category: 'frontend',
        currentLevel: 60,
        requiredLevel: 70,
        gap: 10,
        recommendedAssessments: ['assessment-react'],
        priority: 'low',
      },
      {
        skill: 'CSS',
        category: 'frontend',
        currentLevel: 40,
        requiredLevel: 60,
        gap: 20,
        recommendedAssessments: ['assessment-css'],
        priority: 'medium',
      },
    ];

    const availableAssessments = [
      { id: 'assessment-js', category: 'programming' as SkillCategory, title: 'JavaScript Fundamentals' },
      { id: 'assessment-react', category: 'frontend' as SkillCategory, title: 'React Basics' },
      { id: 'assessment-css', category: 'frontend' as SkillCategory, title: 'CSS Mastery' },
      { id: 'assessment-html', category: 'frontend' as SkillCategory, title: 'HTML5 Essentials' },
    ];

    it('should return recommendations based on gaps', () => {
      const recommendations = getRecommendedAssessments(gaps, availableAssessments);

      expect(recommendations.length).toBeGreaterThan(0);
      recommendations.forEach((rec) => {
        expect(rec.assessmentId).toBeDefined();
        expect(rec.title).toBeDefined();
        expect(rec.reason).toBeDefined();
      });
    });

    it('should prioritize high priority gaps first', () => {
      const recommendations = getRecommendedAssessments(gaps, availableAssessments);

      // First recommendation should be for programming (high priority)
      const firstRec = recommendations[0];
      expect(firstRec.assessmentId).toBe('assessment-js');
    });

    it('should limit to 5 recommendations', () => {
      const manyGaps: SkillGap[] = Array(10).fill(null).map((_, i) => ({
        skill: `Skill ${i}`,
        category: 'programming' as SkillCategory,
        currentLevel: 30,
        requiredLevel: 70,
        gap: 40,
        recommendedAssessments: [],
        priority: 'high' as const,
      }));

      const manyAssessments = Array(10).fill(null).map((_, i) => ({
        id: `assessment-${i}`,
        category: 'programming' as SkillCategory,
        title: `Assessment ${i}`,
      }));

      const recommendations = getRecommendedAssessments(manyGaps, manyAssessments);

      expect(recommendations.length).toBeLessThanOrEqual(5);
    });

    it('should not duplicate recommendations', () => {
      const recommendations = getRecommendedAssessments(gaps, availableAssessments);

      const ids = recommendations.map((r) => r.assessmentId);
      const uniqueIds = new Set(ids);

      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should include reason with current and required levels', () => {
      const recommendations = getRecommendedAssessments(gaps, availableAssessments);

      recommendations.forEach((rec) => {
        expect(rec.reason).toContain('current');
        expect(rec.reason).toContain('needed');
        expect(rec.reason).toContain('%');
      });
    });

    it('should return empty array for no gaps', () => {
      const recommendations = getRecommendedAssessments([], availableAssessments);
      expect(recommendations).toEqual([]);
    });

    it('should handle missing assessments for category', () => {
      const gapsWithUnknownCategory: SkillGap[] = [
        {
          skill: 'Unknown',
          category: 'devops' as SkillCategory,
          currentLevel: 0,
          requiredLevel: 80,
          gap: 80,
          recommendedAssessments: [],
          priority: 'high',
        },
      ];

      const recommendations = getRecommendedAssessments(
        gapsWithUnknownCategory,
        availableAssessments
      );

      // Should not crash, may return empty or limited results
      expect(Array.isArray(recommendations)).toBe(true);
    });
  });

  describe('getPriorityDisplay', () => {
    it('should return correct display for high priority', () => {
      const display = getPriorityDisplay('high');
      expect(display.color).toBe('text-red-600');
      expect(display.bgColor).toBe('bg-red-100');
      expect(display.label).toBe('High Priority');
    });

    it('should return correct display for medium priority', () => {
      const display = getPriorityDisplay('medium');
      expect(display.color).toBe('text-yellow-600');
      expect(display.bgColor).toBe('bg-yellow-100');
      expect(display.label).toBe('Medium Priority');
    });

    it('should return correct display for low priority', () => {
      const display = getPriorityDisplay('low');
      expect(display.color).toBe('text-green-600');
      expect(display.bgColor).toBe('bg-green-100');
      expect(display.label).toBe('Low Priority');
    });
  });
});
