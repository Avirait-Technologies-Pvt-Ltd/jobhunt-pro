import {
  calculateScore,
  calculatePercentage,
  checkPassed,
  calculateTotalPoints,
  isAnswerCorrect,
  calculateCategoryBreakdown,
  generateQuestionResults,
  generateAssessmentResult,
  getScoreColor,
  getScoreBgColor,
  getScoreLabel,
} from '@/lib/assessment-utils';
import {
  AssessmentQuestion,
  UserAnswer,
  SkillAssessment,
  AssessmentSession,
  AssessmentBadge,
} from '@/types/skill-assessment';

describe('Scoring Algorithm - Utility Functions', () => {
  // Sample questions for testing
  const sampleQuestions: AssessmentQuestion[] = [
    {
      id: 'q-1',
      question: 'What is 2 + 2?',
      type: 'multiple-choice',
      category: 'programming',
      difficulty: 'beginner',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1, // '4'
      explanation: 'Basic math',
      points: 10,
      timeLimit: 30,
      tags: ['math'],
    },
    {
      id: 'q-2',
      question: 'What is 3 * 3?',
      type: 'multiple-choice',
      category: 'programming',
      difficulty: 'beginner',
      options: ['6', '8', '9', '12'],
      correctAnswer: 2, // '9'
      explanation: 'Multiplication',
      points: 10,
      timeLimit: 30,
      tags: ['math'],
    },
    {
      id: 'q-3',
      question: 'What is a variable?',
      type: 'multiple-choice',
      category: 'programming',
      difficulty: 'intermediate',
      options: ['A container for data', 'A type of loop', 'A function', 'A class'],
      correctAnswer: 0,
      explanation: 'Variables store data',
      points: 20,
      timeLimit: 45,
      tags: ['programming'],
    },
    {
      id: 'q-4',
      question: 'React is a library.',
      type: 'true-false',
      category: 'frontend',
      difficulty: 'beginner',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'React is indeed a library',
      points: 10,
      timeLimit: 20,
      tags: ['react'],
    },
    {
      id: 'q-5',
      question: 'What does CSS stand for?',
      type: 'multiple-choice',
      category: 'frontend',
      difficulty: 'beginner',
      options: [
        'Computer Style Sheets',
        'Cascading Style Sheets',
        'Creative Style Sheets',
        'Colorful Style Sheets',
      ],
      correctAnswer: 1,
      explanation: 'CSS = Cascading Style Sheets',
      points: 10,
      timeLimit: 30,
      tags: ['css'],
    },
  ];

  describe('calculateScore', () => {
    it('should return 0 for empty answers', () => {
      const score = calculateScore(sampleQuestions, []);
      expect(score).toBe(0);
    });

    it('should calculate correct score for all correct answers', () => {
      const answers: UserAnswer[] = sampleQuestions.map((q) => ({
        questionId: q.id,
        selectedAnswer: q.correctAnswer,
        isCorrect: true,
        timeSpent: 10,
        answeredAt: new Date().toISOString(),
      }));

      const score = calculateScore(sampleQuestions, answers);
      const totalPoints = sampleQuestions.reduce((sum, q) => sum + q.points, 0);
      expect(score).toBe(totalPoints);
    });

    it('should calculate correct score for mixed answers', () => {
      const answers: UserAnswer[] = [
        {
          questionId: 'q-1',
          selectedAnswer: 1, // Correct
          isCorrect: true,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
        {
          questionId: 'q-2',
          selectedAnswer: 0, // Incorrect
          isCorrect: false,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
        {
          questionId: 'q-3',
          selectedAnswer: 0, // Correct
          isCorrect: true,
          timeSpent: 15,
          answeredAt: new Date().toISOString(),
        },
      ];

      const score = calculateScore(sampleQuestions, answers);
      expect(score).toBe(30); // 10 + 0 + 20
    });

    it('should return 0 for all incorrect answers', () => {
      const answers: UserAnswer[] = sampleQuestions.map((q) => ({
        questionId: q.id,
        selectedAnswer: (q.correctAnswer + 1) % q.options.length,
        isCorrect: false,
        timeSpent: 10,
        answeredAt: new Date().toISOString(),
      }));

      const score = calculateScore(sampleQuestions, answers);
      expect(score).toBe(0);
    });

    it('should ignore answers for unknown questions', () => {
      const answers: UserAnswer[] = [
        {
          questionId: 'unknown-q',
          selectedAnswer: 0,
          isCorrect: true,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
      ];

      const score = calculateScore(sampleQuestions, answers);
      expect(score).toBe(0);
    });
  });

  describe('calculatePercentage', () => {
    it('should return 0 for 0 total points', () => {
      const percentage = calculatePercentage(0, 0);
      expect(percentage).toBe(0);
    });

    it('should return 100 for perfect score', () => {
      const percentage = calculatePercentage(60, 60);
      expect(percentage).toBe(100);
    });

    it('should return correct percentage for partial score', () => {
      const percentage = calculatePercentage(30, 60);
      expect(percentage).toBe(50);
    });

    it('should round to nearest integer', () => {
      const percentage = calculatePercentage(33, 100);
      expect(percentage).toBe(33);
    });

    it('should handle decimal results', () => {
      const percentage = calculatePercentage(1, 3);
      expect(percentage).toBe(33);
    });
  });

  describe('checkPassed', () => {
    it('should return true when percentage equals passing score', () => {
      const passed = checkPassed(70, 70);
      expect(passed).toBe(true);
    });

    it('should return true when percentage exceeds passing score', () => {
      const passed = checkPassed(85, 70);
      expect(passed).toBe(true);
    });

    it('should return false when percentage is below passing score', () => {
      const passed = checkPassed(65, 70);
      expect(passed).toBe(false);
    });

    it('should handle edge case of 0', () => {
      const passed = checkPassed(0, 0);
      expect(passed).toBe(true);
    });

    it('should handle 100% passing requirement', () => {
      expect(checkPassed(100, 100)).toBe(true);
      expect(checkPassed(99, 100)).toBe(false);
    });
  });

  describe('calculateTotalPoints', () => {
    it('should return 0 for empty questions', () => {
      const total = calculateTotalPoints([]);
      expect(total).toBe(0);
    });

    it('should calculate correct total for questions', () => {
      const total = calculateTotalPoints(sampleQuestions);
      expect(total).toBe(60); // 10 + 10 + 20 + 10 + 10
    });

    it('should handle single question', () => {
      const total = calculateTotalPoints([sampleQuestions[0]]);
      expect(total).toBe(10);
    });
  });

  describe('isAnswerCorrect', () => {
    it('should return true for correct answer', () => {
      const result = isAnswerCorrect(sampleQuestions[0], 1);
      expect(result).toBe(true);
    });

    it('should return false for incorrect answer', () => {
      const result = isAnswerCorrect(sampleQuestions[0], 0);
      expect(result).toBe(false);
    });

    it('should return false for null answer', () => {
      const result = isAnswerCorrect(sampleQuestions[0], null);
      expect(result).toBe(false);
    });

    it('should handle true/false questions', () => {
      const trueFalseQ = sampleQuestions[3]; // React is a library
      expect(isAnswerCorrect(trueFalseQ, 0)).toBe(true); // True
      expect(isAnswerCorrect(trueFalseQ, 1)).toBe(false); // False
    });
  });

  describe('calculateCategoryBreakdown', () => {
    it('should return empty array for empty inputs', () => {
      const breakdown = calculateCategoryBreakdown([], []);
      expect(breakdown).toEqual([]);
    });

    it('should calculate breakdown by category', () => {
      const answers: UserAnswer[] = [
        {
          questionId: 'q-1',
          selectedAnswer: 1,
          isCorrect: true,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
        {
          questionId: 'q-2',
          selectedAnswer: 2,
          isCorrect: true,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
        {
          questionId: 'q-4',
          selectedAnswer: 0,
          isCorrect: true,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
        {
          questionId: 'q-5',
          selectedAnswer: 0,
          isCorrect: false,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
      ];

      const breakdown = calculateCategoryBreakdown(sampleQuestions, answers);

      // Programming: 2 correct out of 3
      const programmingBreakdown = breakdown.find((b) => b.category === 'programming');
      expect(programmingBreakdown?.correct).toBe(2);
      expect(programmingBreakdown?.total).toBe(3);

      // Frontend: 1 correct out of 2
      const frontendBreakdown = breakdown.find((b) => b.category === 'frontend');
      expect(frontendBreakdown?.correct).toBe(1);
      expect(frontendBreakdown?.total).toBe(2);
    });

    it('should calculate percentage for each category', () => {
      const answers: UserAnswer[] = [
        {
          questionId: 'q-1',
          selectedAnswer: 1,
          isCorrect: true,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
        {
          questionId: 'q-4',
          selectedAnswer: 1,
          isCorrect: false,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
        {
          questionId: 'q-5',
          selectedAnswer: 1,
          isCorrect: true,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
      ];

      const breakdown = calculateCategoryBreakdown(sampleQuestions, answers);

      const frontendBreakdown = breakdown.find((b) => b.category === 'frontend');
      expect(frontendBreakdown?.percentage).toBe(50); // 1 out of 2
    });
  });

  describe('generateQuestionResults', () => {
    it('should return empty array for empty questions', () => {
      const results = generateQuestionResults([], []);
      expect(results).toEqual([]);
    });

    it('should generate results for all questions', () => {
      const answers: UserAnswer[] = [
        {
          questionId: 'q-1',
          selectedAnswer: 1,
          isCorrect: true,
          timeSpent: 15,
          answeredAt: new Date().toISOString(),
        },
        {
          questionId: 'q-2',
          selectedAnswer: 0,
          isCorrect: false,
          timeSpent: 20,
          answeredAt: new Date().toISOString(),
        },
      ];

      const results = generateQuestionResults(sampleQuestions.slice(0, 2), answers);

      expect(results.length).toBe(2);
      expect(results[0].questionId).toBe('q-1');
      expect(results[0].isCorrect).toBe(true);
      expect(results[0].earnedPoints).toBe(10);
      expect(results[0].timeSpent).toBe(15);

      expect(results[1].questionId).toBe('q-2');
      expect(results[1].isCorrect).toBe(false);
      expect(results[1].earnedPoints).toBe(0);
      expect(results[1].timeSpent).toBe(20);
    });

    it('should include explanation for each question', () => {
      const answers: UserAnswer[] = [
        {
          questionId: 'q-1',
          selectedAnswer: 1,
          isCorrect: true,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        },
      ];

      const results = generateQuestionResults([sampleQuestions[0]], answers);

      expect(results[0].explanation).toBe('Basic math');
    });

    it('should handle unanswered questions', () => {
      const results = generateQuestionResults(sampleQuestions.slice(0, 1), []);

      expect(results[0].userAnswer).toBeNull();
      expect(results[0].isCorrect).toBe(false);
      expect(results[0].earnedPoints).toBe(0);
      expect(results[0].timeSpent).toBe(0);
    });
  });

  describe('generateAssessmentResult', () => {
    const sampleBadge: AssessmentBadge = {
      id: 'badge-1',
      name: 'Test Badge',
      icon: 'star',
      color: 'gold',
      description: 'Test badge description',
    };

    const sampleAssessment: SkillAssessment = {
      id: 'assessment-1',
      title: 'Test Assessment',
      description: 'A test assessment',
      category: 'programming',
      difficulty: 'beginner',
      questions: sampleQuestions,
      passingScore: 70,
      timeLimit: 300,
      totalPoints: 60,
      badge: sampleBadge,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };

    it('should generate complete result for completed session', () => {
      const session: AssessmentSession = {
        id: 'session-1',
        assessmentId: 'assessment-1',
        userId: 'user-1',
        status: 'completed',
        questions: sampleQuestions,
        currentQuestionIndex: 4,
        answers: sampleQuestions.map((q) => ({
          questionId: q.id,
          selectedAnswer: q.correctAnswer,
          isCorrect: true,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        })),
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        totalTimeSpent: 200,
        timeRemaining: 100,
      };

      const result = generateAssessmentResult(session, sampleAssessment);

      expect(result.id).toBeDefined();
      expect(result.sessionId).toBe('session-1');
      expect(result.assessmentId).toBe('assessment-1');
      expect(result.assessmentTitle).toBe('Test Assessment');
      expect(result.score).toBe(60);
      expect(result.totalPoints).toBe(60);
      expect(result.percentage).toBe(100);
      expect(result.passed).toBe(true);
      expect(result.correctAnswers).toBe(5);
      expect(result.totalQuestions).toBe(5);
      expect(result.badge).toEqual(sampleBadge);
    });

    it('should not include badge when assessment is not passed', () => {
      const session: AssessmentSession = {
        id: 'session-1',
        assessmentId: 'assessment-1',
        userId: 'user-1',
        status: 'completed',
        questions: sampleQuestions,
        currentQuestionIndex: 4,
        answers: sampleQuestions.map((q) => ({
          questionId: q.id,
          selectedAnswer: (q.correctAnswer + 1) % q.options.length,
          isCorrect: false,
          timeSpent: 10,
          answeredAt: new Date().toISOString(),
        })),
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        totalTimeSpent: 200,
        timeRemaining: 100,
      };

      const result = generateAssessmentResult(session, sampleAssessment);

      expect(result.passed).toBe(false);
      expect(result.badge).toBeUndefined();
    });

    it('should include category breakdown', () => {
      const session: AssessmentSession = {
        id: 'session-1',
        assessmentId: 'assessment-1',
        userId: 'user-1',
        status: 'completed',
        questions: sampleQuestions,
        currentQuestionIndex: 4,
        answers: [
          {
            questionId: 'q-1',
            selectedAnswer: 1,
            isCorrect: true,
            timeSpent: 10,
            answeredAt: new Date().toISOString(),
          },
        ],
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        totalTimeSpent: 200,
        timeRemaining: 100,
      };

      const result = generateAssessmentResult(session, sampleAssessment);

      expect(result.categoryBreakdown).toBeDefined();
      expect(Array.isArray(result.categoryBreakdown)).toBe(true);
    });

    it('should include question results', () => {
      const session: AssessmentSession = {
        id: 'session-1',
        assessmentId: 'assessment-1',
        userId: 'user-1',
        status: 'completed',
        questions: sampleQuestions,
        currentQuestionIndex: 4,
        answers: [
          {
            questionId: 'q-1',
            selectedAnswer: 1,
            isCorrect: true,
            timeSpent: 10,
            answeredAt: new Date().toISOString(),
          },
        ],
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        totalTimeSpent: 200,
        timeRemaining: 100,
      };

      const result = generateAssessmentResult(session, sampleAssessment);

      expect(result.questionResults).toBeDefined();
      expect(result.questionResults.length).toBe(5);
    });
  });

  describe('getScoreColor', () => {
    it('should return green-600 for 90+', () => {
      expect(getScoreColor(90)).toBe('text-green-600');
      expect(getScoreColor(100)).toBe('text-green-600');
    });

    it('should return green-500 for 80-89', () => {
      expect(getScoreColor(80)).toBe('text-green-500');
      expect(getScoreColor(89)).toBe('text-green-500');
    });

    it('should return yellow-600 for 70-79', () => {
      expect(getScoreColor(70)).toBe('text-yellow-600');
      expect(getScoreColor(79)).toBe('text-yellow-600');
    });

    it('should return yellow-500 for 60-69', () => {
      expect(getScoreColor(60)).toBe('text-yellow-500');
      expect(getScoreColor(69)).toBe('text-yellow-500');
    });

    it('should return orange-500 for 50-59', () => {
      expect(getScoreColor(50)).toBe('text-orange-500');
      expect(getScoreColor(59)).toBe('text-orange-500');
    });

    it('should return red-500 for below 50', () => {
      expect(getScoreColor(49)).toBe('text-red-500');
      expect(getScoreColor(0)).toBe('text-red-500');
    });
  });

  describe('getScoreBgColor', () => {
    it('should return appropriate background colors', () => {
      expect(getScoreBgColor(95)).toBe('bg-green-100');
      expect(getScoreBgColor(85)).toBe('bg-green-50');
      expect(getScoreBgColor(75)).toBe('bg-yellow-100');
      expect(getScoreBgColor(65)).toBe('bg-yellow-50');
      expect(getScoreBgColor(55)).toBe('bg-orange-100');
      expect(getScoreBgColor(45)).toBe('bg-red-100');
    });
  });

  describe('getScoreLabel', () => {
    it('should return correct labels', () => {
      expect(getScoreLabel(95)).toBe('Excellent');
      expect(getScoreLabel(85)).toBe('Very Good');
      expect(getScoreLabel(75)).toBe('Good');
      expect(getScoreLabel(65)).toBe('Satisfactory');
      expect(getScoreLabel(55)).toBe('Needs Improvement');
      expect(getScoreLabel(45)).toBe('Needs More Practice');
    });
  });
});
