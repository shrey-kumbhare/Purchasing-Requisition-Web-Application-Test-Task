import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Profile.css"; // Import the CSS file

const Profile = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div>
        <button onClick={() => navigate("/")}>←</button>
        <h1>Profile</h1>
        <p>Please log in to view your Requests.</p>
      </div>
    );
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>←</button>
      <h1>Profile</h1>
      <h2>New Items</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-box">
            <h2>{product.name}</h2>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Supplier Name:</strong> {product.supplier_name}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Location:</strong> {product.location}
            </p>
            <p>
              <strong>Required For:</strong> {product.required_for}
            </p>
            <p>
              <strong>Timeline:</strong> {product.timeline}
            </p>
            {product.website_url && (
              <a
                href={product.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
