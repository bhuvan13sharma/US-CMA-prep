import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { Award, BookOpen, FileCheck2, Binary, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const LoginGate: React.FC = () => {
  const { loginWithGoogle, loginAsAdminDemo, loginAsStudentDemo, loading } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Icon */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md mb-4">
          <Award className="w-8 h-8 text-amber-300" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          US CMA <span className="text-blue-600">PREP</span>
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium">
          Official US CMA Learning Management System
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200 rounded-2xl space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Lock className="w-3.5 h-3.5" />
              <span>Authentication Required</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 pt-1">
              Sign In to Access Your LMS
            </h2>
            <p className="text-xs text-slate-500">
              Please sign in with your Google or Gmail account to view notes, practice Prometric tests, and track your progress.
            </p>
          </div>

          {/* Primary Google Login Button */}
          <div className="space-y-3">
            <button
              onClick={loginWithGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xs transition cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google / Gmail</span>
            </button>
          </div>

          {/* Quick Demo Switcher for Instant Testing */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              Direct Evaluation Options
            </span>
            <div className="space-y-1.5">
              <button
                onClick={loginAsAdminDemo}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left transition cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <div>
                    <p className="text-xs font-bold text-amber-900">Sign in as Admin</p>
                    <p className="text-[10px] text-amber-700">bhuvan13sharma@gmail.com</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  Full Admin Access
                </span>
              </button>

              <button
                onClick={loginAsStudentDemo}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-left transition cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-bold text-blue-900">Sign in as Student</p>
                    <p className="text-[10px] text-blue-700">Alex Morgan (Candidate)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                  Candidate Access
                </span>
              </button>
            </div>
          </div>

          {/* Platform Features Preview */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Part 1 & Part 2 condensed study notes & PDF chapters</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Prometric mock test simulator (0–500 scaled scoring)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Interactive formula calculations & financial sandboxes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
