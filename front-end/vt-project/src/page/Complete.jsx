import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { handlePaymentResponse } from '../utils/api';
const Complete = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(location.search);

    useEffect(() => {

        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
        const orderId = "2"

        if (vnp_ResponseCode === '00') {
            handlePaymentResponse({
                orderId: orderId,
                success: true
            })
                .then(() => {
                    Cookies.remove('cart');
                    navigate('/done');
                })
                .catch(error => {
                    console.error('Error handling payment response:', error);
                    navigate('/error');
                });
        } else {
            navigate('/error');
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 text-center"
                >
                    <div className="mb-6">
                        <svg
                            className="mx-auto h-16 w-16 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold mb-4">Thanh toán thành công!</h2>
                    <p className="text-gray-600 mb-8">
                        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất.
                    </p>

                    <div className="space-y-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/')}
                            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                        >
                            Tiếp tục mua sắm
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/orders')}
                            className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                            Xem đơn hàng
                        </motion.button>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Complete;