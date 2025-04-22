import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscriptChange?: (transcript: string) => void;
  onEnd?: () => void;
}

export const useSpeechRecognition = ({ onTranscriptChange, onEnd }: UseSpeechRecognitionProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
<<<<<<< HEAD
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

=======

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
>>>>>>> c733b498fa489f83840217ec66650ecd3068de07
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            } else {
              interimTranscript += result[0].transcript;
            }
          }

          const currentTranscript = finalTranscript || interimTranscript;
<<<<<<< HEAD
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
=======
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
>>>>>>> c733b498fa489f83840217ec66650ecd3068de07

  const startRecording = useCallback(() => {
    if (recognition) {
      try {
<<<<<<< HEAD
        setTranscript(''); // Clear previous transcript
        recognition.abort();
        setTimeout(() => {
          recognition.start();
        }, 100);
      } catch (error) {
        console.error('Error starting recognition:', error);
        setError('Failed to start recording');
        setIsRecording(false);
=======
        recognition.start();
      } catch (error) {
        // Fix: Handle already started error
        if ((error as Error).message.includes('already started')) {
          recognition.stop();
        } else {
          console.error('Speech recognition error:', error);
        }
>>>>>>> c733b498fa489f83840217ec66650ecd3068de07
      }
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
<<<<<<< HEAD
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recognition:', error);
        setIsRecording(false);
=======
      } catch (error) {
        console.error('Error stopping recognition:', error);
>>>>>>> c733b498fa489f83840217ec66650ecd3068de07
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
<<<<<<< HEAD
    error
=======
>>>>>>> c733b498fa489f83840217ec66650ecd3068de07
  };
};