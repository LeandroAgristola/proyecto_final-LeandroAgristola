import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'; // Importamos styled para crear componentes con estilos

// Importamos nuestras imágenes de categorías (todas en .png como indicaste)
import categoriaAlmohadasFibra from '../assets/categories/categoriaAlmohadasFibra.png';
import categoriaAlmohadasVisco from '../assets/categories/categoriaAlmohadasVisco.png';
import categoriaColchones from '../assets/categories/categoriaColchones.png';
import categoriaSabanas from '../assets/categories/categoriaSabanas.png';

// ***** Mis componentes Styled-Components *****

// Un contenedor estilizado para toda la sección de CategoryCards.
// Esto me permite darle un padding y un color de fondo diferente a esta sección específica.
const StyledCategorySection = styled.div`
  padding: 40px 0; /* Más padding arriba y abajo para destacar la sección */
  margin-bottom: 20px; /* Un poco de margen inferior */

  /* Media query para hacer el padding más pequeño en pantallas muy chicas */
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

// Un título estilizado para "Encontrá lo que estás buscando".
// Esto me da control total sobre su tamaño, color, margen, etc.
const StyledTitle = styled.h2`
  font-size: 2.5rem; /* Un tamaño de fuente más grande para el título */
  color: #343a40; /* Un color más oscuro para el texto */
  margin-bottom: 30px; /* Más espacio debajo del título */
  font-weight: 700; /* Negrita para el título */
  text-align: center; /* Aseguramos que esté centrado */

  /* Media query para ajustar el tamaño de fuente en pantallas pequeñas */
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

// ***** Fin de los componentes Styled-Components *****


function CategoryCards() {
  // Mis datos de categorías principales con las imágenes y rutas que definimos
  const categoriasPrincipales = [
    {
      nombre: 'Colchones',
      imagen: categoriaColchones,
      path: '/productos?categoria=colchones'
    },
    {
      nombre: 'Almohadas de Fibra',
      imagen: categoriaAlmohadasFibra,
      path: '/productos?categoria=almohadas'
    },
    {
      nombre: 'Almohadas Viscoelásticas',
      imagen: categoriaAlmohadasVisco,
      path: '/productos?categoria=almohadas'
    },
    {
      nombre: 'Sábanas',
      imagen: categoriaSabanas,
      path: '/productos?categoria=sabanas'
    },
  ];

  return (
    // Utilizo mi componente StyledCategorySection en lugar de un div normal para aplicar los estilos de la sección.
    <StyledCategorySection>
      <div className="container">
        {/* Utilizo mi componente StyledTitle en lugar de un h2 normal */}
        <StyledTitle>Encontrá lo que estás buscando</StyledTitle>
        <div className="row justify-content-center">
          {/* Mapeo mis categorías para crear las tarjetas */}
          {categoriasPrincipales.map((cat, index) => (
            <div className="col-md-3 col-sm-6 mb-4" key={index}>
              <Link to={cat.path} className="text-decoration-none text-dark">
                <div className="card h-100 text-center">
                  <img
                    src={cat.imagen}
                    className="card-img-top p-3"
                    alt={`Imagen de ${cat.nombre}`}
                    style={{ height: '150px', objectFit: 'contain' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{cat.nombre}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </StyledCategorySection>
  );
}

export default CategoryCards;