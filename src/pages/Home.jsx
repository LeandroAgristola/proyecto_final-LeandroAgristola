import React from 'react';
import ItemListContainer from '../components/ItemListContainer.jsx'; // Mantener por si se usa en el futuro o para mostrar productos generales
import CarouselComponent from '../components/CarouselComponent.jsx'; // Importa el carrusel
import CategoryCards from '../components/CategoryCards.jsx';     // Importa las tarjetas de categorías
import { Link } from 'react-router-dom';
import bannerOfertas from '../assets/banners/bannerOfertas.png'; // Importa tu nuevo banner de ofertas (asegúrate de la extensión)

function Home() {
  return (
    <div>
      {/* Sección 1: Carrusel Full-width */}
      <CarouselComponent />

      {/* Sección 2: "Encontrá lo que estás buscando" - Tarjetas de Categorías Principales */}
      <CategoryCards />

      {/* Sección 3: Banner de Oferta Pequeño */}
      <div className="container my-5">
        <Link to="/productos?categoria=almohadas"> {/* Enlace a la sección de almohadas */}
          <img
            src={bannerOfertas}
            alt="Oferta en Almohadas"
            className="img-fluid w-100 rounded" // img-fluid para responsividad, w-100 para ancho completo, rounded para bordes
            style={{ maxHeight: '300px', objectFit: 'cover' }} 
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;