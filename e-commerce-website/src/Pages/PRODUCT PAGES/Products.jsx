import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const API_URL = import.meta.env.VITE_API_URL;

const products = [
  { id: "1", name: "IPHONE 13", price: 2000, image: "https://e-commerce-1-lmzl.onrender.com/images/product/iphoneimg.jfif", rating: 4.4, reviews: 1500 },
  { id: "2", name: "SAMSUNG", price: 1050, image: "https://e-commerce-1-lmzl.onrender.com/images/product/samsungS23.jpg", rating: 4.0, reviews: 2000 },
  { id: "3", name: "VIVO X-100", price: 1000, image: "https://e-commerce-1-lmzl.onrender.com/images/product/vivo.jfif", rating: 4.0, reviews: 3000 },
  { id: "4", name: "REDMI NOTE 12", price: 2030, image: "https://e-commerce-1-lmzl.onrender.com/images/product/redmi.jfif", rating: 4.0, reviews: 5000 },
  { id: "5", name: "HP LAPTOP 15", price: 7000, image: "https://e-commerce-1-lmzl.onrender.com/images/product/hplaptop.jfif", rating: 4.6, reviews: 4400 },
  { id: "6", name: "MAC BOOK AIR M2", price: 6000, image: "https://e-commerce-1-lmzl.onrender.com/images/product/macbookairm2.jpg", rating: 4.6, reviews: 4360 },
  { id: "7", name: "ASUS", price: 5500, image: "https://e-commerce-1-lmzl.onrender.com/images/product/asus.jfif", rating: 4.6, reviews: 4300 },
  { id: "8", name: "DELL XPS 13", price: 6400, image: "https://e-commerce-1-lmzl.onrender.com/images/product/dellxps13.jpg", rating: 4.6, reviews: 2300 },
  { id: "9", name: "APPLE IPAD", price: 3300, image: "https://e-commerce-1-lmzl.onrender.com/images/product/appletab.jfif", rating: 4.6, reviews: 8300 },
  { id: "10", name: "GALAXY IPAD", price: 3000, image: "https://e-commerce-1-lmzl.onrender.com/images/product/galaxytab.jfif", rating: 4.6, reviews: 7300 },
  { id: "11", name: "ASUS IPAD", price: 2200, image: "https://e-commerce-1-lmzl.onrender.com/images/product/asustab.jfif", rating: 4.6, reviews: 2300 },
  { id: "12", name: "HAWAI IPAD", price: 2400, image: "https://e-commerce-1-lmzl.onrender.com/images/product/hawaitab.jfif", rating: 4.6, reviews: 1300 },
  { id: "13", name: "BOAT", price: 500, image: "https://e-commerce-1-lmzl.onrender.com/images/product/boat.jpg", rating: 4.8, reviews: 1600 },
  { id: "14", name: "MOXIS", price: 400, image: "https://e-commerce-1-lmzl.onrender.com/images/product/moxiev20.jpg", rating: 4.6, reviews: 1900 },
  { id: "15", name: "LEAF HEADPHONE", price: 450, image: "https://e-commerce-1-lmzl.onrender.com/images/product/leafs.jfif", rating: 4.6, reviews: 690 },
  { id: "16", name: "SONY HEADPHONE", price: 390, image: "https://e-commerce-1-lmzl.onrender.com/images/product/sony.jfif", rating: 4.6, reviews: 800 },
];

export default function Products() {
 const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token"); // ✅ JWT token

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =======================
  // Add to cart
  // =======================
  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please login first!");

    const existingProduct = cart.find((item) => item.id === product.id);
    const updatedCart = existingProduct
      ? cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);

    try {
      await axios.post(
        `${API_URL}/api/cart`,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: existingProduct ? existingProduct.quantity + 1 : 1,
        },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ send token
      );
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // =======================
  // Decrease quantity
  // =======================
  const handleDecrease = async (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please login first!");

    const existingProduct = cart.find((item) => item.id === product.id);
    if (!existingProduct) return;

    const newQuantity = existingProduct.quantity - 1;

    if (newQuantity > 0) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item)));
    } else {
      setCart(cart.filter((item) => item.id !== product.id));
    }

    try {
      await axios.put(
        `${API_URL}/api/cart/${product.id}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ send token
      );
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  // =======================
  // Stripe: Buy single product
  // =======================
  const handleBuyNowSingle = async (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please login first!");

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/api/payment/create-payment-session`,
        { userId, product },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = response.data.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed! Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // =======================
  // Stripe: Pay all cart
  // =======================
  const handleBuyNow = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please login first!");
    if (cart.length === 0) return alert("Cart is empty!");

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/api/payment/create-payment-session`,
        { userId, products: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
       {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <img
              src="https://e-commerce-1-lmzl.onrender.com/Websitelogo.jpg"
              alt="Logo"
              style={{ height: "40px", marginRight: "2px" }}
            />
          </Link>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center w-100">
              {/* Go Home Button */}
              <li className="nav-item my-2 my-lg-0">
                <Link className="btn btn-outline-primary me-3 w-100" to="/main">
                  Go Home
                </Link>
              </li>

              {/* Search Box */}
              <li className="nav-item my-2 my-lg-0 flex-grow-1">
                <input
                  type="text"
                  className="form-control mx-lg-3 w-100"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </li>

              {/* Cart Button */}
              <li className="nav-item my-2 my-lg-0 ms-lg-4">
              <button
               className="btn btn-outline-primary w-100"
               onClick={() => setShowCart(true)}
               >
              Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
               </button>
               </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="container py-5">
        <h3 className="mb-4 text-center">Top New Arrival</h3>
        <div className="row">
          {filteredProducts.map((product) => {
            const inCart = cart.find((item) => item.id === product.id);
            return (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm d-flex flex-column">
                  <img
                    src={product.image}
                    className="card-img-top product-img"
                    alt={product.name}
                    onClick={() => setSelectedProduct(product)}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="text-danger fw-bold">${product.price.toFixed(2)}</p>
                    <p className="text-warning mb-1">{"⭐".repeat(Math.floor(product.rating))} ({product.reviews})</p>
                    <div className="mt-auto d-flex justify-content-between">
                      {inCart ? (
                        <div className="d-flex align-items-center">
                          <button className="btn btn-outline-secondary" onClick={() => handleDecrease(product)}>-</button>
                          <span className="mx-2">{inCart.quantity}</span>
                          <button className="btn btn-outline-secondary" onClick={() => handleAddToCart(product)}>+</button>
                        </div>
                      ) : (
                        <button className="btn btn-danger" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                      )}
                      <button className="btn btn-success" onClick={() => handleBuyNowSingle(product)} disabled={isLoading}>
                        {isLoading ? "Processing..." : "Buy Now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zoom Modal */}
      {selectedProduct && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedProduct.image} className="img-fluid mb-3" alt={selectedProduct.name} />
                <p className="fw-bold text-danger">${selectedProduct.price.toFixed(2)}</p>
                <p>{selectedProduct.description}</p>
                <p className="text-warning">{"⭐".repeat(Math.floor(selectedProduct.rating))} ({selectedProduct.reviews})</p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-danger" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
                  <button className="btn btn-success" onClick={() => handleBuyNowSingle(selectedProduct)} disabled={isLoading}>
                    {isLoading ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your Cart</h5>
                <button type="button" className="btn-close" onClick={() => setShowCart(false)}></button>
              </div>
              <div className="modal-body">
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          <img src={item.image} alt={item.name} width="60" className="me-3"/>
                          <div>
                            <h6>{item.name}</h6>
                            <p className="mb-0 text-danger">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => handleDecrease(item)}>-</button>
                          <span className="mx-2">{item.quantity}</span>
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => handleAddToCart(item)}>+</button>
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-end mt-3">
                      <button className="btn btn-success" onClick={handleBuyNow} disabled={isLoading}>
                        {isLoading ? "Processing..." : "Pay All"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}