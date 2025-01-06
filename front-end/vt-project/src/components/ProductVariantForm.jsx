import React, { useState } from 'react';
import Swal from 'sweetalert2';
const ProductVariantForm = ({
    productId,
    onSubmit,
    initialData
}) => {
    const [formData, setFormData] = useState({
        size: initialData?.size || '',
        color: initialData?.color || '',
        quantity: initialData?.quantity || 0,
        imageFile: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file'
                ? files[0]
                : (type === 'number'
                    ? parseInt(value) || 0
                    : value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = new FormData();
        submitData.append('productId', productId);
        submitData.append('size', formData.size);
        submitData.append('color', formData.color);
        submitData.append('quantity', formData.quantity);

        if (formData.imageFile) {
            submitData.append('imageFile', formData.imageFile);
        }

        onSubmit(submitData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300"
                    required
                />
            </div>



            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
                {initialData ? 'Update Variant' : 'Create Variant'}
            </button>
        </form>
    );
};

export default ProductVariantForm;