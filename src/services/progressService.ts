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

  // ALL USERS PROGRESS (Cohort tracker for admins)
  static getAllUsersCohort(): UserProgress[] {
    const raw = localStorage.getItem(ALL_USERS_PROGRESS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // fallback
      }
    }
    return [];
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
