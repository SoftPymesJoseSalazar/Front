import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getDefaultQuestions(role: string) {
  const { data, error } = await supabase
    .from('default_questions')
    .select('questions')
    .eq('role', role)
    .single();

  if (error) {
    console.error('Error fetching default questions:', error);
    return [];
  }

  return data?.questions || [];
}

export async function createInterview(role: string) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('interviews')
    .insert([{ 
      role,
      user_id: userData.user.id,
      status: 'in_progress'
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating interview:', error);
    return null;
  }

  return data;
}

export async function saveInterviewQA(
  interviewId: string,
  question: string,
  answer: string,
  score: number,
  feedback: string
) {
  const { error } = await supabase
    .from('interview_qa')
    .insert([{
      interview_id: interviewId,
      question,
      answer,
      score,
      feedback
    }]);

  if (error) {
    console.error('Error saving interview Q&A:', error);
    return false;
  }

  return true;
}

export async function updateInterviewScore(interviewId: string, score: number) {
  const { error } = await supabase
    .from('interviews')
    .update({ 
      score, 
      status: 'completed'
    })
    .eq('id', interviewId);

  if (error) {
    console.error('Error updating interview score:', error);
    return false;
  }

  return true;
}

export async function getUserInterviews() {
  const { data, error } = await supabase
    .from('interviews')
    .select(`
      *,
      interview_qa (
        question,
        answer,
        score,
        feedback
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user interviews:', error);
    return [];
  }

  return data || [];
}