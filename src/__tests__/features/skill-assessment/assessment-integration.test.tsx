import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useSkillAssessment } from '@/hooks/useSkillAssessment';
import {
  skillAssessments,
  assessmentQuestions,
  getAllAssessments,
  getAssessmentById,
  filterAssessments,
  sortAssessments,
  getRandomQuestions,
  getAssessmentStats,
} from '@/data/skill-assessments';
import {
  generateAssessmentResult,
  calculateUserStats,
  generateSkillMatch,
  analyzeSkillGaps,
  calculateJobMatch,
} from '@/lib/assessment-utils';
import {
  AssessmentHistory,
  RequiredSkill,
  UserSkillLevel,
  SkillCategory,
} from '@/types/skill-assessment';

// Mock timers for tests
jest.useFakeTimers();

describe('Skill Assessment Integration Tests', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('Assessment Data Validation', () => {
    it('should have valid assessments with questions', () => {
      const assessments = getAllAssessments();

      expect(assessments.length).toBeGreaterThan(0);

      assessments.forEach((assessment) => {
        expect(assessment.questions.length).toBeGreaterThan(0);
        expect(assessment.passingScore).toBeGreaterThan(0);
        expect(assessment.passingScore).toBeLessThanOrEqual(100);
        expect(assessment.badge).toBeDefined();
      });
    });

    it('should have consistent question references', () => {
      const assessments = getAllAssessments();

      assessments.forEach((assessment) => {
        assessment.questions.forEach((question) => {
          // Question should have all required fields
          expect(question.id).toBeDefined();
          expect(question.question).toBeDefined();
          expect(question.options.length).toBeGreaterThanOrEqual(2);
          expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
          expect(question.correctAnswer).toBeLessThan(question.options.length);
        });
      });
    });

    it('should have assessments for multiple categories', () => {
      const stats = getAssessmentStats();

      expect(Object.keys(stats.byCategory).length).toBeGreaterThan(1);
    });

    it('should have assessments for multiple difficulty levels', () => {
      const stats = getAssessmentStats();

      expect(stats.byDifficulty.beginner).toBeGreaterThan(0);
      expect(stats.byDifficulty.intermediate).toBeGreaterThan(0);
    });
  });

  describe('Complete Assessment Session Flow', () => {
    it('should complete a full assessment from start to finish', () => {
      const { result } = renderHook(() => useSkillAssessment());

      // 1. Start the assessment
      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-integration-test');
      });

      expect(result.current.isSessionActive).toBe(true);
      expect(result.current.session).not.toBeNull();
      expect(result.current.currentQuestion).not.toBeNull();

      const totalQuestions = result.current.totalQuestions;
      expect(totalQuestions).toBeGreaterThan(0);

      // 2. Answer all questions
      for (let i = 0; i < totalQuestions; i++) {
        const currentQ = result.current.currentQuestion;
        expect(currentQ).not.toBeNull();

        // Select the correct answer
        act(() => {
          result.current.selectAnswer(currentQ!.correctAnswer);
        });

        expect(result.current.selectedAnswer).toBe(currentQ!.correctAnswer);

        // Submit the answer
        act(() => {
          result.current.submitAnswer();
        });

        // Move to next question if not the last one
        if (i < totalQuestions - 1) {
          act(() => {
            result.current.nextQuestion();
          });

          expect(result.current.currentQuestionIndex).toBe(i + 1);
        }
      }

      // 3. End the session
      let finalResult!: ReturnType<typeof result.current.endSession>;
      act(() => {
        finalResult = result.current.endSession();
      });

      // 4. Verify results
      expect(result.current.isSessionCompleted).toBe(true);
      expect(finalResult).not.toBeNull();
      expect(finalResult?.percentage).toBe(100); // All correct
      expect(finalResult?.passed).toBe(true);
      expect(finalResult?.badge).toBeDefined();
    });

    it('should handle partial completion with some wrong answers', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-test');
      });

      const totalQuestions = result.current.totalQuestions;

      // Answer half correctly, half incorrectly
      for (let i = 0; i < totalQuestions; i++) {
        const currentQ = result.current.currentQuestion;

        act(() => {
          // Alternate between correct and wrong answers
          const answer = i % 2 === 0
            ? currentQ!.correctAnswer
            : (currentQ!.correctAnswer + 1) % currentQ!.options.length;
          result.current.selectAnswer(answer);
          result.current.submitAnswer();
        });

        if (i < totalQuestions - 1) {
          act(() => {
            result.current.nextQuestion();
          });
        }
      }

      let finalResult!: ReturnType<typeof result.current.endSession>;
      act(() => {
        finalResult = result.current.endSession();
      });

      expect(finalResult).not.toBeNull();
      expect(finalResult?.percentage).toBeLessThan(100);
      expect(finalResult?.correctAnswers).toBeLessThan(totalQuestions);
    });
  });

  describe('Session Navigation', () => {
    it('should navigate through questions preserving answers', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-nav-test');
      });

      // Answer question 0
      const firstQuestionId = result.current.currentQuestion?.id;
      act(() => {
        result.current.selectAnswer(1);
        result.current.submitAnswer();
      });

      // Go to question 1
      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(1);

      // Answer question 1
      act(() => {
        result.current.selectAnswer(2);
        result.current.submitAnswer();
      });

      // Go back to question 0
      act(() => {
        result.current.previousQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(0);
      expect(result.current.currentQuestion?.id).toBe(firstQuestionId);
      // Previous answer should be loaded
      expect(result.current.selectedAnswer).toBe(1);

      // Go forward to question 1
      act(() => {
        result.current.nextQuestion();
      });

      expect(result.current.selectedAnswer).toBe(2);
    });

    it('should allow jumping to specific questions', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-jump-test');
      });

      const totalQuestions = result.current.totalQuestions;

      // Jump to last question
      act(() => {
        result.current.goToQuestion(totalQuestions - 1);
      });

      expect(result.current.currentQuestionIndex).toBe(totalQuestions - 1);

      // Jump back to first
      act(() => {
        result.current.goToQuestion(0);
      });

      expect(result.current.currentQuestionIndex).toBe(0);
    });
  });

  describe('Timer Integration', () => {
    it('should countdown timer during active session', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-timer-test');
      });

      const initialTime = result.current.timeRemaining;
      expect(initialTime).toBeGreaterThan(0);

      // Advance time
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(result.current.timeRemaining).toBe(initialTime - 10);
    });

    it('should pause timer and resume correctly', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-pause-test');
      });

      // Use some time
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      // Pause
      act(() => {
        result.current.pauseSession();
      });

      expect(result.current.isSessionPaused).toBe(true);
      expect(result.current.isTimerRunning).toBe(false);

      const pausedTime = result.current.timeRemaining;

      // Time should not decrease while paused
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(result.current.timeRemaining).toBe(pausedTime);

      // Resume
      act(() => {
        result.current.resumeSession();
      });

      expect(result.current.isSessionActive).toBe(true);
      expect(result.current.isTimerRunning).toBe(true);

      // Time should decrease again
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(result.current.timeRemaining).toBe(pausedTime - 5);
    });
  });

  describe('Filtering and Sorting Integration', () => {
    it('should filter assessments by category and display correctly', () => {
      const programmingAssessments = filterAssessments({ categories: ['programming'] });

      expect(programmingAssessments.length).toBeGreaterThan(0);
      programmingAssessments.forEach((a) => {
        expect(a.category).toBe('programming');
      });

      // All filtered assessments should be startable
      programmingAssessments.forEach((assessment) => {
        const { result } = renderHook(() => useSkillAssessment());

        act(() => {
          const success = result.current.startSession(assessment.id, 'user-filter-test');
          expect(success).toBe(true);
        });

        // Clean up
        act(() => {
          result.current.abandonSession();
        });
      });
    });

    it('should sort assessments and maintain data integrity', () => {
      const assessments = getAllAssessments();

      const sortedByTitle = sortAssessments(assessments, 'title-asc');
      const sortedByDifficulty = sortAssessments(assessments, 'difficulty-asc');

      // Sorting should not lose any assessments
      expect(sortedByTitle.length).toBe(assessments.length);
      expect(sortedByDifficulty.length).toBe(assessments.length);

      // All assessments should still be valid
      sortedByTitle.forEach((a) => {
        expect(a.questions.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Result Generation and Stats', () => {
    it('should generate complete results with category breakdown', () => {
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession('assessment-js-beginner', 'user-result-test');
      });

      // Answer all questions correctly
      const totalQuestions = result.current.totalQuestions;
      for (let i = 0; i < totalQuestions; i++) {
        act(() => {
          result.current.selectAnswer(result.current.currentQuestion!.correctAnswer);
          result.current.submitAnswer();
          if (i < totalQuestions - 1) {
            result.current.nextQuestion();
          }
        });
      }

      let assessmentResult!: ReturnType<typeof result.current.endSession>;
      act(() => {
        assessmentResult = result.current.endSession();
      });

      expect(assessmentResult).not.toBeNull();
      expect(assessmentResult?.categoryBreakdown).toBeDefined();
      expect(assessmentResult?.categoryBreakdown.length).toBeGreaterThan(0);
      expect(assessmentResult?.questionResults).toBeDefined();
      expect(assessmentResult?.questionResults.length).toBe(totalQuestions);

      // Verify each question result
      assessmentResult?.questionResults.forEach((qr) => {
        expect(qr.questionId).toBeDefined();
        expect(qr.explanation).toBeDefined();
      });
    });

    it('should calculate user stats from multiple results', () => {
      const sampleResults = [
        {
          id: 'result-1',
          sessionId: 'session-1',
          assessmentId: 'assessment-1',
          assessmentTitle: 'Test 1',
          userId: 'user-1',
          score: 80,
          totalPoints: 100,
          percentage: 80,
          passed: true,
          correctAnswers: 8,
          totalQuestions: 10,
          timeSpent: 200,
          completedAt: new Date().toISOString(),
          categoryBreakdown: [{ category: 'programming' as SkillCategory, correct: 8, total: 10, percentage: 80 }],
          questionResults: [],
        },
        {
          id: 'result-2',
          sessionId: 'session-2',
          assessmentId: 'assessment-2',
          assessmentTitle: 'Test 2',
          userId: 'user-1',
          score: 60,
          totalPoints: 100,
          percentage: 60,
          passed: false,
          correctAnswers: 6,
          totalQuestions: 10,
          timeSpent: 250,
          completedAt: new Date().toISOString(),
          categoryBreakdown: [{ category: 'frontend' as SkillCategory, correct: 6, total: 10, percentage: 60 }],
          questionResults: [],
        },
      ];

      const history: AssessmentHistory[] = [];
      const stats = calculateUserStats(sampleResults, history);

      expect(stats.totalAssessmentsCompleted).toBe(2);
      expect(stats.totalAssessmentsPassed).toBe(1);
      expect(stats.totalPointsEarned).toBe(140);
      expect(stats.averageScore).toBe(70);
      expect(stats.totalTimeSpent).toBe(450);
    });
  });

  describe('Skill Gap Analysis Integration', () => {
    it('should analyze skill gaps for a job requirement', () => {
      const requiredSkills: RequiredSkill[] = [
        { skill: 'JavaScript', category: 'programming', requiredLevel: 80, importance: 'required' },
        { skill: 'React', category: 'frontend', requiredLevel: 70, importance: 'required' },
        { skill: 'TypeScript', category: 'programming', requiredLevel: 60, importance: 'preferred' },
      ];

      const userSkills: UserSkillLevel[] = [
        { skill: 'JavaScript', category: 'programming', level: 65, assessmentsBasis: ['assessment-1'], verified: true },
        { skill: 'React', category: 'frontend', level: 75, assessmentsBasis: ['assessment-2'], verified: true },
      ];

      const assessmentsByCategory = new Map<SkillCategory, string[]>([
        ['programming', ['assessment-js-beginner', 'assessment-js-intermediate']],
        ['frontend', ['assessment-react-fundamentals']],
      ]);

      const skillMatch = generateSkillMatch(
        'job-frontend-dev',
        'Frontend Developer',
        requiredSkills,
        userSkills,
        assessmentsByCategory
      );

      expect(skillMatch.jobId).toBe('job-frontend-dev');
      expect(skillMatch.jobTitle).toBe('Frontend Developer');
      expect(skillMatch.overallMatch).toBeGreaterThan(0);
      expect(skillMatch.overallMatch).toBeLessThanOrEqual(100);

      // Should have gaps for JavaScript and TypeScript
      expect(skillMatch.gaps.length).toBeGreaterThan(0);

      // React should not be a gap since user level (75) exceeds required (70)
      const reactGap = skillMatch.gaps.find((g) => g.skill === 'React');
      expect(reactGap).toBeUndefined();
    });

    it('should calculate job match percentage correctly', () => {
      // Perfect match
      const perfectSkills: RequiredSkill[] = [
        { skill: 'JavaScript', category: 'programming', requiredLevel: 80, importance: 'required' },
      ];

      const perfectUserSkills: UserSkillLevel[] = [
        { skill: 'JavaScript', category: 'programming', level: 80, assessmentsBasis: [], verified: true },
      ];

      expect(calculateJobMatch(perfectSkills, perfectUserSkills)).toBe(100);

      // Exceeding requirements
      const exceedingUserSkills: UserSkillLevel[] = [
        { skill: 'JavaScript', category: 'programming', level: 100, assessmentsBasis: [], verified: true },
      ];

      expect(calculateJobMatch(perfectSkills, exceedingUserSkills)).toBe(100);

      // Partial match
      const partialUserSkills: UserSkillLevel[] = [
        { skill: 'JavaScript', category: 'programming', level: 40, assessmentsBasis: [], verified: true },
      ];

      expect(calculateJobMatch(perfectSkills, partialUserSkills)).toBe(50);
    });
  });

  describe('Random Question Selection', () => {
    it('should get random questions maintaining data integrity', () => {
      const randomQuestions = getRandomQuestions(5);

      expect(randomQuestions.length).toBe(5);

      randomQuestions.forEach((q) => {
        expect(q.id).toBeDefined();
        expect(q.question).toBeDefined();
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(q.correctAnswer).toBeLessThan(q.options.length);
      });

      // All questions should be unique
      const ids = randomQuestions.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should filter random questions by category', () => {
      const programmingQuestions = getRandomQuestions(3, 'programming');

      programmingQuestions.forEach((q) => {
        expect(q.category).toBe('programming');
      });
    });

    it('should filter random questions by difficulty', () => {
      const beginnerQuestions = getRandomQuestions(3, undefined, 'beginner');

      beginnerQuestions.forEach((q) => {
        expect(q.difficulty).toBe('beginner');
      });
    });
  });

  describe('End-to-End User Journey', () => {
    it('should simulate complete user assessment journey', () => {
      // 1. User browses available assessments
      const allAssessments = getAllAssessments();
      expect(allAssessments.length).toBeGreaterThan(0);

      // 2. User filters for beginner programming assessments
      const filteredAssessments = filterAssessments({
        categories: ['programming'],
        difficulties: ['beginner'],
      });
      expect(filteredAssessments.length).toBeGreaterThan(0);

      // 3. User selects an assessment
      const selectedAssessment = filteredAssessments[0];
      expect(selectedAssessment).toBeDefined();

      // 4. User starts the assessment
      const { result } = renderHook(() => useSkillAssessment());

      act(() => {
        result.current.startSession(selectedAssessment.id, 'journey-user');
      });

      expect(result.current.isSessionActive).toBe(true);

      // 5. User answers questions
      const totalQuestions = result.current.totalQuestions;
      for (let i = 0; i < totalQuestions; i++) {
        // Simulate thinking time
        act(() => {
          jest.advanceTimersByTime(5000);
        });

        // Select answer
        act(() => {
          result.current.selectAnswer(result.current.currentQuestion!.correctAnswer);
        });

        // Submit answer
        act(() => {
          result.current.submitAnswer();
        });

        // Move to next question if not last
        if (i < totalQuestions - 1) {
          act(() => {
            result.current.nextQuestion();
          });
        }
      }

      // 6. User completes the assessment
      let finalResult!: ReturnType<typeof result.current.endSession>;
      act(() => {
        finalResult = result.current.endSession();
      });

      expect(result.current.isSessionCompleted).toBe(true);
      expect(finalResult).not.toBeNull();

      // 7. User views results
      expect(finalResult?.score).toBeGreaterThan(0);
      expect(finalResult?.percentage).toBe(100);
      expect(finalResult?.passed).toBe(true);
      expect(finalResult?.badge).toBeDefined();
      expect(finalResult?.categoryBreakdown.length).toBeGreaterThan(0);
      expect(finalResult?.questionResults.length).toBe(totalQuestions);

      // 8. Verify badge earned
      expect(finalResult?.badge?.name).toBeDefined();
      expect(finalResult?.badge?.icon).toBeDefined();
    });
  });
});
