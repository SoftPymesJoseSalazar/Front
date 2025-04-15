import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Briefcase } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI-Powered Interview Practice
        </h1>
        <p className="text-xl text-gray-700">
          Practice your interview skills with our AI interviewer. Get instant feedback and improve your chances of landing your dream job.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Pre-defined Roles
          </h2>
          <p className="text-gray-700 mb-6">
            Choose from our curated list of industry roles and get relevant interview questions tailored to the position.
          </p>
          <button
            onClick={() => navigate('/interview?type=predefined')}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Briefcase className="h-5 w-5" />
            <span>Start with Pre-defined Role</span>
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Custom Role
          </h2>
          <p className="text-gray-700 mb-6">
            Specify your target role and skills, and our AI will generate relevant interview questions just for you.
          </p>
          <button
            onClick={() => navigate('/interview?type=custom')}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Start with Custom Role</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;