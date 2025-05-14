import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send } from "lucide-react";
import useRealtimeSession from "@/hooks/useRealtimeSession";

const TurnBasedInterview = () => {
  const [currentQuestion, setCurrentQuestion] = useState("Tell me about your experience with React.");
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [transcript, setTranscript] = useState("No transcript available");
  const { start, stop, status, items, audioRef } = useRealtimeSession();
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = async () => {
    setIsRecording(true);
    await start();
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    await stop();
    // Update transcript from the last user message
    const lastUserMessage = items
      .filter((item) => item.role === "user")
      .pop();
    if (lastUserMessage?.content) {
      setTranscript(lastUserMessage.content.map(c => c.text).join(""));
    }
  };

  const handleSubmitAnswer = () => {
    // Here you would handle submitting the answer and getting the next question
    console.log("Submitting answer:", writtenAnswer || transcript);
    // For demo purposes, just change the question
    setCurrentQuestion("What are your thoughts on React hooks?");
    setWrittenAnswer("");
    setTranscript("No transcript available");
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-interview-dark">Turn-based Interview</h1>
            <Button variant="outline" className="text-interview-primary">
              Finish Interview
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Question:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{currentQuestion}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Voice Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Button
                    size="lg"
                    className={`rounded-full p-8 ${
                      isRecording 
                        ? "bg-red-500 hover:bg-red-600" 
                        : "bg-interview-primary hover:bg-interview-secondary"
                    }`}
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                  >
                    <Mic className="h-8 w-8" />
                  </Button>
                  <p className="text-sm text-gray-500">
                    {isRecording ? "Click to stop recording" : "Click to start recording"}
                  </p>
                  <div className="w-full mt-4">
                    <h3 className="font-medium mb-2">Live Transcript</h3>
                    <div className="bg-gray-50 p-4 rounded-md min-h-[100px] text-gray-600">
                      {transcript}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Written Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your answer here..."
                    className="min-h-[200px]"
                    value={writtenAnswer}
                    onChange={(e) => setWrittenAnswer(e.target.value)}
                  />
                  <Button 
                    className="w-full bg-interview-primary hover:bg-interview-secondary"
                    onClick={handleSubmitAnswer}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TurnBasedInterview;