import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerticalMenu from '../components/VerticalMenu';
import HeaderDashboard from '../components/HeaderDashboard';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import CategoryForm from '../components/CategoryForm';
import { viewProducts } from '../utils/api';
import { auth } from "../utils/api"

const StaffDashboard = () => {
    const [products, setProducts] = useState([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchParams, setSearchParams] = useState({
        keyword: '',
        page: 1,
        size: 1,
    });
    const openModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

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
                headers: {
                    ...auth.getAuthHeaders(),

                },
                body: formData
            });
            if (response.ok) {
                const createdProduct = await response.json();
                toast.success('Product created successfully');
                fetchProducts();
                setIsModalOpen(false);

                setSelectedProductId(createdProduct.id);
                setEditingProduct(createdProduct);
            } else {
                if (response.status === 401) {
                    auth.handleUnauthorized(navigate);
                    return;
                }
                toast.error('Failed to create product');
            }
        } catch (error) {
            toast.error('Error creating product');
        }
    };


    const handleUpdate = async (formData) => {
        try {
            // Kiểm tra xem có đang edit product không
            if (!editingProduct) {
                toast.error('Không tìm thấy sản phẩm để chỉnh sửa');
                return;
            }

            // Chuyển đổi FormData sang object
            const updateData = {
                id: editingProduct.id,
                name: formData.get('name'),
                price: parseFloat(formData.get('price')) || 0,
                description: formData.get('description')
            };

            // Validate dữ liệu
            if (!updateData.name || updateData.price < 0) {
                toast.error('Vui lòng điền đầy đủ thông tin hợp lệ');
                return;
            }

            const response = await fetch(
                `http://localhost:8080/api/v1/products/${editingProduct.id}`,
                {
                    method: 'PUT',
                    headers: {
                        ...auth.getAuthHeaders(),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateData)
                }
            );

            const result = await response.json();

            if (response.ok && result.status === 'OK') {

                if (formData.get('imageFile')) {
                    await uploadProductImage(editingProduct.id, formData.get('imageFile'));
                }

                toast.success('Cập nhật sản phẩm thành công');
                fetchProducts();
                setIsModalOpen(false);
                setEditingProduct(null);
            } else {
                // Xử lý lỗi từ server
                if (response.status === 401) {
                    auth.handleUnauthorized(navigate);
                    return;
                }

                toast.success('Cập nhật sản phẩm thành công');
                fetchProducts();
                setIsModalOpen(false);
                setEditingProduct(null);
            }
        } catch (error) {
            console.error('Lỗi cập nhật sản phẩm:', error);
            toast.error('Đã có lỗi xảy ra khi cập nhật sản phẩm');
        }
    };
    const uploadProductImage = async (productId, imageFile) => {
        try {
            const imageFormData = new FormData();
            imageFormData.append('imageFile', imageFile);

            const response = await fetch(
                `http://localhost:8080/api/v1/products/${productId}/image`,
                {
                    method: 'POST',
                    headers: auth.getAuthHeaders(),
                    body: imageFormData
                }
            );

            if (!response.ok) {
                toast.error('Không thể upload ảnh sản phẩm');
            }
        } catch (error) {
            console.error('Lỗi upload ảnh:', error);
            toast.error('Đã có lỗi xảy ra khi upload ảnh');
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
                    headers: auth.getAuthHeaders()
                });

                if (response.ok) {
                    toast.success('Product deleted successfully');
                    fetchProducts();
                } else {
                    if (response.status === 401) {
                        auth.handleUnauthorized(navigate);
                        return;
                    }
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
                            onClick={openModal}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                        >
                            <span>Add Product</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setShowCategoryModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                        >
                            <span>Add Category</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {showCategoryModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                                    <button
                                        onClick={() => setShowCategoryModal(false)}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
                                    <CategoryForm
                                        onSubmit={() => {

                                            setShowCategoryModal(false);
                                        }}
                                        onClose={() => setShowCategoryModal(false)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <h2 className="text-xl font-semibold mb-4">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <ProductForm
                                    onSubmit={editingProduct ? handleUpdate : handleCreate}
                                    initialData={editingProduct}
                                    onClose={closeModal}
                                />
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-md">
                        <ProductTable
                            products={products}
                            onEdit={handleEditProduct}
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