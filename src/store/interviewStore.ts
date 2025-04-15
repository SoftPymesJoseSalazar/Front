import { create } from 'zustand';
import { generateQuestion, evaluateAnswer } from '../lib/openai';

interface Answer {
  question: string;
  answer: string;
  score?: number;
  feedback?: string;
}

interface InterviewStore {
  role: string;
  currentQuestion: string;
  answers: Answer[];
  isLoading: boolean;
  setRole: (role: string) => void;
  startInterview: (role: string) => Promise<void>;
  submitAnswer: (answer: string) => Promise<void>;
}

export const useInterviewStore = create<InterviewStore>((set, get) => ({
  role: '',
  currentQuestion: '',
  answers: [],
  isLoading: false,

  setRole: (role) => set({ role }),

  startInterview: async (role) => {
    set({ isLoading: true, role });
    try {
      const question = await generateQuestion(role);
      set({ currentQuestion: question, answers: [] });
    } catch (error) {
      console.error('Error starting interview:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  submitAnswer: async (answer) => {
    const { role, currentQuestion, answers } = get();
    set({ isLoading: true });

    try {
      // Evaluate the current answer
      const evaluation = await evaluateAnswer(role, currentQuestion, answer);
      
      // Store the answer and evaluation
      const newAnswers = [...answers, {
        question: currentQuestion,
        answer,
        score: evaluation.score,
        feedback: evaluation.feedback
      }];

      // Generate the next question
      const nextQuestion = await generateQuestion(
        role,
        answers.map(a => a.question),
        answers.map(a => a.answer)
      );

      set({
        answers: newAnswers,
        currentQuestion: nextQuestion
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));