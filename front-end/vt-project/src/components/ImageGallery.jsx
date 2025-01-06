import picture1 from '../assets/home1.png';

const ImageGallery = () => {
    return (
        <div className="relative group px-4 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Main Image Section */}
                <div className="col-span-2 relative rounded-2xl ">
                    <img
                        src={picture1}
                        alt="Main Product"
                        className="w-full h-[500px] md:h-[700px] object-cover 
                        group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-10">
                        <div className="text-white space-y-4">
                            <h3 className="text-2xl md:text-3xl font-bold">
                                Áo Đen Classic
                            </h3>
                            <p className="text-amber-400 text-xl md:text-2xl font-extrabold">
                                200.000 VNĐ
                            </p>
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-100 transition duration-300">
                                    Xem Chi Tiết
                                </button>
                                <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black transition duration-300">
                                    Thêm Giỏ Hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
