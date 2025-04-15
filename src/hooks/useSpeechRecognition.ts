import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscriptChange?: (transcript: string) => void;
  onEnd?: () => void;
}

export const useSpeechRecognition = ({ onTranscriptChange, onEnd }: UseSpeechRecognitionProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      // Fix: Use window.webkitSpeechRecognition as fallback
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        // Fix: Handle recognition events
        recognition.onstart = () => {
          setIsRecording(true);
          setTranscript('');
        };

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          // Fix: Properly handle results
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            } else {
              interimTranscript += result[0].transcript;
            }
          }

          const currentTranscript = finalTranscript || interimTranscript;
          setTranscript(currentTranscript);
          onTranscriptChange?.(currentTranscript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
          onEnd?.();
        };

        recognition.onend = () => {
          setIsRecording(false);
          onEnd?.();
        };

        setRecognition(recognition);
      }
    }
  }, [onTranscriptChange, onEnd]);

  const startRecording = useCallback(() => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        // Fix: Handle already started error
        if ((error as Error).message.includes('already started')) {
          recognition.stop();
        } else {
          console.error('Speech recognition error:', error);
        }
      }
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  }, [recognition]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    toggleRecording,
    isSupported: !!recognition,
  };
};