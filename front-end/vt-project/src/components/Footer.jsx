import React from 'react'
import 'fa-icons';
const Footer = () => {
    return (
        <footer className="bg-gray-100 mt-24 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div>
                        <h3 className="text-gray-800 text-lg font-semibold mb-6">Về chúng tôi</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Giới thiệu
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Tuyển dụng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Liên hệ
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-800 text-lg font-semibold mb-6">Hỗ trợ</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Điều khoản sử dụng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                                    Chính sách bảo mật
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-800 text-lg font-semibold mb-6">Kết nối với chúng tôi</h3>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                                <i className="fab fa-facebook text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 text-center">
                        © 2024 Mignis Store. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer
