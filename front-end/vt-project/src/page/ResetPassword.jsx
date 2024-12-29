import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const tokenRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const [tokenDigits, setTokenDigits] = useState(['', '', '', '', '', '']);
    const email = localStorage.getItem('resetEmail');

    const handleTokenChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newTokenDigits = [...tokenDigits];
        newTokenDigits[index] = value;
        setTokenDigits(newTokenDigits);

        if (value && index < 5) {
            tokenRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (!tokenDigits[index] && index > 0) {
                tokenRefs[index - 1].current.focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const token = tokenDigits.join('');
        if (token.length !== 6) {
            setError('Mã token phải đủ 6 số');
            return;
        }

        if (newPassword.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        const requestData = {
            email: email,
            newPassword: newPassword,
            token: token
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/reset-password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể đặt lại mật khẩu');
            }


            setSuccess('Đặt lại mật khẩu thành công! Đang chuyển hướng đến trang đăng nhập...');
            localStorage.removeItem('resetEmail');

            setTimeout(() => {
                navigate('/login');
            }, 4000);

        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi đặt lại mật khẩu');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl">
                <div>
                    <h2 className="text-center text-3xl font-bold">
                        Đặt lại mật khẩu
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        Nhập mã token và mật khẩu mới của bạn
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 text-green-600 p-4 rounded-lg">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Mã Token
                        </label>
                        <div className="flex gap-2 justify-center">
                            {tokenDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={tokenRefs[index]}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleTokenChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập mật khẩu mới"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-150"
                    >
                        Đặt lại mật khẩu
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

export default ResetPassword;