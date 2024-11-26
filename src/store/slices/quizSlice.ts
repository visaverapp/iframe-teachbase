import { createSlice } from '@reduxjs/toolkit';

import { videosAPI } from '@/api';
import { QuizSlice } from '@/types';

interface QuizState {
  done: boolean;
  activeQuestionIndex: number;
  correctCount: number;
  answers: string[][];
  questions: QuizSlice[];
  starts: Array<string | number>;
}

const initialState: QuizState = {
  done: false,
  activeQuestionIndex: 0,
  correctCount: 0,
  answers: [[]],
  questions: [],
  starts: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizRestart: (state) => {
      state.done = false;
      state.activeQuestionIndex = 0;
      state.answers = state.answers.map((a) => a.sort(() => Math.random() - 0.5));
      state.questions = state.questions.map((q) => ({ ...q, answer: null }));
      state.correctCount = 0;
    },
    setQuizDone: (state) => {
      state.done = true;
    },
    setActiveQuestionIndex: (state, { payload }: { payload: number }) => {
      state.activeQuestionIndex = payload;
    },

    setQuizAnswer: (state, { payload: { answer, question } }: { payload: { question: string; answer: string } }) => {
      const i = state.questions.findIndex((q) => q.question === question);
      state.questions[i].answer = answer;
      // state.answers[i] = answer;

      if (answer === state.questions[i].correctAnswer) {
        state.correctCount++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(videosAPI.endpoints.getVideoAllQuizzes.matchFulfilled, (state, { payload }) => {
        state.done = false;
        state.activeQuestionIndex = 0;
        state.questions = payload?.data
          .map((item) =>
            item.quiz.map((q) => ({
              ...q,
              start: item.chapter.start,
              answers: [q.correctAnswer, ...q.wrongAnswers].sort(() => Math.random() - 0.5),
              answer: null,
            })),
          )
          .flat();
        state.answers = payload?.data
          .map((q) => q.quiz[0].wrongAnswers.concat(q.quiz[0].correctAnswer).flat())
          .sort(() => Math.random() - 0.5);
      })
      .addMatcher(videosAPI.endpoints.getVideoAllQuizzes.matchPending, (state) => {
        state.done = false;
        state.activeQuestionIndex = 0;
        state.correctCount = 0;
        state.questions = [];
        state.answers = [[]];
      })
  },
});

export default quizSlice.reducer;
