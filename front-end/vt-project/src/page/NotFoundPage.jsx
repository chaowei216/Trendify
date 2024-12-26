import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const NotFoundPage = () => {
  return (

    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <Navbar />
      <div className="bg-white p-8  max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-center">

          <div className="md:w-2/2 text-center md:text-left md:pl-8">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-5xl text-gray-600 mb-8">
              Trang bạn tới không tồn tại
            </p>
            <Link
              to="/"
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
            >
              Về trang chủ
            </Link>

          </div>
        </div>

      </div>

    </div>

  )
}

export default NotFoundPage
