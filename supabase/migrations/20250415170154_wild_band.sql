/*
  # Add default questions for roles

  1. Data
    - Add default questions for common roles
*/

-- Insert default questions for Frontend Developer
INSERT INTO default_questions (role, questions) VALUES (
  'Frontend Developer',
  '[
    "Can you explain the difference between controlled and uncontrolled components in React?",
    "What is the virtual DOM and how does it work?",
    "Explain the concept of CSS specificity and how it works",
    "What are React hooks and what problems do they solve?",
    "How do you handle state management in large React applications?",
    "Explain the concept of code splitting in modern web applications",
    "What are the best practices for optimizing React component performance?",
    "How do you implement responsive design in your projects?",
    "Explain how you would debug a performance issue in a React application",
    "What are your favorite dev tools for frontend development?"
  ]'
);

-- Insert default questions for Backend Developer
INSERT INTO default_questions (role, questions) VALUES (
  'Backend Developer',
  '[
    "Explain the differences between REST and GraphQL",
    "How do you handle database transactions and ensure data consistency?",
    "What strategies do you use for API versioning?",
    "Explain the concept of middleware in backend development",
    "How do you handle authentication and authorization in your APIs?",
    "What are your strategies for API error handling?",
    "How do you optimize database queries for performance?",
    "Explain your approach to writing maintainable and scalable code",
    "How do you handle logging and monitoring in production?",
    "What are your preferred tools for testing backend code?"
  ]'
);

-- Insert default questions for Full Stack Developer
INSERT INTO default_questions (role, questions) VALUES (
  'Full Stack Developer',
  '[
    "How do you handle state management between frontend and backend?",
    "Explain your approach to full-stack application architecture",
    "How do you ensure security in full-stack applications?",
    "What are your strategies for optimizing full-stack application performance?",
    "How do you handle data validation across the stack?",
    "Explain your experience with different databases and when to use each",
    "How do you manage deployments for full-stack applications?",
    "What are your preferred tools for full-stack development?",
    "How do you handle real-time features in your applications?",
    "Explain your debugging process across the full stack"
  ]'
);