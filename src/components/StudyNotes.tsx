import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  CheckCircle, 
  CheckCircle2, 
  Clock, 
  Upload, 
  FileText, 
  PlusCircle, 
  Edit3,
  Bookmark,
  Download,
  Eye,
  X,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { StudyNote, UserProgress, CmaPart } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { ResourceService } from '../services/resourceService.ts';

interface StudyNotesProps {
  notes: StudyNote[];
  progress: UserProgress;
  onToggleCompleted: (noteId: string) => void;
  onOpenAdminEditor?: (note?: StudyNote) => void;
  onNotesUpdated?: (notes: StudyNote[]) => void;
  initialPartFilter?: string;
}

export const StudyNotes: React.FC<StudyNotesProps> = ({
  notes,
  progress,
  onToggleCompleted,
  onOpenAdminEditor,
  onNotesUpdated,
  initialPartFilter,
}) => {
  const { user, isAdmin } = useAuth();
  const [selectedPart, setSelectedPart] = useState<string>(initialPartFilter || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0]?.id || '');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [isPdfUploadModalOpen, setIsPdfUploadModalOpen] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  // PDF Upload Form State
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>('');
  const [pdfPart, setPdfPart] = useState<CmaPart>('part1');
  const [pdfSection, setPdfSection] = useState<string>('Section A: External Financial Reporting Decisions');
  const [pdfTopic, setPdfTopic] = useState<string>('');
  const [pdfSummary, setPdfSummary] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesPart = selectedPart === 'all' || note.part === selectedPart;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.sectionCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.pdfFileName && note.pdfFileName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBookmark = !onlyBookmarked || progress.completedNotes.includes(note.id);
    return matchesPart && matchesSearch && matchesBookmark;
  });

  const activeNote = notes.find((n) => n.id === activeNoteId) || filteredNotes[0] || notes[0];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('Please select a valid PDF file.');
        return;
      }
      setPdfFile(file);
      // Auto-populate title if empty
      if (!pdfTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setPdfTitle(cleanName);
      }
    }
  };

  const handleSavePdfNote = async () => {
    if (!pdfFile) {
      alert('Please choose a PDF file.');
      return;
    }
    if (!pdfTitle.trim()) {
      alert('Please enter a note title.');
      return;
    }

    try {
      setUploadLoading(true);

      // Read PDF file as Data URL
      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        const fileSizeKb = Math.round(pdfFile.size / 1024);
        const sizeStr = fileSizeKb > 1024 ? `${(fileSizeKb / 1024).toFixed(1)} MB` : `${fileSizeKb} KB`;

        const newNote: StudyNote = {
          id: `note-pdf-${Date.now()}`,
          part: pdfPart,
          sectionCode: pdfSection,
          topic: pdfTopic || 'Uploaded PDF Study Guide',
          title: pdfTitle.trim(),
          summary: pdfSummary.trim() || `Official PDF study material: ${pdfFile.name} (${sizeStr})`,
          content: `This study chapter includes the uploaded document "${pdfFile.name}". Review the embedded PDF reader below or download the file for offline study.`,
          keyPoints: [
            `Document Name: ${pdfFile.name}`,
            `File Size: ${sizeStr}`,
            `CMA Scope: ${pdfPart === 'part1' ? 'Part 1' : 'Part 2'} - ${pdfSection}`,
          ],
          imaExamTips: [
            'Review key formulas and summary tables inside the PDF before attempting related mock questions.'
          ],
          readTimeMinutes: Math.max(5, Math.round(fileSizeKb / 50)),
          updatedAt: new Date().toISOString().split('T')[0],
          isCustom: true,
          sourceType: 'pdf',
          pdfDataUrl: dataUrl,
          pdfFileName: pdfFile.name,
          pdfFileSize: sizeStr,
        };

        const updated = await ResourceService.saveNote(newNote, user?.email || 'admin@cma.org');
        if (onNotesUpdated) {
          onNotesUpdated(updated);
        }
        setActiveNoteId(newNote.id);
        setIsPdfUploadModalOpen(false);
        setPdfFile(null);
        setPdfTitle('');
        setPdfSummary('');
        setPdfTopic('');
        setUploadLoading(false);
      };

      reader.onerror = () => {
        alert('Failed to read the PDF file. Please try again.');
        setUploadLoading(false);
      };

      reader.readAsDataURL(pdfFile);
    } catch (err) {
      console.error('PDF upload error:', err);
      alert('Failed to process PDF note.');
      setUploadLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>US CMA Study Notes & PDF Materials</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Condensed exam notes and uploaded PDF study chapters for CMA Part 1 & Part 2.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Upload PDF Button - ADMIN ONLY */}
            {isAdmin && (
              <button
                onClick={() => setIsPdfUploadModalOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Add Note via PDF</span>
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => onOpenAdminEditor && onOpenAdminEditor()}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-slate-600" />
                <span>Add Text Note</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search concepts, topics, or PDF filenames..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Part Filter Tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setSelectedPart('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedPart === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Notes
            </button>
            <button
              onClick={() => setSelectedPart('part1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedPart === 'part1' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Part 1 (Planning & Analytics)
            </button>
            <button
              onClick={() => setSelectedPart('part2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedPart === 'part2' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Part 2 (Strategic Financial Mgmt)
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Table of Contents & Reader View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table of Contents Column (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2 max-h-[750px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Study Chapters ({filteredNotes.length})
            </span>
            <span className="text-xs text-emerald-600 font-semibold">
              {progress.completedNotes.length} completed
            </span>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No study notes found matching "{searchQuery}"
            </div>
          ) : (
            filteredNotes.map((note) => {
              const isSelected = activeNote?.id === note.id;
              const isCompleted = progress.completedNotes.includes(note.id);
              const isPdf = note.sourceType === 'pdf' || !!note.pdfDataUrl;

              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition text-left ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {note.part === 'part1' ? 'Part 1' : 'Part 2'}
                      </span>
                      {isPdf && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <FileText className="w-3 h-3 mr-0.5 inline" /> PDF
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCompleted(note.id);
                      }}
                      className="text-slate-400 hover:text-emerald-600 transition cursor-pointer"
                      title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 hover:border-emerald-500" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 font-medium mt-1 truncate">
                    {note.sectionCode}
                  </p>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug line-clamp-2">
                    {note.title}
                  </h4>

                  <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-2">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{note.readTimeMinutes} min read</span>
                    </span>
                    {note.pdfFileSize && (
                      <>
                        <span>•</span>
                        <span>{note.pdfFileSize}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Note Reader Display Column (7 cols) */}
        {activeNote ? (
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Note Header */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                    {activeNote.part === 'part1' ? 'CMA Part 1' : 'CMA Part 2'}
                  </span>
                  {activeNote.pdfDataUrl && (
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center space-x-1">
                      <FileText className="w-3 h-3" />
                      <span>PDF Document</span>
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-mono">
                    {activeNote.updatedAt}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {isAdmin && (
                    <button
                      onClick={() => onOpenAdminEditor && onOpenAdminEditor(activeNote)}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
                      title="Edit note"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  )}

                  <button
                    onClick={() => onToggleCompleted(activeNote.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      progress.completedNotes.includes(activeNote.id)
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>
                      {progress.completedNotes.includes(activeNote.id) ? 'Completed' : 'Mark Completed'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {activeNote.sectionCode}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {activeNote.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {activeNote.summary}
              </p>
            </div>

            {/* If Note Has Embedded PDF Document */}
            {activeNote.pdfDataUrl ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{activeNote.pdfFileName || 'Attached Study Document'}</h4>
                      <p className="text-[11px] text-slate-500">{activeNote.pdfFileSize || 'PDF File'}</p>
                    </div>
                  </div>

                  <a
                    href={activeNote.pdfDataUrl}
                    download={activeNote.pdfFileName || 'cma-study-note.pdf'}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>

                {/* Embedded PDF Viewer Iframe */}
                <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-100 shadow-inner">
                  <div className="bg-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-700 font-semibold border-b border-slate-300">
                    <span className="flex items-center space-x-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span>Embedded PDF Viewer</span>
                    </span>
                    <a
                      href={activeNote.pdfDataUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline flex items-center space-x-1 text-[11px]"
                    >
                      <span>Open in New Tab</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <iframe
                    src={activeNote.pdfDataUrl}
                    title={activeNote.title}
                    className="w-full h-[580px] border-0"
                  />
                </div>
              </div>
            ) : null}

            {/* Key Takeaways Callout */}
            {activeNote.keyPoints && activeNote.keyPoints.length > 0 && (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center space-x-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Key Examination Takeaways</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeNote.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* IMA Exam Trap & Tips */}
            {activeNote.imaExamTips && activeNote.imaExamTips.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center space-x-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>IMA Prometric Exam Tips</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-900">
                  {activeNote.imaExamTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Body Content */}
            {activeNote.content && (
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4 font-sans">
                {activeNote.content}
              </div>
            )}

            {/* Bottom Complete Bar */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Chapter read status: {progress.completedNotes.includes(activeNote.id) ? 'Completed' : 'In Progress'}
              </span>
              <button
                onClick={() => onToggleCompleted(activeNote.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                  progress.completedNotes.includes(activeNote.id)
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {progress.completedNotes.includes(activeNote.id) ? '✓ Marked as Completed' : 'Mark as Completed'}
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
            Select a study chapter from the list to begin reading.
          </div>
        )}
      </div>

      {/* PDF UPLOAD MODAL */}
      {isPdfUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                  <Upload className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Add Study Note via PDF</h3>
              </div>
              <button
                onClick={() => setIsPdfUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF File Picker Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center bg-slate-50 hover:bg-blue-50/30 transition cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <FileText className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              {pdfFile ? (
                <div>
                  <p className="text-xs font-bold text-slate-900 truncate">{pdfFile.name}</p>
                  <p className="text-[11px] text-slate-500">{Math.round(pdfFile.size / 1024)} KB • Click to choose another file</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold text-slate-800">Click to select a PDF file</p>
                  <p className="text-[11px] text-slate-500 mt-1">Upload lecture notes, CMA summaries, or slide handouts</p>
                </div>
              )}
            </div>

            {/* Meta details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold block text-slate-700 mb-1">CMA Part</label>
                <select
                  value={pdfPart}
                  onChange={(e) => setPdfPart(e.target.value as CmaPart)}
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
                  value={pdfSection}
                  onChange={(e) => setPdfSection(e.target.value)}
                  placeholder="Section A: Reporting Decisions"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Note Title</label>
              <input
                type="text"
                value={pdfTitle}
                onChange={(e) => setPdfTitle(e.target.value)}
                placeholder="e.g. Cost Accounting Summary & Formulas"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold"
              />
            </div>

            <div className="text-xs space-y-1">
              <label className="font-semibold block text-slate-700">Short Summary</label>
              <textarea
                rows={2}
                value={pdfSummary}
                onChange={(e) => setPdfSummary(e.target.value)}
                placeholder="Brief summary of key concepts covered in this PDF..."
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsPdfUploadModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePdfNote}
                disabled={uploadLoading || !pdfFile}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                {uploadLoading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload & Save PDF Note</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
