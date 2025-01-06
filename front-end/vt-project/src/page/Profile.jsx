import React, { useState, useEffect } from 'react';
import { decodeToken } from '../utils/decodeJWT';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        id: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        email: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: ''
    });
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('No token found');
                }

                const decodedToken = decodeToken(token);
                const sub = decodedToken?.sub;

                if (!sub) {
                    throw new Error('No email found in token');
                }


                const response = await fetch(`http://localhost:8080/api/v1/accounts?email=${sub}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const data = await response.json();

                if (data.data) {
                    setUserInfo(data.data);
                    setFormData({
                        fullName: data.data.fullName,
                        phoneNumber: data.data.phoneNumber,
                        address: data.data.address
                    });


                    const ordersResponse = await fetch(`http://localhost:8080/api/v1/orders/${data.data.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!ordersResponse.ok) {
                        throw new Error('Failed to fetch orders');
                    }

                    const ordersData = await ordersResponse.json();
                    console.log('Orders data:', ordersData);
                    setOrders([ordersData.data]);
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải thông tin'
                });
            }
        };

        fetchUserInfo();
    }, []);


    const handleGoBack = () => {
        navigate(-1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/accounts/${userInfo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    id: userInfo.id,
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    address: formData.address
                })
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Cập nhật thông tin thành công'
                });
                setIsEditing(false);
                setUserInfo(prev => ({
                    ...prev,
                    ...formData
                }));
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể cập nhật thông tin'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-28 pb-10">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-amber-800">Thông tin tài khoản</h1>
                        <button
                            onClick={handleGoBack}
                            className="px-4 py-2 text-amber-600 hover:text-amber-700 transition-colors duration-200 flex items-center group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1 transform group-hover:-translate-x-1 transition-transform duration-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Quay lại
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="relative">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                            <input
                                type="email"
                                value={userInfo.email}
                                disabled
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                            />
                        </div>

                        <div className="relative">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Họ và tên</label>
                            <input
                                type="text"
                                name="fullName"
                                value={isEditing ? formData.fullName : userInfo.fullName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full p-3 border rounded-lg transition-all duration-200 ${isEditing
                                    ? 'border-amber-500 bg-white focus:ring-2 focus:ring-amber-500'
                                    : 'border-gray-300 bg-gray-50'
                                    }`}
                            />
                        </div>

                        <div className="relative">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Số điện thoại</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={isEditing ? formData.phoneNumber : userInfo.phoneNumber}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full p-3 border rounded-lg transition-all duration-200 ${isEditing
                                    ? 'border-amber-500 bg-white focus:ring-2 focus:ring-amber-500'
                                    : 'border-gray-300 bg-gray-50'
                                    }`}
                            />
                        </div>

                        <div className="relative">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={isEditing ? formData.address : userInfo.address}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full p-3 border rounded-lg transition-all duration-200 ${isEditing
                                    ? 'border-amber-500 bg-white focus:ring-2 focus:ring-amber-500'
                                    : 'border-gray-300 bg-gray-50'
                                    }`}
                            />
                        </div>

                        <div className="flex justify-end space-x-4 mt-8">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        className="px-6 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        Lưu thay đổi
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    Chỉnh sửa
                                </button>
                            )}
                        </div>


                    </div>

                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl mt-8">
                    <h2 className="text-2xl font-bold text-amber-800 mb-6">Lịch sử đơn hàng</h2>
                    <div className="space-y-4">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">Mã đơn: #{order.id}</p>
                                            <p className="text-gray-600">Ngày đặt: {new Date(order.orderDate).toLocaleDateString()}</p>
                                            <p className="text-gray-600">Trạng thái: {order.status}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-amber-600">
                                                {order.totalPrice?.toLocaleString('vi-VN')}đ
                                            </p>
                                            <p className="text-gray-600">{order.paymentMethod}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">Chưa có đơn hàng nào</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;