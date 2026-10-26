import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { Award, Lock, CheckCircle2, AlertCircle, X, Mail, ArrowRight } from 'lucide-react';

export const LoginGate: React.FC = () => {
  const { loginWithEmail, loading, authError, clearAuthError } = useAuth();
  const [emailInput, setEmailInput] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      loginWithEmail(emailInput.trim());
    }
  };

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
          Certified Management Accountant LMS
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200 rounded-2xl space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Lock className="w-3.5 h-3.5" />
              <span>Candidate Portal</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 pt-1">
              Sign In with your Gmail
            </h2>
            <p className="text-xs text-slate-500">
              Enter your Gmail address to access your personal study materials, mock tests, and test records.
            </p>
          </div>

          {/* Auth Notice / Error Banner */}
          {authError && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium leading-relaxed">{authError}</div>
                <button
                  onClick={clearAuthError}
                  className="text-amber-500 hover:text-amber-700 p-0.5 cursor-pointer"
                  title="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Direct Gmail Sign-in */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="email-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Gmail Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="email-input"
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !emailInput.trim()}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-500/10 flex items-center justify-center space-x-2 transition cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Signing In...' : 'Sign In with Gmail'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Platform Features Preview */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-700">Part 1 & Part 2 study notes</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Prometric mock test simulator (0–500 scaled scoring)</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Interactive formula calculations & financial sandboxes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
