import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import product1 from '../assets/2.png';

const ProductDetail = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);

    const product = {
        id: 1,
        name: "Áo đen thui",
        price: 720000,
        description: "Áo thun chất lượng cao, thoáng mát, thích hợp cho mọi hoạt động.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Đen", "Trắng", "Xám"],
        images: [product1]
    };

    const handleQuantityChange = (action) => {
        if (action === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

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
                                    src={product1}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y0">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2 mt-10">{product.name}</h1>
                                <p className="text-3xl font-semibold text-gray-800">
                                    {product.price.toLocaleString()}đ
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Sizes */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Kích thước</h3>
                                    <div className="flex gap-3">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
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

                                {/* Colors */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Màu sắc</h3>
                                    <div className="flex gap-3">
                                        {product.colors.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
                                                    ${selectedColor === color
                                                        ? 'bg-black text-white'
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Số lượng</h3>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => handleQuantityChange('decrease')}
                                            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange('increase')}
                                            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full py-4 bg-black text-white rounded-xl font-medium text-lg hover:bg-gray-900 transition-colors duration-200 transform hover:scale-[1.02]">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>

                            {/* Description */}
                            <div className="pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Mô tả sản phẩm</h3>
                                <p className="text-gray-600 leading-relaxed">
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