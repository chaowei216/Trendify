import picture1 from '../assets/home1.png';
import picture2 from '../assets/home2.png';
import picture3 from '../assets/home3.png';

const ImageGallery = () => {
    return (
        <div className="relative group">
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 relative rounded-2xl overflow-hidden">
                    <img
                        src={picture1}
                        alt="Main Product"
                        className="w-full h-[700px] object-cover 
                        group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 
                        flex items-end p-8">
                        <div className="text-white space-x-32">
                            <h3 className="text-2xl font-bold right-14 gr">
                                Áo Đen Classic
                            </h3>
                            <p className="text-amber-400 text-3xl font-extrabold">
                                200.000 VNĐ
                            </p>
                            <div className="flex space-x-4">
                                <button className="px-6 py-3 bg-white text-black rounded-lg">
                                    Xem Chi Tiết
                                </button>
                                <button className="px-6 py-3 border border-white rounded-lg">
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