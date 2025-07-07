import React from 'react';
import { Carousel } from 'react-bootstrap'; 
import bannerCuotas from '../assets/carousel/bannerCuotas.png'; 
import bannerPagos from '../assets/carousel/bannerPagos.png';   
import bannerPromos from '../assets/carousel/bannerPromos.png'; 

function CarouselComponent() {
  return (
    <Carousel fade controls={false} indicators={false}> {/* `fade` para un efecto de transición suave, `controls` y `indicators` ocultos para un diseño más limpio */}
      <Carousel.Item interval={5000}> {/* `interval` en milisegundos para la duración de cada slide */}
        <img
          className="d-block w-100"
          src={bannerCuotas}
          alt="Banner Cuotas"
          style={{ maxHeight: '500px', objectFit: 'cover' }} 
        />
        {}
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src={bannerPagos}
          alt="Banner Medios de Pago"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src={bannerPromos}
          alt="Banner Promociones"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;