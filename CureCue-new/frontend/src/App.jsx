// // In frontend/src/App.jsx

// import { Routes, Route, Link } from 'react-router-dom';
// import RegisterPage from './pages/RegisterPage';
// import LoginPage from './pages/LoginPage';
// import Dashboard from './pages/Dashboard';
// import AddRoutinePage from './pages/AddRoutinePage';

// function App() {
//   return (
//     <div>
//       {/* THIS NAVIGATION BAR WAS MISSING */}
//       <nav className="p-4 bg-gray-800 text-white flex gap-4">
//         <Link to="/register">Register</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/dashboard">Dashboard</Link>
//       </nav>

//       {/* The routes for all your pages */}
//       <Routes>
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/add-routine" element={<AddRoutinePage />} />
//       </Routes>
//     </div>
//   )
// }

// export default App;
// In frontend/src/App.jsx

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddRoutinePage from './pages/AddRoutinePage';
import ChatWidget from './components/ChatWidget'; // 1. Import ChatWidget here

function App() {
  // 2. Check if a user token exists in localStorage
  const isLoggedIn = !!localStorage.getItem('userToken');

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-routine" element={<AddRoutinePage />} />
      </Routes>

      {/* 3. Conditionally render the ChatWidget */}
      {/* This means "If isLoggedIn is true, then show the ChatWidget" */}
      {isLoggedIn && <ChatWidget />}
    </div>
  )
}

export default App;