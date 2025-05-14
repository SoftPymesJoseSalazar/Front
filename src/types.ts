export type Item = {
  id: string;
  object: string; // e.g. "realtime.item"
  type: "message" | "function_call" | "function_call_output";
  timestamp?: string;
  status?: "running" | "completed";
  // For "message" items
  role?: "system" | "user" | "assistant" | "tool";
  content?: { type: string; text: string }[];
  // For "function_call" items
  name?: string;
  call_id?: string;
  params?: Record<string, any>;
  // For "function_call_output" items
  output?: string;
};

export interface InterviewSession {
  id: string;
  user_id: string;
  interview_type: string;
  role: string;
  experience_level: string;
  status: "in_progress" | "completed";
  created_at: string;
  updated_at: string;
}

export interface InterviewQuestion {
  id: string;
  session_id: string;
  question: string;
  question_type: string;
  order_number: number;
  created_at: string;
}

export interface InterviewAnswer {
  id: string;
  question_id: string;
  session_id: string;
  answer_text?: string;
  voice_url?: string;
  score?: number;
  feedback?: string;
  created_at: string;
}