import React, { useState, useEffect } from 'react';
import CarouselComponent from '../components/CarouselComponent.jsx';
import CategoryCards from '../components/CategoryCards.jsx';
import { Link } from 'react-router-dom';
import bannerOfertas from '../assets/banners/bannerOfertas.png'; // Original desktop image
import bannerOfertasMovil from '../assets/banners/bannerOfertasMovil.png'; // Mobile-specific image

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Assuming 768px for common mobile breakpoint

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
      {/* Sección 1: Carrusel Full-width */}
      <CarouselComponent />

      {/* Sección 2: "Encontrá lo que estás buscando" - Tarjetas de Categorías Principales */}
      <CategoryCards />

      {/* Sección 3: Banner de Oferta Pequeño */}
      <div className="container my-5">
        <Link to="/ofertas">
          <img
            src={getBannerSrc(bannerOfertas, bannerOfertasMovil)} // Use conditional image source
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