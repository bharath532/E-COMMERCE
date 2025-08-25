import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
  { id: "1", name: "iPhone 14 Pro", price: 2000.0, category: "mobile", image: "/src/assets/Product Images/iphoneimg.jfif", rating: 5.0, reviews: 34244, description: "Latest iPhone with A16 Bionic chip" },
  { id: "2", name: "Samsung Galaxy S23", price: 1050.0, category: "mobile", image: "/src/assets/Product Images/samsung S23.jpg", rating: 4.4, reviews: 5078, description: "Powerful Android flagship with Snapdragon 8 Gen 2" },
  { id: "3", name: "MacBook Air M2", price: 6500.0, category: "laptop", image: "/src/assets/Product Images/mac book air m2.jpg", rating: 5.0, reviews: 3405, description: "Ultra-thin laptop with Apple Silicon M2 chip" },
  { id: "4", name: "Dell XPS 13", price: 4000.0, category: "laptop", image: "/src/assets/Product Images/dell xps13.jpg", rating: 4.0, reviews: 4100, description: "Premium ultrabook with InfinityEdge display" },
  { id: "5", name: "OnePlus Nord CE 3", price: 980.0, category: "mobile", image: "/src/assets/Product Images/oneplusce3.jpg", rating: 4.0, reviews: 3010, description: "Affordable 5G smartphone with great features" },
  { id: "7", name: "MOUSE", price: 300.0, category: "accessory", image: "/src/assets/Product Images/mouse.jpg", rating: 3.5, reviews: 260, description: "Ergonomic wireless mouse for productivity" },
  { id: "8", name: "MOXIE V20", price: 400.0, category: "watch", image: "/src/assets/Product Images/moxiev20.jpg", rating: 4.6, reviews: 1400, description: "Smart fitness watch with health tracking" },
  { id: "9", name: "HP KEYBOARD", price: 500.0, category: "accessory", image: "/src/assets/Product Images/boat.jpg", rating: 4.9, reviews: 1600, description: "Durable mechanical keyboard for fast typing" },
];

export default function Products() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false); // ✅ cart modal toggle

  // Add to Cart
  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first!");
      return;
    }

    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);

    try {
      await axios.post("http://localhost:5000/api/cart", {
        userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: existingProduct ? existingProduct.quantity + 1 : 1,
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

const handleDecrease = async (product) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please login first!");
    return;
  }

  const existingProduct = cart.find((item) => item.id === product.id);
  if (!existingProduct) return;

  const newQuantity = existingProduct.quantity - 1;

  // ✅ Update local state instantly
  if (newQuantity > 0) {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item
      )
    );
  } else {
    setCart(cart.filter((item) => item.id !== product.id));
  }

  // ✅ Sync with backend
  try {
    await axios.put(`http://localhost:5000/api/cart/${product.id}`, {
      userId,
      quantity: newQuantity,
    });
  } catch (err) {
    console.error("Error decreasing quantity:", err);
  }
};


  // Filter products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/main">E-Shop</Link>
          <Link className="btn btn-outline-primary me-3" to="/main">Go Home</Link>
          <input
            type="text"
            className="form-control mx-3 w-50"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Cart button opens modal */}
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowCart(true)}
          >
            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
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
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedProduct(product)}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="text-danger fw-bold">${product.price.toFixed(2)}</p>
                    <p className="text-warning mb-1">
                      {"⭐".repeat(Math.floor(product.rating))} ({product.reviews})
                    </p>
                    {inCart ? (
                      <div className="d-flex align-items-center mt-auto">
                        <button className="btn btn-outline-secondary" onClick={() => handleDecrease(product)}>-</button>
                        <span className="mx-2">{inCart.quantity}</span>
                        <button className="btn btn-outline-secondary" onClick={() => handleAddToCart(product)}>+</button>
                      </div>
                    ) : (
                      <button className="btn btn-danger mt-auto" onClick={() => handleAddToCart(product)}>Add to cart</button>
                    )}
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
                <button className="btn btn-danger" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
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
                  cart.map((item) => (
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
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
