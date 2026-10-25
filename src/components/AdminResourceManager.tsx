import React, { useState, useRef } from 'react';
import { 
  FolderEdit, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  RotateCcw, 
  ShieldCheck, 
  BookOpen, 
  Binary, 
  FileCheck2, 
  Upload, 
  Users, 
  Search, 
  Download, 
  Award, 
  CheckCircle2, 
  Clock, 
  Check 
} from 'lucide-react';
import { StudyNote, FormulaDefinition, MCQQuestion, CmaPart, UserProgress } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { ResourceService } from '../services/resourceService.ts';
import { ProgressService } from '../services/progressService.ts';

interface AdminResourceManagerProps {
  notes: StudyNote[];
  questions: MCQQuestion[];
  formulas: FormulaDefinition[];
  onUpdateNotes: (notes: StudyNote[]) => void;
  onUpdateQuestions: (questions: MCQQuestion[]) => void;
  onUpdateFormulas: (formulas: FormulaDefinition[]) => void;
  initialEditingNote?: StudyNote | null;
  initialEditingFormula?: FormulaDefinition | null;
}

export const AdminResourceManager: React.FC<AdminResourceManagerProps> = ({
  notes,
  questions,
  formulas,
  onUpdateNotes,
  onUpdateQuestions,
  onUpdateFormulas,
  initialEditingNote,
  initialEditingFormula,
}) => {
  const { user, isAdmin } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'notes' | 'questions' | 'formulas' | 'students'>('notes');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Student Cohort states
  const [cohort, setCohort] = useState<UserProgress[]>(() => ProgressService.getAllUsersCohort());
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [studentFilter, setStudentFilter] = useState<'all' | 'passed' | 'progress'>('all');
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<UserProgress | null>(null);

  // Note Modal States
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(!!initialEditingNote);
  const [noteForm, setNoteForm] = useState<StudyNote>(initialEditingNote || {
    id: `note-${Date.now()}`,
    part: 'part1',
    sectionCode: 'Section B: Planning, Budgeting, and Forecasting (20%)',
    topic: '',
    title: '',
    summary: '',
    content: '',
    keyPoints: [''],
    imaExamTips: [''],
    readTimeMinutes: 10,
    updatedAt: new Date().toISOString().split('T')[0],
  });
  const [notePdfFile, setNotePdfFile] = useState<File | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // Question Modal States
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);
  const [questionForm, setQuestionForm] = useState<MCQQuestion>({
    id: `q-${Date.now()}`,
    part: 'part1',
    sectionCode: 'Section B: Planning, Budgeting, and Forecasting',
    topic: '',
    scenarioText: '',
    questionText: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0,
    explanation: '',
    difficulty: 'Moderate',
  });

  // Formula Modal States
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(!!initialEditingFormula);
  const [formulaForm, setFormulaForm] = useState<FormulaDefinition>(initialEditingFormula || {
    id: `f-${Date.now()}`,
    part: 'part2',
    category: 'Corporate Finance',
    name: '',
    equation: '',
    explanation: '',
    unit: '%',
    inputs: [
      { key: 'input1', label: 'Primary Variable', placeholder: '100', defaultVal: 100 }
    ],
    calculate: () => ({ result: 0, stepByStep: 'Formula calculated' })
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // NOTE HANDLERS
  const handleOpenAddNote = () => {
    setNoteForm({
      id: `note-${Date.now()}`,
      part: 'part1',
      sectionCode: 'Section B: Planning, Budgeting, and Forecasting (20%)',
      topic: '',
      title: '',
      summary: '',
      content: '',
      keyPoints: [''],
      imaExamTips: [''],
      readTimeMinutes: 10,
      updatedAt: new Date().toISOString().split('T')[0],
      sourceType: 'text',
    });
    setNotePdfFile(null);
    setIsNoteModalOpen(true);
  };

  const handleEditNote = (note: StudyNote) => {
    setNoteForm(note);
    setNotePdfFile(null);
    setIsNoteModalOpen(true);
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('Please choose a valid PDF file.');
        return;
      }
      setNotePdfFile(file);
      if (!noteForm.title) {
        setNoteForm(prev => ({
          ...prev,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        }));
      }
    }
  };

  const handleSaveNote = async () => {
    if (!noteForm.title.trim()) {
      alert('Please fill out the note title.');
      return;
    }

    if (notePdfFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        const fileSizeKb = Math.round(notePdfFile.size / 1024);
        const sizeStr = fileSizeKb > 1024 ? `${(fileSizeKb / 1024).toFixed(1)} MB` : `${fileSizeKb} KB`;

        const noteWithPdf: StudyNote = {
          ...noteForm,
          sourceType: 'pdf',
          pdfDataUrl: dataUrl,
          pdfFileName: notePdfFile.name,
          pdfFileSize: sizeStr,
          content: noteForm.content || `Attached PDF Document: ${notePdfFile.name}`,
          summary: noteForm.summary || `PDF study guide: ${notePdfFile.name} (${sizeStr})`,
          updatedAt: new Date().toISOString().split('T')[0],
        };

        const updated = await ResourceService.saveNote(noteWithPdf, user?.email || 'admin@cma.org');
        onUpdateNotes(updated);
        setIsNoteModalOpen(false);
        showToast('PDF study note saved successfully!');
      };
      reader.readAsDataURL(notePdfFile);
    } else {
      const updated = await ResourceService.saveNote(noteForm, user?.email || 'admin@cma.org');
      onUpdateNotes(updated);
      setIsNoteModalOpen(false);
      showToast('Study note saved successfully!');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this study note?')) return;
    const updated = await ResourceService.deleteNote(noteId);
    onUpdateNotes(updated);
    showToast('Study note deleted.');
  };

  // QUESTION HANDLERS
  const handleOpenAddQuestion = () => {
    setQuestionForm({
      id: `q-${Date.now()}`,
      part: 'part1',
      sectionCode: 'Section B: Planning, Budgeting, and Forecasting',
      topic: '',
      scenarioText: '',
      questionText: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0,
      explanation: '',
      difficulty: 'Moderate',
    });
    setIsQuestionModalOpen(true);
  };

  const handleEditQuestion = (q: MCQQuestion) => {
    setQuestionForm(q);
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = async () => {
    if (!questionForm.questionText.trim()) {
      alert('Please enter question text.');
      return;
    }
    const updated = await ResourceService.saveQuestion(questionForm, user?.email || 'admin@cma.org');
    onUpdateQuestions(updated);
    setIsQuestionModalOpen(false);
    showToast('Question saved to MCQ Question Bank!');
  };

  const handleDeleteQuestion = async (qId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    const updated = await ResourceService.deleteQuestion(qId);
    onUpdateQuestions(updated);
    showToast('Question deleted.');
  };

  // FORMULA HANDLERS
  const handleOpenAddFormula = () => {
    setFormulaForm({
      id: `f-${Date.now()}`,
      part: 'part2',
      category: 'Corporate Finance',
      name: '',
      equation: '',
      explanation: '',
      unit: '%',
      inputs: [
        { key: 'input1', label: 'Primary Variable', placeholder: '100', defaultVal: 100 }
      ],
      calculate: () => ({ result: 0, stepByStep: 'Formula calculated' })
    });
    setIsFormulaModalOpen(true);
  };

  const handleEditFormula = (f: FormulaDefinition) => {
    setFormulaForm(f);
    setIsFormulaModalOpen(true);
  };

  const handleSaveFormula = async () => {
    if (!formulaForm.name.trim() || !formulaForm.equation.trim()) {
      alert('Please enter formula name and equation.');
      return;
    }
    const updated = await ResourceService.saveFormula(formulaForm, user?.email || 'admin@cma.org');
    onUpdateFormulas(updated);
    setIsFormulaModalOpen(false);
    showToast('Formula saved successfully!');
  };

  const handleDeleteFormula = async (fId: string) => {
    if (!confirm('Are you sure you want to delete this formula?')) return;
    const updated = await ResourceService.deleteFormula(fId);
    onUpdateFormulas(updated);
    showToast('Formula removed.');
  };

  const handleResetToDefaults = () => {
    if (!confirm('Reset all resources to official standard IMA library? Any custom additions will be cleared.')) return;
    ResourceService.resetAllToDefaults();
    onUpdateNotes(ResourceService.getNotes());
    onUpdateQuestions(ResourceService.getQuestions());
    onUpdateFormulas(ResourceService.getFormulas());
    showToast('Restored standard IMA library.');
  };

  const filteredCohort = cohort.filter((u) => {
    const matchesSearch =
      u.displayName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      u.userEmail.toLowerCase().includes(studentSearch.toLowerCase());
    if (studentFilter === 'passed') return matchesSearch && u.averageScaledScore >= 360;
    if (studentFilter === 'progress') return matchesSearch && u.averageScaledScore < 360;
    return matchesSearch;
  });

  // Export Student Progress CSV
  const exportStudentsCSV = () => {
    const headers = ['User ID', 'Name', 'Email', 'Role', 'Questions Practiced', 'Accuracy %', 'Mock Tests Taken', 'Avg Scaled Score', 'Passing Status'];
    const rows = filteredCohort.map(u => [
      u.userId,
      `"${u.displayName}"`,
      u.userEmail,
      u.role,
      u.totalQuestionsAttempted,
      `${u.accuracyRate}%`,
      u.mockTestsTaken,
      u.averageScaledScore,
      u.averageScaledScore >= 360 ? 'Passed' : 'In Progress'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CMA_USA_Student_Progress_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteUser = async (userId: string, name: string, email: string) => {
    if (email.toLowerCase() === 'bhuvan13sharma@gmail.com') {
      alert('The primary administrator account (bhuvan13sharma@gmail.com) cannot be removed.');
      return;
    }

    if (!confirm(`Are you sure you want to remove user "${name}" (${email})? This will permanently delete their account and progress records.`)) {
      return;
    }

    const updated = await ProgressService.deleteUser(userId);
    setCohort(updated);
    if (selectedStudentDetail?.userId === userId) {
      setSelectedStudentDetail(null);
    }
    showToast(`User "${name}" removed successfully.`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Control Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Control Center</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              US CMA PREP Administration
            </h2>
            <p className="text-xs text-slate-500">
              Logged in as <span className="text-blue-600 font-bold">{user?.email}</span>. You can manage study notes, upload lecture PDFs, edit questions, and monitor all student progress.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleResetToDefaults}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
              title="Reset all resources to standard IMA defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Sub-tabs: Notes, Questions, Formulas, AND Students & Progress */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSubTab('notes')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'notes'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Study Notes & PDFs ({notes.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('questions')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'questions'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>MCQ Questions ({questions.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('formulas')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'formulas'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>Formulas ({formulas.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('students')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'students'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
            }`}
          >
            <Users className="w-4 h-4 text-amber-700" />
            <span>Students & Progress ({cohort.length})</span>
          </button>
        </div>
      </div>

      {/* 1. NOTES TAB CONTENT */}
      {activeSubTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Active Study Notes & PDFs</h3>
            <button
              onClick={handleOpenAddNote}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Note (Text or PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div key={note.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {note.part === 'part1' ? 'Part 1' : 'Part 2'}
                    </span>
                    {note.pdfDataUrl && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        PDF
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleEditNote(note)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                      title="Edit note"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-rose-600 cursor-pointer"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{note.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{note.summary}</p>
                <div className="text-[10px] text-slate-400 font-mono">
                  {note.sectionCode} • {note.readTimeMinutes} mins
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. QUESTIONS TAB CONTENT */}
      {activeSubTab === 'questions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Prometric Question Bank</h3>
            <button
              onClick={handleOpenAddQuestion}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Question</span>
            </button>
          </div>

          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-blue-600">#{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {q.part === 'part1' ? 'Part 1' : 'Part 2'}
                    </span>
                    <span className="text-xs text-slate-500 truncate max-w-xs">{q.sectionCode}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleEditQuestion(q)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                      title="Edit question"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-rose-600 cursor-pointer"
                      title="Delete question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-800">{q.questionText}</p>
                <div className="text-[11px] text-emerald-700 font-medium">
                  Correct Answer: Option {String.fromCharCode(65 + q.correctOptionIndex)} ({q.options[q.correctOptionIndex]})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. FORMULAS TAB CONTENT */}
      {activeSubTab === 'formulas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Formula Repository</h3>
            <button
              onClick={handleOpenAddFormula}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Formula</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formulas.map((f) => (
              <div key={f.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                    {f.category}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleEditFormula(f)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFormula(f.id)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{f.name}</h4>
                <div className="p-2 rounded bg-slate-50 text-[11px] font-mono text-emerald-700 truncate border border-slate-200">
                  {f.equation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. STUDENTS & PROGRESS TAB CONTENT (EXCLUSIVELY FOR ADMIN) */}
      {activeSubTab === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Enrolled Candidates & Progress Tracking</span>
              </h3>
              <p className="text-xs text-slate-500">
                Visible only to Administrator ({user?.email}). Track student mock scores, questions solved, and passing readiness.
              </p>
            </div>

            <button
              onClick={exportStudentsCSV}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer self-start sm:self-auto"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search student by name or email..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <select
              value={studentFilter}
              onChange={(e) => setStudentFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none"
            >
              <option value="all">All Students ({cohort.length})</option>
              <option value="passed">Passing Average (≥360 Score)</option>
              <option value="progress">In Progress (&lt;360 Score)</option>
            </select>
          </div>

          {/* Student Roster Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Questions Solved</th>
                    <th className="py-3 px-3">Accuracy</th>
                    <th className="py-3 px-3">Mock Tests</th>
                    <th className="py-3 px-3">Avg Scaled Score</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredCohort.map((student) => {
                    const isPassing = student.averageScaledScore >= 360;
                    const isPrimaryAdmin = student.userEmail.toLowerCase() === 'bhuvan13sharma@gmail.com';

                    return (
                      <tr
                        key={student.userId}
                        onClick={() => setSelectedStudentDetail(student)}
                        className="hover:bg-slate-50 transition cursor-pointer"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-xs shrink-0">
                              {student.displayName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{student.displayName}</div>
                              <div className="text-[11px] text-slate-500">{student.userEmail}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            student.role === 'admin'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {student.role === 'admin' ? 'Admin' : 'Candidate'}
                          </span>
                        </td>

                        <td className="py-3 px-3 font-semibold text-slate-800">
                          {student.totalQuestionsAttempted} Qs
                        </td>

                        <td className="py-3 px-3 font-semibold text-emerald-700">
                          {student.accuracyRate}%
                        </td>

                        <td className="py-3 px-3 text-slate-700">
                          {student.mockTestsTaken} tests
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex items-baseline space-x-1">
                            <span className="font-mono font-bold text-slate-900">{student.averageScaledScore}</span>
                            <span className="text-[10px] text-slate-400">/ 500</span>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                            isPassing
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {isPassing ? 'Passing (≥360)' : 'In Progress'}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          {isPrimaryAdmin ? (
                            <span className="text-[10px] text-slate-400 font-semibold italic">Admin</span>
                          ) : (
                            <button
                              onClick={() => handleDeleteUser(student.userId, student.displayName, student.userEmail)}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-xs font-semibold transition cursor-pointer"
                              title={`Remove ${student.displayName}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT DETAIL MODAL */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedStudentDetail.displayName}</h3>
                <p className="text-xs text-slate-500">{selectedStudentDetail.userEmail}</p>
              </div>
              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Questions Solved</span>
                <span className="text-lg font-bold text-slate-900">
                  {selectedStudentDetail.totalQuestionsAttempted} ({selectedStudentDetail.accuracyRate}% acc)
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Mock Tests Taken</span>
                <span className="text-lg font-bold text-slate-900">
                  {selectedStudentDetail.mockTestsTaken}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Avg Scaled Score</span>
                <span className="text-lg font-bold text-blue-600">
                  {selectedStudentDetail.averageScaledScore} / 500
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Chapters Completed</span>
                <span className="text-lg font-bold text-emerald-600">
                  {selectedStudentDetail.completedNotes.length} notes
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800">Status Assessment:</span>
              <p>
                {selectedStudentDetail.averageScaledScore >= 360
                  ? 'Candidate meets the CMA passing threshold score of 360/500 across mock examination simulations.'
                  : 'Candidate is currently practicing and developing mastery in Part 1 & Part 2 topics.'}
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Close
              </button>

              {selectedStudentDetail.userEmail.toLowerCase() !== 'bhuvan13sharma@gmail.com' && (
                <button
                  onClick={() => handleDeleteUser(selectedStudentDetail.userId, selectedStudentDetail.displayName, selectedStudentDetail.userEmail)}
                  className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove User</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NOTE EDIT MODAL WITH PDF SUPPORT (FOR ADMIN) */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {noteForm.title ? 'Edit Study Note' : 'Create Study Note (Text or PDF)'}
              </h3>
              <button onClick={() => setIsNoteModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Optional PDF File Attachment */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span>Attach PDF File (Optional)</span>
                </label>
                {noteForm.pdfFileName && (
                  <span className="text-[11px] font-semibold text-rose-600">
                    Existing PDF: {noteForm.pdfFileName}
                  </span>
                )}
              </div>
              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handlePdfFileChange}
                className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                If attached, candidates can view the embedded PDF directly in the reader and download it.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold block text-slate-700 mb-1">CMA Part</label>
                <select
                  value={noteForm.part}
                  onChange={(e) => setNoteForm({ ...noteForm, part: e.target.value as CmaPart })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="part1">Part 1 (Planning & Analytics)</option>
                  <option value="part2">Part 2 (Strategic Financial Mgmt)</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block text-slate-700 mb-1">Syllabus Section</label>
                <input
                  type="text"
                  value={noteForm.sectionCode}
                  onChange={(e) => setNoteForm({ ...noteForm, sectionCode: e.target.value })}
                  placeholder="Section B: Planning & Budgeting"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Title</label>
              <input
                type="text"
                value={noteForm.title}
                onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                placeholder="Full chapter title"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold"
              />
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Summary</label>
              <textarea
                rows={2}
                value={noteForm.summary}
                onChange={(e) => setNoteForm({ ...noteForm, summary: e.target.value })}
                placeholder="Overview of key concepts..."
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Content / Lecture Notes</label>
              <textarea
                rows={6}
                value={noteForm.content}
                onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                placeholder="Type or paste study guide text..."
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Note</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUESTION EDIT MODAL */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {questionForm.questionText ? 'Edit Question' : 'Add Prometric Question'}
              </h3>
              <button onClick={() => setIsQuestionModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold block text-slate-700 mb-1">CMA Part</label>
                <select
                  value={questionForm.part}
                  onChange={(e) => setQuestionForm({ ...questionForm, part: e.target.value as CmaPart })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="part1">Part 1</option>
                  <option value="part2">Part 2</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block text-slate-700 mb-1">Section</label>
                <input
                  type="text"
                  value={questionForm.sectionCode}
                  onChange={(e) => setQuestionForm({ ...questionForm, sectionCode: e.target.value })}
                  placeholder="Section C: Decision Analysis"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Question Text</label>
              <textarea
                rows={3}
                value={questionForm.questionText}
                onChange={(e) => setQuestionForm({ ...questionForm, questionText: e.target.value })}
                placeholder="Question stem..."
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-semibold block text-slate-700">Options & Correct Answer</label>
              {questionForm.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="correctKey"
                    checked={questionForm.correctOptionIndex === oIdx}
                    onChange={() => setQuestionForm({ ...questionForm, correctOptionIndex: oIdx })}
                    className="text-blue-600"
                  />
                  <span className="font-bold text-slate-500 w-4">{String.fromCharCode(65 + oIdx)}.</span>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...questionForm.options];
                      newOpts[oIdx] = e.target.value;
                      setQuestionForm({ ...questionForm, options: newOpts });
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + oIdx)} text`}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              ))}
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Explanation & Rationale</label>
              <textarea
                rows={3}
                value={questionForm.explanation}
                onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                placeholder="Why the correct option is right..."
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveQuestion}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Question</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORMULA EDIT MODAL */}
      {isFormulaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {formulaForm.name ? 'Edit Formula' : 'Add Formula'}
              </h3>
              <button onClick={() => setIsFormulaModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold block text-slate-700 mb-1">Category</label>
                <select
                  value={formulaForm.category}
                  onChange={(e) => setFormulaForm({ ...formulaForm, category: e.target.value as any })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="Corporate Finance">Corporate Finance</option>
                  <option value="Cost & Variance">Cost & Variance</option>
                  <option value="Decision Analysis">Decision Analysis</option>
                  <option value="Performance & Ratios">Performance & Ratios</option>
                  <option value="Working Capital">Working Capital</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block text-slate-700 mb-1">CMA Part</label>
                <select
                  value={formulaForm.part}
                  onChange={(e) => setFormulaForm({ ...formulaForm, part: e.target.value as any })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="part1">Part 1</option>
                  <option value="part2">Part 2</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Formula Name</label>
              <input
                type="text"
                value={formulaForm.name}
                onChange={(e) => setFormulaForm({ ...formulaForm, name: e.target.value })}
                placeholder="Degree of Operating Leverage"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold"
              />
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Equation</label>
              <input
                type="text"
                value={formulaForm.equation}
                onChange={(e) => setFormulaForm({ ...formulaForm, equation: e.target.value })}
                placeholder="DOL = Contribution Margin / Operating Income"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-emerald-700 font-mono font-bold"
              />
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Explanation</label>
              <textarea
                rows={3}
                value={formulaForm.explanation}
                onChange={(e) => setFormulaForm({ ...formulaForm, explanation: e.target.value })}
                placeholder="Formula interpretation..."
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsFormulaModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFormula}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Formula</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
