import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Style/Dashboard.css";

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length >= 1) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products?query=${query}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setProducts([]);
    }
  };

  const handleAuthToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="dashboard">
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarCollapsed ? "☰" : "×"}
      </button>
      <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/new-item">New Item</Link>
          </li>
        </ul>
        <button className="auth-btn" onClick={handleAuthToggle}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
      <div className="main-content">
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search For The Products"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="search-bar"
          />
          {isFocused && searchTerm && products.length > 0 && (
            <ul className="autocomplete-list">
              {products.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="content">
          <h1>Welcome to the Dashboard</h1>
          <p>This is the main content area.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
