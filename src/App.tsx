import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { Header } from './components/Header.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { StudyNotes } from './components/StudyNotes.tsx';
import { ExamSimulator } from './components/ExamSimulator.tsx';
import { FormulaSheet } from './components/FormulaSheet.tsx';
import { AdminResourceManager } from './components/AdminResourceManager.tsx';
import { PrometricCalculator } from './components/PrometricCalculator.tsx';
import { LoginGate } from './components/LoginGate.tsx';
import { ResourceService } from './services/resourceService.ts';
import { ProgressService } from './services/progressService.ts';
import { StudyNote, FormulaDefinition, MCQQuestion, UserProgress, TestAttempt } from './types/index.ts';

const MainApp: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [notesFilter, setNotesFilter] = useState<string>('all');
  const [examPart, setExamPart] = useState<'part1' | 'part2' | 'mixed'>('mixed');
  const [examMode, setExamMode] = useState<'full' | 'sprint'>('sprint');

  // Resource datasets
  const [notes, setNotes] = useState<StudyNote[]>(() => ResourceService.getNotes());
  const [questions, setQuestions] = useState<MCQQuestion[]>(() => ResourceService.getQuestions());
  const [formulas, setFormulas] = useState<FormulaDefinition[]>(() => ResourceService.getFormulas());

  // Editing pointers for admin
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [editingFormula, setEditingFormula] = useState<FormulaDefinition | null>(null);

  // Prometric Calculator Modal
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  // User Progress state
  const [progress, setProgress] = useState<UserProgress>(() => {
    const uid = user?.uid || 'guest-initial';
    const existing = ProgressService.getLocalProgress(uid);
    if (existing) return existing;
    return ProgressService.createDefaultProgress(
      uid,
      user?.email || 'candidate@cma.org',
      user?.displayName || 'CMA Candidate',
      user?.role || 'student'
    );
  });

  // Re-sync progress when user changes
  useEffect(() => {
    if (user) {
      const existing = ProgressService.getLocalProgress(user.uid);
      if (existing) {
        setProgress(existing);
      } else {
        const fresh = ProgressService.createDefaultProgress(
          user.uid,
          user.email,
          user.displayName,
          user.role
        );
        ProgressService.saveProgress(fresh);
        setProgress(fresh);
      }
    }
  }, [user]);

  // Handlers
  const handleToggleNoteCompleted = (noteId: string) => {
    const updated = ProgressService.toggleNoteCompleted(noteId, progress);
    setProgress(updated);
  };

  const handleToggleFormulaBookmark = (formulaId: string) => {
    const updated = ProgressService.toggleFormulaBookmark(formulaId, progress);
    setProgress(updated);
  };

  const handleRecordAttempt = (attempt: TestAttempt) => {
    const updated = ProgressService.recordTestAttempt(attempt, progress);
    setProgress(updated);
  };

  const handleStartExam = (part: 'part1' | 'part2' | 'mixed', mode: 'full' | 'sprint') => {
    setExamPart(part);
    setExamMode(mode);
    setActiveTab('simulator');
  };

  const handleNavigateTab = (tab: string, filter?: string) => {
    if (filter && tab === 'notes') {
      setNotesFilter(filter);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminNoteEditor = (note?: StudyNote) => {
    setEditingNote(note || null);
    setActiveTab('admin');
  };

  const handleOpenAdminFormulaEditor = (formula?: FormulaDefinition) => {
    setEditingFormula(formula || null);
    setActiveTab('admin');
  };

  // Google Login Gate: User must be signed in with Google or Gmail to access
  if (!user) {
    return <LoginGate />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        activeTab={activeTab}
        onNavigateTab={handleNavigateTab}
      />

      {/* Primary Navigation Tabs */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => handleNavigateTab(tab)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            progress={progress}
            onNavigateTab={handleNavigateTab}
            onStartExam={handleStartExam}
          />
        )}

        {activeTab === 'notes' && (
          <StudyNotes
            notes={notes}
            progress={progress}
            onToggleCompleted={handleToggleNoteCompleted}
            onOpenAdminEditor={handleOpenAdminNoteEditor}
            onNotesUpdated={setNotes}
            initialPartFilter={notesFilter}
          />
        )}

        {activeTab === 'simulator' && (
          <ExamSimulator
            questions={questions}
            progress={progress}
            onRecordAttempt={handleRecordAttempt}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            initialPart={examPart}
            initialMode={examMode}
          />
        )}

        {activeTab === 'formulas' && (
          <FormulaSheet
            formulas={formulas}
            progress={progress}
            onToggleBookmark={handleToggleFormulaBookmark}
            onOpenAdminEditor={handleOpenAdminFormulaEditor}
          />
        )}

        {activeTab === 'admin' && (
          <AdminResourceManager
            notes={notes}
            questions={questions}
            formulas={formulas}
            onUpdateNotes={setNotes}
            onUpdateQuestions={setQuestions}
            onUpdateFormulas={setFormulas}
            initialEditingNote={editingNote}
            initialEditingFormula={editingFormula}
          />
        )}
      </main>

      {/* Global Prometric Calculator Modal */}
      <PrometricCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 py-6 text-xs text-center hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 US CMA PREP • Certified Management Accountant Study Platform</p>
          <div className="flex items-center space-x-3">
            <span>Passing Scaled Score: 360 / 500</span>
            <span>•</span>
            <span className="text-slate-700 font-semibold">Admin: bhuvan13sharma@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
