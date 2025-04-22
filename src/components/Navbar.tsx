import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mic, Users, BarChart, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface NavbarProps {
  session: Session;
}

const Navbar = ({ session }: NavbarProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">AI Interviewer</span>
          </Link>
          
          <div className="flex items-center space-x-4">
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
            <div className="pl-4 border-l border-gray-200">
              <span className="text-sm text-gray-600 mr-4">{session.user.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;