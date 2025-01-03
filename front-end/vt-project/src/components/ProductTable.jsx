import React, { useState } from 'react';
import { FaEdit, FaTrash, FaImage, FaEye } from 'react-icons/fa';
import ProductDetailModal from './ProductDetailModal'; // Tạo component này

const ProductTable = ({ products, onEdit, onDelete }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                        <tr>
                            <th className="px-6 py-4  text-sm font-bold text-gray-700 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4  text-sm font-bold text-gray-700 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4  text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr
                                key={product.id}
                                className={`
                                    border-b border-gray-100 
                                    transition-all duration-300 
                                    hover:bg-blue-50 
                                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                `}
                            >
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="font-medium">{product.id}</span>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="relative group ">
                                        {product.defaultImage ? (
                                            <img
                                                src={product.defaultImage}
                                                alt={product.name}
                                                className="h-16 w-16 object-cover rounded-xl shadow-md 
                                                transition-all duration-300 
                                                group-hover:scale-110 
                                                group-hover:shadow-xl"
                                            />
                                        ) : (
                                            <div className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded-xl">
                                                <FaImage className="text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(product.price)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        onClick={() => handleViewDetails(product)}
                                        className="
                                            group relative inline-flex items-center 
                                            bg-blue-50 text-blue-600 
                                            px-4 py-2 rounded-lg 
                                            hover:bg-blue-100 
                                            transition-all duration-300
                                            focus:outline-none
                                        "
                                    >
                                        <FaEye className="mr-2 group-hover:scale-110 transition-transform" />
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        <p className="text-xl">Không tìm thấy sản phẩm</p>
                    </div>
                )}
            </div>


            {isDetailModalOpen && selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setIsDetailModalOpen(false)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
        </>
    );
};

export default ProductTable;