// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId"); // Assuming user ID is saved after login

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/cart/${userId}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [userId]);

  return (
    <div className="container py-5">
      <h3 className="mb-4">🛒 Your Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <img src={item.image} alt={item.name} className="card-img-top" />
                <div className="card-body">
                  <h5>{item.name}</h5>
                  <p className="text-danger fw-bold">${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button className="btn btn-outline-danger btn-sm">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
