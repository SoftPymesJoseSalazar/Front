
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Download, MessageSquare, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Mock data for the result
const mockResult = {
  id: "sample-interview-1",
  title: "Software Engineer Technical Interview",
  date: "April 24, 2025",
  duration: "18 minutes",
  overallScore: 78,
  questions: [
    {
      question: "Can you describe your experience with React and TypeScript?",
      answer: "I've been using React for 3 years and TypeScript for about 2 years. I've built several production applications using this stack, including an e-commerce platform and a dashboard for data analytics. I particularly value TypeScript for its type safety and the improved developer experience it provides when working with complex component props and state management.",
      feedback: "Good detailed answer with specific examples. You clearly demonstrated your experience level and highlighted the benefits of the technologies.",
      score: 85,
    },
    {
      question: "How do you approach debugging a complex issue in a web application?",
      answer: "I typically start by reproducing the issue reliably. Then I use browser dev tools to identify potential errors in the console and network tab. If necessary, I'll add logging at key points in the code. For React specifically, I use React DevTools to inspect component state and props. If it's a performance issue, I'll use the Performance tab to identify bottlenecks.",
      feedback: "Strong methodical approach. You could improve by mentioning how you would isolate the problem using techniques like bisection debugging.",
      score: 80,
    },
    {
      question: "Explain how you would design a scalable API for a high-traffic application.",
      answer: "For a high-traffic application, I'd focus on caching strategies using Redis or similar technology. I'd implement horizontal scaling with load balancers, and design the API with RESTful principles or GraphQL depending on the client needs. Database optimization would be crucial, with proper indexing and potentially sharding for very large datasets.",
      feedback: "Your answer covers the technical aspects well, but could be improved by discussing rate limiting, authentication strategies, and API versioning policies.",
      score: 75,
    },
    {
      question: "How do you stay updated with the latest developments in web technologies?",
      answer: "I follow several tech blogs and newsletters, and I'm active in some developer communities on Discord and Reddit. I also try to attend local meetups when possible and occasionally contribute to open source projects to see how other developers are using new technologies.",
      feedback: "Good variety of sources. Consider mentioning specific blogs or newsletters you follow to demonstrate your commitment to continuous learning.",
      score: 70,
    },
    {
      question: "Describe a challenging project you worked on and how you overcame obstacles.",
      answer: "I worked on migrating a large legacy application from jQuery to React. The main challenge was that we couldn't do it all at once and needed to maintain functionality throughout the process. I implemented a strategy where we could run both frameworks side by side, gradually moving components over while ensuring they could still communicate with the legacy code.",
      feedback: "Excellent answer with a specific example that demonstrates problem-solving abilities and technical knowledge. You clearly explained the challenge and your solution.",
      score: 90,
    },
  ],
  skills: {
    technical: 82,
    communication: 75,
    problemSolving: 80,
    conciseness: 70,
  },
  recommendations: [
    "Practice providing more concrete examples when discussing your experience",
    "Consider learning more about API design best practices",
    "Work on more concise responses while maintaining informative content",
  ],
};

const InterviewResult = () => {
  const { id } = useParams();
  // In a real app, we would fetch the result data based on the ID
  const result = mockResult;

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-interview-primary hover:underline mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-interview-dark">
                Interview Result: {result.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                <span>{result.date}</span>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{result.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-1 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar with scores */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="h-24 w-24 rounded-full border-8 flex items-center justify-center mb-3"
                    style={{
                      borderColor: result.overallScore >= 80 ? '#16a34a' : result.overallScore >= 60 ? '#ca8a04' : '#dc2626',
                    }}
                  >
                    <span className="text-3xl font-bold" style={{
                      color: result.overallScore >= 80 ? '#16a34a' : result.overallScore >= 60 ? '#ca8a04' : '#dc2626',
                    }}>
                      {result.overallScore}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {result.overallScore >= 80
                      ? "Excellent performance!"
                      : result.overallScore >= 60
                      ? "Good job with room for improvement"
                      : "Needs significant improvement"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Skills Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Technical Knowledge</span>
                    <span className="text-sm font-medium">{result.skills.technical}%</span>
                  </div>
                  <Progress value={result.skills.technical} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Communication</span>
                    <span className="text-sm font-medium">{result.skills.communication}%</span>
                  </div>
                  <Progress value={result.skills.communication} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Problem Solving</span>
                    <span className="text-sm font-medium">{result.skills.problemSolving}%</span>
                  </div>
                  <Progress value={result.skills.problemSolving} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Conciseness</span>
                    <span className="text-sm font-medium">{result.skills.conciseness}%</span>
                  </div>
                  <Progress value={result.skills.conciseness} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600">{rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main content with questions and answers */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-lg">Interview Transcript & Feedback</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="all">
                  <div className="border-b px-4">
                    <TabsList className="h-12">
                      <TabsTrigger value="all" className="data-[state=active]:text-interview-primary">All Questions</TabsTrigger>
                      <TabsTrigger value="strengths" className="data-[state=active]:text-interview-primary">Strengths</TabsTrigger>
                      <TabsTrigger value="improvements" className="data-[state=active]:text-interview-primary">Needs Improvement</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="all" className="p-0">
                    {result.questions.map((q, index) => (
                      <div key={index} className="border-b last:border-b-0 p-4">
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium text-interview-dark">
                              Q{index + 1}: {q.question}
                            </h3>
                            <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium"
                              style={{
                                backgroundColor: q.score >= 80 ? '#dcfce7' : q.score >= 60 ? '#fef9c3' : '#fee2e2',
                                color: q.score >= 80 ? '#16a34a' : q.score >= 60 ? '#ca8a04' : '#dc2626',
                              }}
                            >
                              Score: {q.score}
                            </span>
                          </div>
                          <p className="text-sm bg-gray-50 p-3 rounded text-gray-700">{q.answer}</p>
                        </div>
                        <div className="bg-interview-background p-3 rounded flex items-start">
                          <MessageSquare className="h-4 w-4 text-interview-primary mt-0.5 mr-2 flex-shrink-0" />
                          <div className="text-sm text-gray-600">{q.feedback}</div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="strengths">
                    {result.questions
                      .filter(q => q.score >= 80)
                      .map((q, index) => (
                        <div key={index} className="border-b last:border-b-0 p-4">
                          <div className="mb-3">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-medium text-interview-dark">{q.question}</h3>
                              <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-700">
                                Score: {q.score}
                              </span>
                            </div>
                            <p className="text-sm bg-gray-50 p-3 rounded text-gray-700">{q.answer}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded flex items-start">
                            <MessageSquare className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div className="text-sm text-gray-600">{q.feedback}</div>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="improvements">
                    {result.questions
                      .filter(q => q.score < 80)
                      .map((q, index) => (
                        <div key={index} className="border-b last:border-b-0 p-4">
                          <div className="mb-3">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-medium text-interview-dark">{q.question}</h3>
                              <span className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm font-medium"
                                style={{
                                  backgroundColor: q.score >= 60 ? '#fef9c3' : '#fee2e2',
                                  color: q.score >= 60 ? '#ca8a04' : '#dc2626',
                                }}
                              >
                                Score: {q.score}
                              </span>
                            </div>
                            <p className="text-sm bg-gray-50 p-3 rounded text-gray-700">{q.answer}</p>
                          </div>
                          <div className="bg-amber-50 p-3 rounded flex items-start">
                            <MessageSquare className="h-4 w-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div className="text-sm text-gray-600">{q.feedback}</div>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewResult;
