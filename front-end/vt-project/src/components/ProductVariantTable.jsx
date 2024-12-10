import React from 'react';

const ProductVariantTable = ({ variants, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {variants && variants.length > 0 ? (
                        variants.map((variant) => (
                            <tr key={variant.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{variant.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {variant.imageName && (
                                        <img
                                            src={variant.imageName}
                                            alt={`${variant.color} ${variant.size}`}
                                            className="h-16 w-16 object-cover rounded-lg"
                                        />
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{variant.size}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{variant.color}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{variant.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => onEdit(variant)}
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(variant.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                No variants found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductVariantTable;