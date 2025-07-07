import React from 'react';
import { Link } from 'react-router-dom';
// Importa tus imágenes de categorías (ahora todas como .png según tu indicación)
import categoriaAlmohadasFibra from '../assets/categories/categoriaAlmohadasFibra.png';
import categoriaAlmohadasVisco from '../assets/categories/categoriaAlmohadasVisco.png'; 
import categoriaColchones from '../assets/categories/categoriaColchones.png';
import categoriaSabanas from '../assets/categories/categoriaSabanas.png';

function CategoryCards() {
  const categoriasPrincipales = [
    {
      nombre: 'Colchones',
      imagen: categoriaColchones,
      path: '/productos?categoria=colchones'
    },
    {
      nombre: 'Almohadas de Fibra', // Cambiado el nombre visible
      imagen: categoriaAlmohadasFibra,
      path: '/productos?categoria=almohadas' // Sigue apuntando a la categoría general de almohadas
    },
    {
      nombre: 'Almohadas Viscoelásticas', // Nueva tarjeta
      imagen: categoriaAlmohadasVisco,
      path: '/productos?categoria=almohadas' // Sigue apuntando a la categoría general de almohadas
    },
    {
      nombre: 'Sábanas',
      imagen: categoriaSabanas,
      path: '/productos?categoria=sabanas'
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Encontrá lo que estás buscando</h2>
      <div className="row justify-content-center">
        {categoriasPrincipales.map((cat, index) => (
          <div className="col-md-3 col-sm-6 mb-4" key={index}>
            <Link to={cat.path} className="text-decoration-none text-dark">
              <div className="card h-100 text-center">
                <img
                  src={cat.imagen}
                  className="card-img-top p-3"
                  alt={cat.nombre}
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
  );
}

export default CategoryCards;