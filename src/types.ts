/**
 * TypeScript definitions for the Horror Grade Test App
 */

export interface Option {
  id: "A" | "B" | "C" | "D";
  text: string;
  gradeValue: number; // Mapping: 1, 2, 3, or 4
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface UserAnswer {
  questionId: number;
  question: string;
  choiceId: "A" | "B" | "C" | "D";
  selectedOptionText: string;
  gradeValue: number;
}

export interface AnalysisResult {
  grade: number; // 1 | 2 | 3 | 4
  characterName: string;
  faceAnalysis: string;
  personalityAnalysis: string;
  prophecy: string;
}
