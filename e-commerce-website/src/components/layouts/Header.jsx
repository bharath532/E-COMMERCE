import React from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './header.css'


export default function Header() {
  return (
   <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
  <div className="container">
    {/* ✅ Logo with brand name */}
    <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
      <img 
        src="/Websitelogo.jpg" 
        alt="Logo" 
        style={{ height: "40px", marginRight: "8px" }} 
      />
      
    </Link>

    {/* ✅ Mobile toggle button */}
    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* ✅ Links & buttons */}
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><a className='nav-link' href='#home'>Home</a></li>
        <li className="nav-item"><a className='nav-link' href='#about'>About</a></li>
        <li className="nav-item"><Link className="nav-link" to="/product/:id">Products</Link></li>
      </ul>

      <div className="d-flex align-items-center">
        {/* <Link to="/cart" className="btn btn-outline-primary me-2">Cart</Link> */}
        <Link to="/" className="btn btn-danger">Logout</Link>
      </div>
    </div>
  </div>
</nav>
  )
}
