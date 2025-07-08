import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Mis importaciones de imágenes de categorías (todas en .png como indicamos)
import categoriaAlmohadasFibra from '../assets/categories/categoriaAlmohadasFibra.png';
import categoriaAlmohadasVisco from '../assets/categories/categoriaAlmohadasVisco.png';
import categoriaColchones from '../assets/categories/categoriaColchones.png';
import categoriaSabanas from '../assets/categories/categoriaSabanas.png';

// Mis componentes Styled-Components para la sección de categorías
const StyledCategorySection = styled.div`
  padding: 40px 0;
  background-color: #f8f9fa;
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


function CategoryCards() {
  // Mis datos de categorías principales con las imágenes y rutas actualizadas.
  // Es clave que ahora las tarjetas de almohadas apunten a sus subcategorías específicas.
  const categoriasPrincipales = [
    {
      nombre: 'Colchones',
      imagen: categoriaColchones,
      path: '/productos?categoria=colchones'
    },
    {
      nombre: 'Almohadas de Fibra',
      imagen: categoriaAlmohadasFibra,
      path: '/productos?categoria=almohadas&subcategoria=fibra' // ¡Ahora apunta a la subcategoría de fibra!
    },
    {
      nombre: 'Almohadas Viscoelásticas',
      imagen: categoriaAlmohadasVisco,
      path: '/productos?categoria=almohadas&subcategoria=viscoelásticas' // ¡Ahora apunta a la subcategoría viscoelásticas!
    },
    {
      nombre: 'Sábanas',
      imagen: categoriaSabanas,
      path: '/productos?categoria=sábanas' // La categoría 'Sábanas' con acento para que coincida con el MockAPI, luego ItemListContainer la normaliza.
    },
  ];

  return (
    <StyledCategorySection>
      <div className="container">
        <StyledTitle>Encontrá lo que estás buscando</StyledTitle>
        <div className="row justify-content-center">
          {categoriasPrincipales.map((cat, index) => (
            // Cambié col-md-3 para mostrar 4 tarjetas por fila en pantallas grandes, haciendo las tarjetas más chicas.
            <div className="col-md-3 col-sm-6 mb-4" key={index}>
              <Link to={cat.path} className="text-decoration-none text-dark">
                <div className="card h-100 text-center">
                  <img
                    src={cat.imagen}
                    className="card-img-top p-3"
                    alt={`Imagen de ${cat.nombre}`}
                    style={{ height: '180px', objectFit: 'contain' }}
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