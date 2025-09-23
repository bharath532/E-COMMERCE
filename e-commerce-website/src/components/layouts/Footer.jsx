import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 
// import '../Home/mainpage.css';
export default function Footer() {
  return (
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
        <p className="mb-1">✉️ bharath978930@gmail.com</p>
        <div className="mt-3">
          <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-light me-3"><i className="bi bi-instagram"></i></a>
          <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
        </div>
      </div>

    </div>

    <hr className="border-secondary" />
    <div className="text-center">
      <p className="mb-0">&copy; {new Date().getFullYear()} Electromart. All Rights Reserved.</p>
    </div>
  </div>
</footer>
  )
}
