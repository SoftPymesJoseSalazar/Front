import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Briefcase, FileText } from 'lucide-react';
import { extractTextFromPDF } from '../lib/pdfParser';

const PREDEFINED_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'UI/UX Designer',
  'Product Manager',
  'QA Engineer'
];

const Home = () => {
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file');
      return;
    }

    try {
      const text = await extractTextFromPDF(file);
      // Store the CV text in sessionStorage to use it in the interview
      sessionStorage.setItem('cvText', text);
      navigate('/interview?type=cv');
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Error processing PDF file. Please try again.');
    }
  };

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

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Pre-defined Roles
          </h2>
          <p className="text-gray-700 mb-6">
            Choose from our curated list of industry roles and get relevant interview questions tailored to the position.
          </p>
          <select
            onChange={(e) => navigate(`/interview?type=predefined&role=${encodeURIComponent(e.target.value)}`)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-4"
            defaultValue=""
          >
            <option value="" disabled>Select a role</option>
            {PREDEFINED_ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const select = document.querySelector('select') as HTMLSelectElement;
              if (select.value) {
                navigate(`/interview?type=predefined&role=${encodeURIComponent(select.value)}`);
              }
            }}
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

        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            CV Upload
          </h2>
          <p className="text-gray-700 mb-6">
            Upload your CV and let our AI analyze it to create a personalized interview experience based on your profile.
          </p>
          <label 
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <FileText className="h-5 w-5" />
            <span>Upload CV (PDF)</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Home;