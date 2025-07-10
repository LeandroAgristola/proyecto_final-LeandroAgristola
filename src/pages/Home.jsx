import React, { useState, useEffect } from 'react';
import CarouselComponent from '../components/CarouselComponent.jsx';
import CategoryCards from '../components/CategoryCards.jsx';
import { Link } from 'react-router-dom';
import bannerOfertas from '../assets/banners/bannerOfertas.png';
import bannerOfertasMovil from '../assets/banners/bannerOfertasMovil.png'; 

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBannerSrc = (desktopSrc, mobileSrc) => {
    return isMobile ? mobileSrc : desktopSrc;
  };

  return (
    <div>
      <CarouselComponent />
      <CategoryCards />
      <div className="container my-5">
        <Link to="/ofertas">
          <img
            src={getBannerSrc(bannerOfertas, bannerOfertasMovil)} 
            alt="Oferta"
            className="img-fluid w-100 rounded"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;