import React from 'react';
import { 
  Target, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Percent,
  CheckCircle,
  FileCheck2,
  FileText
} from 'lucide-react';
import { UserProgress } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { CMA_PART_STRUCTURE } from '../data/initialData.ts';

interface DashboardProps {
  progress: UserProgress;
  onNavigateTab: (tab: string, filter?: string) => void;
  onStartExam: (part: 'part1' | 'part2' | 'mixed', mode: 'full' | 'sprint') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, onNavigateTab, onStartExam }) => {
  const { user, isAdmin } = useAuth();
  const isPassingAverage = progress.averageScaledScore >= 360;

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Clean Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>US CMA Learning Management System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome, {progress.displayName || 'Candidate'}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Prepare for the Certified Management Accountant (CMA) exam. Review study notes, upload lecture PDFs, practice Prometric MCQs, and target the official passing score of <span className="font-bold text-blue-700">360 / 500</span>.
            </p>

            {isAdmin && (
              <div className="pt-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Admin Access Active: You can add and edit notes (including PDF uploads) anytime.</span>
                </span>
              </div>
            )}
          </div>

          <div className="flex sm:flex-col gap-2">
            <button
              onClick={() => onStartExam('mixed', 'sprint')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Practice Questions</span>
            </button>
            <button
              onClick={() => onNavigateTab('notes')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
              <span>Read Notes & PDFs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simplified, Understandable Stats Row (No readiness gauge, No study streak, No time studied) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Questions Practiced & Accuracy */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Questions Practiced</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">{progress.totalQuestionsAttempted}</span>
            <span className="text-xs text-slate-500">questions solved</span>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Accuracy Rate: <span className="font-bold text-emerald-600">{progress.accuracyRate}%</span>
          </p>
        </div>

        {/* Mock Tests Taken */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mock Tests Completed</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">{progress.mockTestsTaken}</span>
            <span className="text-xs text-slate-500">tests submitted</span>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Full 1.8 min/question Prometric simulator
          </p>
        </div>

        {/* Average Scaled Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Scaled Score</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900">
              {progress.averageScaledScore > 0 ? progress.averageScaledScore : '—'}
            </span>
            <span className="text-xs text-slate-500">/ 500</span>
          </div>
          <p className={`text-xs font-semibold mt-1 ${isPassingAverage ? 'text-emerald-600' : 'text-slate-600'}`}>
            {progress.averageScaledScore > 0 
              ? (isPassingAverage ? '✓ Passing score achieved (≥360)' : 'Passing score is 360 / 500') 
              : 'Take a test to see scaled score'}
          </p>
        </div>
      </div>

      {/* Part 1 & Part 2 Examination Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CMA_PART_STRUCTURE.map((cmaPart) => (
          <div key={cmaPart.part} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                {cmaPart.part === 'part1' ? 'US CMA Part 1' : 'US CMA Part 2'}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">{cmaPart.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{cmaPart.description}</p>
            </div>

            {/* Sections Weightage Table */}
            <div className="space-y-1.5 pt-1">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Exam Syllabus Weights:</p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {cmaPart.sections.map((sec) => (
                  <div key={sec.code} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-700 truncate mr-2">
                      <span className="font-bold text-blue-600 mr-1">{sec.code}.</span>
                      {sec.name}
                    </span>
                    <span className="font-mono text-slate-600 font-bold text-[11px]">{sec.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions for this Part */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => onStartExam(cmaPart.part as 'part1' | 'part2', 'full')}
                className="flex-1 flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Practice</span>
              </button>
              <button
                onClick={() => onNavigateTab('notes', cmaPart.part)}
                className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Read Notes & PDFs</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mock Exam Simulator Card */}
        <div 
          onClick={() => onNavigateTab('simulator')}
          className="group cursor-pointer rounded-2xl p-5 bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
            Prometric Exam Simulator
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Full Prometric environment with countdown timer, flag for review, strikethrough elimination tool, on-screen calculator, and 0–500 scaled scoring.
          </p>
          <div className="pt-2 flex items-center text-xs font-bold text-blue-600 space-x-1">
            <span>Launch Test Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Formula Sheet Card */}
        <div 
          onClick={() => onNavigateTab('formulas')}
          className="group cursor-pointer rounded-2xl p-5 bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition space-y-2"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Percent className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition">
            Interactive Formula Sheet
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Formulas for WACC, CAPM, DuPont 3-stage ROE, Breakeven CVP, Overhead Variances, and Working Capital with live calculation sandboxes.
          </p>
          <div className="pt-2 flex items-center text-xs font-bold text-emerald-600 space-x-1">
            <span>Open Formula Sheet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Recent Mock Test History */}
      {progress.recentAttempts && progress.recentAttempts.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Test Attempts</h3>
            <button
              onClick={() => onNavigateTab('simulator')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Take Another Test →
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {progress.recentAttempts.map((attempt) => (
              <div key={attempt.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{attempt.testTitle}</h4>
                  <p className="text-xs text-slate-500">
                    Date: {attempt.date} • Questions: {attempt.totalQuestions} • Time: {Math.round(attempt.timeSpentSeconds / 60)} mins
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-base font-mono font-bold text-slate-900">{attempt.scaledScore}</span>
                    <span className="text-xs text-slate-500"> / 500</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    attempt.passed 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {attempt.passed ? 'PASSED (≥360)' : 'NEEDS WORK (<360)'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
