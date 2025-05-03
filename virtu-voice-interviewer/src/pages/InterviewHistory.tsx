import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Simple type for fetched interviews
interface InterviewRecord {
  id: number;
  interview_type: string;
  transcript: any;
  created_at: string;
}

// Fetch function
const fetchInterviews = async (): Promise<InterviewRecord[]> => {
  const { data, error } = await supabase
    .from("interviews")
    .select("id, interview_type, created_at, transcript")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

const InterviewHistory = () => {
  const { data, isLoading, error } = useQuery<InterviewRecord[], Error>({
    queryKey: ["interviews"],
    queryFn: fetchInterviews,
  });

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Interview History</h1>
        {isLoading && <p>Loading interviews...</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}
        {!isLoading && data?.length === 0 && <p>No interviews found.</p>}
        <div className="space-y-4">
          {data?.map((iv) => (
            <Card key={iv.id}>
              <CardHeader>
                <CardTitle>{iv.interview_type}</CardTitle>
                <p className="text-sm text-gray-500">
                  {new Date(iv.created_at).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent>
                <Link to={`/results/${iv.id}`} className="text-interview-primary hover:underline">
                  View Details
                </Link>
                {/* Render readable transcript */}
                <div className="mt-4 bg-gray-50 rounded-lg p-2 space-y-2 max-h-48 overflow-y-auto">
                  {iv.transcript?.map((item: any) => (
                    <div
                      key={item.id}
                      className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`inline-block p-2 rounded ${
                          item.role === "user"
                            ? "bg-interview-primary text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {item.content?.map((c: any) => c.text).join("")}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{item.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default InterviewHistory;
