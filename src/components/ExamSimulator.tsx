import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  Flag, 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Play, 
  Pause, 
  Check, 
  Eye, 
  FileCheck2 
} from 'lucide-react';
import { MCQQuestion, TestAttempt, UserProgress, CmaPart } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface ExamSimulatorProps {
  questions: MCQQuestion[];
  progress: UserProgress;
  onRecordAttempt: (attempt: TestAttempt) => void;
  onOpenCalculator: () => void;
  initialPart?: 'part1' | 'part2' | 'mixed';
  initialMode?: 'full' | 'sprint';
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  questions,
  progress,
  onRecordAttempt,
  onOpenCalculator,
  initialPart = 'mixed',
  initialMode = 'sprint',
}) => {
  const { user } = useAuth();

  // Test setup states
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examCompleted, setExamCompleted] = useState<boolean>(false);
  const [selectedPart, setSelectedPart] = useState<'part1' | 'part2' | 'mixed'>(initialPart);
  const [selectedLength, setSelectedLength] = useState<number>(initialMode === 'full' ? 50 : 15);
  const [isTimed, setIsTimed] = useState<boolean>(true);
  const [showImmediateExplanations, setShowImmediateExplanations] = useState<boolean>(false);

  // Active exam states
  const [activeQuestions, setActiveQuestions] = useState<MCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [qId: string]: boolean }>({});
  const [strikethroughs, setStrikethroughs] = useState<{ [key: string]: boolean }>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(selectedLength * 108); // 1.8 mins per question
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [showReviewScreen, setShowReviewScreen] = useState<boolean>(false);
  const [finalAttempt, setFinalAttempt] = useState<TestAttempt | null>(null);

  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Start exam session
  const startExam = () => {
    let pool = [...questions];
    if (selectedPart === 'part1') {
      pool = pool.filter(q => q.part === 'part1');
    } else if (selectedPart === 'part2') {
      pool = pool.filter(q => q.part === 'part2');
    }

    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(selectedLength, shuffled.length));

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setStrikethroughs({});
    setShowReviewScreen(false);
    setExamCompleted(false);
    setExamStarted(true);

    const timeAllocated = selected.length * 108;
    setSecondsRemaining(timeAllocated);
    startTimeRef.current = Date.now();
  };

  // Timer countdown
  useEffect(() => {
    if (examStarted && !examCompleted && isTimed && !isTimerPaused && !showReviewScreen) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [examStarted, examCompleted, isTimed, isTimerPaused, showReviewScreen]);

  const formatTimer = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const toggleFlag = () => {
    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const toggleStrikethrough = (qId: string, optIdx: number) => {
    const key = `${qId}-${optIdx}`;
    setStrikethroughs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    const sectionBreakdown: { [section: string]: { correct: number; total: number } } = {};

    activeQuestions.forEach((q) => {
      const section = q.sectionCode || 'General';
      if (!sectionBreakdown[section]) {
        sectionBreakdown[section] = { correct: 0, total: 0 };
      }
      sectionBreakdown[section].total += 1;

      if (userAnswers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
        sectionBreakdown[section].correct += 1;
      }
    });

    const total = activeQuestions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    let scaledScore = 0;
    if (percentage >= 70) {
      scaledScore = Math.min(500, Math.round(360 + ((percentage - 70) / 30) * 140));
    } else {
      scaledScore = Math.round((percentage / 70) * 359);
    }
    const passed = scaledScore >= 360;
    const timeSpent = Math.max(10, Math.round((Date.now() - startTimeRef.current) / 1000));

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      userId: user?.uid || 'guest-candidate',
      userEmail: user?.email || 'guest@cma.org',
      userName: user?.displayName || 'CMA Candidate',
      testTitle: `${selectedPart === 'part1' ? 'Part 1' : selectedPart === 'part2' ? 'Part 2' : 'Comprehensive'} Exam Simulator`,
      part: selectedPart,
      score: percentage,
      rawScore: correctCount,
      totalQuestions: total,
      scaledScore,
      passed,
      timeSpentSeconds: timeSpent,
      date: new Date().toISOString().split('T')[0],
      sectionBreakdown,
    };

    setFinalAttempt(attempt);
    setExamCompleted(true);
    setExamStarted(false);
    onRecordAttempt(attempt);

    if (passed) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const currentQ = activeQuestions[currentIndex];
  const isAnswered = currentQ && userAnswers[currentQ.id] !== undefined;
  const isFlagged = currentQ && flaggedQuestions[currentQ.id];

  // 1. SETUP SCREEN
  if (!examStarted && !examCompleted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Prometric Exam Simulator
              </h2>
              <p className="text-xs text-slate-500">
                Official-style CMA exam simulation with 1.8 min/question timer, flag for review, and 0–500 scaled scoring (passing score: 360).
              </p>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Part Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Part
              </label>
              <div className="space-y-2">
                {[
                  { id: 'part1', label: 'Part 1: Financial Planning, Performance & Analytics', desc: 'Reporting, Budgeting, Variances, Costing, Internal Controls' },
                  { id: 'part2', label: 'Part 2: Strategic Financial Management', desc: 'Statement Analysis, Corporate Finance, CVP, Capital Budgeting, Ethics' },
                  { id: 'mixed', label: 'Mixed Practice (Part 1 & 2)', desc: 'Randomized questions from all syllabus sections' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPart(item.id as any)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      selectedPart === item.id
                        ? 'bg-blue-50/80 border-blue-500 text-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{item.label}</span>
                      {selectedPart === item.id && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Length & Options */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Number of Questions
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { count: 10, label: '10 Qs', time: '18 mins' },
                    { count: 25, label: '25 Qs', time: '45 mins' },
                    { count: 50, label: '50 Qs', time: '90 mins' },
                  ].map((len) => (
                    <button
                      key={len.count}
                      onClick={() => setSelectedLength(len.count)}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        selectedLength === len.count
                          ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-sm font-bold">{len.label}</div>
                      <div className="text-[11px] opacity-80">{len.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Toggles */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Simulation Settings
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTimed}
                      onChange={(e) => setIsTimed(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-0 w-4 h-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900">Prometric Exam Timer</span>
                      <p className="text-[11px] text-slate-500">1.8 minutes per question pace.</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showImmediateExplanations}
                      onChange={(e) => setShowImmediateExplanations(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-0 w-4 h-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900">Instant Explanations</span>
                      <p className="text-[11px] text-slate-500">Show answer rationale right after answering each question.</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Access the on-screen calculator and strikethrough tool anytime during the test.
            </span>
            <button
              onClick={startExam}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Simulator</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. ACTIVE EXAM SCREEN
  if (examStarted && !showReviewScreen && currentQ) {
    return (
      <div className="max-w-5xl mx-auto space-y-4 pb-20 md:pb-8">
        {/* Prometric Top Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-slate-800">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-mono font-bold text-xs border border-blue-200">
              Question {currentIndex + 1} of {activeQuestions.length}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline truncate max-w-xs">
              {currentQ.sectionCode}
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {isTimed && (
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 font-mono text-xs">
                <Clock className={`w-3.5 h-3.5 ${secondsRemaining < 300 ? 'text-rose-600 animate-pulse' : 'text-blue-600'}`} />
                <span className={`font-bold ${secondsRemaining < 300 ? 'text-rose-600' : 'text-slate-800'}`}>
                  {formatTimer(secondsRemaining)}
                </span>
                <button
                  onClick={() => setIsTimerPaused(!isTimerPaused)}
                  className="ml-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
                >
                  {isTimerPaused ? <Play className="w-3 h-3 fill-current text-emerald-600" /> : <Pause className="w-3 h-3 text-slate-600" />}
                </button>
              </div>
            )}

            {/* Flag for Review */}
            <button
              onClick={toggleFlag}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                isFlagged
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current text-amber-600' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
            </button>

            {/* Calculator Button */}
            <button
              onClick={onOpenCalculator}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">Calculator</span>
            </button>

            {/* Review & Submit */}
            <button
              onClick={() => setShowReviewScreen(true)}
              className="px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 cursor-pointer"
            >
              Review & Submit
            </button>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {currentQ.scenarioText && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                Scenario Information
              </span>
              {currentQ.scenarioText}
            </div>
          )}

          <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQ.questionText}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const isSelected = userAnswers[currentQ.id] === optIdx;
              const isStriked = strikethroughs[`${currentQ.id}-${optIdx}`];
              const showResult = showImmediateExplanations && isAnswered;
              const isCorrect = optIdx === currentQ.correctOptionIndex;

              let optionStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';
              if (isSelected) {
                optionStyle = 'bg-blue-50/80 border-blue-500 text-slate-900 font-semibold ring-1 ring-blue-500';
              }
              if (showResult) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-semibold';
                }
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => !isStriked && handleSelectOption(optIdx)}
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition select-none ${optionStyle} ${
                    isStriked ? 'opacity-40 line-through bg-slate-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0 mt-0.5">
                      {letter}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed">{option}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStrikethrough(currentQ.id, optIdx);
                    }}
                    className="ml-3 px-1.5 py-0.5 rounded text-[10px] text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                    title="Eliminate choice"
                  >
                    {isStriked ? 'Undo' : 'Strike'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Instant explanation if enabled */}
          {showImmediateExplanations && isAnswered && (
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5 text-xs">
              <div className="flex items-center space-x-2">
                {userAnswers[currentQ.id] === currentQ.correctOptionIndex ? (
                  <span className="text-emerald-700 font-bold flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" /> Correct!
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold flex items-center">
                    <XCircle className="w-4 h-4 mr-1 text-rose-600" /> Incorrect
                  </span>
                )}
                <span className="text-slate-600">
                  (Correct Answer: Option {String.fromCharCode(65 + currentQ.correctOptionIndex)})
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed font-sans">{currentQ.explanation}</p>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setShowReviewScreen(true)}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Question Palette</span>
            </button>

            {currentIndex < activeQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(activeQuestions.length - 1, prev + 1))}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowReviewScreen(true)}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <span>Review & Finish</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. REVIEW SCREEN
  if (showReviewScreen && !examCompleted) {
    const answeredCount = Object.keys(userAnswers).length;
    const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
    const unansweredCount = activeQuestions.length - answeredCount;

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Prometric Exam Review Screen</h2>
              <p className="text-xs text-slate-500">
                Review answered, unanswered, and flagged questions before final submission.
              </p>
            </div>
            {isTimed && (
              <div className="font-mono text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                Time Remaining: {formatTimer(secondsRemaining)}
              </div>
            )}
          </div>

          {/* Summary Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <span className="text-xl font-bold text-blue-700">{answeredCount}</span>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">Answered</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-xl font-bold text-amber-700">{flaggedCount}</span>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">Flagged</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-xl font-bold text-rose-700">{unansweredCount}</span>
              <p className="text-[11px] text-slate-500 font-semibold uppercase">Unanswered</p>
            </div>
          </div>

          {/* Palette Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Click any question number to review:
            </h4>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {activeQuestions.map((q, idx) => {
                const isAns = userAnswers[q.id] !== undefined;
                const isFlg = flaggedQuestions[q.id];

                let bg = 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400';
                if (isAns) bg = 'bg-blue-50 border-blue-400 text-blue-800 font-bold';
                if (isFlg) bg = 'bg-amber-50 border-amber-400 text-amber-800 font-bold ring-1 ring-amber-400';

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowReviewScreen(false);
                    }}
                    className={`h-10 rounded-lg border text-xs flex flex-col items-center justify-center transition cursor-pointer relative ${bg}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlg && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setShowReviewScreen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              ← Back to Questions
            </button>
            <button
              onClick={finishExam}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xs transition cursor-pointer"
            >
              Submit Exam for Scoring ✓
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. SCORE REPORT SCREEN
  if (examCompleted && finalAttempt) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Official Examination Score Report
              </span>
              <h2 className="text-2xl font-black mt-1 text-slate-900">{finalAttempt.testTitle}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Completed on {finalAttempt.date} • Time spent: {Math.round(finalAttempt.timeSpentSeconds / 60)} minutes
              </p>
            </div>

            <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-500">CMA Scaled Score</p>
                <div className="text-3xl font-mono font-black text-slate-900">{finalAttempt.scaledScore}</div>
                <p className="text-[10px] text-slate-400">Passing Score: 360 / 500</p>
              </div>
              <div className={`px-4 py-2 rounded-xl text-center font-bold text-sm ${
                finalAttempt.passed
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-50 text-rose-800 border border-rose-300'
              }`}>
                {finalAttempt.passed ? 'PASSED ★' : 'DID NOT PASS'}
              </div>
            </div>
          </div>

          {/* Accuracy Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-lg font-bold text-slate-900">{finalAttempt.rawScore} / {finalAttempt.totalQuestions}</span>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Correct Answers</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-lg font-bold text-blue-600">{finalAttempt.score}%</span>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Accuracy</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-lg font-bold text-emerald-700">
                {Math.round(finalAttempt.timeSpentSeconds / finalAttempt.totalQuestions)}s
              </span>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Avg Pace / Question</p>
            </div>
          </div>

          {/* Sectional Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Score by Syllabus Section:
            </h4>
            <div className="space-y-2">
              {Object.entries(finalAttempt.sectionBreakdown).map(([sec, stats]) => {
                const secPct = Math.round((stats.correct / stats.total) * 100);
                const isStrong = secPct >= 70;
                return (
                  <div key={sec} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{sec}</span>
                      <span className={`font-mono font-bold ${isStrong ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {stats.correct} / {stats.total} ({secPct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isStrong ? 'bg-emerald-600' : 'bg-amber-500'}`}
                        style={{ width: `${secPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question by Question Review */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Review Rationales</span>
            </h4>
            <div className="space-y-4">
              {activeQuestions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctOptionIndex;

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-600">Question {idx + 1}</span>
                      <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900">{q.questionText}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        const isAnsOption = optIdx === q.correctOptionIndex;
                        const isUserOption = optIdx === userChoice;

                        let optClass = 'bg-white border-slate-200 text-slate-700';
                        if (isAnsOption) optClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                        else if (isUserOption && !isAnsOption) optClass = 'bg-rose-50 border-rose-400 text-rose-900';

                        return (
                          <div key={optIdx} className={`p-2 rounded-lg border flex items-center space-x-2 ${optClass}`}>
                            <span className="w-5 h-5 rounded bg-slate-100 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {letter}
                            </span>
                            <span className="truncate">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2 p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 leading-relaxed font-sans shadow-2xs">
                      <span className="font-bold text-blue-600 mr-1">Explanation:</span>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setExamCompleted(false);
                setExamStarted(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Menu</span>
            </button>
            <button
              onClick={startExam}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Take Another Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
