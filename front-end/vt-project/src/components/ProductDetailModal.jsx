import React from 'react';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const ProductDetailModal = ({ product, onClose, onEdit, onDelete }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Chi tiết sản phẩm</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes className="h-6 w-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hình ảnh */}
                    <div>
                        <img
                            src={product.defaultImage}
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-xl shadow-lg"
                        />
                    </div>

                    {/* Thông tin chi tiết */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">{product.name}</h3>

                        <div className="space-y-3">
                            <div>
                                <span className="font-medium text-gray-600">Giá:</span>
                                <span className="ml-2 text-green-600 font-bold">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(product.price)}
                                </span>
                            </div>

                            <div>
                                <span className="font-medium text-gray-600">Mô tả:</span>
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            <div>
                                <span className="font-medium text-gray-600">Loại</span>
                                <p className="text-gray-700">{product.category}</p>
                            </div>
                        </div>

                        {/* Variants Section */}
                        <div className="mt-6"> <h4 className="text-lg font-semibold">Variants</h4>
                            <ul className="list-disc list-inside">
                                {product.variants && product.variants.length > 0 ? (
                                    product.variants.map((variant, index) => (
                                        <li key={index} className="text-gray-700">
                                            {variant.name}: {variant.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(variant.price) : 'N/A'}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">Không có biến thể nào</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end p-4 border-t">
                    <button
                        onClick={() => {
                            onEdit(product);
                            onClose();
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        <FaEdit className="mr-2" /> Chỉnh sửa
                    </button>
                    <button
                        onClick={() => {
                            onDelete(product.id);
                            onClose();
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 ml-2"
                    >
                        <FaTrash className="mr-2" /> Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;