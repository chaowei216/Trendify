import React from 'react';
import { useState, useEffect } from 'react';
import { auth } from "../utils/api";

const DashBoardOverView = () => {
    const [dashboardData, setDashboardData] = useState({
        numOfCustomer: 0,
        numOfStaff: 0,
        numOfProduct: 0,
        revenue: 0
    });

    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 10,
        totalElements: 0,
        pageSize: 10
    });


    useEffect(() => {
        fetchDashboardData();
        fetchOrders(pagination.currentPage);
    }, []);

    const fetchDashboardData = async () => {
        try {
            console.log('Fetching dashboard data...');
            const response = await fetch('http://localhost:8080/statistic', {
                method: 'GET',
                headers: {
                    ...auth.getAuthHeaders(),
                }
            });

            if (response.ok) {
                const result = await response.json();
                if (result.data) {
                    setDashboardData(result.data);
                }
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const fetchOrders = async (page = 1) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/orders/search', {
                method: 'POST',
                headers: {
                    ...auth.getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "paging": {
                        "page": page,
                        "size": pagination.pageSize,
                        "orders": {}
                    }
                })
            });

            if (response.ok) {
                const result = await response.json();
                setOrders(result.data.contents);
                setPagination({
                    currentPage: page,
                    totalPages: Math.ceil(result.data.totalElements / pagination.pageSize),
                    totalElements: result.data.totalElements,
                    pageSize: pagination.pageSize
                });
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handlePageChange = (newPage) => {
        fetchOrders(newPage);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    const PaginationControls = () => {
        const getPageNumbers = () => {
            const maxPagesToShow = 5;
            const currentPage = pagination.currentPage;
            const totalPages = pagination.totalPages;

            if (totalPages <= maxPagesToShow) {
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            }

            let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
            let endPage = startPage + maxPagesToShow - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(endPage - maxPagesToShow + 1, 1);
            }

            return Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
            );
        };

        return (
            <div className="mt-4 flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex justify-between flex-1 sm:hidden">
                    <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing page <span className="font-medium">{pagination.currentPage}</span> of{' '}
                            <span className="font-medium">{pagination.totalPages}</span> pages
                        </p>
                    </div>
                    <div>
                        {pagination.totalPages > 0 && (
                            <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {getPageNumbers().map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                            ${pagination.currentPage === pageNum
                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Customers Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Total Customers</p>
                            <p className="text-2xl font-semibold">{dashboardData.numOfCustomer}</p>
                        </div>
                    </div>
                </div>

                {/* Staff Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Total Staff</p>
                            <p className="text-2xl font-semibold">{dashboardData.numOfStaff}</p>
                        </div>
                    </div>
                </div>

                {/* Products Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Total Products</p>
                            <p className="text-2xl font-semibold">{dashboardData.numOfProduct}</p>
                        </div>
                    </div>
                </div>

                {/* Revenue Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <p className="text-2xl font-semibold">{formatCurrency(dashboardData.revenue)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 text-left whitespace-nowrap">{order.id}</td>
                                    <td className="px-6 py-4 text-left  whitespace-nowrap">{order.address}</td>
                                    <td className="px-6 py-4 text-left whitespace-nowrap">{formatDate(order.orderDate)}</td>
                                    <td className="px-6 py-4 text-left whitespace-nowrap">{formatCurrency(order.totalPrice)}</td>
                                    <td className="px-6 py-4 text-left whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PaginationControls />
            </div>

        </div>
    );
};

export default DashBoardOverView;