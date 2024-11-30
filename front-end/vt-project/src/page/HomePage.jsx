// HomePage.js
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ImageGallery from '../components/ImageGallery';
import NewProducts from '../components/NewProduct';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
            <Navbar />
            <div className="container mx-auto px-4 space-y-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <Hero />
                    <ImageGallery />
                </div>
                <NewProducts />
            </div>
            <Footer />
        </div>
    );
};
export default HomePage;