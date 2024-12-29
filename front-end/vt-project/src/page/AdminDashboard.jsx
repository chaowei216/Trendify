import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import AccountManagement from '../components/AccountManagement';

const AdminDashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1">
                <AdminHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<AccountManagement />} />
                        <Route path="/accounts" element={<AccountManagement />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;