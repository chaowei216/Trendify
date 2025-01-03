import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/host1.png';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../Context/CartContext.jsx'

const Navbar = () => {
    const { cartItems } = useCart();
    const cartItemCount = cartItems.length;

    return (
        <nav className="w-full bg-black/95 backdrop-blur-md px-6 py-2 fixed top-0 z-50 border-b border-white/10">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <img src={logo} alt="Magnis Studio"
                    className="h-20 hover:opacity-80 transition-all duration-300 hover:scale-105" />

                <div className="flex gap-12 text-white text-sm">
                    {['TRANG CHỦ', 'BỘ SƯU TẬP', 'LIÊN HỆ'].map((item) => (
                        <a key={item} href="product" className="relative px-2 py-1 group">
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-amber-400">
                                {item}
                            </span>
                            <div className="absolute inset-0 h-0.5 bg-amber-400 bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative text-white">
                        <FaShoppingCart size={24} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/login" lassName="relative overflow-hidden group bg-transparent border border-white rounded-full px-8 py-2 text-sm text-white transition-all duration-300">
                        <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                            ĐĂNG NHẬP
                        </span>
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;