// In frontend/src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  // We use 'useState' to hold the data we fetch from the API
  const [routines, setRoutines] = useState([]);
  const [userName, setUserName] = useState('Mallika'); // Still placeholder for now

  // 'useEffect' runs code when the component first loads
  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get('http://localhost:8000/routines/');
        setRoutines(response.data); // Save the fetched routines in our state
      } catch (error) {
        console.error("Failed to fetch routines:", error);
      }
    };

    fetchRoutines();
  }, []); // The empty array [] means this effect runs only once on load

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-cyan-400">Welcome, {userName}!</h1>
          <p className="text-gray-400">Here is your wellness command center.</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-cyan-500 pb-2">Your Daily Potions</h2>
            <div className="space-y-4">
              {/* We now map over the 'routines' from our state */}
              {routines.length > 0 ? (
                routines.map((routine) => (
                  <div key={routine.id} className="bg-gray-700 p-4 rounded-md flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{routine.name}</h3>
                      <p className="text-sm text-gray-300">{routine.description}</p>
                    </div>
                    <div className="text-cyan-400 font-mono">{routine.time}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">You haven't brewed any potions yet. Add one to get started!</p>
              )}
            </div>
            <Link to="/add-routine" className="block text-center mt-6 w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition">
              + Brew a New Potion
            </Link>
          </div>

          {/* Achievements section is still static for now */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* ... achievements code ... */}
          </div>
        </main>
      </div>
    </div>
  );
}