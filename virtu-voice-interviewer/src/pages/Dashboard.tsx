
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, Calendar, Clock, MessageSquare, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import InterviewResultCard from "@/components/dashboard/InterviewResultCard";

// Mock data for past interviews
const pastInterviews = [
  {
    id: "sample-interview-1",
    title: "Software Engineer Technical Screening",
    date: "April 24, 2025",
    duration: "18 minutes",
    score: 78,
    questionCount: 5,
  },
  {
    id: "sample-interview-2",
    title: "Product Manager Initial Screen",
    date: "April 22, 2025",
    duration: "22 minutes",
    score: 85,
    questionCount: 6,
  },
  {
    id: "sample-interview-3",
    title: "General HR Screening",
    date: "April 18, 2025",
    duration: "15 minutes",
    score: 92,
    questionCount: 4,
  },
];

// Mock data for stats
const stats = [
  {
    title: "Interviews Scheduled",
    value: "8",
    icon: <MessageSquare className="h-4 w-4 text-interview-primary" />,
  },
  {
    title: "Average Score",
    value: "82%",
    icon: <BarChart2 className="h-4 w-4 text-interview-primary" />,
  },
  {
    title: "Total Time",
    value: "3.2 hrs",
    icon: <Clock className="h-4 w-4 text-interview-primary" />,
  },
  {
    title: "Next Interview",
    value: "Today",
    icon: <Calendar className="h-4 w-4 text-interview-primary" />,
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-interview-dark">Dashboard</h1>
            <p className="text-gray-600">
              Manage your AI-powered screening interviews
            </p>
          </div>
          <Link to="/new-interview">
            <Button className="mt-4 sm:mt-0 bg-interview-primary hover:bg-interview-secondary">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 flex items-center">
                  {stat.icon}
                  <span className="ml-2">{stat.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interview History and Analytics */}
        <Tabs defaultValue="history" className="mb-8">
          <TabsList>
            <TabsTrigger value="history">Interview History</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Recent Interviews</CardTitle>
                <CardDescription>
                  Review past candidate screening sessions and results
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {pastInterviews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pastInterviews.map((interview) => (
                      <InterviewResultCard
                        key={interview.id}
                        id={interview.id}
                        title={interview.title}
                        date={interview.date}
                        duration={interview.duration}
                        score={interview.score}
                        questionCount={interview.questionCount}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">No interviews have been scheduled yet</p>
                    <Link to="/new-interview">
                      <Button className="bg-interview-primary hover:bg-interview-secondary">
                        Schedule Your First Interview
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track candidate performance metrics across different interview types
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p>Analytics will be available after conducting more interviews</p>
                  <p className="text-sm mt-2">
                    Schedule at least 3 interviews to see meaningful patterns
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recommendations Section */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Templates</CardTitle>
            <CardDescription>
              Quick access to common interview types for scheduling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Technical Screening",
                  description: "AI-powered technical assessment for engineering candidates",
                  link: "/interview/software-engineer",
                },
                {
                  title: "Behavioral Assessment",
                  description: "Evaluate soft skills and cultural fit with AI interviews",
                  link: "/interview/behavioral",
                },
                {
                  title: "Initial HR Screen",
                  description: "Automated preliminary candidate screening for HR",
                  link: "/interview/hr-screening",
                },
              ].map((rec, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{rec.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
                    <Link to={rec.link}>
                      <Button variant="outline" size="sm" className="w-full text-interview-primary border-interview-primary hover:bg-interview-background">
                        Schedule Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
