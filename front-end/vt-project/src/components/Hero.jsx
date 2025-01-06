import React from 'react';
import { useNavigate } from 'react-router-dom';
const Hero = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className="relative py-56 overflow-hidden">
            <div className="absolute inset-0 blur-2xl z-0" />

            <div className="relative z-10 space-y-8">
                <h1 className="text-6xl md:text-8xl font-bold text-gray-800 
                    bg-clip-text text-transparent 
                    bg-gradient-to-r from-black to-gray-950
                    animate-pulse">
                    Mignis
                </h1>

                <div className="space-y-6">
                    <p className="text-xl md:text-2xl text-gray-700 
                        leading-relaxed tracking-wide">
                        Khám phá <span className="text-amber-600 font-semibold">phong cách</span> của bạn<br />
                        Nơi <span className="text-amber-600">nghệ thuật</span> gặp gỡ thời trang
                    </p>

                    <button onClick={handleClick} className="px-10 py-4 bg-amber-600 text-white 
                        rounded-full font-bold 
                        hover:bg-amber-500 transition-all 
                        hover:scale-105 hover:shadow-xl">
                        Khám Phá Ngay
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Hero;
