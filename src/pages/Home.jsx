import React from 'react';
// Asegúrate de que CarouselComponent y CategoryCards estén importados.
import CarouselComponent from '../components/CarouselComponent.jsx'; 
import CategoryCards from '../components/CategoryCards.jsx';
import { Link } from 'react-router-dom';
import bannerOfertas from '../assets/banners/bannerOfertas.png'; // O .jpg, según tu archivo, verifica la extensión


function Home() {
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
            src={bannerOfertas}
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