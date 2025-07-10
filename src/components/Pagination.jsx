import React from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';
import styled from 'styled-components'; 

const StyledPagination = styled(BSPagination)`
  .page-item {
    .page-link {
      color: #555; /* Color del texto/borde de los números de página inactivos */
      background-color: #f8f9fa; /* Fondo claro para los ítems de paginación */
      border: 1px solid #dee2e6; /* Borde estándar */
      margin: 0 2px; /* Pequeño margen entre números */

      &:hover {
        color: #000000; /* CAMBIO: Color rojo de acento al pasar el ratón por los números. */
        background-color: #e9ecef; /* Un fondo ligeramente más oscuro en hover */
        border-color: #000000; /* CAMBIO: Borde rojo al hacer hover. */
      }
    }

    &.active .page-link {
      background-color: #343a40; /* CAMBIO: Fondo gris oscuro para la página activa. */
      border-color: #343a40; /* CAMBIO: Borde gris oscuro para la página activa. */
      color: white; /* Texto blanco para la página activa. */
    }

    &.disabled .page-link {
      color: #6c757d; /* Color del texto para botones deshabilitados. */
      background-color: #e9ecef; /* Fondo claro para botones deshabilitados. */
      border-color: #dee2e6; /* Borde estándar para deshabilitados. */
    }
  }

  /* Estilos específicos para los botones de Anterior/Siguiente */
  .page-item .page-link.bs-pagination-prev,
  .page-item .page-link.bs-pagination-next {
    color: #555; /* Color del icono/texto */
    border-color: #dee2e6;

    &:hover {
      color: #e4231f; /* Rojo de acento en hover */
      border-color: #e4231f; /* Borde rojo en hover */
    }
  }
`;


function Pagination({ itemsPerPage, totalItems, currentPage, paginate }) {
  const pageNumbers = [];

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) {
    return null;
  }

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledPagination className="justify-content-center my-4">
      <BSPagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pageNumbers.map(number => (
        <BSPagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </BSPagination.Item>
      ))}
      <BSPagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </StyledPagination>
  );
}

export default Pagination;