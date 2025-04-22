<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Mic, Users, BarChart } from 'lucide-react';
>>>>>>> c733b498fa489f83840217ec66650ecd3068de07
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Dashboard from './pages/Dashboard';
<<<<<<< HEAD
import Auth from './components/Auth';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar session={session} />
=======

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
>>>>>>> c733b498fa489f83840217ec66650ecd3068de07
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
            <Route path="*" element={<Navigate to="/" replace />} />
=======
>>>>>>> c733b498fa489f83840217ec66650ecd3068de07
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;