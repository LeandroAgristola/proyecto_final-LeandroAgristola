import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import bannerCuotas from '../assets/carousel/bannerCuotas.png';
import bannerPagos from '../assets/carousel/bannerPagos.png';
import bannerPromos from '../assets/carousel/bannerPromos.png';
import bannerCuotasMovil from '../assets/carousel/bannerCuotasMovil.png';
import bannerPagosMovil from '../assets/carousel/bannerPagosMovil.png';
import bannerPromosMovil from '../assets/carousel/bannerPromosMovil.png';

function CarouselComponent() {
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
    <Carousel fade={false} controls={false} indicators={false} id="carousel"> 
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src={getBannerSrc(bannerCuotas, bannerCuotasMovil)} 
          alt="Banner Cuotas"
          style={{ maxHeight: '600px', objectFit: 'cover' }}
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src={getBannerSrc(bannerPagos, bannerPagosMovil)}
          alt="Banner Medios de Pago"
          style={{ maxHeight: '600px', objectFit: 'cover' }}
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src={getBannerSrc(bannerPromos, bannerPromosMovil)}
          alt="Banner Promociones"
          style={{ maxHeight: '600px', objectFit: 'cover' }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;