export type CmaPart = 'part1' | 'part2';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'student';
  createdAt: string;
  lastActiveAt: string;
}

export type ResourceType = 'note' | 'formula' | 'mcq' | 'mock_test';

export interface ResourceItem {
  id: string;
  type: ResourceType;
  part: CmaPart | 'general';
  topic: string;
  title: string;
  content: string; // Markdown or rich text
  authorEmail: string;
  updatedAt: string;
  createdAt: string;
  // Specific extra data for MCQs or formulas
  options?: string[];
  correctOption?: number; // 0-based
  explanation?: string;
  formulaEquation?: string;
  variables?: { name: string; label: string; defaultValue: number }[];
  calculateFnName?: string;
  difficulty?: 'Foundation' | 'Moderate' | 'Advanced' | 'Exam-Level';
  tags?: string[];
}

export interface StudyNote {
  id: string;
  part: CmaPart;
  sectionCode: string; // e.g. "Section A: External Financial Reporting Decisions"
  topic: string;
  title: string;
  summary: string;
  content: string;
  keyPoints: string[];
  imaExamTips: string[];
  readTimeMinutes: number;
  updatedAt: string;
  isCustom?: boolean;
  sourceType?: 'text' | 'pdf';
  pdfDataUrl?: string;
  pdfFileName?: string;
  pdfFileSize?: string;
}

export interface FormulaDefinition {
  id: string;
  part: CmaPart | 'general';
  category: 'Working Capital' | 'Cost & Variance' | 'Corporate Finance' | 'Performance & Ratios' | 'Decision Analysis';
  name: string;
  equation: string;
  explanation: string;
  unit: string;
  inputs: { key: string; label: string; placeholder: string; defaultVal: number }[];
  calculate: (inputs: Record<string, number>) => { result: number; stepByStep: string };
  isCustom?: boolean;
}

export interface MCQQuestion {
  id: string;
  part: CmaPart;
  sectionCode: string; // Section A, B, C, D, E, F
  topic: string;
  questionText: string;
  scenarioText?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Foundation' | 'Moderate' | 'Exam-Level';
  isCustom?: boolean;
}

export interface TestAttempt {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  testTitle: string;
  part: CmaPart | 'mixed';
  score: number; // percentage
  rawScore: number;
  totalQuestions: number;
  scaledScore: number; // 0 to 500, 360 is pass
  passed: boolean;
  timeSpentSeconds: number;
  date: string;
  sectionBreakdown: { [section: string]: { correct: number; total: number } };
}

export interface UserProgress {
  userId: string;
  userEmail: string;
  displayName: string;
  role: 'admin' | 'student';
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  accuracyRate: number;
  mockTestsTaken: number;
  averageScaledScore: number;
  completedNotes: string[];
  bookmarkedQuestions: string[];
  bookmarkedFormulas: string[];
  recentAttempts: TestAttempt[];
  studyStreakDays: number;
  hoursStudied: number;
  readinessScore: number; // 0 - 100%
  lastStudyDate: string;
}
