import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/accounts', label: 'Account Management', icon: '👥' }
    ];

    return (
        <div className="w-64 min-h-screen bg-white shadow-lg">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <nav className="p-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center p-3 mb-2 rounded-lg ${location.pathname === item.path
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-100'
                            }`}
                    >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default AdminSidebar;