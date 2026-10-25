import React, { useState } from 'react';
import { 
  Binary, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Calculator, 
  PlusCircle, 
  Edit3
} from 'lucide-react';
import { FormulaDefinition, UserProgress } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface FormulaSheetProps {
  formulas: FormulaDefinition[];
  progress: UserProgress;
  onToggleBookmark: (formulaId: string) => void;
  onOpenAdminEditor?: (formula?: FormulaDefinition) => void;
}

export const FormulaSheet: React.FC<FormulaSheetProps> = ({
  formulas,
  progress,
  onToggleBookmark,
  onOpenAdminEditor,
}) => {
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [activeFormulaId, setActiveFormulaId] = useState<string>(formulas[0]?.id || '');
  const [inputValues, setInputValues] = useState<{ [fId: string]: Record<string, number> }>({});

  const categories = ['All', 'Corporate Finance', 'Cost & Variance', 'Decision Analysis', 'Performance & Ratios', 'Working Capital'];

  const filteredFormulas = formulas.filter((f) => {
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesPart = selectedPart === 'all' || f.part === selectedPart;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.equation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPart && matchesSearch;
  });

  const activeFormula = formulas.find(f => f.id === activeFormulaId) || filteredFormulas[0] || formulas[0];

  const getActiveInputs = (formula: FormulaDefinition): Record<string, number> => {
    if (inputValues[formula.id]) {
      return inputValues[formula.id];
    }
    const defaults: Record<string, number> = {};
    formula.inputs?.forEach((inp) => {
      defaults[inp.key] = inp.defaultVal;
    });
    return defaults;
  };

  const handleInputChange = (formulaId: string, key: string, value: string) => {
    const num = parseFloat(value) || 0;
    setInputValues(prev => ({
      ...prev,
      [formulaId]: {
        ...(prev[formulaId] || {}),
        [key]: num,
      }
    }));
  };

  const calculationResult = activeFormula?.calculate
    ? activeFormula.calculate(getActiveInputs(activeFormula))
    : { result: 0, stepByStep: 'Formula calculated.' };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Binary className="w-5 h-5 text-emerald-600" />
              <span>US CMA Formula Sheet & Calculation Sandbox</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Financial management equations with live interactive arithmetic sandboxes.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={() => onOpenAdminEditor && onOpenAdminEditor()}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Formula</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search equations, WACC, CAPM, variances, DuPont, EOQ, CCC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          {/* Category Dropdown & Part Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedPart('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${selectedPart === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedPart('part1')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${selectedPart === 'part1' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Part 1
              </button>
              <button
                onClick={() => setSelectedPart('part2')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${selectedPart === 'part2' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Part 2
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Formula List & Interactive Calculation Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Formula Catalog (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2 max-h-[750px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Formulas ({filteredFormulas.length})</span>
            <span className="text-emerald-600">{progress.bookmarkedFormulas.length} bookmarked</span>
          </div>

          {filteredFormulas.map((formula) => {
            const isSelected = activeFormula?.id === formula.id;
            const isBookmarked = progress.bookmarkedFormulas.includes(formula.id);

            return (
              <div
                key={formula.id}
                onClick={() => setActiveFormulaId(formula.id)}
                className={`p-3.5 rounded-xl cursor-pointer border transition text-left ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {formula.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(formula.id);
                    }}
                    className="text-slate-400 hover:text-amber-500 transition cursor-pointer"
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Formula'}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-1.5">{formula.name}</h4>
                <div className="mt-1 p-2 rounded bg-slate-50 font-mono text-[11px] text-emerald-800 font-semibold truncate border border-slate-200">
                  {formula.equation}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Sandbox & Details Column (7 cols) */}
        {activeFormula ? (
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header info */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {activeFormula.category} • {activeFormula.part === 'part1' ? 'Part 1' : 'Part 2'}
                </span>

                <div className="flex items-center space-x-2">
                  {isAdmin && (
                    <button
                      onClick={() => onOpenAdminEditor && onOpenAdminEditor(activeFormula)}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  )}
                  <button
                    onClick={() => onToggleBookmark(activeFormula.id)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                    title="Bookmark"
                  >
                    {progress.bookmarkedFormulas.includes(activeFormula.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{activeFormula.name}</h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeFormula.explanation}
              </p>

              {/* Formula Equation Highlight Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-emerald-300 font-mono text-sm sm:text-base text-emerald-800 font-bold overflow-x-auto">
                {activeFormula.equation}
              </div>
            </div>

            {/* Interactive Calculator Section */}
            {activeFormula.inputs && activeFormula.inputs.length > 0 && (
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    <span>Live Arithmetic Sandbox</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">Edit values to compute live</span>
                </div>

                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeFormula.inputs.map((inp) => {
                    const currentVal = getActiveInputs(activeFormula)[inp.key] ?? inp.defaultVal;
                    return (
                      <div key={inp.key} className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700 block truncate">
                          {inp.label}
                        </label>
                        <input
                          type="number"
                          step="any"
                          value={currentVal}
                          onChange={(e) => handleInputChange(activeFormula.id, inp.key, e.target.value)}
                          placeholder={inp.placeholder}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Computed Output Box */}
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Computed Output</span>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-2xl font-mono font-black text-emerald-700">
                        {typeof calculationResult.result === 'number'
                          ? calculationResult.result.toLocaleString()
                          : calculationResult.result}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{activeFormula.unit}</span>
                    </div>
                  </div>

                  {/* Step by step computation notes */}
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-line sm:max-w-md shadow-2xs">
                    {calculationResult.stepByStep}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
