// NewProducts.js
import product1 from '../assets/2.png';
import product2 from '../assets/4.png';
import product3 from '../assets/4.png';

const NewProducts = () => {
    return (
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                    Bộ Sưu Tập Mới
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Khám phá những xu hướng mới nhất, được chọn lọc kỹ lưỡng để mang đến cho bạn trải nghiệm thời trang đẳng cấp
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[product1, product2, product3].map((product, index) => (
                    <div
                        key={index}
                        className="bg-gray-900 rounded-2xl overflow-hidden 
                        transform hover:-translate-y-4 transition-transform duration-500 
                        hover:shadow-2xl hover:shadow-amber-500/20"
                    >
                        <img
                            src={product}
                            alt={`Product ${index + 1}`}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Sản Phẩm {index + 1}
                            </h3>
                            <div className="flex justify-between items-center">
                                <span className="text-amber-400 text-2xl font-bold">
                                    {(index + 1) * 50}.000 VNĐ
                                </span>
                                <button className="px-4 py-2 bg-amber-500 text-black rounded-full">
                                    Mua Ngay
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewProducts;