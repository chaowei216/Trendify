import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import AccountManagement from '../components/AccountManagement';
import DashBoardOverView from '../components/DashBoardOverView';

const AdminDashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1">
                <AdminHeader />
                <main className="p-6">
                    <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="accounts" element={<AccountManagement />} />
                        <Route path="dashboard" element={<DashBoardOverView />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;