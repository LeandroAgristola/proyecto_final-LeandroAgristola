import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import categoriaAlmohadasFibra from '../assets/categories/categoriaAlmohadasFibra.png';
import categoriaAlmohadasVisco from '../assets/categories/categoriaAlmohadasVisco.png';
import categoriaColchones from '../assets/categories/categoriaColchones.png';
import categoriaSabanas from '../assets/categories/categoriaSabanas.png';     


// Componentes Styled-Components existentes para la sección de categorías
const StyledCategorySection = styled.div`
  padding: 40px 0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const StyledTitle = styled.h2`
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 30px;
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

// Componente estilizado para las tarjetas de categoría (sin cambios aquí).
const StyledCategoryCard = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .card-img-top {
    height: 180px;
    object-fit: contain;
  }
`;

function CategoryCards() {
  // Mis datos de categorías principales con las imágenes y rutas que definimos.
  const categoriasPrincipales = [
    {
      nombre: 'Colchones',
      imagen: categoriaColchones,
      path: '/productos?categoria=colchones'
    },
    {
      nombre: 'Almohadas de Fibra',
      imagen: categoriaAlmohadasFibra,
      path: '/productos?categoria=almohadas&subcategoria=fibra'
    },
    {
      nombre: 'Almohadas Viscoelásticas',
      imagen: categoriaAlmohadasVisco,
      path: '/productos?categoria=almohadas&subcategoria=viscoelásticas'
    },
    {
      nombre: 'Sábanas',
      imagen: categoriaSabanas,
      path: '/productos?categoria=sábanas'
    },
  ];

  return (
    <StyledCategorySection>
      <div className="container">
        <StyledTitle>Encontrá lo que estás buscando</StyledTitle>
        <div className="row justify-content-center">
          {categoriasPrincipales.map((cat, index) => (
            <div className="col-md-3 col-sm-6 mb-4" key={index}>
              <Link to={cat.path} className="text-decoration-none text-dark">
                <StyledCategoryCard className="card h-100 text-center">
                  <img
                    src={cat.imagen}
                    className="card-img-top p-3"
                    alt={`Imagen de ${cat.nombre}`}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{cat.nombre}</h6>
                  </div>
                </StyledCategoryCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </StyledCategorySection>
  );
}

export default CategoryCards;