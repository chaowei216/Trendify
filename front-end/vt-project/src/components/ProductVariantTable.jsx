import React from 'react';
import { FaEdit, FaTrash, FaImage } from 'react-icons/fa';

const ProductVariantTable = ({ variants = [], onEdit, onDelete }) => {
    if (!Array.isArray(variants)) {
        console.warn('Variants prop is not an array:', variants);
        return (
            <div className="text-center py-4 text-gray-500 flex items-center justify-center">
                <FaImage className="mr-2" /> Không có biến thể nào
            </div>
        );
    }

    if (variants.length === 0) {
        return (
            <div className="text-center py-4 text-gray-500 flex items-center justify-center">
                <FaImage className="mr-2" /> Không có biến thể nào
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Size</th>
                        <th className="px-4 py-2 text-left">Color</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Image</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {variants.map((variant) => {
                        if (!variant) return null;

                        const safeVariant = {
                            id: variant?.id || '',
                            size: variant?.size || 'N/A',
                            color: variant?.color || 'N/A',
                            quantity: variant?.quantity || 0,
                            image: variant?.imageName || 'N/A'
                        };

                        return (
                            <tr key={safeVariant.id} className="border-t">
                                <td className="px-4 py-2">{safeVariant.size}</td>
                                <td className="px-4 py-2">{safeVariant.color}</td>
                                <td className="px-4 py-2">{safeVariant.quantity}</td>
                                <td className="px-4 py-2">
                                    <img
                                        src={safeVariant.image}
                                        alt={`Variant ${safeVariant.size}`}
                                        className="h-12 w-12 object-cover rounded"
                                        onError={(e) => {

                                            e.target.onerror = null;
                                        }}
                                    />
                                </td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => onEdit(variant)}
                                        className="text-blue-500 hover:text-blue-700 flex items-center"
                                    >
                                        <FaEdit className="mr-1" /> Sửa
                                    </button>
                                    <button
                                        onClick={() => onDelete(safeVariant.id)}
                                        className="text-red-500 hover:text-red-700 flex items-center"
                                    >
                                        <FaTrash className="mr-1" /> Xóa
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductVariantTable;