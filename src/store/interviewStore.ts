import { create } from 'zustand';
import { generateQuestion, evaluateAnswer } from '../lib/openai';
import {
  createInterview,
  saveInterviewQA,
  updateInterviewScore,
  getDefaultQuestions
} from '../lib/supabase';

interface Answer {
  question: string;
  answer: string;
  score?: number;
  feedback?: string;
}

interface InterviewStore {
  role: string;
  currentQuestion: string;
  questions: string[];
  currentQuestionIndex: number;
  answers: Answer[];
  isLoading: boolean;
  interviewId: string | null;
  setRole: (role: string) => void;
  startInterview: (role: string, cvText?: string) => Promise<void>;
  submitAnswer: (answer: string) => Promise<void>;
  submitWrittenAnswer: (answer: string) => Promise<void>;
  finishInterview: () => Promise<void>;
}

export const useInterviewStore = create<InterviewStore>((set, get) => ({
  role: '',
  currentQuestion: '',
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  isLoading: false,
  interviewId: null,

  setRole: (role) => set({ role }),

  startInterview: async (role, cvText) => {
    set({ isLoading: true, role });
    try {
      // Create new interview in database
      const interview = await createInterview(role);
      if (!interview) throw new Error('Failed to create interview');

      set({ interviewId: interview.id });

      // Get default questions or generate from CV
      let questions: string[] = [];
      if (!cvText) {
        const defaultQuestions = await getDefaultQuestions(role);
        if (defaultQuestions.length > 0) {
          questions = defaultQuestions;
        }
      }

      // If no default questions or using CV, generate first question
      if (questions.length === 0) {
        const firstQuestion = await generateQuestion(role, [], [], cvText);
        questions = [firstQuestion];
      }

      set({ 
        questions,
        currentQuestion: questions[0],
        currentQuestionIndex: 0,
        answers: []
      });
    } catch (error) {
      console.error('Error starting interview:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  submitAnswer: async (answer) => {
    const { 
      role, 
      currentQuestion, 
      questions,
      currentQuestionIndex,
      answers, 
      interviewId 
    } = get();
    
    set({ isLoading: true });

    try {
      // Evaluate the answer
      const evaluation = await evaluateAnswer(role, currentQuestion, answer);
      
      // Save Q&A to database
      if (interviewId) {
        await saveInterviewQA(
          interviewId,
          currentQuestion,
          answer,
          evaluation.score,
          evaluation.feedback
        );
      }

      // Update local state with new answer
      const newAnswers = [...answers, {
        question: currentQuestion,
        answer,
        score: evaluation.score,
        feedback: evaluation.feedback
      }];

      // Generate next question if needed
      let nextQuestions = [...questions];
      if (currentQuestionIndex >= questions.length - 1) {
        const newQuestion = await generateQuestion(
          role,
          answers.map(a => a.question),
          answers.map(a => a.answer),
          sessionStorage.getItem('cvText') || undefined
        );
        nextQuestions = [...questions, newQuestion];
      }

      set({
        answers: newAnswers,
        questions: nextQuestions,
        currentQuestionIndex: currentQuestionIndex + 1,
        currentQuestion: nextQuestions[currentQuestionIndex + 1]
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  submitWrittenAnswer: async (answer) => {
    await get().submitAnswer(answer);
  },

  finishInterview: async () => {
    const { answers, interviewId } = get();
    set({ isLoading: true });

    try {
      if (!interviewId || answers.length === 0) return;

      const averageScore = Math.round(
        answers.reduce((acc, curr) => acc + (curr.score || 0), 0) / answers.length
      );

      await updateInterviewScore(interviewId, averageScore);
      
      // Reset store state
      set({
        role: '',
        currentQuestion: '',
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        interviewId: null
      });

      return averageScore;
    } catch (error) {
      console.error('Error finishing interview:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));