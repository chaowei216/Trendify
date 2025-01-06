import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { decodeToken } from '../utils/decodeJWT'
import Swal from 'sweetalert2'

const HeaderDashboard = () => {
    const [userImage, setUserImage] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const userData = decodeToken()
        if (userData) {
            setUserImage(userData.avatar)
        }
    }, [])

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

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
    }

    return (
        <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
            <div className="flex-1">
                {/* Add any content here for the left side (if needed) */}
            </div>

            <div className="flex items-center space-x-4 ml-auto">
                {/* Profile Image and Dropdown */}
                <div className="flex items-center relative">
                    <div onClick={toggleDropdown} className="cursor-pointer">
                        {userImage ? (
                            <img
                                src={userImage}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.target.src = 'default-profile.png'
                                }}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">👤</span>
                            </div>
                        )}
                    </div>

                    {showDropdown && (
                        <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <Link
                                to="/dashboard"
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Quay lại Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default HeaderDashboard