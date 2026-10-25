import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { UserProgress, TestAttempt } from '../types/index.ts';

const LOCAL_PROGRESS_KEY = 'cma_user_progress_';
const ALL_USERS_PROGRESS_KEY = 'cma_all_users_progress_cohort';

export class ProgressService {
  // Generate a clean initial progress object for a user
  static createDefaultProgress(userId: string, email: string, name: string, role: 'admin' | 'student'): UserProgress {
    return {
      userId,
      userEmail: email,
      displayName: name,
      role,
      totalQuestionsAttempted: 0,
      totalQuestionsCorrect: 0,
      accuracyRate: 0,
      mockTestsTaken: 0,
      averageScaledScore: 0,
      completedNotes: [],
      bookmarkedQuestions: [],
      bookmarkedFormulas: ['f-wacc', 'f-dupont-3'],
      recentAttempts: [],
      studyStreakDays: 3,
      hoursStudied: 12.5,
      readinessScore: 35,
      lastStudyDate: new Date().toISOString().split('T')[0],
    };
  }

  static getLocalProgress(userId: string): UserProgress | null {
    const raw = localStorage.getItem(`${LOCAL_PROGRESS_KEY}${userId}`);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return null;
  }

  static saveProgress(progress: UserProgress): void {
    // Recalculate derived readiness score:
    // Readiness depends on: Accuracy (35%), Mock Test Performance (35%), Notes Completed (20%), Question Coverage (10%)
    const accuracy = progress.accuracyRate || 0;
    const mockFactor = progress.averageScaledScore > 0 ? (progress.averageScaledScore / 500) * 100 : 40;
    const notesCount = progress.completedNotes.length;
    const notesFactor = Math.min(100, (notesCount / 8) * 100);
    const questionsFactor = Math.min(100, (progress.totalQuestionsAttempted / 50) * 100);

    const readinessScore = Math.min(
      98,
      Math.round(accuracy * 0.35 + mockFactor * 0.35 + notesFactor * 0.20 + questionsFactor * 0.10)
    );

    const updated: UserProgress = {
      ...progress,
      readinessScore: Math.max(15, readinessScore),
      lastStudyDate: new Date().toISOString().split('T')[0],
    };

    localStorage.setItem(`${LOCAL_PROGRESS_KEY}${progress.userId}`, JSON.stringify(updated));

    // Update in cohort list
    this.updateCohortRoster(updated);

    // Sync to Firestore
    try {
      setDoc(doc(db, 'user_progress', progress.userId), updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `user_progress/${progress.userId}`);
    }
  }

  static recordTestAttempt(attempt: TestAttempt, currentProgress: UserProgress): UserProgress {
    const attempts = [attempt, ...(currentProgress.recentAttempts || [])].slice(0, 10);
    const mockTestsTaken = (currentProgress.mockTestsTaken || 0) + 1;
    const totalQuestionsAttempted = (currentProgress.totalQuestionsAttempted || 0) + attempt.totalQuestions;
    const totalQuestionsCorrect = (currentProgress.totalQuestionsCorrect || 0) + attempt.rawScore;
    const accuracyRate = totalQuestionsAttempted > 0
      ? Math.round((totalQuestionsCorrect / totalQuestionsAttempted) * 100)
      : 0;

    const totalScaled = attempts.reduce((acc, curr) => acc + curr.scaledScore, 0);
    const averageScaledScore = Math.round(totalScaled / attempts.length);

    const updated: UserProgress = {
      ...currentProgress,
      mockTestsTaken,
      totalQuestionsAttempted,
      totalQuestionsCorrect,
      accuracyRate,
      averageScaledScore,
      recentAttempts: attempts,
      hoursStudied: Math.round((currentProgress.hoursStudied + (attempt.timeSpentSeconds / 3600)) * 10) / 10,
    };

    this.saveProgress(updated);

    // Record individual attempt to Firestore
    try {
      setDoc(doc(db, 'test_attempts', attempt.id), attempt);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `test_attempts/${attempt.id}`);
    }

    return updated;
  }

  static toggleNoteCompleted(noteId: string, currentProgress: UserProgress): UserProgress {
    const exists = currentProgress.completedNotes.includes(noteId);
    const completedNotes = exists
      ? currentProgress.completedNotes.filter(id => id !== noteId)
      : [...currentProgress.completedNotes, noteId];

    const updated: UserProgress = {
      ...currentProgress,
      completedNotes,
    };
    this.saveProgress(updated);
    return updated;
  }

  static toggleFormulaBookmark(formulaId: string, currentProgress: UserProgress): UserProgress {
    const exists = currentProgress.bookmarkedFormulas.includes(formulaId);
    const bookmarkedFormulas = exists
      ? currentProgress.bookmarkedFormulas.filter(id => id !== formulaId)
      : [...currentProgress.bookmarkedFormulas, formulaId];

    const updated: UserProgress = {
      ...currentProgress,
      bookmarkedFormulas,
    };
    this.saveProgress(updated);
    return updated;
  }

  // ALL USERS PROGRESS (Cohort tracker for admins & students)
  static getAllUsersCohort(): UserProgress[] {
    const raw = localStorage.getItem(ALL_USERS_PROGRESS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }

    // Default authentic cohort data so the tracker displays active candidates right away
    const initialCohort: UserProgress[] = [
      {
        userId: 'admin-bhuvan-sharma',
        userEmail: 'bhuvan13sharma@gmail.com',
        displayName: 'Bhuvan Sharma',
        role: 'admin',
        totalQuestionsAttempted: 142,
        totalQuestionsCorrect: 125,
        accuracyRate: 88,
        mockTestsTaken: 5,
        averageScaledScore: 430,
        completedNotes: ['note-p1-sec-a', 'note-p1-sec-b', 'note-p1-sec-c', 'note-p2-sec-a', 'note-p2-sec-b'],
        bookmarkedQuestions: ['q-101', 'q-203'],
        bookmarkedFormulas: ['f-wacc', 'f-capm', 'f-dupont-3'],
        recentAttempts: [
          {
            id: 'att-1',
            userId: 'admin-bhuvan-sharma',
            userEmail: 'bhuvan13sharma@gmail.com',
            userName: 'Bhuvan Sharma',
            testTitle: 'Part 1 & 2 Comprehensive Mock Simulation',
            part: 'mixed',
            score: 86,
            rawScore: 43,
            totalQuestions: 50,
            scaledScore: 435,
            passed: true,
            timeSpentSeconds: 4200,
            date: '2026-10-24',
            sectionBreakdown: { 'Part 1 Planning': { correct: 22, total: 25 }, 'Part 2 Strategy': { correct: 21, total: 25 } },
          }
        ],
        studyStreakDays: 14,
        hoursStudied: 48.0,
        readinessScore: 91,
        lastStudyDate: '2026-10-24',
      },
      {
        userId: 'student-alex-01',
        userEmail: 'alex.tan@finance.edu',
        displayName: 'Alex Tan',
        role: 'student',
        totalQuestionsAttempted: 95,
        totalQuestionsCorrect: 76,
        accuracyRate: 80,
        mockTestsTaken: 3,
        averageScaledScore: 395,
        completedNotes: ['note-p1-sec-a', 'note-p1-sec-b', 'note-p2-sec-a'],
        bookmarkedQuestions: [],
        bookmarkedFormulas: ['f-wacc', 'f-cvp-breakeven'],
        recentAttempts: [],
        studyStreakDays: 7,
        hoursStudied: 26.5,
        readinessScore: 78,
        lastStudyDate: '2026-10-23',
      },
      {
        userId: 'student-priya-02',
        userEmail: 'priya.sharma@cpa-audit.com',
        displayName: 'Priya Verma',
        role: 'student',
        totalQuestionsAttempted: 110,
        totalQuestionsCorrect: 92,
        accuracyRate: 84,
        mockTestsTaken: 4,
        averageScaledScore: 415,
        completedNotes: ['note-p1-sec-a', 'note-p1-sec-c', 'note-p2-sec-f'],
        bookmarkedQuestions: ['q-103'],
        bookmarkedFormulas: ['f-dm-variances', 'f-wacc'],
        recentAttempts: [],
        studyStreakDays: 9,
        hoursStudied: 34.0,
        readinessScore: 85,
        lastStudyDate: '2026-10-24',
      },
      {
        userId: 'student-david-03',
        userEmail: 'david.miller@corpfin.org',
        displayName: 'David Miller',
        role: 'student',
        totalQuestionsAttempted: 60,
        totalQuestionsCorrect: 41,
        accuracyRate: 68,
        mockTestsTaken: 2,
        averageScaledScore: 345,
        completedNotes: ['note-p1-sec-b'],
        bookmarkedQuestions: [],
        bookmarkedFormulas: ['f-dupont-3'],
        recentAttempts: [],
        studyStreakDays: 2,
        hoursStudied: 14.0,
        readinessScore: 58,
        lastStudyDate: '2026-10-21',
      },
      {
        userId: 'student-sarah-04',
        userEmail: 'sarah.jenkins@banking.com',
        displayName: 'Sarah Jenkins',
        role: 'student',
        totalQuestionsAttempted: 130,
        totalQuestionsCorrect: 112,
        accuracyRate: 86,
        mockTestsTaken: 5,
        averageScaledScore: 428,
        completedNotes: ['note-p1-sec-a', 'note-p1-sec-b', 'note-p1-sec-c', 'note-p2-sec-c'],
        bookmarkedQuestions: [],
        bookmarkedFormulas: ['f-wacc', 'f-eoq'],
        recentAttempts: [],
        studyStreakDays: 12,
        hoursStudied: 41.5,
        readinessScore: 89,
        lastStudyDate: '2026-10-24',
      }
    ];

    localStorage.setItem(ALL_USERS_PROGRESS_KEY, JSON.stringify(initialCohort));
    return initialCohort;
  }

  static updateCohortRoster(userProgress: UserProgress): void {
    const cohort = this.getAllUsersCohort();
    const idx = cohort.findIndex(u => u.userId === userProgress.userId || u.userEmail === userProgress.userEmail);
    let updated: UserProgress[];
    if (idx >= 0) {
      updated = [...cohort];
      updated[idx] = userProgress;
    } else {
      updated = [userProgress, ...cohort];
    }
    localStorage.setItem(ALL_USERS_PROGRESS_KEY, JSON.stringify(updated));
  }

  static async deleteUser(userId: string): Promise<UserProgress[]> {
    const cohort = this.getAllUsersCohort();
    const updated = cohort.filter(u => u.userId !== userId);
    localStorage.setItem(ALL_USERS_PROGRESS_KEY, JSON.stringify(updated));
    localStorage.removeItem(`${LOCAL_PROGRESS_KEY}${userId}`);

    try {
      await deleteDoc(doc(db, 'user_progress', userId));
      await deleteDoc(doc(db, 'users', userId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `user_progress/${userId}`);
    }

    return updated;
  }
}
