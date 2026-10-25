import React, { useState } from 'react';
import { X, Calculator as CalcIcon } from 'lucide-react';

interface PrometricCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrometricCalculator: React.FC<PrometricCalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<number>(0);
  const [pendingOp, setPendingOp] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [clearOnNext, setClearOnNext] = useState<boolean>(false);
  const [formulaNote, setFormulaNote] = useState<string>('');

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (display === '0' || clearOnNext) {
      setDisplay(digit);
      setClearOnNext(false);
    } else {
      if (display.length < 14) {
        setDisplay(display + digit);
      }
    }
  };

  const handleDecimal = () => {
    if (clearOnNext) {
      setDisplay('0.');
      setClearOnNext(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPendingOp(null);
    setPrevValue(null);
    setFormulaNote('');
  };

  const handleOp = (op: string) => {
    const current = parseFloat(display);
    if (prevValue !== null && pendingOp && !clearOnNext) {
      const res = calculate(prevValue, current, pendingOp);
      setDisplay(String(res));
      setPrevValue(res);
      setFormulaNote(`${res} ${op}`);
    } else {
      setPrevValue(current);
      setFormulaNote(`${current} ${op}`);
    }
    setPendingOp(op);
    setClearOnNext(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? 0 : a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (prevValue === null || pendingOp === null) return;
    const current = parseFloat(display);
    const res = calculate(prevValue, current, pendingOp);
    setFormulaNote(`${prevValue} ${pendingOp} ${current} =`);
    setDisplay(String(Math.round(res * 1000000) / 1000000));
    setPrevValue(null);
    setPendingOp(null);
    setClearOnNext(true);
  };

  const handleSqrt = () => {
    const val = parseFloat(display);
    if (val < 0) return;
    const res = Math.sqrt(val);
    setDisplay(String(Math.round(res * 1000000) / 1000000));
    setFormulaNote(`√(${val})`);
    setClearOnNext(true);
  };

  const handleToggleSign = () => {
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  const handleMemAdd = () => setMemory(memory + parseFloat(display));
  const handleMemSub = () => setMemory(memory - parseFloat(display));
  const handleMemRecall = () => {
    setDisplay(String(memory));
    setClearOnNext(true);
  };
  const handleMemClear = () => setMemory(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xs overflow-hidden rounded-2xl bg-white border border-slate-300 shadow-2xl text-slate-800">
        {/* Header bar matching Prometric CMA testing style */}
        <div className="flex items-center justify-between bg-slate-100 px-4 py-2.5 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <CalcIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Prometric Calculator
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="h-4 text-right text-[11px] text-slate-500 font-mono overflow-hidden">
            {formulaNote} {memory !== 0 && <span className="ml-2 text-emerald-600 font-bold">[M: {memory}]</span>}
          </div>
          <div className="text-right text-3xl font-mono font-bold tracking-tight text-slate-900 select-all">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="p-3 grid grid-cols-5 gap-1 bg-white">
          {/* Memory Row */}
          <button onClick={handleMemClear} className="py-2 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">MC</button>
          <button onClick={handleMemRecall} className="py-2 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">MR</button>
          <button onClick={handleMemAdd} className="py-2 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">M+</button>
          <button onClick={handleMemSub} className="py-2 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">M-</button>
          <button onClick={handleClear} className="py-2 text-xs font-bold rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer">C</button>

          {/* Row 1 */}
          <button onClick={handleToggleSign} className="py-2.5 text-sm font-medium rounded bg-slate-100 hover:bg-slate-200 cursor-pointer">±</button>
          <button onClick={handleSqrt} className="py-2.5 text-sm font-medium rounded bg-slate-100 hover:bg-slate-200 cursor-pointer">√</button>
          <button onClick={() => { const v = parseFloat(display) / 100; setDisplay(String(v)); }} className="py-2.5 text-sm font-medium rounded bg-slate-100 hover:bg-slate-200 cursor-pointer">%</button>
          <button onClick={() => handleOp('÷')} className="py-2.5 text-sm font-bold rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 cursor-pointer">÷</button>
          <button onClick={() => { const v = parseFloat(display); if (v !== 0) setDisplay(String(1 / v)); }} className="py-2.5 text-xs font-medium rounded bg-slate-100 hover:bg-slate-200 cursor-pointer">1/x</button>

          {/* Row 2 */}
          <button onClick={() => handleDigit('7')} className="py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">7</button>
          <button onClick={() => handleDigit('8')} className="py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">8</button>
          <button onClick={() => handleDigit('9')} className="py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">9</button>
          <button onClick={() => handleOp('×')} className="py-2.5 text-base font-bold rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 cursor-pointer">×</button>
          <button onClick={() => { const v = parseFloat(display); setDisplay(String(v * v)); }} className="py-2.5 text-xs font-medium rounded bg-slate-100 hover:bg-slate-200 cursor-pointer">x²</button>

          {/* Row 3 */}
          <button onClick={() => handleDigit('4')} className="py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">4</button>
          <button onClick={() => handleDigit('5')} className="py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">5</button>
          <button onClick={() => handleDigit('6')} className="py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">6</button>
          <button onClick={() => handleOp('-')} className="py-2.5 text-base font-bold rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 cursor-pointer">−</button>
          <button onClick={() => setDisplay(String(Math.round(parseFloat(display))))} className="py-2.5 text-xs font-medium rounded bg-slate-100 hover:bg-slate-200 cursor-pointer">Rnd</button>

          {/* Row 4 */}
          <button onClick={() => handleDigit('1')} className="py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">1</button>
          <button onClick={() => handleDigit('2')} className="py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">2</button>
          <button onClick={() => handleDigit('3')} className="py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">3</button>
          <button onClick={() => handleOp('+')} className="py-2.5 text-base font-bold rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 cursor-pointer">+</button>
          <button onClick={handleEquals} className="row-span-2 py-6 text-lg font-bold rounded bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer">=</button>

          {/* Row 5 */}
          <button onClick={() => handleDigit('0')} className="col-span-2 py-2.5 text-base font-semibold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">0</button>
          <button onClick={handleDecimal} className="py-2.5 text-base font-bold rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">.</button>
          <button onClick={() => { const v = parseFloat(display); setDisplay(String(v * 1.25)); setFormulaNote(`${v} * 1.25 (Tax)`); }} className="py-2.5 text-xs font-medium rounded bg-slate-100 hover:bg-slate-200 cursor-pointer">+25%t</button>
        </div>

        <div className="px-4 py-2 bg-slate-50 text-[10px] text-slate-500 text-center border-t border-slate-200">
          Prometric Exam Mode • Standard Arithmetic
        </div>
      </div>
    </div>
  );
};
