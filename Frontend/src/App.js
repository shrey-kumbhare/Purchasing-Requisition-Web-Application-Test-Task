import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import ProductForm from "./Components/ProductForm";
import Settings from "./Components/Setting";
import Profile from "./Components/Profile";
import "./Style/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="dot-container">
          <div className="dot-bouncing"></div>
          <div className="dot-bouncing"></div>
          <div className="dot-bouncing"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Router>
        <div className="content-container">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route path="/new-item" element={<ProductForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/profile"
              element={<Profile isLoggedIn={isLoggedIn} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
