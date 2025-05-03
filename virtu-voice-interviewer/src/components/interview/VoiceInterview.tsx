import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Send, StopCircle } from "lucide-react";
import { Item } from "@/types";
import useRealtimeSession, { RealtimeStatus } from "@/hooks/useRealtimeSession";
import { supabase } from "@/integrations/supabase/client";

interface VoiceInterviewProps {
  interviewType: string;
  onComplete: (transcript: any[]) => void;
}

interface TranscriptEntry {
  role: "interviewer" | "user";
  text: string;
}

const VoiceInterview = ({ interviewType }: VoiceInterviewProps) => {
  const { start, stop, status, items, audioRef, updateSession } = useRealtimeSession();

  const transcript = items.filter((i) => i.type === "message") as Item[];

  const isConnected = status === "connected";

  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (audioRef.current && localAudioRef.current !== audioRef.current) {
      localAudioRef.current?.replaceWith(audioRef.current);
      localAudioRef.current = audioRef.current;
      document.body.appendChild(audioRef.current); // keep it alive
    }
  }, [audioRef.current]);

  // Session update config
  const [instructions, setInstructions] = useState<string>("");
  const [enableTranscription, setEnableTranscription] = useState<boolean>(true);
  const [transcriptionModel, setTranscriptionModel] = useState<string>("whisper-1");

  // Save full transcript on end
  const saveConversation = async () => {
    const { data, error } = await supabase
      .from("interviews")
      .insert({ interview_type: interviewType, transcript: items, created_at: new Date().toISOString() });
    if (error) console.error("Error saving conversation", error);
    else console.log("Conversation saved", data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="p-6 shadow-md">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Realtime Interview</h2>
            <span
              className={{
                idle: "text-gray-500",
                connecting: "text-yellow-600",
                connected: "text-green-600",
                error: "text-red-600",
                closed: "text-gray-500",
              }[status]}
            >
              {status}
            </span>
          </div>

          {/* Transcript */}
          <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto space-y-3">
            {transcript.length === 0 ? (
              <p className="text-center text-gray-500">No messages yet</p>
            ) : (
              transcript.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-md max-w-[80%] whitespace-pre-wrap ${
                    m.role === "user"
                      ? "ml-auto bg-interview-primary text-white"
                      : m.role === "assistant"
                        ? "mr-auto bg-interview-background text-interview-dark"
                        : "mr-auto bg-gray-200 text-gray-800"
                  }`}
                >
                  {(m.content || []).map((c, idx) => (
                    <span key={idx}>{c.text}</span>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Session Update Config */}
          <div className="mt-4 border-t pt-4 space-y-3">
            <label className="block text-sm font-medium">Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={enableTranscription}
                onChange={(e) => setEnableTranscription(e.target.checked)}
              />
              <span className="text-sm">Enable Transcription</span>
            </label>
            {enableTranscription && (
              <div className="flex items-center space-x-2">
                <label className="text-sm">Model:</label>
                <select
                  value={transcriptionModel}
                  onChange={(e) => setTranscriptionModel(e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="whisper-1">whisper-1</option>
                </select>
              </div>
            )}
            <Button
              variant="outline"
              onClick={() =>
                updateSession({
                  instructions,
                  ...(enableTranscription
                    ? { input_audio_transcription: { model: transcriptionModel } }
                    : {}),
                })
              }
            >
              Update Session
            </Button>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isConnected ? (
              <Button onClick={start} disabled={status === "connecting"} className="bg-interview-primary">
                {status === "connecting" ? "Connecting..." : "Start Interview"}
              </Button>
            ) : (
              <Button variant="destructive" onClick={async () => { stop(); await saveConversation(); }}>
                End Interview
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VoiceInterview;
