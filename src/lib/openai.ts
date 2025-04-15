import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateQuestion = async (role: string, previousQuestions: string[] = [], previousAnswers: string[] = [], cvText?: string) => {
  const conversation = previousQuestions.map((q, i) => ({
    role: 'assistant' as const,
    content: q,
    name: 'interviewer'
  })).flatMap((q, i) => [
    q,
    {
      role: 'user' as const,
      content: previousAnswers[i] || '',
      name: 'candidate'
    }
  ]);

  const systemPrompt = cvText
    ? `You are an expert technical interviewer. Based on the following CV content: "${cvText}", generate relevant interview questions that assess the candidate's experience and skills mentioned in their CV. Focus on technical aspects and real-world scenarios from their background.`
    : `You are an expert technical interviewer for ${role} positions. Generate relevant interview questions based on the candidate's previous answers. Keep questions technical and specific to the role. Be concise and direct.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      ...conversation,
      {
        role: "user",
        content: "Generate the next interview question."
      }
    ]
  });

  return response.choices[0]?.message?.content || "Could not generate question";
};

export const evaluateAnswer = async (role: string, question: string, answer: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an expert evaluator for ${role} positions. Evaluate the candidate's answer based on technical accuracy, clarity, and relevance. Provide a score from 0-100 and a brief explanation. Return the response in JSON format with 'score' and 'feedback' fields.`
      },
      {
        role: "user",
        content: `Question: ${question}\nAnswer: ${answer}\n\nEvaluate this answer.`
      }
    ]
  });

  try {
    const evaluation = JSON.parse(response.choices[0]?.message?.content || "{}");
    return {
      score: evaluation.score || 0,
      feedback: evaluation.feedback || "No feedback available"
    };
  } catch (e) {
    return {
      score: 0,
      feedback: "Error processing evaluation"
    };
  }
};