import React from 'react';
import { Pagination as BSPagination } from 'react-bootstrap'; // Renombro Pagination de Bootstrap para evitar conflictos

function Pagination({ itemsPerPage, totalItems, currentPage, paginate }) {
  // Mi array para guardar los números de página que se van a mostrar.
  const pageNumbers = [];

  // Calculo el número total de páginas necesarias.
  // Utilizo Math.ceil para redondear hacia arriba y asegurarme de que todos los ítems se muestren,
  // incluso si la última página no está completa.
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // Componente de paginación de React-Bootstrap.
    // Lo centro en la página para una mejor visualización.
    <BSPagination className="justify-content-center my-4">
      {/* Botón para la página Anterior */}
      <BSPagination.Prev
        onClick={() => paginate(currentPage - 1)} // Retrocede una página
        disabled={currentPage === 1} // Deshabilito si ya estoy en la primera página
      />
      {/* Mapeo los números de página y creo un Item para cada uno. */}
      {pageNumbers.map(number => (
        <BSPagination.Item
          key={number} // La clave única para cada elemento de la lista.
          active={number === currentPage} // Resalto la página actual.
          onClick={() => paginate(number)} // Al hacer clic, voy a esa página.
        >
          {number}
        </BSPagination.Item>
      ))}
      {/* Botón para la página Siguiente */}
      <BSPagination.Next
        onClick={() => paginate(currentPage + 1)} // Avanza una página
        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)} // Deshabilito si ya estoy en la última página
      />
    </BSPagination>
  );
}

export default Pagination;