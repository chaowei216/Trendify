import React from 'react';

const AdminHeader = () => {
    return (
        <header className="bg-white shadow-md p-4">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-96 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        🔔
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span>Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;