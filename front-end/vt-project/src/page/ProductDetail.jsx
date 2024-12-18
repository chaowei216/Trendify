import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductDetail } from '../utils/api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { auth } from "../utils/api";

const ProductDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!auth.validateAccess()) {
                    navigate('/login');
                    return;
                }
                const response = await getProductDetail(id);
                if (response.data) {
                    setProduct(response.data);
                    setMainImage(response.data.defaultImage);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Không thể tải thông tin sản phẩm');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    useEffect(() => {
        if (product && selectedSize && selectedColor) {
            const variant = product.variants?.find(
                v => v.size === selectedSize && v.color === selectedColor
            );
            setAvailableQuantity(variant?.quantity || 0);
            setQuantity(1);
        }
    }, [selectedSize, selectedColor, product]);

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.warning('Vui lòng chọn size và màu sắc');
            return;
        }

        const cartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: mainImage,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            totalPrice: product.price * quantity
        };

        const currentCart = JSON.parse(Cookies.get('cart') || '[]');
        const existingItemIndex = currentCart.findIndex(
            item => item.productId === product.id &&
                item.size === selectedSize &&
                item.color === selectedColor
        );

        if (existingItemIndex > -1) {
            currentCart[existingItemIndex].quantity += quantity;
            currentCart[existingItemIndex].totalPrice =
                currentCart[existingItemIndex].quantity * product.price;
        } else {
            currentCart.push(cartItem);
        }

        Cookies.set('cart', JSON.stringify(currentCart), { expires: 7 });
        toast.success('Đã thêm vào giỏ hàng');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Không tìm thấy sản phẩm</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-6">
                        {/* Left: Image Section */}
                        <div className="space-y-4">
                            <div className="aspect-w-1 aspect-h-1">
                                <img
                                    src={mainImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {product.images?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                                        onClick={() => setMainImage(img)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                                <p className="text-2xl font-semibold text-red-600 mt-2">
                                    {product.price?.toLocaleString()}đ
                                </p>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-gray-900">Kích thước</h3>
                                <div className="flex gap-2">
                                    {product.variants && [...new Set(product.variants.map(v => v.size))].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded ${selectedSize === size
                                                    ? 'bg-black text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-gray-900">Màu sắc</h3>
                                <div className="flex gap-2">
                                    {product.variants && [...new Set(product.variants.map(v => v.color))].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 rounded ${selectedColor === color
                                                    ? 'bg-black text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selection */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-gray-900">Số lượng</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => quantity < availableQuantity && setQuantity(q => q + 1)}
                                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Còn lại: {availableQuantity} sản phẩm
                                </p>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedSize || !selectedColor || availableQuantity === 0}
                                className="w-full py-3 px-8 rounded-lg bg-black text-white hover:bg-gray-900 
                                         disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Thêm vào giỏ hàng
                            </button>

                            {/* Product Description */}
                            <div className="border-t pt-6 mt-6">
                                <h3 className="text-lg font-medium mb-4">Mô tả sản phẩm</h3>
                                <p className="text-gray-600 whitespace-pre-line">
                                    {product.description}
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