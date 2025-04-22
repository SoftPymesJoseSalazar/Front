import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mic, StopCircle, AlertCircle, Loader, Send, CheckSquare } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useInterviewStore } from '../store/interviewStore';

const Interview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const interviewType = searchParams.get('type');
  const predefinedRole = searchParams.get('role');
  const [role, setRole] = useState(predefinedRole || '');
  const [isStarted, setIsStarted] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [writtenAnswer, setWrittenAnswer] = useState('');

  const {
    currentQuestion,
    answers,
    isLoading,
    startInterview,
    submitAnswer,
    submitWrittenAnswer,
    finishInterview
  } = useInterviewStore();

  useEffect(() => {
    if (interviewType === 'cv') {
      const cvText = sessionStorage.getItem('cvText');
      if (cvText) {
        setRole('CV-Based Interview');
        startInterview('CV-Based Role', cvText);
        setIsStarted(true);
      }
    } else if (interviewType === 'predefined' && predefinedRole) {
      setRole(predefinedRole);
      startInterview(predefinedRole);
      setIsStarted(true);
    }
  }, [interviewType, predefinedRole, startInterview]);

  const onTranscriptChange = useCallback((transcript: string) => {
    setCurrentTranscript(transcript);
  }, []);

  const onRecordingEnd = useCallback(() => {
    if (currentTranscript) {
      setCurrentTranscript(currentTranscript);
    }
  }, [currentTranscript]);

  const {
    isRecording,
    toggleRecording,
    isSupported
  } = useSpeechRecognition({
    onTranscriptChange,
    onEnd: onRecordingEnd
  });

  const handleStartInterview = async () => {
    if (!role) return;
    await startInterview(role);
    setIsStarted(true);
  };

  const handleNextQuestion = async () => {
    if (!currentTranscript && !writtenAnswer) return;
    
    if (currentTranscript) {
      await submitAnswer(currentTranscript);
      setCurrentTranscript('');
    } else {
      await submitWrittenAnswer(writtenAnswer);
      setWrittenAnswer('');
    }
  };

  const handleFinishInterview = async () => {
    await finishInterview();
    navigate('/dashboard');
  };

  if (!isSupported) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-400" />
            <p className="ml-3 text-red-700">
              Speech recognition is not supported in your browser. You can still use the written answer option below.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {interviewType === 'predefined' ? 'Pre-defined Role Interview' : 'Custom Role Interview'}
          </h1>
          
          <div className="space-y-6">
            <div className="mb-6">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Enter the role you're applying for:
              </label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Senior React Developer"
              />
            </div>
            
            <button
              onClick={handleStartInterview}
              disabled={!role || isLoading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Starting Interview...
                </div>
              ) : (
                'Start Interview'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Interview for {role}
          </h1>
          <button
            onClick={handleFinishInterview}
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <CheckSquare className="h-5 w-5" />
            <span>Finish Interview</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Current Question:</h2>
            <p className="text-lg text-gray-700">{currentQuestion}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voice Recording Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Voice Answer</h3>
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={toggleRecording}
                  disabled={isLoading}
                  className={`p-6 rounded-full transition-all transform hover:scale-105 ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white shadow-lg disabled:bg-gray-400`}
                >
                  {isRecording ? (
                    <StopCircle className="h-10 w-10" />
                  ) : (
                    <Mic className="h-10 w-10" />
                  )}
                </button>
                <p className="text-sm text-gray-600">
                  {isRecording ? 'Click to stop recording' : 'Click to start recording'}
                </p>
              </div>
              {currentTranscript && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-700">{currentTranscript}</p>
                </div>
              )}
            </div>

            {/* Written Answer Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Written Answer</h3>
              <div className="flex flex-col space-y-4">
                <textarea
                  value={writtenAnswer}
                  onChange={(e) => setWrittenAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={isLoading || (!currentTranscript && !writtenAnswer)}
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400 flex items-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Submit Answer</span>
            </button>
          </div>

          {/* Previous Q&A Section */}
          {answers.length > 0 && (
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Previous Questions & Answers:</h2>
              <div className="space-y-6">
                {answers.map((answer, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="font-medium text-gray-800 mb-2">Q: {answer.question}</p>
                    <p className="text-gray-700 mb-3">A: {answer.answer}</p>
                    {answer.score !== undefined && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Score:</span>
                          <span className={`text-sm font-semibold ${
                            answer.score >= 80 ? 'text-green-600' :
                            answer.score >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {answer.score}/100
                          </span>
                        </div>
                        {answer.feedback && (
                          <p className="text-sm text-gray-600 mt-1">{answer.feedback}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;