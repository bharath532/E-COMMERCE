import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";

import Login from "./Pages/LOGIN AND REGISTER/Login";
import Register from "./Pages/LOGIN AND REGISTER/Register";
import Mainpage from "./Pages/HOME/Mainpage";
import Products from "./Pages/PRODUCT PAGES/Products";
import Cart from "./Pages/ADD TO CART/Cart";
import PrivateRoute from "./components/PrivateRoute"; // ✅ new import
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Header/>
              <Mainpage />
              <Footer/>
            </PrivateRoute>
          }
        />
        
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
