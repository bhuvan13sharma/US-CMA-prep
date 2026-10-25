import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileCheck2, 
  Binary, 
  FolderEdit
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

interface NavigationProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const { isAdmin } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notes', label: 'Study Notes & PDFs', icon: BookOpen },
    { id: 'simulator', label: 'CMQ & Mock Tests', icon: FileCheck2 },
    { id: 'formulas', label: 'Formula Sheet', icon: Binary },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin Resources', icon: FolderEdit, badge: 'Admin' }] : []),
  ];

  return (
    <>
      {/* Desktop Navigation Bar */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-3 overflow-x-auto py-2.5 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
        <div className={`grid ${navItems.length === 5 ? 'grid-cols-5' : 'grid-cols-4'} gap-1`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 rounded-lg transition cursor-pointer ${
                  isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] leading-tight truncate max-w-[65px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
