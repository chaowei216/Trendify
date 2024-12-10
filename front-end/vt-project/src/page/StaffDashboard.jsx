import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerticalMenu from '../components/VerticalMenu';
import HeaderDashboard from '../components/HeaderDashboard';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import { viewProducts } from '../utils/api';

const StaffDashboard = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const [editingProduct, setEditingProduct] = useState(null);
    const [searchParams, setSearchParams] = useState({
        keyword: '',
        page: 1,
        size: 1,
    });

    const fetchProducts = async () => {
        try {
            const response = await viewProducts(searchParams);
            setProducts(response.data.contents || []);
            setTotalPages(response.data.totalPages || 0);
        } catch (error) {
            toast.error('Error fetching products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    const handleCreate = async (formData) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/products', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                toast.success('Product created successfully');
                fetchProducts();
                setShowForm(false);
            } else {
                toast.error('Failed to create product');
            }
        } catch (error) {
            toast.error('Error creating product');
        }
    };

    const handleUpdate = async (formData) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/products/${editingProduct.id}`,
                {
                    method: 'PUT',
                    body: formData,
                }
            );

            if (response.ok) {
                toast.success('Product updated successfully');
                fetchProducts();
                setShowForm(false);
                setEditingProduct(null);
            } else {
                toast.error('Failed to update product');
            }
        } catch (error) {
            toast.error('Error updating product');
        }
    };
    const Pagination = () => {
        const pageNumbers = [];
        for (let i = 0; i < totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="mt-6 flex justify-center items-center gap-2">
                <button
                    onClick={() => setSearchParams(prev => ({ ...prev, page: 0 }))}
                    className={`px-3 py-1 rounded-md ${searchParams.page === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                        }`}
                    disabled={searchParams.page === 0}
                >
                    «
                </button>

                <button
                    onClick={() => setSearchParams(prev => ({ ...prev, page: Math.max(0, prev.page - 1) }))}
                    className={`px-3 py-1 rounded-md ${searchParams.page === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                        }`}
                    disabled={searchParams.page === 0}
                >
                    ‹
                </button>

                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setSearchParams(prev => ({ ...prev, page: number }))}
                        className={`px-3 py-1 rounded-md ${searchParams.page === number
                            ? 'bg-blue-600 text-white'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                            }`}
                    >
                        {number + 1}
                    </button>
                ))}

                <button
                    onClick={() => setSearchParams(prev => ({ ...prev, page: prev.page + 1 }))}
                    className={`px-3 py-1 rounded-md ${searchParams.page === totalPages - 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                        }`}
                    disabled={searchParams.page === totalPages}
                >
                    ›
                </button>

                <button
                    onClick={() => setSearchParams(prev => ({ ...prev, page: totalPages - 1 }))}
                    className={`px-3 py-1 rounded-md ${searchParams.page === totalPages - 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                        }`}
                    disabled={searchParams.page === totalPages}
                >
                    »
                </button>
            </div>
        );
    };
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('Product deleted successfully');
                    fetchProducts();
                } else {
                    toast.error('Failed to delete product');
                }
            } catch (error) {
                toast.error('Error deleting product');
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <VerticalMenu />
            <div className="flex-1">
                <HeaderDashboard />
                <div className="p-6 max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
                        <p className="text-gray-600">Manage your products inventory</p>
                    </div>

                    <div className="mb-6 flex justify-between items-center gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => setSearchParams(prev => ({ ...prev, keyword: e.target.value, page: 0 }))}
                            />
                        </div>
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setShowForm(true);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                        >
                            <span>Add Product</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {showForm && (
                        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <ProductForm
                                onSubmit={editingProduct ? handleUpdate : handleCreate}
                                initialData={editingProduct}
                            />
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-md">
                        <ProductTable
                            products={products}
                            onEdit={(product) => {
                                setEditingProduct(product);
                                setShowForm(true);
                            }}
                            onDelete={handleDelete}
                        />
                    </div>

                    <div className="mt-6">
                        <Pagination />
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default StaffDashboard;