import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { 
  ShieldCheck, 
  Calculator, 
  ChevronDown, 
  Award,
  Settings,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  onOpenCalculator: () => void;
  activeTab: string;
  onNavigateTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCalculator, activeTab, onNavigateTab }) => {
  const { user, isAdmin, logout } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigateTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  US CMA <span className="text-blue-600">PREP</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  IMA 2026 Curriculum
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                US CMA Learning Management System
              </p>
            </div>
          </div>

          {/* Right Utilities & Auth */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Prometric Calculator Tool */}
            <button
              onClick={onOpenCalculator}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
              title="Open Official Prometric Exam Calculator"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">Prometric Calc</span>
            </button>

            {/* Admin Badge Shortcut */}
            {isAdmin && (
              <button
                onClick={() => onNavigateTab('admin')}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition cursor-pointer"
                title="Admin Management Panel"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin Controls</span>
              </button>
            )}

            {/* Auth Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 border border-blue-300 overflow-hidden flex items-center justify-center text-xs font-bold">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                    ) : (
                      user.displayName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                      {user.displayName}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                      {isAdmin ? (
                        <span className="text-amber-700 font-semibold flex items-center">
                          <ShieldCheck className="w-2.5 h-2.5 mr-0.5 inline" /> Admin
                        </span>
                      ) : (
                        <span>Candidate</span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 text-slate-700"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.displayName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isAdmin 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {isAdmin ? '★ Primary Admin (Full Permissions)' : 'CMA Candidate'}
                        </span>
                      </div>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          onNavigateTab('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center space-x-2 text-blue-700 font-semibold cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-blue-600" />
                        <span>Manage LMS Resources (Add/Edit Notes)</span>
                      </button>
                    )}

                    <div className="pt-2 border-t border-slate-100 px-2">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
