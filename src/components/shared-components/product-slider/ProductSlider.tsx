import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Banner } from '@interfaces/banner/Banner.interface';
import './ProductSlider.scss';

const banners: Banner[] = [
    {
        id: '1',
        title: 'Nuevas Gorras',
        imageUrl:
            'https://neweraco.vtexassets.com/assets/vtex.file-manager-graphql/images/1f5d1848-d986-4d33-9b97-8dbe2ceeae63___9fab8936d32a498a2488d18b58f7500c.jpg',
        link: '/categories/category/10/products',
    },
    {
        id: '2',
        title: 'Nuevas Camisetas',
        imageUrl: 'https://dynamobrand.co/cdn/shop/files/BANNER-01-NEW-MERCH-HOR.jpg?v=1730496817&width=1880',
        link: '/categories/category/16/products',
    },
];

const ProductSlider: React.FC = () => {
    const [currentBanner, setCurrentBanner] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startSlider();
        return () => stopSlider();
    }, []);

    const startSlider = () => {
        stopSlider();
        intervalRef.current = setInterval(() => {
            setCurrentBanner((prevBanner) => (prevBanner === banners.length - 1 ? 0 : prevBanner + 1));
        }, 5000);
    };

    const stopSlider = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleMouseEnter = () => stopSlider();
    const handleMouseLeave = () => startSlider();

    const handleDotClick = (index: number) => {
        setCurrentBanner(index);
        stopSlider();
        startSlider();
    };

    return (
        <div className="product-slider" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="slider-container">
                {banners.map((banner, index) => (
                    <Link
                        key={banner.id}
                        to={banner.link}
                        className={`slider-item ${index === currentBanner ? 'fade' : ''}`}
                    >
                        <img src={banner.imageUrl} alt={banner.title} className="slider-image" />
                        <div className="slider-overlay">
                            <h2>{banner.title}</h2>
                        </div>
                    </Link>
                ))}

                <div className="slider-dots">
                    {banners.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentBanner ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSlider;
