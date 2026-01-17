import {
  formatDuration,
  formatDurationLong,
  getCategoryLabel,
  getDifficultyConfig,
  getCategoryColor,
  calculateAverageScore,
  validateSTARStructure,
  shuffleArray,
  filterByDifficulty,
  filterByCategories,
  generateStudyPlan,
  getScoreColor,
  getScoreLabel,
  getTrendDisplay,
  countWords,
  isAnswerLengthValid,
  generateSessionId,
  generateAnswerId,
  formatRelativeDate,
  getEstimatedTime,
  calculateCompletionPercentage,
  getMotivationalMessage,
  validateSessionSettings,
} from '@/lib/interview-utils';
import { InterviewQuestion, InterviewAnswer } from '@/types/interview-prep';

describe('Interview Utils', () => {
  describe('formatDuration', () => {
    it('should format seconds to MM:SS', () => {
      expect(formatDuration(0)).toBe('0:00');
      expect(formatDuration(30)).toBe('0:30');
      expect(formatDuration(60)).toBe('1:00');
      expect(formatDuration(90)).toBe('1:30');
      expect(formatDuration(125)).toBe('2:05');
    });

    it('should format to HH:MM:SS for durations over an hour', () => {
      expect(formatDuration(3600)).toBe('1:00:00');
      expect(formatDuration(3661)).toBe('1:01:01');
      expect(formatDuration(7325)).toBe('2:02:05');
    });

    it('should handle negative values', () => {
      expect(formatDuration(-10)).toBe('0:00');
    });
  });

  describe('formatDurationLong', () => {
    it('should format seconds to human-readable string', () => {
      expect(formatDurationLong(30)).toBe('30 seconds');
      expect(formatDurationLong(1)).toBe('1 second');
      expect(formatDurationLong(60)).toBe('1 minute');
      expect(formatDurationLong(120)).toBe('2 minutes');
      expect(formatDurationLong(3600)).toBe('1 hour');
      expect(formatDurationLong(3660)).toBe('1 hour 1 min');
      expect(formatDurationLong(7200)).toBe('2 hours');
    });
  });

  describe('getCategoryLabel', () => {
    it('should return human-readable category labels', () => {
      expect(getCategoryLabel('behavioral')).toBe('Behavioral');
      expect(getCategoryLabel('technical')).toBe('Technical');
      expect(getCategoryLabel('situational')).toBe('Situational');
      expect(getCategoryLabel('system-design')).toBe('System Design');
      expect(getCategoryLabel('coding')).toBe('Coding');
      expect(getCategoryLabel('case-study')).toBe('Case Study');
    });
  });

  describe('getDifficultyConfig', () => {
    it('should return config for each difficulty level', () => {
      const easy = getDifficultyConfig('easy');
      expect(easy.label).toBe('Easy');
      expect(easy.color).toContain('green');

      const medium = getDifficultyConfig('medium');
      expect(medium.label).toBe('Medium');
      expect(medium.color).toContain('yellow');

      const hard = getDifficultyConfig('hard');
      expect(hard.label).toBe('Hard');
      expect(hard.color).toContain('red');
    });
  });

  describe('getCategoryColor', () => {
    it('should return color class for each category', () => {
      expect(getCategoryColor('behavioral')).toContain('blue');
      expect(getCategoryColor('technical')).toContain('purple');
      expect(getCategoryColor('situational')).toContain('orange');
    });
  });

  describe('calculateAverageScore', () => {
    it('should calculate average from answers with ratings', () => {
      const answers: InterviewAnswer[] = [
        { questionId: '1', answer: 'a', duration: 60, selfRating: 4, submittedAt: '' },
        { questionId: '2', answer: 'b', duration: 60, selfRating: 5, submittedAt: '' },
        { questionId: '3', answer: 'c', duration: 60, selfRating: 3, submittedAt: '' },
      ];

      expect(calculateAverageScore(answers)).toBe(4);
    });

    it('should return 0 for empty array', () => {
      expect(calculateAverageScore([])).toBe(0);
    });

    it('should ignore answers without ratings', () => {
      const answers: InterviewAnswer[] = [
        { questionId: '1', answer: 'a', duration: 60, selfRating: 4, submittedAt: '' },
        { questionId: '2', answer: 'b', duration: 60, submittedAt: '' },
      ];

      expect(calculateAverageScore(answers)).toBe(4);
    });
  });

  describe('validateSTARStructure', () => {
    it('should detect all STAR components in a complete answer', () => {
      const answer = `
        In my previous role (Situation), I was tasked with (Task) improving the onboarding process.
        I decided to (Action) create a new documentation system and training program.
        As a result (Result), onboarding time decreased by 50%.
      `;

      const result = validateSTARStructure(answer);

      expect(result.hasSituation).toBe(true);
      expect(result.hasTask).toBe(true);
      expect(result.hasAction).toBe(true);
      expect(result.hasResult).toBe(true);
      expect(result.score).toBe(4);
    });

    it('should detect missing STAR components', () => {
      const answer = 'I fixed a bug in the code.';

      const result = validateSTARStructure(answer);

      expect(result.score).toBeLessThan(4);
      expect(result.feedback.length).toBeGreaterThan(0);
    });

    it('should provide feedback for missing components', () => {
      const answer = 'I implemented a new feature.';

      const result = validateSTARStructure(answer);

      expect(result.feedback.some((f) => f.includes('situation'))).toBe(true);
    });
  });

  describe('shuffleArray', () => {
    it('should return array of same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);

      expect(shuffled.length).toBe(original.length);
    });

    it('should contain all original elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);

      original.forEach((item) => {
        expect(shuffled).toContain(item);
      });
    });

    it('should not modify original array', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      shuffleArray(original);

      expect(original).toEqual(originalCopy);
    });
  });

  describe('filterByDifficulty', () => {
    const questions: InterviewQuestion[] = [
      { id: '1', question: 'Q1', category: 'behavioral', difficulty: 'easy', tags: [], timesAsked: 0, createdAt: '' },
      { id: '2', question: 'Q2', category: 'behavioral', difficulty: 'medium', tags: [], timesAsked: 0, createdAt: '' },
      { id: '3', question: 'Q3', category: 'behavioral', difficulty: 'hard', tags: [], timesAsked: 0, createdAt: '' },
    ];

    it('should filter by single difficulty', () => {
      const result = filterByDifficulty(questions, ['easy']);
      expect(result.length).toBe(1);
      expect(result[0].difficulty).toBe('easy');
    });

    it('should filter by multiple difficulties', () => {
      const result = filterByDifficulty(questions, ['easy', 'hard']);
      expect(result.length).toBe(2);
    });

    it('should return all if no difficulties specified', () => {
      const result = filterByDifficulty(questions, []);
      expect(result.length).toBe(3);
    });
  });

  describe('filterByCategories', () => {
    const questions: InterviewQuestion[] = [
      { id: '1', question: 'Q1', category: 'behavioral', difficulty: 'easy', tags: [], timesAsked: 0, createdAt: '' },
      { id: '2', question: 'Q2', category: 'technical', difficulty: 'medium', tags: [], timesAsked: 0, createdAt: '' },
      { id: '3', question: 'Q3', category: 'situational', difficulty: 'hard', tags: [], timesAsked: 0, createdAt: '' },
    ];

    it('should filter by single category', () => {
      const result = filterByCategories(questions, ['behavioral']);
      expect(result.length).toBe(1);
      expect(result[0].category).toBe('behavioral');
    });

    it('should filter by multiple categories', () => {
      const result = filterByCategories(questions, ['behavioral', 'technical']);
      expect(result.length).toBe(2);
    });

    it('should return all if no categories specified', () => {
      const result = filterByCategories(questions, []);
      expect(result.length).toBe(3);
    });
  });

  describe('generateStudyPlan', () => {
    it('should generate a study plan', () => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 14);

      const plan = generateStudyPlan(targetDate, ['coding', 'system-design']);

      expect(plan.daysUntilTarget).toBeGreaterThan(0);
      expect(plan.totalQuestions).toBeGreaterThan(0);
      expect(plan.dailyPlan.length).toBeGreaterThan(0);
      expect(plan.recommendations.length).toBeGreaterThan(0);
    });

    it('should include coding-specific recommendation for coding weakness', () => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 14);

      const plan = generateStudyPlan(targetDate, ['coding']);

      expect(plan.recommendations.some((r) => r.includes('LeetCode'))).toBe(true);
    });
  });

  describe('getScoreColor', () => {
    it('should return green for high scores', () => {
      expect(getScoreColor(4.5)).toContain('green');
      expect(getScoreColor(5)).toContain('green');
    });

    it('should return yellow for medium scores', () => {
      expect(getScoreColor(3.5)).toContain('yellow');
    });

    it('should return red for low scores', () => {
      expect(getScoreColor(2)).toContain('red');
    });
  });

  describe('getScoreLabel', () => {
    it('should return appropriate labels for score ranges', () => {
      expect(getScoreLabel(5)).toBe('Excellent');
      expect(getScoreLabel(4.5)).toBe('Excellent');
      expect(getScoreLabel(4)).toBe('Very Good');
      expect(getScoreLabel(3.5)).toBe('Good');
      expect(getScoreLabel(3)).toBe('Satisfactory');
      expect(getScoreLabel(2.5)).toBe('Needs Work');
      expect(getScoreLabel(2)).toBe('Needs Improvement');
    });
  });

  describe('getTrendDisplay', () => {
    it('should return correct display for improving trend', () => {
      const display = getTrendDisplay('improving');
      expect(display.icon).toBe('↑');
      expect(display.color).toContain('green');
      expect(display.label).toBe('Improving');
    });

    it('should return correct display for stable trend', () => {
      const display = getTrendDisplay('stable');
      expect(display.icon).toBe('→');
      expect(display.color).toContain('yellow');
    });

    it('should return correct display for declining trend', () => {
      const display = getTrendDisplay('declining');
      expect(display.icon).toBe('↓');
      expect(display.color).toContain('red');
    });
  });

  describe('countWords', () => {
    it('should count words correctly', () => {
      expect(countWords('Hello world')).toBe(2);
      expect(countWords('One two three four five')).toBe(5);
      expect(countWords('')).toBe(0);
      expect(countWords('   ')).toBe(0);
      expect(countWords('Single')).toBe(1);
    });

    it('should handle multiple spaces', () => {
      expect(countWords('Hello    world')).toBe(2);
    });
  });

  describe('isAnswerLengthValid', () => {
    it('should return valid for answers meeting minimum', () => {
      const longAnswer = 'This is a test answer that contains many words to meet the minimum requirement for a valid answer submission in an interview practice session.';
      const result = isAnswerLengthValid(longAnswer, 10);

      expect(result.valid).toBe(true);
      expect(result.wordCount).toBeGreaterThan(10);
    });

    it('should return invalid for short answers', () => {
      const result = isAnswerLengthValid('Short answer', 50);

      expect(result.valid).toBe(false);
      expect(result.message).toContain('at least');
    });

    it('should warn about very long answers', () => {
      const veryLongAnswer = Array(350).fill('word').join(' ');
      const result = isAnswerLengthValid(veryLongAnswer, 50);

      expect(result.valid).toBe(true);
      expect(result.message).toContain('concise');
    });
  });

  describe('generateSessionId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateSessionId();
      const id2 = generateSessionId();

      expect(id1).not.toBe(id2);
    });

    it('should start with session-', () => {
      const id = generateSessionId();
      expect(id.startsWith('session-')).toBe(true);
    });
  });

  describe('generateAnswerId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateAnswerId();
      const id2 = generateAnswerId();

      expect(id1).not.toBe(id2);
    });

    it('should start with answer-', () => {
      const id = generateAnswerId();
      expect(id.startsWith('answer-')).toBe(true);
    });
  });

  describe('formatRelativeDate', () => {
    it('should return "Just now" for very recent dates', () => {
      const now = new Date().toISOString();
      expect(formatRelativeDate(now)).toBe('Just now');
    });

    it('should return "Yesterday" for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(formatRelativeDate(yesterday.toISOString())).toBe('Yesterday');
    });

    it('should return days ago for recent dates', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      expect(formatRelativeDate(threeDaysAgo.toISOString())).toBe('3 days ago');
    });
  });

  describe('getEstimatedTime', () => {
    it('should calculate estimated time correctly', () => {
      expect(getEstimatedTime(5, 180)).toBe('15 minutes');
      expect(getEstimatedTime(10, 180)).toBe('30 minutes');
      expect(getEstimatedTime(20, 180)).toBe('1 hour');
    });
  });

  describe('calculateCompletionPercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculateCompletionPercentage(5, 10)).toBe(50);
      expect(calculateCompletionPercentage(3, 10)).toBe(30);
      expect(calculateCompletionPercentage(10, 10)).toBe(100);
    });

    it('should handle zero total', () => {
      expect(calculateCompletionPercentage(0, 0)).toBe(0);
    });
  });

  describe('getMotivationalMessage', () => {
    it('should return encouraging message for high scores', () => {
      const message = getMotivationalMessage(4.5, 'improving');
      expect(message).toContain('Outstanding');
    });

    it('should return supportive message for lower scores', () => {
      const message = getMotivationalMessage(2.5, 'stable');
      expect(message).toContain('practice');
    });
  });

  describe('validateSessionSettings', () => {
    it('should validate valid settings', () => {
      const settings = {
        questionCount: 5,
        timePerQuestion: 180,
        categories: ['behavioral' as const],
        difficulties: ['medium' as const],
      };

      const result = validateSessionSettings(settings);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject invalid question count', () => {
      const settings = {
        questionCount: 0,
        timePerQuestion: 180,
        categories: ['behavioral' as const],
        difficulties: ['medium' as const],
      };

      const result = validateSessionSettings(settings);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('Question count'))).toBe(true);
    });

    it('should reject empty categories', () => {
      const settings = {
        questionCount: 5,
        timePerQuestion: 180,
        categories: [] as ('behavioral' | 'technical')[],
        difficulties: ['medium' as const],
      };

      const result = validateSessionSettings(settings);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('category'))).toBe(true);
    });

    it('should reject empty difficulties', () => {
      const settings = {
        questionCount: 5,
        timePerQuestion: 180,
        categories: ['behavioral' as const],
        difficulties: [] as ('easy' | 'medium' | 'hard')[],
      };

      const result = validateSessionSettings(settings);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('difficulty'))).toBe(true);
    });

    it('should reject invalid time per question', () => {
      const settings = {
        questionCount: 5,
        timePerQuestion: 10, // Too short
        categories: ['behavioral' as const],
        difficulties: ['medium' as const],
      };

      const result = validateSessionSettings(settings);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('Time per question'))).toBe(true);
    });
  });
});
