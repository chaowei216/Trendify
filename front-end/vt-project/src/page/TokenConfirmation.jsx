import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const TokenConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (!location.state?.email) {
            navigate('/register');
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const sendVerificationEmail = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: location.state?.email })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to send verification email');
            }
        } catch (error) {
            setError(error.message || 'An error occurred while sending verification email');
        }
    };

    const handleResendCode = async () => {
        if (countdown > 0) return;

        setIsLoading(true);
        await sendVerificationEmail();
        setCountdown(10);
        setIsLoading(false);
    };

    const formatTimeRemaining = () => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleInputChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newToken = [...token];
        newToken[index] = value;
        setToken(newToken);

        if (value && index < 5) {
            const nextInput = document.getElementById(`token-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !token[index] && index > 0) {
            const prevInput = document.getElementById(`token-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
                const newToken = [...token];
                newToken[index - 1] = '';
                setToken(newToken);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newToken = [...token];
        for (let i = 0; i < pastedData.length; i++) {
            newToken[i] = pastedData[i];
        }
        setToken(newToken);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        const tokenString = token.join('');
        if (tokenString.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/confirm-email', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: location.state?.email,
                    token: tokenString
                })
            });

            if (!response.ok) {
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                throw new Error(data.message || 'Token confirmation failed');
            }

            toast.success('Xác nhận email thành công! Đang chuyển hướng đến trang đăng nhập...', {
                position: "top-right",
                autoClose: 2000,
                onClose: () => navigate('/login')
            });
        } catch (error) {
            setError(error.message || 'An error occurred during verification');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold bg-black bg-clip-text text-transparent">
                        Xác nhận email
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Nhập mã xác nhận gồm 6 số đã được gửi đến email của bạn
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
                            <p className="font-medium">Lỗi xác nhận</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="flex justify-center space-x-2">
                        {token.map((digit, index) => (
                            <input
                                key={index}
                                id={`token-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Thời gian còn lại: {formatTimeRemaining()}
                        </p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${isLoading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={countdown > 0}
                            className={`text-sm ${countdown > 0 ? 'text-gray-400' : 'text-indigo-600 hover:text-indigo-500'}`}
                        >
                            Gửi lại mã xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TokenConfirmation;