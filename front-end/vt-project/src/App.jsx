import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './page/HomePage.jsx'
import ViewProduct from './page/ViewProduct.jsx'
import ProductDetail from './page/ProductDetail.jsx'
import AddProduct from './page/AddProduct.jsx'
import Cart from './page/Cart.jsx'
import Complete from './page/Complete.jsx'
import Staff from './page/StaffDashboard.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'

function App() {


  return (
    <CartProvider>
      <Router>
        <div>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/done" element={< Complete />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product" element={<ViewProduct />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
