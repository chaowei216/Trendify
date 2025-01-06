import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import ProductVariantForm from './ProductVariantForm';
import ProductVariantTable from './ProductVariantTable';
import { auth } from "../utils/api"
import Swal from 'sweetalert2';
const ProductForm = ({ onSubmit, initialData, onClose, productId }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialData || {
        name: '',
        price: 0,
        description: '',
        categoryId: '',
        imageFile: null,
    });
    const [showVariantForm, setShowVariantForm] = useState(false);
    const [variants, setVariants] = useState([]);
    const [editingVariant, setEditingVariant] = useState(null);
    const [categories, setCategories] = useState([]);
    const [currentProductId, setCurrentProductId] = useState(initialData?.id || null);


    useEffect(() => {
        fetchCategories();
    }, []);


    useEffect(() => {
        if (currentProductId) {
            fetchVariants();
        }
    }, [currentProductId]);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/categories', {
                method: 'GET',
                headers: auth.getAuthHeaders()
            });

            if (response.status === 401) {
                auth.handleUnauthorized(navigate);
                return;
            }

            const result = await response.json();
            setCategories(result.data || []);
        } catch (error) {
            toast.error('Error fetching categories');
        }
    };

    // Fetch variants for the current product
    // Fetch variants for the current product
    const fetchVariants = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/products/${currentProductId}`, {
                method: 'GET',
                headers: auth.getAuthHeaders()
            });

            if (response.status === 401) {
                auth.handleUnauthorized(navigate);
                return;
            }

            const result = await response.json();


            if (result.data && Array.isArray(result.data.variants)) {

                const mappedVariants = result.data.variants.map(variant => ({
                    id: variant.id,
                    name: `${variant.size} - ${variant.color}`,
                    size: variant.size,
                    color: variant.color,
                    quantity: variant.quantity,
                    image: variant.imageName,
                    price: result.data.price
                }));

                setVariants(mappedVariants);
            } else {
                setVariants([]);
                toast.info('Không tìm thấy biến thể nào');
            }
        } catch (error) {
            console.error('Error fetching variants:', error);
            toast.error('Lỗi tải biến thể sản phẩm');
            setVariants([]);
        }
    };
    // Điều chỉnh hàm handleCreateVariant
    const handleCreateVariant = async (formData) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/variants', {
                method: 'POST',
                headers: auth.getAuthHeaders(),
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                if (result.status === 'OK') {
                    toast.success('Variant created successfully!');
                    fetchVariants();
                    setShowVariantForm(false);
                } else {
                    toast.error(result.message || 'Failed to create variant');
                }
            } else {
                if (response.status === 401) {
                    auth.handleUnauthorized(navigate);
                    return;
                }
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to create variant');
            }
        } catch (error) {
            console.error('Error creating variant:', error);
            toast.error('Error creating variant: ' + error.message);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file'
                ? files[0]
                : (type === 'number'
                    ? parseFloat(value) || 0
                    : value)
        }));
    };
    const handleUpdateVariant = async (formData) => {
        try {
            if (!editingVariant) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể cập nhật biến thể - Thiếu thông tin cần thiết'
                });
                return;
            }

            Swal.fire({
                title: 'Đang xử lý...',
                text: 'Vui lòng đợi trong giây lát',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const payload = {
                id: editingVariant.id,
                quantity: formData.get('quantity') ? parseInt(formData.get('quantity')) : 0
            };

            // Validate quantity
            if (payload.quantity < 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Số lượng không thể nhỏ hơn 0'
                });
                return;
            }

            const response = await fetch(`http://localhost:8080/api/v1/variants/${editingVariant.id}`, {
                method: 'PUT',
                headers: {
                    ...auth.getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && result.status === 'OK') {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Cập nhật biến thể thành công',
                    timer: 1500,
                    showConfirmButton: false
                });

                fetchVariants();
                setShowVariantForm(false);
                setEditingVariant(null);
            } else {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Cập nhật biến thể thành công',
                    timer: 1500,
                    showConfirmButton: false
                });

                fetchVariants();

                if (response.status === 401) {
                    errorMessage = 'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại';
                    auth.handleUnauthorized(navigate);
                } else if (result.message) {
                    errorMessage = result.message;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Không thể cập nhật',
                    text: errorMessage,
                    confirmButtonText: 'Đóng'
                });
            }
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    };
    const handleDeleteVariant = async (variantId) => {
        try {
            // Hiển thị confirm dialog
            const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa biến thể này?');

            if (!confirmDelete) return;

            const response = await fetch(`http://localhost:8080/api/v1/variants/${variantId}`, {
                method: 'DELETE',
                headers: auth.getAuthHeaders()
            });

            if (response.ok) {
                const result = await response.json();

                // Kiểm tra status từ response
                if (result.status === 'OK') {
                    toast.success('Xóa biến thể thành công');

                    // Refresh variants list
                    fetchVariants();
                } else {
                    toast.error(result.message || 'Không thể xóa biến thể');
                }
            } else {
                // Xử lý lỗi unauthorized
                if (response.status === 401) {
                    auth.handleUnauthorized(navigate);
                    return;
                }

                // Xử lý các lỗi khác
                const errorData = await response.json();
                toast.error(errorData.message || 'Không thể xóa biến thể');
            }
        } catch (error) {
            console.error('Lỗi xóa biến thể:', error);
            toast.error('Lỗi: ' + error.message);
        }
    };
    // Submit product form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        // Append form data
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                form.append(key, formData[key]);
            }
        });

        try {
            if (!initialData) {
                // Create new product
                const response = await fetch('http://localhost:8080/api/v1/products', {
                    method: 'POST',
                    headers: auth.getAuthHeaders(),
                    body: form
                });

                if (response.ok) {
                    const result = await response.json();
                    setCurrentProductId(result.id);
                    toast.success('Product created successfully');
                    setShowVariantForm(true);
                } else {
                    toast.error('Failed to create product');
                }
            } else {
                // Update existing product
                onSubmit(form);
            }
        } catch (error) {
            toast.error('Error processing product');
        }
    };

    // Render variant modal
    const renderVariantModal = () => {
        if (!showVariantForm) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowVariantForm(false)}></div>
                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold">
                            {editingVariant ? 'Edit Variant' : 'Add New Variant'}
                        </h3>
                        <button
                            onClick={() => {
                                setShowVariantForm(false);
                                setEditingVariant(null);
                            }}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-6">
                        <ProductVariantForm
                            productId={initialData ? initialData.id : currentProductId}
                            onSubmit={editingVariant ? handleUpdateVariant : handleCreateVariant}
                            initialData={editingVariant}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                        <input
                            type="file"
                            name="imageFile"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept="image/*"
                        />
                    </div>
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

            {renderVariantModal()}

            {variants.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Product Variants</h3>
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
        </div>
    );
};

export default ProductForm;