import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import {
    faHome,
    faUsers,
    faComments,
    faMoneyBillTransfer,
    faBook,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const VerticalMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const navItems = [
        { icon: faHome, label: 'Sản phẩm ', path: '/#' },

        { icon: faBook, label: 'Đơn hàng', path: '/#' },

    ]

    const handleToggle = () => {
        setIsCollapsed((prevState) => !prevState)
    }

    return (
        <div
            className={`bg-gradient-to- from-black to-blue-500 p-4 text-black transition-all duration-300`}
            style={{
                height: '1100px',
                width: isCollapsed ? '80px' : '250px',
                overflow: 'hidden', // Ensures the content is hidden when collapsed
                transition: 'width 0.3s ease-in-out', // Smooth transition for width change
            }}
        >
            <div>
                <div className="flex items-center mb-8">
                    <div
                        className="bg-white text-black rounded-lg p-2 font-bold cursor-pointer"
                        onClick={handleToggle}
                    >
                        Magnis
                    </div>
                    <span
                        className={`ml-2 text-xl font-bold ${isCollapsed ? 'hidden' : ''} transition-all duration-300 ease-in-out`}
                    >

                    </span>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="flex items-center p-3 rounded-lg hover:bg-indigo-600 transition-all duration-200 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                            <span
                                className={`ml-3 ${isCollapsed ? 'hidden' : ''} transition-all duration-300 ease-in-out`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default VerticalMenu
