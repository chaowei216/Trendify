import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cookies from 'js-cookie';
import { createPayment } from '../utils/api';
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const loadCartItems = () => {
            const items = JSON.parse(Cookies.get('cart') || '[]');
            setCartItems(items);
            calculateTotal(items);
        };

        loadCartItems();
    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
        setTotalAmount(total);
    };
    const handleCheckout = async () => {
        try {
            const paymentData = {
                userId: 1,
                items: cartItems.map(item => ({
                    variantId: item.id,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice
                })),
                note: "string",
                totalPrice: totalAmount,
                paymentMethod: "vnpay"
            };

            const response = await createPayment(paymentData);
            if (response.data && response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl;
            }
        } catch (error) {
            console.error('Error during checkout:', error);

        }
    };
    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = [...cartItems];
        updatedCart[index].quantity = newQuantity;
        updatedCart[index].totalPrice = updatedCart[index].price * newQuantity;

        setCartItems(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: 1 }); // Cập nhật cookie
        calculateTotal(updatedCart);
    };

    const removeItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: 1 }); // Cập nhật cookie
        calculateTotal(updatedCart);
    };
    // const handleLogout = () => {
    //     Cookies.remove('cart'); 
    //     alert('Đăng xuất thành công!');
    // };
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-32">
                        <h2 className="text-2xl font-semibold mb-4">Giỏ hàng trống</h2>
                        <p className="text-gray-600">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-8">Giỏ hàng của bạn</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {cartItems.map((item, index) => (
                            <motion.div
                                key={`${item.id}-${item.size}-${item.color}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-md p-6 mb-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="text-gray-600 text-sm">
                                            Size: {item.size} | Màu: {item.color}
                                        </p>
                                        <p className="text-red-600 font-medium">
                                            {item.price.toLocaleString()}đ
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                            <h3 className="text-xl font-semibold mb-4">Tổng đơn hàng</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span>Tạm tính</span>
                                    <span>{totalAmount.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển</span>
                                    <span>0đ</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-semibold">
                                        <span>Tổng cộng</span>
                                        <span className="text-red-600">
                                            {totalAmount.toLocaleString()}đ
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCheckout}
                                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                            >
                                Tiến hành thanh toán
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;