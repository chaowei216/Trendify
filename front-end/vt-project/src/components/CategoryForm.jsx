import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from "../utils/api";

const CategoryForm = ({ onSubmit, initialData, onClose }) => {
    const [formData, setFormData] = useState(
        initialData || {
            name: '',
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/categories', {
                method: 'POST',
                headers: {
                    ...auth.getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success(`Category ${initialData ? 'updated' : 'created'} successfully`);
                onSubmit();
                onClose();
            } else {
                const error = await response.json();
                toast.error(error.message || 'Failed to save category');
            }
        } catch (error) {
            toast.error('Error saving category');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    {initialData ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;