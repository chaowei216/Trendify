
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ProductVariantForm from './ProductVariantForm';
import ProductVariantTable from './ProductVariantTable';

const ProductForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(
        initialData || {
            name: '',
            price: 0,
            description: '',
            categoryId: 0,
            imageFile: null,
        }
    );
    const [showVariantForm, setShowVariantForm] = useState(false);
    const [variants, setVariants] = useState([]);
    const [editingVariant, setEditingVariant] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);
    const handleCreateVariant = async (formData) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/variants', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('Variant created successfully');
                fetchVariants();
                setShowVariantForm(false);
            } else {
                toast.error('Failed to create variant');
            }
        } catch (error) {
            toast.error('Error creating variant');
        }
    };

    const handleUpdateVariant = async (formData) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/variants/${editingVariant.id}`,
                {
                    method: 'PUT',
                    body: formData,
                }
            );

            if (response.ok) {
                toast.success('Variant updated successfully');
                fetchVariants();
                setShowVariantForm(false);
                setEditingVariant(null);
            } else {
                toast.error('Failed to update variant');
            }
        } catch (error) {
            toast.error('Error updating variant');
        }
    };
    const fetchVariants = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/variants');
            const result = await response.json();
            if (result.data) {
                setVariants(result.data);
            }
        } catch (error) {
            console.error('Error fetching variants:', error);
        }
    };


    useEffect(() => {
        if (initialData) {
            fetchVariants();
        }
    }, [initialData]);
    const handleDeleteVariant = async (id) => {
        if (window.confirm('Are you sure you want to delete this variant?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/variants/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('Variant deleted successfully');
                    fetchVariants();
                } else {
                    toast.error('Failed to delete variant');
                }
            } catch (error) {
                toast.error('Error deleting variant');
            }
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/categories');
            const result = await response.json();
            if (result.data) {
                setCategories(result.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, imageFile: files[0] });
        } else if (type === 'number') {
            setFormData({ ...formData, [name]: parseFloat(value) || 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('price', formData.price);
        form.append('description', formData.description);
        form.append('categoryId', formData.categoryId);
        if (formData.imageFile) {
            form.append('imageFile', formData.imageFile);
        }
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                {initialData && (
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Product Variants</h3>
                            <button
                                onClick={() => {
                                    setEditingVariant(null);
                                    setShowVariantForm(true);
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                            >
                                Add Variant
                            </button>
                        </div>

                        {showVariantForm && (
                            <div className="mb-6 bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-semibold">
                                        {editingVariant ? 'Edit Variant' : 'Add New Variant'}
                                    </h4>
                                    <button
                                        onClick={() => {
                                            setShowVariantForm(false);
                                            setEditingVariant(null);
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                        type="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <ProductVariantForm
                                    productId={initialData.id}
                                    onSubmit={editingVariant ? handleUpdateVariant : handleCreateVariant}
                                    initialData={editingVariant}
                                />
                            </div>
                        )}

                        <ProductVariantTable
                            variants={variants}
                            onEdit={(variant) => {
                                setEditingVariant(variant);
                                setShowVariantForm(true);
                            }}
                            onDelete={handleDeleteVariant}
                        />
                    </div>
                )}
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
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
                {initialData ? 'Update' : 'Create'}
            </button>

        </form>
    );
};

export default ProductForm;