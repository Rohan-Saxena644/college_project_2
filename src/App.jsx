// ─── REACT ROUTER ───────────────────────────────────────────────
// BrowserRouter wraps the whole app so every component can use routing.
// Routes + Route define which component renders for which URL path.
// ────────────────────────────────────────────────────────────────
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import NavBar          from './components/NavBar/NavBar';
import Landing         from './pages/Landing/Landing';
import Dashboard       from './pages/Dashboard/Dashboard';
import Projects        from './pages/Projects/Projects';
import ProjectDetail   from './pages/ProjectDetail/ProjectDetail';
import Profile         from './pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route 1 – Landing page (no NavBar) */}
        <Route path="/" element={<Landing />} />

        {/* Routes 2-5 – Pages that share the NavBar */}
        <Route
          path="/*"
          element={
            <>
              <NavBar />
              <Routes>
                <Route path="/dashboard"       element={<Dashboard />} />
                <Route path="/projects"         element={<Projects />} />
                <Route path="/projects/:id"     element={<ProjectDetail />} />
                <Route path="/profile"          element={<Profile />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
