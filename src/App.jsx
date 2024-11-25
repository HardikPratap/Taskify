// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/LoginPage";
import Signup from "../pages/Signup";
import Tasks from "../pages/Tasks";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Taskify</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect default route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;