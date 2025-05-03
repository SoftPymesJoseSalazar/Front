
export interface ProfileData {
  name: string;
  email: string;
  role: string;
  experience: string;
  about: string;
  targetRoles: string[];
  skills: string[];
  interviewStats?: {
    completed: number;
    avgScore: number;
    totalHires: number;
    lastInterview: string;
  };
}
