import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './page/HomePage.jsx'
import ViewProduct from './page/ViewProduct.jsx'
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
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/product" element={<ViewProduct />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
