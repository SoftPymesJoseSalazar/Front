import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Users, BarChart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">AI Interviewer</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/interview"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-900 hover:text-indigo-600 hover:bg-gray-100"
            >
              <Users className="h-5 w-5" />
              <span>Interview</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-900 hover:text-indigo-600 hover:bg-gray-100"
            >
              <BarChart className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;