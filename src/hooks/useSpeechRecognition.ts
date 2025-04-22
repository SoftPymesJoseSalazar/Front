import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscriptChange?: (transcript: string) => void;
  onEnd?: () => void;
}

export const useSpeechRecognition = ({ onTranscriptChange, onEnd }: UseSpeechRecognitionProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'es-ES';

        recognitionInstance.onstart = () => {
          setIsRecording(true);
          setError(null);
        };

        recognitionInstance.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            } else {
              interimTranscript += result[0].transcript;
            }
          }

          const currentTranscript = finalTranscript || interimTranscript;
          setTranscript((prev) => prev + ' ' + currentTranscript);
          onTranscriptChange?.(transcript + ' ' + currentTranscript);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setError(event.error);
          
          if (event.error === 'no-speech' || event.error === 'audio-capture') {
            // For recoverable errors, try to restart
            if (isRecording) {
              try {
                recognitionInstance.stop();
                setTimeout(() => {
                  if (isRecording) {
                    recognitionInstance.start();
                  }
                }, 100);
              } catch (e) {
                console.error('Error restarting recognition:', e);
              }
            }
          } else {
            // For fatal errors, stop recording
            setIsRecording(false);
            onEnd?.();
          }
        };

        recognitionInstance.onend = () => {
          // If we're still supposed to be recording, restart the recognition
          if (isRecording) {
            try {
              setTimeout(() => {
                if (isRecording) {
                  recognitionInstance.start();
                }
              }, 100);
            } catch (e) {
              console.error('Error restarting recognition:', e);
              setIsRecording(false);
              onEnd?.();
            }
          } else {
            setIsRecording(false);
            onEnd?.();
          }
        };

        setRecognition(recognitionInstance);
      } else {
        setError('Speech recognition not supported in this browser');
      }
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [onTranscriptChange, onEnd, isRecording, transcript]);

  const startRecording = useCallback(() => {
    if (recognition) {
      try {
        setTranscript(''); // Clear previous transcript
        recognition.abort();
        setTimeout(() => {
          recognition.start();
        }, 100);
      } catch (error) {
        console.error('Error starting recognition:', error);
        setError('Failed to start recording');
        setIsRecording(false);
      }
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recognition:', error);
        setIsRecording(false);
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
    error
  };
};