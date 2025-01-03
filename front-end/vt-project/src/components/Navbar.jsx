import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import logo from '../assets/host1.png';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useCart } from '../Context/CartContext.jsx';
import { decodeToken } from '../utils/decodeJWT';

const Navbar = () => {
    const navigate = useNavigate(); // Sử dụng navigate
    const { cartItems } = useCart();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const cartItemCount = cartItems.length;

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const userData = decodeToken(token);
                    if (userData) {
                        setIsLoggedIn(true);
                        setUserInfo(userData);
                    }
                } catch (error) {
                    localStorage.removeItem('accessToken');
                    setIsLoggedIn(false);
                }
            }
        };

        checkLoginStatus();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Sử dụng SweetAlert2 để confirm logout
        Swal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                // Xóa token và thông tin đăng nhập
                localStorage.removeItem('accessToken');
                setIsLoggedIn(false);
                setUserInfo(null);
                setIsDropdownOpen(false);

                // Hiển thị thông báo đăng xuất thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng xuất thành công!',
                    text: 'Bạn đã được đăng xuất khỏi hệ thống.',
                    showConfirmButton: false,
                    timer: 1500
                });


                navigate('/login');
            }
        });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="w-full bg-white/95 backdrop-blur-md px-6 py-2 fixed top-0 z-50 border-b border-gray-200 shadow-sm">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <img
                    src={logo}
                    alt="Magnis Studio"
                    className="h-20 hover:opacity-80 transition-all duration-300 hover:scale-105"
                />
                <div className="flex gap-12 text-gray-800 text-sm">
                    {[
                        {
                            label: 'TRANG CHỦ',
                            path: '/'
                        },
                        {
                            label: 'BỘ SƯU TẬP',
                            path: '/product'
                        },
                        {
                            label: 'LIÊN HỆ',
                            path: '/contact'
                        }
                    ].map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="relative px-2 py-1 group"
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-amber-600">
                                {item.label}
                            </span>
                            <div className="absolute inset-0 h-0.5 bg-amber-600 bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative text-gray-800">
                        <FaShoppingCart size={24} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                <FaUserCircle size={24} className="mr-2" />
                                <span>{userInfo?.name || 'Tài khoản'}</span>
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                                    <ul className="py-1">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <Link to="/profile">Hồ sơ</Link>
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="relative overflow-hidden group bg-transparent border border-amber-600 rounded-full px-8 py-2 text-sm text-gray-800 transition-all duration-300 hover:text-white"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                ĐĂNG NHẬP
                            </span>
                            <div className="absolute inset-0 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;