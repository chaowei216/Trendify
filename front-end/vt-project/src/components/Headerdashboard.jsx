import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { decodeToken } from '../utils/decodeJWT'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



const HeaderDashboard = () => {
    const [userImage, setUserImage] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        const userData = decodeToken()
        if (userData) {
            setUserImage(userData.avatar || ProfileTeacher)
        }
    }, [])

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    const handleLogout = () => {
        if (window.confirm('Do you want to logout?')) {
            clearSession()
        }
    }

    return (
        <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
            <div className="flex-1">
                {/* Add any content here for the left side (if needed) */}
            </div>

            <div className="flex items-center space-x-4 ml-auto">
                {/* Search Bar */}
                <div className="relative">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="search"
                        placeholder="Tìm kiếm..."
                        className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Profile Image and Dropdown */}
                <div className="flex items-center relative">
                    <div onClick={toggleDropdown} className="cursor-pointer">
                        {userImage && (
                            <img
                                src={userImage}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.target.src = 'default-profile.png'
                                }}
                            />
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
                            <Link
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Đăng xuất
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default HeaderDashboard
