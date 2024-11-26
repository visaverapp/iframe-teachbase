export interface QuizApiResponse {
  publicId: string;
  data: QuizResults[];
}
export interface QuizResults {
  chapter: Chapter;
  quiz: Quiz[];
}
export interface QuizResultsSlice {
  chapter: Chapter;
  quiz: Quiz[];
  answer: string | null;
}

export interface Chapter {
  title: string;
  text: string;
  start: number | string;
}

export interface Quiz {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

export interface QuizSlice {
  question: string;
  answers: string[];
  correctAnswer: string;
  answer: string | null;
  start: number | string;
}
