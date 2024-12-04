import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import shirtmacdinh from "../assets/2.png"
import { viewProducts } from "../utils/api";

const ViewProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [priceRange, setPriceRange] = useState('all');
    const [category, setCategory] = useState('all');
    const [size, setSize] = useState('all');
    const [sortOrder, setSortOrder] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');

    const itemsPerPage = 8;

    const getProducts = async () => {
        try {
            const requestBody = {
                paging: {
                    page: currentPage,
                    size: itemsPerPage,
                    orders: {}
                }
            };

            const data = await viewProducts(requestBody);
            console.log("API Response:", data);
            if (data.data && data.data.contents) {
                setProducts(data.data.contents);
                const totalPages = data.data.paging ? data.data.paging.totalPage : 1;
                setTotalPages(totalPages);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
            setTotalPages(1);
        }
    };

    useEffect(() => {
        getProducts();
    }, [currentPage, priceRange, category, size, sortOrder, searchQuery]);

    const getPriceRangeValues = () => {
        switch (priceRange) {
            case '0-300000':
                return { min: 0, max: 300000 };
            case '300000-500000':
                return { min: 300000, max: 500000 };
            case '500000-1000000':
                return { min: 500000, max: 1000000 };
            case '1000000':
                return { min: 1000000, max: null };
            default:
                return { min: 0, max: 0 };
        }
    };

    const handleViewDetail = (productId) => {
        navigate(`/product/${productId}`);
    };

    const clearAllFilters = () => {
        setPriceRange('all');
        setCategory('all');
        setSize('all');
        setSortOrder('default');
        setSearchQuery('');

    };

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

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    />
                    <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        <option value="all">Tất cả giá</option>
                        <option value="0-300000">0đ - 300,000đ</option>
                        <option value="300000-500000">300,000đ - 500,000đ</option>
                        <option value="500000-1000000">500,000đ - 1,000,000đ</option>
                        <option value="1000000">Trên 1,000,000đ</option>
                    </select>
                    {/* Các filter khác giữ nguyên */}
                    <button
                        onClick={clearAllFilters}
                        className="px-4 py-2 bg-black text-white rounded-lg"
                    >
                        Xóa bộ lọc
                    </button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={shirtmacdinh}
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
                                <p className="text-lg font-medium mt-1">{product.price?.toLocaleString()} đ</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Trước
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                                    ? 'bg-black text-white'
                                    : 'border'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Sau
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ViewProduct;