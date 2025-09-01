import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './Pages/LOGIN AND REGISTER/Login'
import Register from './Pages/LOGIN AND REGISTER/Register'
import { Route, Routes } from 'react-router-dom'
import Mainpage from "./Pages/LOGIN AND REGISTER/Mainpage";
import Products from "./Pages/PRODUCT PAGES/Products";
import Cart from "./Pages/ADD TO CART/Cart";
import API from "./api";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Mainpage/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/cart" element={< Cart/>} />
      </Routes>
    </>
  );
}

export default App;

