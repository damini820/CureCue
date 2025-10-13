// In frontend/src/pages/AddRoutinePage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

export default function AddRoutinePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Send the new routine data to the backend
      await axios.post('http://localhost:8000/routines/', {
        name,
        description,
        time,
      });
      navigate('/dashboard'); // Go back to the dashboard after saving
    } catch (err) {
      setError('Failed to create routine. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">Brew a New Potion</h2>
        <form onSubmit={handleSubmit}>
          {/* ... form inputs are the same ... */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Potion Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Morning Focus Elixir" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Take with breakfast" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Time</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 08:00 AM" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <button type="submit" className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md font-bold transition">Save Routine</button>
          {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
        </form>
      </div>
    </div>
  );
}