
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import VoiceInterview from "@/components/interview/VoiceInterview";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

// Import the TranscriptEntry interface to use in this file
interface TranscriptEntry {
  role: "interviewer" | "user";
  text: string;
}

const Interview = () => {
  const { type = "general" } = useParams();
  const navigate = useNavigate();
  const [interviewComplete, setInterviewComplete] = useState(false);
  
  // Updated to use TranscriptEntry[] instead of string[]
  const handleInterviewComplete = (transcript: TranscriptEntry[]) => {
    // In a real app, we would save the transcript and results to a database
    console.log("Interview completed with transcript:", transcript);
    
    // Navigate to results page with a simulated ID
    navigate("/results/sample-interview-1");
  };
  
  // Format interview type for display
  const formatInterviewType = (type: string) => {
    return type
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-interview-dark">
            AI-Assisted {formatInterviewType(type)} Interview
          </h1>
          <p className="text-gray-600">
            Your AI interviewer will ask a series of questions. Speak clearly when answering and take your time.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <Alert variant="default" className="bg-interview-background border-interview-primary/30">
            <Info className="h-4 w-4 text-interview-primary" />
            <AlertTitle>Interview Session</AlertTitle>
            <AlertDescription>
              This is an AI-powered interview. You'll interact with our AI interviewer through your microphone.
              Your responses will be evaluated in real-time.
            </AlertDescription>
          </Alert>
        </div>
        
        <VoiceInterview 
          interviewType={type} 
          onComplete={handleInterviewComplete}
        />
      </div>
    </Layout>
  );
};

export default Interview;
