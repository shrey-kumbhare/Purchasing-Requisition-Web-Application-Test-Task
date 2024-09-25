import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/Product.css";
const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [timeline, setTimeline] = useState("");
  const [location, setLocation] = useState("");
  const [requiredFor, setRequiredFor] = useState("");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const [categoriesRes, locationsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/locations"),
        ]);
        setCategories(categoriesRes.data);
        setLocations(locationsRes.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Failed to load categories or locations.");
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    if (
      !name ||
      !description ||
      !price ||
      !supplierName ||
      !productInfo ||
      !category ||
      !quantity ||
      !timeline ||
      !location ||
      !requiredFor
    ) {
      setError("Please fill in all required fields.");
      setSubmitLoading(false);
      return;
    }

    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      supplierName,
      productInfo,
      websiteUrl,
      category,
      quantity: parseInt(quantity),
      timeline,
      location,
      requiredFor,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        newProduct
      );
      console.log("Product saved:", response.data);

      setName("");
      setDescription("");
      setPrice("");
      setSupplierName("");
      setProductInfo("");
      setWebsiteUrl("");
      setCategory("");
      setQuantity("");
      setTimeline("");
      setLocation("");
      setRequiredFor("");

      navigate("/");
    } catch (error) {
      console.error("Error saving product:", error);

      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to save product. Please try again.");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="product-form">
      <button onClick={() => navigate("/")}>←</button>
      <h1>Request a New Product</h1>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
            />
          </div>
          <div>
            <label>Supplier Name</label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Product Information</label>
            <textarea
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Website URL</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </div>
          <div>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Quantity Required</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min="1"
            />
          </div>
          <div>
            <label>Timeline / When it's required</label>
            <input
              type="date"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Required For</label>
            <input
              type="text"
              value={requiredFor}
              onChange={(e) => setRequiredFor(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={submitLoading}>
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductForm;
