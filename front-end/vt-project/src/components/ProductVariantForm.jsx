import React, { useState } from 'react';

const ProductVariantForm = ({ productId, onSubmit, initialData }) => {
    const [formData, setFormData] = useState(
        initialData || {
            size: 'S',
            color: '',
            quantity: 0,
            imageFile: null
        }
    );

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, imageFile: files[0] });
        } else if (name === 'quantity') {
            setFormData({ ...formData, [name]: parseInt(value) || 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('size', formData.size);
        form.append('color', formData.color);
        form.append('quantity', formData.quantity);
        form.append('productId', productId);
        if (formData.imageFile) {
            form.append('imageFile', formData.imageFile);
        }
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                    min="0"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                    type="file"
                    name="imageFile"
                    onChange={handleChange}
                    className="mt-1 block w-full"
                    accept="image/*"
                />
            </div>

            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {initialData ? 'Update Variant' : 'Add Variant'}
            </button>
        </form>
    );
};

export default ProductVariantForm;