import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/StaffAvatar.png';
import Swal from 'sweetalert2';

const AdminHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Hiển thị confirm dialog
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
                // Xóa access token 
                localStorage.removeItem('accessToken');

                // Xóa thông tin user nếu có
                localStorage.removeItem('userInfo');

                // Hiển thị thông báo đăng xuất thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng xuất thành công!',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Chuyển hướng về trang đăng nhập
                navigate('/login');
            }
        });
    };

    return (
        <header className="bg-white shadow-md p-4 relative">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        🔔
                    </button>
                    <div className="relative">
                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <div className="w-8 h-8">
                                <img
                                    src={avatar}
                                    alt="Admin Avatar"
                                    className="h-full w-full rounded-full object-cover shadow-sm transition-transform hover:scale-105"
                                />
                            </div>
                            <span>Admin</span>
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                                <ul className="py-1">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        <span className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Đăng xuất
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;