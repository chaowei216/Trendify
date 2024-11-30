import React, { useState } from "react";
import Navbar from "../components/Navbar";
import product1 from '../assets/2.png';
import product2 from '../assets/4.png';
import product3 from '../assets/4.png';
import Footer from "../components/Footer";
const ViewProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState('all');
    const [category, setCategory] = useState('all');
    const [size, setSize] = useState('all');
    const [color, setColor] = useState('all');
    const [sortOrder, setSortOrder] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');
    const clearAllFilters = () => {
        setPriceRange('all');
        setCategory('all');
        setSize('all');
        setColor('all');
        setSortOrder('default');
        setSearchQuery('');
        setCurrentPage(1);
    };

    const products = [
        {
            id: 1,
            name: "Áo đen thui",
            price: 720000,
            image: product1,

            category: 'hoodie',
            size: 'L',
            color: 'gray'
        },
        {
            id: 2,
            name: "Áo đen thui",
            price: 720000,
            image: product2,

            category: 'hoodie',
            size: 'L',
            color: 'black'
        },
        {
            id: 1,
            name: "Áo đen thui",
            price: 720000,
            image: product1,

            category: 'hoodie',
            size: 'L',
            color: 'gray'
        },
        {
            id: 1,
            name: "Áo đen thui",
            price: 720000,
            image: product1,

            category: 'hoodie',
            size: 'L',
            color: 'gray'
        },
        {
            id: 1,
            name: "Áo đen thui",
            price: 720000,
            image: product1,

            category: 'hoodie',
            size: 'L',
            color: 'gray'
        },
        {
            id: 1,
            name: "Áo đen thui",
            price: 720000,
            image: product1,

            category: 'hoodie',
            size: 'L',
            color: 'gray'
        },
        {
            id: 1,
            name: "Áo đen thui",
            price: 720000,
            image: product1,

            category: 'hoodie',
            size: 'L',
            color: 'gray'
        },
        {
            id: 1,
            name: "Áo đen thui",
            price: 720000,
            image: product1,

            category: 'hoodie',
            size: 'L',
            color: 'gray'
        },
        {
            id: 1,
            name: "Áo đen thui",
            price: 720000,
            image: product1,

            category: 'hoodie',
            size: 'L',
            color: 'gray'
        },



    ];

    const itemsPerPage = 8;


    const filterProducts = () => {
        let filtered = [...products];

        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(product =>
                product.price >= min && (max ? product.price <= max : true)
            );
        }

        if (category !== 'all') {
            filtered = filtered.filter(product => product.category === category);
        }

        if (size !== 'all') {
            filtered = filtered.filter(product => product.size === size);
        }

        if (color !== 'all') {
            filtered = filtered.filter(product => product.color === color);
        }

        // Sorting
        if (sortOrder === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    };


    const filteredProducts = filterProducts();
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-white min-h-screen">
            <Navbar />


            <div className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 pt-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Bộ Sưu Tập Mới</h1>
                        <p className="text-lg text-gray-300">Trở thành phiên bản tốt nhất của bạn</p>
                    </div>
                </div>
            </div>

            {/* Enhanced Filter Section */}
            <div className="bg-gray-100 ">
                <div className="max-w-screen-2xl mx-auto px-0.5">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex flex-col space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="w-2/3">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                >
                                    <option value="all">Lọc giá</option>
                                    <option value="0-300000">0đ - 300,000đ</option>
                                    <option value="300000-500000">300,000đ - 500,000đ</option>
                                    <option value="500000-1000000">500,000đ - 1,000,000đ</option>
                                    <option value="1000000">Trên 1,000,000đ</option>
                                </select>

                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="all">Loại</option>
                                    <option value="hoodie">Áo Thun</option>
                                    <option value="tshirt">Áo Sơ Mi</option>
                                    <option value="accessories">Áo Khoác</option>
                                </select>

                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                >
                                    <option value="all">Kích thước</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>

                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="default">Thứ tự</option>
                                    <option value="price-asc">Giá tăng dần</option>
                                    <option value="price-desc">Giá giảm dần</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Product Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {currentProducts.map((product, index) => (
                        <div key={index} className="group">
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-auto transition duration-300 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition duration-300">
                                    <button className="w-full py-2 bg-white text-black rounded-lg hover:bg-gray-100">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-light">{product.name}</h3>
                                <p className="text-lg font-medium mt-1">{product.price.toLocaleString()} </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enhanced Pagination */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100"
                    >
                        Trước
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                                ? 'bg-black text-white'
                                : 'border border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100"
                    >
                        Sau
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ViewProduct;