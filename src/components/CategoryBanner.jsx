import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import bannerAlmohadas from '../assets/banners/bannerAlmohadas.png';
import bannerAlmohadasMovil from '../assets/banners/bannerAlmohadasMovil.png';
import bannerColchones from '../assets/banners/bannerColchones.png';
import bannerColchonesMovil from '../assets/banners/bannerColchonesMovil.png';
import bannerOfertas from '../assets/banners/bannerOfertas.png';
import bannerOfertasMovil from '../assets/banners/bannerOfertasMovil.png';
import bannerRespaldos from '../assets/banners/bannerRespaldos.png';
import bannerRespaldosMovil from '../assets/banners/bannerRespaldosMovil.png';
import bannerSabanas from '../assets/banners/bannerSabanas.png';
import bannerSabanasMovil from '../assets/banners/bannerSabanasMovil.png';
import bannerVendidos from '../assets/banners/bannerVendidos.png';
import bannerVendidosMovil from '../assets/banners/bannerVendidosMovil.png';


const StyledBannerContainer = styled.div`
  margin-bottom: 2rem; /* Space below the banner */
  img {
    width: 100%;
    height: auto;
    max-height: 250px; /* Adjust as needed for desktop */
    object-fit: cover;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 767.98px) {
    img {
      max-height: 150px; /* Smaller height for mobile banners */
    }
  }
`;

const bannerMap = {
  colchones: { desktop: bannerColchones, mobile: bannerColchonesMovil },
  almohadas: { desktop: bannerAlmohadas, mobile: bannerAlmohadasMovil },
  sabanas: { desktop: bannerSabanas, mobile: bannerSabanasMovil },
  respaldos: { desktop: bannerRespaldos, mobile: bannerRespaldosMovil },
  ofertas: { desktop: bannerOfertas, mobile: bannerOfertasMovil },
  vendidos: { desktop: bannerVendidos, mobile: bannerVendidosMovil }, 
};

function CategoryBanner({ category }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const normalizedCategory = category
    ? category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    : '';

  const bannerImages = bannerMap[normalizedCategory];

  if (!bannerImages) {
    return null; 
  }

  const imgSrc = isMobile ? bannerImages.mobile : bannerImages.desktop;

  return (
    <StyledBannerContainer className="container">
      <img src={imgSrc} alt={`Banner de ${category}`} />
    </StyledBannerContainer>
  );
}

export default CategoryBanner;