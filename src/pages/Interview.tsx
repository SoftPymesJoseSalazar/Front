import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import VoiceInterview from "@/components/interview/VoiceInterview";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

interface TranscriptEntry {
  role: "interviewer" | "user";
  text: string;
}

const Interview = () => {
  const { type = "general" } = useParams();
  const navigate = useNavigate();
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [interviewMode, setInterviewMode] = useState<"realtime" | "turn-based">("realtime");
  const { theme, setTheme } = useTheme();
  
  const handleInterviewComplete = (transcript: TranscriptEntry[]) => {
    console.log("Interview completed with transcript:", transcript);
    navigate("/results/sample-interview-1");
  };
  
  const formatInterviewType = (type: string) => {
    return type
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-interview-dark dark:text-white">
            AI-Assisted {formatInterviewType(type)} Interview
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <Alert variant="default" className="bg-interview-background dark:bg-gray-800 border-interview-primary/30">
            <Info className="h-4 w-4 text-interview-primary" />
            <AlertTitle className="dark:text-white">Interview Session</AlertTitle>
            <AlertDescription className="dark:text-gray-300">
              Choose your preferred interview mode below. You can either have a real-time conversation with the AI
              or proceed with a turn-based interview format.
            </AlertDescription>
          </Alert>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="realtime" className="w-full" onValueChange={(value) => setInterviewMode(value as "realtime" | "turn-based")}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="realtime">Realtime Interview</TabsTrigger>
              <TabsTrigger value="turn-based">Turn-based Interview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="realtime">
              <VoiceInterview 
                interviewType={type} 
                onComplete={handleInterviewComplete}
              />
            </TabsContent>
            
            <TabsContent value="turn-based">
              <div className="text-center">
                <Button 
                  onClick={() => navigate("/turn-based-interview")}
                  className="bg-interview-primary hover:bg-interview-secondary text-white"
                >
                  Start Turn-based Interview
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Interview;