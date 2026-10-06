export type MaterialType = "pdf" | "video" | "notes" | "audio";

export interface Citation {
  label: string;
  page?: number;
  timestamp?: string;
  excerpt: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  citations?: Citation[];
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  lastReviewed?: string;
  repetitionStage?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  source: string;
}

export interface KeyPoint {
  id: string;
  title: string;
  category: "Core Concept" | "Formula" | "Exam Trap" | "Definition";
  content: string;
  examWeight: 1 | 2 | 3; // 1 = normal, 2 = high, 3 = critical exam alert
  mastered?: boolean;
}

export interface LectureData {
  id: string;
  title: string;
  course: string;
  type: MaterialType;
  fileSize: string;
  pages?: number;
  duration?: string;
  date: string;
  status: "ready" | "processing" | "uploaded";
  summaryBrief: string;
  summaryFull: string;
  topics: string[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  keyPoints: KeyPoint[];
  initialChat: ChatMessage[];
}
