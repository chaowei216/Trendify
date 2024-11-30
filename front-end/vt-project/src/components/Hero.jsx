// src/components/Hero.jsx
const Hero = () => {
    return (
        <div className="relative py-16 overflow-hidden">
            <div className="absolute inset-0  blur-2xl z-0" />

            <div className="relative z-10 space-y-8">
                <h1 className="text-6xl md:text-8xl font-bold text-white 
                    bg-clip-text text-transparent 
                    bg-gradient-to-r from-amber-400 to-white
                    animate-pulse">
                    Mignis
                </h1>

                <div className="space-y-6">
                    <p className="text-xl md:text-2xl text-white/80 
                        leading-relaxed tracking-wide">
                        Khám phá <span className="text-amber-400 font-semibold">phong cách</span> của bạn<br />
                        Nơi <span className="text-amber-400">nghệ thuật</span> gặp gỡ thời trang
                    </p>

                    <button className="px-10 py-4 bg-amber-500 text-black 
                        rounded-full font-bold 
                        hover:bg-amber-400 transition-all 
                        hover:scale-105 hover:shadow-xl">
                        Khám Phá Ngay
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Hero;
