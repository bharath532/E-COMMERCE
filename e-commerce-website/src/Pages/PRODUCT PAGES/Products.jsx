import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // ✅ Add CSS for image size

const products = [
  { id: "1", name: "IPHONE 13", price: 2000, image: "/images/product/iphoneimg.jfif", rating: 4.4, reviews: 1500 },
  { id: "2", name: "SAMSUNG", price: 1050, image: "/images/product/samsungS23.jpg", rating: 4.0, reviews: 2000 },
  { id: "3", name: "VIVO X-100", price: 1000, image: "/images/product/vivo.jfif", rating: 4.0, reviews: 3000 },
  { id: "4", name: "REDMI NOTE 12", price: 2030, image: "/images/product/redmi.jfif", rating: 4.0, reviews: 5000 },
  { id: "5", name: "HP LAPTOP 15", price: 7000, image: "/images/product/hplaptop.jfif", rating: 4.6, reviews: 4400 },
  { id: "6", name: "MAC BOOK AIR M2", price: 6000, image: "/images/product/macbookairm2.jpg", rating: 4.6, reviews: 4360 },
  { id: "7", name: "ASUS", price: 5500, image: "/images/product/asus.jfif", rating: 4.6, reviews: 4300 },
  { id: "8", name: "DELL XPS 13", price: 6400, image: "/images/product/dellxps13.jpg", rating: 4.6, reviews: 2300 },
  { id: "9", name: "APPLE IPAD", price: 3300, image: "/images/product/appletab.jfif", rating: 4.6, reviews: 8300 },
  { id: "10", name: "GALAXY IPAD", price: 3000, image: "/images/product/galaxytab.jfif", rating: 4.6, reviews:7300 },
  { id: "11", name: "ASUS IPAD", price: 2200, image: "/images/product/asustab.jfif", rating: 4.6, reviews: 2300 },
  { id: "12", name: "HAWAI IPAD", price: 2400, image: "/images/product/hawaitab.jfif", rating: 4.6, reviews: 1300 },
  { id: "13", name: "BOAT", price: 500, image: "/images/product/boat.jpg", rating: 4.8, reviews: 1600 },
  { id: "14", name: "MOXIS", price: 400, image: "/images/product/moxiev20.jpg", rating: 4.6, reviews: 1900 },
  { id: "15", name: "LEAF HEADPHONE", price: 450, image: "/images/product/leafs.jfif", rating: 4.6, reviews: 690 },
  { id: "16", name: "SONY HEADPHONE", price: 390, image: "/images/product/sony.jfif", rating: 4.6, reviews: 800 },
];

export default function Products() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);

  // ✅ Load cart from localStorage on page load
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ✅ Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

    if (newQuantity > 0) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== product.id));
    }

    try {
      await axios.put(`http://localhost:5000/api/cart/${product.id}`, {
        userId,
        quantity: newQuantity,
      });
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                <img 
                  src="/Websitelogo.jpg" 
                  alt="Logo" 
                  style={{ height: "40px", marginRight: "2px" }} 
                />
                
              </Link>
          <Link className="btn btn-outline-primary me-3" to="/main">Go Home</Link>
          <input
            type="text"
            className="form-control mx-3 w-50"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                    <p className="text-warning mb-1">
                      {"⭐".repeat(Math.floor(product.rating))} ({product.reviews})
                    </p>
                    <div className="mt-auto">
                      {inCart ? (
                        <div className="d-flex align-items-center">
                          <button className="btn btn-outline-secondary" onClick={() => handleDecrease(product)}>-</button>
                          <span className="mx-2">{inCart.quantity}</span>
                          <button className="btn btn-outline-secondary" onClick={() => handleAddToCart(product)}>+</button>
                        </div>
                      ) : (
                        <button className="btn btn-danger" onClick={() => handleAddToCart(product)}>Add to cart</button>
                      )}
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
