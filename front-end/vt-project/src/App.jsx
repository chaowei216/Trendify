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
import NotFoundPage from './page/NotFoundPage.jsx'
import Login from './page/Login.jsx'
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
            <Route path="/login" element={<Login />} />
            {/* <Route
              path="/product"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Customer']}>
                  <ViewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <ViewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <ProtectedRoute allowedRoles={['Staff']}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
