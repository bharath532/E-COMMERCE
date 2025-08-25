import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Mainpage() {
  const products = [
    { id: "1", name: "IPHONE 13", price: 2000, image: "/images/product/iphoneimg.jfif", rating: 4.4, reviews: 1500 },
    { id: "2", name: "SAMSUNG", price: 1050, image: "/images/product/samsungS23.jpg", rating: 4.0, reviews: 200 },
    { id: "3", name: "BOAT", price: 500, image: "/images/product/boat.jpg", rating: 4.8, reviews: 160 },
    { id: "4", name: "MOXIS", price: 400, image: "/images/product/moxiev20.jpg", rating: 4.6, reviews: 190 },
    { id: "5", name: "SAN DISK", price: 100, image: "/images/product/sandisk.jpg", rating: 4.6, reviews: 190 },
    { id: "6", name: "KEYBOARD", price: 200, image: "/images/product/keyboard.jpg", rating: 4.6, reviews: 190 },
    { id: "7", name: "MOUSE", price: 300, image: "/images/product/mouse.jpg", rating: 4.6, reviews: 190 },
    { id: "8", name: "AIR BUDS", price: 700, image: "/images/product/airbuds.jpg", rating: 4.6, reviews: 190 },
  ];

  return (
    <div>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">E-Shop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className='nav-link' href='#home'>Home</a></li>
              <li className="nav-item"><a className='nav-link' href='#about'>About</a></li>
              <li className="nav-item"><Link className="nav-link" to="/product/:id">Products</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/">Account</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
              <li className="nav-item">
                <Link to="/" className="nav-link text-danger d-flex align-items-center">
                  <img src="/images/background/download.png" alt="Logout" style={{ width: "20px", marginRight: "6px" }} />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Hero Banner */}
      <div className="bg-light text-center py-5" id="home" style={{ backgroundImage: "url('/images/background/background.img')", backgroundSize: "cover" }}>
        <h1 className="text-light fw-bold">Best Collection For Home Decoration</h1>
        <p className="text-muted">Discover amazing furniture & decor</p>
        <Link to="/product/:id" className="btn btn-danger px-4 py-2">Shop Now</Link>
      </div>

      {/* ✅ Feature Boxes */}
      <div className="container text-center py-5">
        <div className="row">
          {["Free Shipping", "Money Returns", "24/7 Support"].map((text, i) => (
            <div key={i} className="col-md-4">
              <div className="border p-4 rounded shadow-sm">
                <h5>{text}</h5>
                <p className="text-muted">Some supporting text here</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Product Section */}
      <div className="container py-5" id="collection">
        <h3 className="mb-4 text-center">Top New Arrival</h3>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} className="card-img-top" alt={product.name} />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-danger fw-bold">${product.price.toFixed(2)}</p>
                  <p className="text-warning mb-1">
                    {"⭐".repeat(Math.floor(product.rating))} ({product.reviews})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* ✅ About Us Section */}
<div className="container py-5" id="about">
  <div className="row align-items-center">
    <div className="col-md-6 mb-4 mb-md-0">
      <img
        src="/images/background/ecomlogo.jpg"
        alt="About"
        className="img-fluid rounded shadow-sm"
      />
    </div>
    <div className="col-md-6">
      <h3 className="fw-bold">About Our E-Shop</h3>
      <p className="text-muted">
        Welcome to <strong>ElectroMart</strong>, your one-stop online store for top-quality gadgets, accessories, and home essentials.  
        We combine the latest technology with unbeatable prices to deliver products you love — straight to your doorstep.
      </p>
      <ul className="list-unstyled text-muted">
        <li>✔️ Wide range of trending products</li>
        <li>✔️ Fast & secure checkout process</li>
        <li>✔️ Easy returns & 100% satisfaction guarantee</li>
        <li>✔️ 24/7 dedicated customer support</li>
      </ul>
      
    </div>
  </div>
</div>


<footer className="bg-dark text-light pt-5 pb-3 mt-5">
  <div className="container">
    <div className="row">
      
      {/* Brand Info */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">ElectroMart</h5>
        <p>
          Your one-stop online store for gadgets, fashion, and more.  
          Quality products, secure payments, and fast delivery.
        </p>
      </div>

      {/* Quick Links */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="#home" className="text-light text-decoration-none">Home</a></li>
          <li><a href="#about" className="text-light text-decoration-none">About Us</a></li>
          <li><a href="#products" className="text-light text-decoration-none">Products</a></li>
          <li><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
        </ul>
      </div>

      {/* Customer Service */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">Customer Service</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-light text-decoration-none">FAQs</a></li>
          <li><a href="#" className="text-light text-decoration-none">Return Policy</a></li>
          <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
          <li><a href="#" className="text-light text-decoration-none">Terms & Conditions</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">Contact Us</h5>
        <p className="mb-1">📍 Erode, Tamil Nadu, India</p>
        <p className="mb-1">📞 +91 9789301648</p>
        <p className="mb-1">✉️ support@rafcart.com</p>
        <div className="mt-3">
          <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-light me-3"><i className="bi bi-instagram"></i></a>
          <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
        </div>
      </div>

    </div>

    <hr className="border-secondary" />
    <div className="text-center">
      <p className="mb-0">&copy; {new Date().getFullYear()} RafCart. All Rights Reserved.</p>
    </div>
  </div>
</footer>


    </div>
  );
}
