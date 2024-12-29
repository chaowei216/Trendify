import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');


        const requestData = {
            email: email
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const data = response.status !== 204 ? await response.json() : null;
            localStorage.setItem('resetEmail', email);
            if (!response.ok) {
                throw new Error(data.message || 'Failed to process request');
            }

            // Handle successful response
            navigate('/reset-password');

        } catch (err) {
            setError(err.message || 'An error occurred while processing your request');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl">
                <div>
                    <h2 className="text-center text-3xl font-bold">
                        Quên mật khẩu
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        Nhập email của bạn để đặt lại mật khẩu
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập địa chỉ email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-150"
                    >
                        Gửi link đặt lại mật khẩu
                    </button>

                    <div className="text-center">
                        <a
                            href="/login"
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            Quay lại đăng nhập
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;