import Footer from "../components/Footer";
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        sizes: [],
        colors: [],
        materials: '',
        careInstructions: '',
        images: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(productData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-screen-md h-auto mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tên sản phẩm</label>
                            <input
                                type="text"
                                name="name"
                                value={productData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Giá</label>
                            <input

                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Danh mục</label>
                            <select
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                required
                            >
                                <option value="">Chọn danh mục</option>
                                <option value="tshirt">Áo thun</option>
                                <option value="hoodie">Áo Sơ mi</option>
                                <option value="jacket">Áo khoác</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Mô tả</label>
                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                required
                            />
                        </div>




                        <div>
                            <label className="block text-sm font-medium mb-2">Hình ảnh sản phẩm</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                accept="image/*"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                        >
                            Thêm sản phẩm
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddProduct;