import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Carousel from "react-bootstrap/Carousel";  
import './mainpage.css';

export default function Mainpage() {
  const products = [
    { id: "1", name: "IPHONE 13", price: 2000, image: "/images/product/iphoneimg.jfif", rating: 4.4, reviews: 1500 },
    { id: "2", name: "SAMSUNG", price: 1050, image: "/images/product/samsungS23.jpg", rating: 4.0, reviews: 200 },
    { id: "7", name: "HP LAPTOP", price: 300, image: "/images/product/hplaptop.jfif", rating: 4.6, reviews: 190 },
    { id: "8", name: "DELL LAPTOP", price: 700, image: "/images/product/dellxps13.jpg", rating: 4.6, reviews: 190 },
    { id: "6", name: "GALAXY IPAD", price: 200, image: "/images/product/galaxytab.jfif", rating: 4.6, reviews: 190 },
    { id: "5", name: "APPLE IPAD", price: 100, image: "/images/product/appletab.jfif", rating: 4.6, reviews: 190 },
    { id: "3", name: "BOAT", price: 500, image: "/images/product/boat.jpg", rating: 4.8, reviews: 160 },
    { id: "4", name: "MOXIS", price: 400, image: "/images/product/moxiev20.jpg", rating: 4.6, reviews: 190 },
  ];
  
  return (
    <div>

<Carousel className="hero-carousel" interval={3000} fade id="home">
  <Carousel.Item>
    <img className="d-block w-100" src="/images/product/iphoneimg.jfif" alt="Banner 1" />
  </Carousel.Item>
  <Carousel.Item>
    <img className="d-block w-100" src="/images/product/boat.jpg" alt="Banner 2" />
  </Carousel.Item>
  <Carousel.Item>
    <img className="d-block w-100" src="/images/product/hplaptop.jfif" alt="Banner 3" />
  </Carousel.Item>
  <Carousel.Item>
    <img className="d-block w-100" src="/images/product/appletab.jfif" alt="Banner 4" />
  </Carousel.Item>
</Carousel>




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

     <div className="container py-5" id="collection">
  <h3 className="mb-4 text-center">Top New Arrival</h3>
  <div className="row">
    {products.map((product) => (
      <div key={product.id} className="col-md-3 mb-4">
        <div className="card h-100 shadow-sm text-center">
          <Link to={`/product/${product.id}`}>
            <img 
              src={product.image} 
              className="card-img-top mx-auto d-block product-img" 
              alt={product.name} 
            />
          </Link>
          <div className="card-body d-flex flex-column align-items-center">
            <h5 className="card-title mt-2">{product.name}</h5>
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
        src="/images/background/Websitelogo.jpg"
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



    </div>
  );
}