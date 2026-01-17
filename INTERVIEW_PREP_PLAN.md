# Interview Preparation Hub - Implementation Plan

## Overview

This plan outlines the implementation of the **Interview Preparation Hub** feature for JobHunt Pro. The feature includes a question bank, mock interview practice, and performance analytics.

---

## Files to Create

### 1. TypeScript Types
**File:** `src/types/interview-prep.ts`

```typescript
// Question types
export interface InterviewQuestion {
  id: string;
  question: string;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  company?: string;
  tags: string[];
  sampleAnswer?: string;
  tips?: string[];
  followUps?: string[];
  timesAsked: number;
  createdAt: string;
}

export type QuestionCategory =
  | 'behavioral'
  | 'technical'
  | 'situational'
  | 'case-study'
  | 'system-design'
  | 'coding';

// Mock Interview types
export interface MockInterviewSession {
  id: string;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  answers: InterviewAnswer[];
  status: 'not-started' | 'in-progress' | 'paused' | 'completed';
  startedAt?: string;
  completedAt?: string;
  totalDuration: number;
  settings: MockInterviewSettings;
}

export interface InterviewAnswer {
  questionId: string;
  answer: string;
  duration: number;
  recordingUrl?: string;
  notes?: string;
  selfRating?: 1 | 2 | 3 | 4 | 5;
}

export interface MockInterviewSettings {
  questionCount: number;
  timePerQuestion: number;
  categories: QuestionCategory[];
  difficulty: ('easy' | 'medium' | 'hard')[];
  includeFollowUps: boolean;
}

// Analytics types
export interface InterviewPerformance {
  totalSessions: number;
  totalQuestionsPracticed: number;
  averageScore: number;
  categoryBreakdown: CategoryPerformance[];
  recentSessions: SessionSummary[];
  weeklyProgress: WeeklyProgress[];
  strengths: string[];
  areasToImprove: string[];
}

export interface CategoryPerformance {
  category: QuestionCategory;
  questionsPracticed: number;
  averageScore: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface SessionSummary {
  id: string;
  date: string;
  questionsAnswered: number;
  averageScore: number;
  duration: number;
}

export interface WeeklyProgress {
  week: string;
  sessionsCompleted: number;
  questionsAnswered: number;
  averageScore: number;
}

// Saved answer for answer bank
export interface SavedAnswer {
  id: string;
  questionId: string;
  question: string;
  answer: string;
  category: QuestionCategory;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}
```

---

### 2. Mock Data Files

**File:** `src/data/interview-questions.ts`
- 50+ interview questions across all categories
- Company-specific questions (Google, Amazon, Meta, etc.)
- Helper functions: `getQuestionById`, `getQuestionsByCategory`, `getQuestionsByCompany`, `filterQuestions`, `getRandomQuestions`

**File:** `src/data/interview-analytics.ts`
- Mock performance data
- Session history
- Weekly progress data
- Helper functions for analytics queries

---

### 3. Custom Hooks

**File:** `src/hooks/useMockInterview.ts`
```typescript
// Manages mock interview session state
// - startSession(settings)
// - pauseSession()
// - resumeSession()
// - nextQuestion()
// - previousQuestion()
// - submitAnswer(answer)
// - endSession()
// - Timer management
// - Recording state (if implemented)
```

**File:** `src/hooks/useInterviewAnalytics.ts`
```typescript
// Manages analytics data and calculations
// - getPerformanceData()
// - getCategoryBreakdown()
// - getWeeklyProgress()
// - calculateStrengths()
// - calculateAreasToImprove()
// - trackSessionCompletion(session)
```

---

### 4. Utility Functions

**File:** `src/lib/interview-utils.ts`
```typescript
// Utility functions:
// - formatDuration(seconds) - "5:30"
// - calculateScore(answers) - performance score
// - getSTARStructure(answer) - validate STAR method
// - shuffleQuestions(questions) - randomize order
// - filterByDifficulty(questions, levels)
// - generateStudyPlan(targetDate, weakAreas)
// - getCategoryLabel(category) - human-readable labels
// - getDifficultyColor(difficulty) - UI colors
```

---

### 5. Dashboard Pages

**File:** `src/app/dashboard/interview-prep/page.tsx`
Main hub with:
- Stats cards (Total Practice Sessions, Questions Answered, Average Score, Hours Practiced)
- Quick actions (Start Mock Interview, Browse Questions, View Analytics)
- Recent sessions list
- Recommended questions based on weak areas
- Tips section

**File:** `src/app/dashboard/interview-prep/questions/page.tsx`
Question bank with:
- Search and filter (category, difficulty, company)
- Question list with expandable answers
- Save to answer bank functionality
- Practice single question mode

**File:** `src/app/dashboard/interview-prep/mock-interview/page.tsx`
Mock interview interface with:
- Session setup (select categories, difficulty, question count)
- Interview player (question display, timer, controls)
- Answer input (text or future: recording)
- Progress indicator
- Session completion summary

**File:** `src/app/dashboard/interview-prep/analytics/page.tsx`
Performance analytics with:
- Overall performance metrics
- Category breakdown charts
- Weekly progress visualization
- Strengths and areas to improve
- Session history

**File:** `src/app/dashboard/interview-prep/answers/page.tsx`
Saved answers bank with:
- List of saved/favorite answers
- Edit and refine answers
- Organize by category
- Search functionality

---

### 6. Components

**File:** `src/components/interview-prep/QuestionCard.tsx`
- Displays question with category badge
- Expandable sample answer
- Difficulty indicator
- Company tag (if applicable)
- Save/Practice buttons

**File:** `src/components/interview-prep/QuestionFilters.tsx`
- Category multi-select
- Difficulty checkboxes
- Company dropdown
- Search input
- Reset filters button

**File:** `src/components/interview-prep/MockInterviewPlayer.tsx`
- Current question display
- Timer with visual indicator
- Navigation controls (prev/next)
- Pause/Resume button
- Progress bar

**File:** `src/components/interview-prep/AnswerInput.tsx`
- Textarea for typed answers
- Character/word count
- STAR method helper prompts
- Save answer button

**File:** `src/components/interview-prep/SessionSetup.tsx`
- Category selection
- Difficulty selection
- Question count slider
- Time per question setting
- Start button

**File:** `src/components/interview-prep/PerformanceChart.tsx`
- Bar chart for category scores
- Progress over time visualization

**File:** `src/components/interview-prep/SessionSummary.tsx`
- Session completion stats
- Question-by-question review
- Overall score
- Action buttons (Review, New Session)

---

### 7. Test Files (6 Required)

**Test 1:** `src/__tests__/components/interview-prep/question-bank.test.tsx`
- QuestionCard rendering
- QuestionFilters functionality
- Filter state management
- Search functionality
- Category/difficulty badges
- Save question action

**Test 2:** `src/__tests__/components/interview-prep/mock-interview.test.tsx`
- MockInterviewPlayer rendering
- SessionSetup form validation
- Timer functionality
- Navigation controls
- AnswerInput validation
- Session completion flow

**Test 3:** `src/__tests__/hooks/useMockInterview.test.ts`
- Session initialization
- Question navigation
- Answer submission
- Pause/resume functionality
- Timer management
- Session completion

**Test 4:** `src/__tests__/hooks/useInterviewAnalytics.test.ts`
- Performance calculation
- Category breakdown
- Weekly progress aggregation
- Strengths identification
- Areas to improve calculation

**Test 5:** `src/__tests__/lib/interview-utils.test.ts`
- formatDuration function
- calculateScore algorithm
- STAR structure validation
- shuffleQuestions randomization
- filterByDifficulty logic
- Study plan generation

**Test 6:** `src/__tests__/integration/interview-prep-flow.test.tsx`
- Complete mock interview workflow
- Question practice flow
- Analytics display integration
- Answer bank management
- Navigation between sections

---

## Implementation Order

### Phase 1: Foundation
1. Create TypeScript types (`src/types/interview-prep.ts`)
2. Create mock data (`src/data/interview-questions.ts`, `src/data/interview-analytics.ts`)
3. Create utility functions (`src/lib/interview-utils.ts`)
4. Write utility tests (`__tests__/lib/interview-utils.test.ts`)

### Phase 2: Core Hooks
5. Implement `useMockInterview` hook
6. Implement `useInterviewAnalytics` hook
7. Write hook tests (`__tests__/hooks/useMockInterview.test.ts`, `__tests__/hooks/useInterviewAnalytics.test.ts`)

### Phase 3: Components
8. Create QuestionCard and QuestionFilters components
9. Create MockInterviewPlayer, SessionSetup, AnswerInput components
10. Create PerformanceChart and SessionSummary components
11. Write component tests (`__tests__/components/interview-prep/question-bank.test.tsx`, `__tests__/components/interview-prep/mock-interview.test.tsx`)

### Phase 4: Pages
12. Create main hub page (`/dashboard/interview-prep`)
13. Create questions page (`/dashboard/interview-prep/questions`)
14. Create mock interview page (`/dashboard/interview-prep/mock-interview`)
15. Create analytics page (`/dashboard/interview-prep/analytics`)
16. Create answers bank page (`/dashboard/interview-prep/answers`)

### Phase 5: Integration
17. Add navigation link to dashboard sidebar
18. Write integration tests (`__tests__/integration/interview-prep-flow.test.tsx`)
19. Final testing and polish

---

## File Structure Summary

```
src/
├── app/dashboard/interview-prep/
│   ├── page.tsx                    # Main hub
│   ├── questions/page.tsx          # Question bank
│   ├── mock-interview/page.tsx     # Mock interview
│   ├── analytics/page.tsx          # Performance analytics
│   └── answers/page.tsx            # Saved answers
├── components/interview-prep/
│   ├── QuestionCard.tsx
│   ├── QuestionFilters.tsx
│   ├── MockInterviewPlayer.tsx
│   ├── SessionSetup.tsx
│   ├── AnswerInput.tsx
│   ├── PerformanceChart.tsx
│   └── SessionSummary.tsx
├── hooks/
│   ├── useMockInterview.ts
│   └── useInterviewAnalytics.ts
├── lib/
│   └── interview-utils.ts
├── data/
│   ├── interview-questions.ts
│   └── interview-analytics.ts
├── types/
│   └── interview-prep.ts
└── __tests__/
    ├── components/interview-prep/
    │   ├── question-bank.test.tsx
    │   └── mock-interview.test.tsx
    ├── hooks/
    │   ├── useMockInterview.test.ts
    │   └── useInterviewAnalytics.test.ts
    ├── lib/
    │   └── interview-utils.test.ts
    └── integration/
        └── interview-prep-flow.test.tsx
```

---

## Total New Files: 22

- **Types:** 1 file
- **Data:** 2 files
- **Hooks:** 2 files
- **Utilities:** 1 file
- **Components:** 7 files
- **Pages:** 5 files
- **Tests:** 6 files (as required)

---

## Dashboard Sidebar Update

Add to `src/app/dashboard/layout.tsx` sidebarLinks array:
```typescript
{ label: 'Interview Prep', href: '/dashboard/interview-prep', icon: GraduationCap },
```

---

## UI Consistency

All pages will follow the established dashboard pattern:
1. Header with title and description
2. Stats cards grid (4 columns on desktop)
3. Filters/search card
4. Main content area
5. Tips/help section

Using existing UI components:
- Card, Button, Badge, Input, Select, Tabs
- Dialog for modals
- Progress for timers and completion
- Sonner for toast notifications
