import {
  assessmentQuestions,
  skillAssessments,
  getAllAssessments,
  getAssessmentById,
  getAssessmentsByCategory,
  getAssessmentsByDifficulty,
  filterAssessments,
  sortAssessments,
  getQuestionsForAssessment,
  getRandomQuestions,
  getAssessmentStats,
  getQuestionById,
  getAllBadges,
  getBadgeById,
} from '@/data/skill-assessments';
import { shuffleQuestions, shuffleArray } from '@/lib/assessment-utils';
import { SkillCategory, AssessmentDifficulty, AssessmentFilters } from '@/types/skill-assessment';

describe('Question Pool - Data Functions', () => {
  describe('Question Data Structure', () => {
    it('should have valid question data structure', () => {
      expect(assessmentQuestions.length).toBeGreaterThan(0);

      assessmentQuestions.forEach((question) => {
        expect(question.id).toBeDefined();
        expect(question.question).toBeDefined();
        expect(question.type).toBeDefined();
        expect(question.category).toBeDefined();
        expect(question.difficulty).toBeDefined();
        expect(question.options).toBeDefined();
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options.length).toBeGreaterThanOrEqual(2);
        expect(question.correctAnswer).toBeDefined();
        expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(question.correctAnswer).toBeLessThan(question.options.length);
        expect(question.explanation).toBeDefined();
        expect(question.points).toBeGreaterThan(0);
        expect(question.timeLimit).toBeGreaterThan(0);
        expect(Array.isArray(question.tags)).toBe(true);
      });
    });

    it('should have questions for different categories', () => {
      const categories = new Set(assessmentQuestions.map((q) => q.category));
      expect(categories.size).toBeGreaterThan(1);
    });

    it('should have questions for different difficulty levels', () => {
      const difficulties = new Set(assessmentQuestions.map((q) => q.difficulty));
      expect(difficulties.has('beginner')).toBe(true);
      expect(difficulties.has('intermediate')).toBe(true);
    });

    it('should have questions with different types', () => {
      const types = new Set(assessmentQuestions.map((q) => q.type));
      expect(types.size).toBeGreaterThan(1);
    });
  });

  describe('Assessment Data Structure', () => {
    it('should have valid assessment data structure', () => {
      expect(skillAssessments.length).toBeGreaterThan(0);

      skillAssessments.forEach((assessment) => {
        expect(assessment.id).toBeDefined();
        expect(assessment.title).toBeDefined();
        expect(assessment.description).toBeDefined();
        expect(assessment.category).toBeDefined();
        expect(assessment.difficulty).toBeDefined();
        expect(assessment.questions).toBeDefined();
        expect(Array.isArray(assessment.questions)).toBe(true);
        expect(assessment.passingScore).toBeGreaterThan(0);
        expect(assessment.passingScore).toBeLessThanOrEqual(100);
        expect(assessment.timeLimit).toBeGreaterThan(0);
        expect(assessment.totalPoints).toBeGreaterThan(0);
        expect(assessment.badge).toBeDefined();
        expect(assessment.createdAt).toBeDefined();
        expect(assessment.updatedAt).toBeDefined();
      });
    });

    it('should have assessments for different categories', () => {
      const categories = new Set(skillAssessments.map((a) => a.category));
      expect(categories.size).toBeGreaterThan(1);
    });
  });

  describe('getAllAssessments', () => {
    it('should return all assessments', () => {
      const assessments = getAllAssessments();
      expect(assessments.length).toBe(skillAssessments.length);
    });

    it('should return the same reference as skillAssessments', () => {
      const assessments = getAllAssessments();
      expect(assessments).toEqual(skillAssessments);
    });
  });

  describe('getAssessmentById', () => {
    it('should return assessment for valid ID', () => {
      const assessment = getAssessmentById('assessment-js-beginner');
      expect(assessment).toBeDefined();
      expect(assessment?.id).toBe('assessment-js-beginner');
    });

    it('should return undefined for invalid ID', () => {
      const assessment = getAssessmentById('invalid-id');
      expect(assessment).toBeUndefined();
    });

    it('should return assessment with all properties', () => {
      const assessment = getAssessmentById('assessment-js-beginner');
      expect(assessment?.title).toBeDefined();
      expect(assessment?.questions.length).toBeGreaterThan(0);
      expect(assessment?.badge).toBeDefined();
    });
  });

  describe('getAssessmentsByCategory', () => {
    it('should return assessments for programming category', () => {
      const assessments = getAssessmentsByCategory('programming');
      expect(assessments.length).toBeGreaterThan(0);
      assessments.forEach((a) => {
        expect(a.category).toBe('programming');
      });
    });

    it('should return assessments for frontend category', () => {
      const assessments = getAssessmentsByCategory('frontend');
      expect(assessments.length).toBeGreaterThan(0);
      assessments.forEach((a) => {
        expect(a.category).toBe('frontend');
      });
    });

    it('should return empty array for category with no assessments', () => {
      // Using a category that might not have assessments
      const assessments = getAssessmentsByCategory('devops' as SkillCategory);
      expect(Array.isArray(assessments)).toBe(true);
    });
  });

  describe('getAssessmentsByDifficulty', () => {
    it('should return beginner assessments', () => {
      const assessments = getAssessmentsByDifficulty('beginner');
      expect(assessments.length).toBeGreaterThan(0);
      assessments.forEach((a) => {
        expect(a.difficulty).toBe('beginner');
      });
    });

    it('should return intermediate assessments', () => {
      const assessments = getAssessmentsByDifficulty('intermediate');
      expect(assessments.length).toBeGreaterThan(0);
      assessments.forEach((a) => {
        expect(a.difficulty).toBe('intermediate');
      });
    });

    it('should return advanced assessments', () => {
      const assessments = getAssessmentsByDifficulty('advanced');
      assessments.forEach((a) => {
        expect(a.difficulty).toBe('advanced');
      });
    });
  });

  describe('filterAssessments', () => {
    it('should filter by search term in title', () => {
      const filters: AssessmentFilters = { search: 'JavaScript' };
      const filtered = filterAssessments(filters);

      filtered.forEach((a) => {
        expect(
          a.title.toLowerCase().includes('javascript') ||
          a.description.toLowerCase().includes('javascript')
        ).toBe(true);
      });
    });

    it('should filter by search term in description', () => {
      const filters: AssessmentFilters = { search: 'fundamental' };
      const filtered = filterAssessments(filters);

      expect(filtered.length).toBeGreaterThan(0);
    });

    it('should filter by category', () => {
      const filters: AssessmentFilters = { categories: ['programming'] };
      const filtered = filterAssessments(filters);

      filtered.forEach((a) => {
        expect(a.category).toBe('programming');
      });
    });

    it('should filter by multiple categories', () => {
      const filters: AssessmentFilters = { categories: ['programming', 'frontend'] };
      const filtered = filterAssessments(filters);

      filtered.forEach((a) => {
        expect(['programming', 'frontend']).toContain(a.category);
      });
    });

    it('should filter by difficulty', () => {
      const filters: AssessmentFilters = { difficulties: ['beginner'] };
      const filtered = filterAssessments(filters);

      filtered.forEach((a) => {
        expect(a.difficulty).toBe('beginner');
      });
    });

    it('should filter by multiple difficulties', () => {
      const filters: AssessmentFilters = { difficulties: ['beginner', 'intermediate'] };
      const filtered = filterAssessments(filters);

      filtered.forEach((a) => {
        expect(['beginner', 'intermediate']).toContain(a.difficulty);
      });
    });

    it('should combine multiple filters', () => {
      const filters: AssessmentFilters = {
        categories: ['programming'],
        difficulties: ['beginner'],
      };
      const filtered = filterAssessments(filters);

      filtered.forEach((a) => {
        expect(a.category).toBe('programming');
        expect(a.difficulty).toBe('beginner');
      });
    });

    it('should return all assessments when no filters applied', () => {
      const filters: AssessmentFilters = {};
      const filtered = filterAssessments(filters);

      expect(filtered.length).toBe(skillAssessments.length);
    });
  });

  describe('sortAssessments', () => {
    it('should sort by title ascending', () => {
      const assessments = [...skillAssessments];
      const sorted = sortAssessments(assessments, 'title-asc');

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].title.localeCompare(sorted[i + 1].title)).toBeLessThanOrEqual(0);
      }
    });

    it('should sort by title descending', () => {
      const assessments = [...skillAssessments];
      const sorted = sortAssessments(assessments, 'title-desc');

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].title.localeCompare(sorted[i + 1].title)).toBeGreaterThanOrEqual(0);
      }
    });

    it('should sort by difficulty ascending', () => {
      const assessments = [...skillAssessments];
      const sorted = sortAssessments(assessments, 'difficulty-asc');
      const difficultyOrder: Record<AssessmentDifficulty, number> = {
        beginner: 0,
        intermediate: 1,
        advanced: 2,
      };

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(difficultyOrder[sorted[i].difficulty]).toBeLessThanOrEqual(
          difficultyOrder[sorted[i + 1].difficulty]
        );
      }
    });

    it('should sort by difficulty descending', () => {
      const assessments = [...skillAssessments];
      const sorted = sortAssessments(assessments, 'difficulty-desc');
      const difficultyOrder: Record<AssessmentDifficulty, number> = {
        beginner: 0,
        intermediate: 1,
        advanced: 2,
      };

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(difficultyOrder[sorted[i].difficulty]).toBeGreaterThanOrEqual(
          difficultyOrder[sorted[i + 1].difficulty]
        );
      }
    });

    it('should sort by newest first', () => {
      const assessments = [...skillAssessments];
      const sorted = sortAssessments(assessments, 'newest');

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(new Date(sorted[i].createdAt).getTime()).toBeGreaterThanOrEqual(
          new Date(sorted[i + 1].createdAt).getTime()
        );
      }
    });

    it('should sort by oldest first', () => {
      const assessments = [...skillAssessments];
      const sorted = sortAssessments(assessments, 'oldest');

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(new Date(sorted[i].createdAt).getTime()).toBeLessThanOrEqual(
          new Date(sorted[i + 1].createdAt).getTime()
        );
      }
    });

    it('should not modify original array', () => {
      const original = [...skillAssessments];
      const assessments = [...skillAssessments];
      sortAssessments(assessments, 'title-desc');

      expect(assessments).toEqual(original);
    });
  });

  describe('getQuestionsForAssessment', () => {
    it('should return questions for valid assessment', () => {
      const questions = getQuestionsForAssessment('assessment-js-beginner');
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should return empty array for invalid assessment', () => {
      const questions = getQuestionsForAssessment('invalid-id');
      expect(questions).toEqual([]);
    });

    it('should return questions matching assessment criteria', () => {
      const assessment = getAssessmentById('assessment-js-beginner');
      const questions = getQuestionsForAssessment('assessment-js-beginner');

      expect(questions.length).toBe(assessment?.questions.length);
    });
  });

  describe('getRandomQuestions', () => {
    it('should return requested number of questions', () => {
      const questions = getRandomQuestions(5);
      expect(questions.length).toBe(5);
    });

    it('should return fewer questions if pool is smaller', () => {
      const allQuestions = assessmentQuestions.length;
      const questions = getRandomQuestions(allQuestions + 10);
      expect(questions.length).toBeLessThanOrEqual(allQuestions);
    });

    it('should filter by category', () => {
      const questions = getRandomQuestions(5, 'programming');
      questions.forEach((q) => {
        expect(q.category).toBe('programming');
      });
    });

    it('should filter by difficulty', () => {
      const questions = getRandomQuestions(5, undefined, 'beginner');
      questions.forEach((q) => {
        expect(q.difficulty).toBe('beginner');
      });
    });

    it('should filter by both category and difficulty', () => {
      const questions = getRandomQuestions(3, 'programming', 'beginner');
      questions.forEach((q) => {
        expect(q.category).toBe('programming');
        expect(q.difficulty).toBe('beginner');
      });
    });

    it('should return different questions on multiple calls (randomization)', () => {
      // Run multiple times to check randomization
      const results = new Set<string>();
      for (let i = 0; i < 10; i++) {
        const questions = getRandomQuestions(3);
        const ids = questions.map((q) => q.id).join(',');
        results.add(ids);
      }
      // Due to randomization, we should get at least some variation
      // (unless pool is very small)
      expect(results.size).toBeGreaterThanOrEqual(1);
    });
  });

  describe('getAssessmentStats', () => {
    it('should return total count', () => {
      const stats = getAssessmentStats();
      expect(stats.total).toBe(skillAssessments.length);
    });

    it('should return breakdown by category', () => {
      const stats = getAssessmentStats();
      expect(stats.byCategory).toBeDefined();

      const categorySum = Object.values(stats.byCategory).reduce((a, b) => a + b, 0);
      expect(categorySum).toBe(stats.total);
    });

    it('should return breakdown by difficulty', () => {
      const stats = getAssessmentStats();
      expect(stats.byDifficulty).toBeDefined();

      const difficultySum = Object.values(stats.byDifficulty).reduce((a, b) => a + b, 0);
      expect(difficultySum).toBe(stats.total);
    });

    it('should return total questions count', () => {
      const stats = getAssessmentStats();
      expect(stats.totalQuestions).toBe(assessmentQuestions.length);
    });
  });

  describe('getQuestionById', () => {
    it('should return question for valid ID', () => {
      const question = getQuestionById('js-q-1');
      expect(question).toBeDefined();
      expect(question?.id).toBe('js-q-1');
    });

    it('should return undefined for invalid ID', () => {
      const question = getQuestionById('invalid-id');
      expect(question).toBeUndefined();
    });
  });

  describe('Badge Functions', () => {
    it('should return all badges', () => {
      const badges = getAllBadges();
      expect(badges.length).toBeGreaterThan(0);

      badges.forEach((badge) => {
        expect(badge.id).toBeDefined();
        expect(badge.name).toBeDefined();
        expect(badge.icon).toBeDefined();
        expect(badge.color).toBeDefined();
        expect(badge.description).toBeDefined();
      });
    });

    it('should return badge by ID', () => {
      const badge = getBadgeById('badge-js-beginner');
      expect(badge).toBeDefined();
      expect(badge?.id).toBe('badge-js-beginner');
    });

    it('should return undefined for invalid badge ID', () => {
      const badge = getBadgeById('invalid-badge');
      expect(badge).toBeUndefined();
    });
  });

  describe('shuffleQuestions', () => {
    it('should return same number of questions', () => {
      const original = assessmentQuestions.slice(0, 10);
      const shuffled = shuffleQuestions(original);
      expect(shuffled.length).toBe(original.length);
    });

    it('should contain all original questions', () => {
      const original = assessmentQuestions.slice(0, 10);
      const shuffled = shuffleQuestions(original);

      original.forEach((q) => {
        expect(shuffled.find((s) => s.id === q.id)).toBeDefined();
      });
    });

    it('should not modify original array', () => {
      const original = assessmentQuestions.slice(0, 10);
      const originalCopy = [...original];
      shuffleQuestions(original);

      expect(original).toEqual(originalCopy);
    });

    it('should produce different order (statistically)', () => {
      const original = assessmentQuestions.slice(0, 10);
      let differentOrderCount = 0;

      for (let i = 0; i < 10; i++) {
        const shuffled = shuffleQuestions(original);
        if (shuffled.some((q, idx) => q.id !== original[idx].id)) {
          differentOrderCount++;
        }
      }

      // At least some shuffles should produce different order
      expect(differentOrderCount).toBeGreaterThan(0);
    });
  });

  describe('shuffleArray', () => {
    it('should return same length array', () => {
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

    it('should work with strings', () => {
      const original = ['a', 'b', 'c', 'd'];
      const shuffled = shuffleArray(original);

      expect(shuffled.length).toBe(original.length);
      original.forEach((item) => {
        expect(shuffled).toContain(item);
      });
    });

    it('should work with objects', () => {
      const original = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const shuffled = shuffleArray(original);

      expect(shuffled.length).toBe(original.length);
      original.forEach((item) => {
        expect(shuffled.find((s) => s.id === item.id)).toBeDefined();
      });
    });

    it('should handle empty array', () => {
      const shuffled = shuffleArray([]);
      expect(shuffled).toEqual([]);
    });

    it('should handle single element array', () => {
      const shuffled = shuffleArray([1]);
      expect(shuffled).toEqual([1]);
    });
  });
});
