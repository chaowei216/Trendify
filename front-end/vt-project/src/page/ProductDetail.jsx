import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import product1 from '../assets/2.png';
import { getProductDetail } from '../utils/api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const ProductDetail = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [availableQuantity, setAvailableQuantity] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await getProductDetail(id);
                if (response.status.code === 200) {
                    setProductData(response.data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (productData && selectedSize && selectedColor) {
            const variant = productData.variants.find(
                v => v.size === selectedSize && v.color === selectedColor
            );
            setAvailableQuantity(variant ? variant.quantity : 0);
            setQuantity(1);
        }
    }, [selectedSize, selectedColor, productData]);

    const handleQuantityChange = (action) => {
        if (action === 'increase' && quantity < availableQuantity) {
            setQuantity(prev => prev + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const addToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.warning('Vui lòng chọn size và màu sắc!');
            return;
        }

        const existingCart = JSON.parse(Cookies.get('cart') || '[]');

        const existingProductIndex = existingCart.findIndex(item =>
            item.id === productData.id &&
            item.size === selectedSize &&
            item.color === selectedColor
        );

        if (existingProductIndex !== -1) {
            const updatedCart = [...existingCart];
            updatedCart[existingProductIndex].quantity += quantity;
            updatedCart[existingProductIndex].totalPrice =
                updatedCart[existingProductIndex].quantity * productData.price;

            Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
            toast.success('Đã cập nhật số lượng trong giỏ hàng!');
        } else {
            const newItem = {
                id: productData.id,
                name: productData.name,
                price: productData.price,
                image: productData.image || product1,
                size: selectedSize,
                color: selectedColor,
                quantity: quantity,
                totalPrice: productData.price * quantity
            };

            const updatedCart = [...existingCart, newItem];
            Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
            toast.success('Đã thêm vào giỏ hàng!');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!productData) {
        return <div>Product not found</div>;
    }

    return (
        <div className="max-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-full mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        {/* Product Images */}
                        <div className="space-y-6">
                            <div className="aspect-w-1 aspect-h-1 bg-white rounded-xl overflow-hidden">
                                <img
                                    src={productData.image || product1}
                                    alt={productData.name}
                                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-lg font-sans text-gray-900 mb-2 mt-10">{productData.name}</h1>
                                <p className="text-lg font-sans text-red-600">
                                    {productData.price?.toLocaleString()}đ
                                </p>
                            </div>

                            {/* Sizes */}
                            {productData.variants && (
                                <div>
                                    <h3 className="text-lg font-sans text-gray-900 mb-3">Kích thước</h3>
                                    <div className="flex gap-3">
                                        {[...new Set(productData.variants.map(v => v.size))].map((size, index) => (
                                            <button
                                                key={`size-${index}-${size}`}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 
                                                    ${selectedSize === size
                                                        ? 'bg-black text-white'
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Colors */}
                            {productData.variants && (
                                <div>
                                    <h3 className="text-lg font-sans text-gray-900 mb-3">Màu sắc</h3>
                                    <div className="flex gap-3">
                                        {[...new Set(productData.variants.map(v => v.color))].map((color, index) => (
                                            <button
                                                key={`color-${index}-${color}`}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-6 py-3 rounded-lg font-sans transition-all duration-200
                                                    ${selectedColor === color
                                                        ? 'bg-black text-white'
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div>
                                <h3 className="text-lg font-sans text-gray-900 mb-3">Số lượng</h3>
                                {selectedSize && selectedColor ? (
                                    <h6 className="text-xs font-sans text-blue-900 mb-3">
                                        Còn lại: {availableQuantity}
                                    </h6>
                                ) : (
                                    <h6 className="text-xs font-sans text-blue-900 mb-3">
                                        Vui lòng chọn size và màu sắc
                                    </h6>
                                )}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleQuantityChange('decrease')}
                                        className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-sans hover:bg-gray-200 transition-colors"
                                        disabled={!selectedSize || !selectedColor}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-sans w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('increase')}
                                        className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-sans hover:bg-gray-200 transition-colors"
                                        disabled={!selectedSize || !selectedColor}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={addToCart}
                                className={`w-full py-4 rounded-xl font-sans text-lg transition-colors duration-200 transform hover:scale-[1.02]
                                    ${selectedSize && selectedColor && availableQuantity > 0
                                        ? 'bg-black text-white hover:bg-gray-900'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                disabled={!selectedSize || !selectedColor || availableQuantity === 0}
                            >
                                Thêm vào giỏ hàng
                            </button>

                            {/* Description */}
                            <div className="pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-sans text-gray-900 mb-3">Mô tả sản phẩm</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {productData.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;