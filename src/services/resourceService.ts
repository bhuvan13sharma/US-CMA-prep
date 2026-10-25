import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { StudyNote, FormulaDefinition, MCQQuestion, ResourceItem } from '../types/index.ts';
import { INITIAL_NOTES, INITIAL_FORMULAS, INITIAL_QUESTIONS } from '../data/initialData.ts';

const CUSTOM_NOTES_KEY = 'cma_custom_notes';
const CUSTOM_QUESTIONS_KEY = 'cma_custom_questions';
const CUSTOM_FORMULAS_KEY = 'cma_custom_formulas';

export class ResourceService {
  // NOTES
  static getNotes(): StudyNote[] {
    const local = localStorage.getItem(CUSTOM_NOTES_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    return INITIAL_NOTES;
  }

  static async saveNote(note: StudyNote, userEmail: string): Promise<StudyNote[]> {
    const current = this.getNotes();
    const existingIndex = current.findIndex(n => n.id === note.id);
    let updated: StudyNote[];

    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...note, updatedAt: new Date().toISOString().split('T')[0] };
    } else {
      updated = [{ ...note, isCustom: true, updatedAt: new Date().toISOString().split('T')[0] }, ...current];
    }

    localStorage.setItem(CUSTOM_NOTES_KEY, JSON.stringify(updated));

    // Sync to Firestore
    try {
      const resourceDoc: ResourceItem = {
        id: note.id,
        type: 'note',
        part: note.part,
        topic: note.topic,
        title: note.title,
        content: note.content,
        authorEmail: userEmail,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: [note.sectionCode],
      };
      await setDoc(doc(db, 'resources', note.id), resourceDoc);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `resources/${note.id}`);
    }

    return updated;
  }

  static async deleteNote(noteId: string): Promise<StudyNote[]> {
    const current = this.getNotes();
    const filtered = current.filter(n => n.id !== noteId);
    localStorage.setItem(CUSTOM_NOTES_KEY, JSON.stringify(filtered));

    try {
      await deleteDoc(doc(db, 'resources', noteId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `resources/${noteId}`);
    }

    return filtered;
  }

  // QUESTIONS (MCQ)
  static getQuestions(): MCQQuestion[] {
    const local = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    return INITIAL_QUESTIONS;
  }

  static async saveQuestion(question: MCQQuestion, userEmail: string): Promise<MCQQuestion[]> {
    const current = this.getQuestions();
    const existingIndex = current.findIndex(q => q.id === question.id);
    let updated: MCQQuestion[];

    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = question;
    } else {
      updated = [{ ...question, isCustom: true }, ...current];
    }

    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(updated));

    try {
      const resourceDoc: ResourceItem = {
        id: question.id,
        type: 'mcq',
        part: question.part,
        topic: question.topic,
        title: question.questionText.slice(0, 80) + '...',
        content: question.questionText,
        options: question.options,
        correctOption: question.correctOptionIndex,
        explanation: question.explanation,
        difficulty: question.difficulty,
        authorEmail: userEmail,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'resources', question.id), resourceDoc);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `resources/${question.id}`);
    }

    return updated;
  }

  static async deleteQuestion(questionId: string): Promise<MCQQuestion[]> {
    const current = this.getQuestions();
    const filtered = current.filter(q => q.id !== questionId);
    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(filtered));

    try {
      await deleteDoc(doc(db, 'resources', questionId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `resources/${questionId}`);
    }

    return filtered;
  }

  // FORMULAS
  static getFormulas(): FormulaDefinition[] {
    const local = localStorage.getItem(CUSTOM_FORMULAS_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Re-attach calculator functions
          return parsed.map((item: any) => {
            const base = INITIAL_FORMULAS.find(f => f.id === item.id);
            if (base) {
              return { ...base, ...item };
            }
            return {
              ...item,
              calculate: () => ({ result: 0, stepByStep: 'Formula calculated.' }),
            };
          });
        }
      } catch {
        // fallback
      }
    }
    return INITIAL_FORMULAS;
  }

  static async saveFormula(formula: FormulaDefinition, userEmail: string): Promise<FormulaDefinition[]> {
    const current = this.getFormulas();
    const existingIndex = current.findIndex(f => f.id === formula.id);
    let updated: FormulaDefinition[];

    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = formula;
    } else {
      updated = [{ ...formula, isCustom: true }, ...current];
    }

    // Strip functions for JSON storage
    const storable = updated.map(({ calculate, ...rest }) => rest);
    localStorage.setItem(CUSTOM_FORMULAS_KEY, JSON.stringify(storable));

    try {
      const resourceDoc: ResourceItem = {
        id: formula.id,
        type: 'formula',
        part: formula.part,
        topic: formula.category,
        title: formula.name,
        content: formula.explanation,
        formulaEquation: formula.equation,
        authorEmail: userEmail,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'resources', formula.id), resourceDoc);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `resources/${formula.id}`);
    }

    return updated;
  }

  static async deleteFormula(formulaId: string): Promise<FormulaDefinition[]> {
    const current = this.getFormulas();
    const filtered = current.filter(f => f.id !== formulaId);
    const storable = filtered.map(({ calculate, ...rest }) => rest);
    localStorage.setItem(CUSTOM_FORMULAS_KEY, JSON.stringify(storable));

    try {
      await deleteDoc(doc(db, 'resources', formulaId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `resources/${formulaId}`);
    }

    return filtered;
  }

  // Restore defaults
  static resetAllToDefaults(): void {
    localStorage.removeItem(CUSTOM_NOTES_KEY);
    localStorage.removeItem(CUSTOM_QUESTIONS_KEY);
    localStorage.removeItem(CUSTOM_FORMULAS_KEY);
  }
}
