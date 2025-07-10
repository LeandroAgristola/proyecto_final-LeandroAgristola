import styled from 'styled-components';
import React from 'react'; 


// Este componente estilizado define la apariencia de los botones individuales (+ y -).
const StyledQuantityButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 0.25rem; /* Esquinas ligeramente redondeadas */
  background-color: transparent;
  color: #343a40;
  border: 1px solid #343a40;

  &:hover {
    background-color: #343a40;
    color: white;
  }
  /* Estilo para cuando el botón está deshabilitado */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// Este componente estilizado envuelve los botones y el número de cantidad,
// dándoles una apariencia unificada con un borde común.
const StyledQuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #343a40; /* Borde alrededor de todo el control */
  border-radius: 0.25rem;
  overflow: hidden; /* Aseguro que los bordes internos no sobresalgan */

  /* Aplico estilos a los StyledQuantityButton dentro de este contenedor */
  ${StyledQuantityButton} {
    border: none; /* Elimino los bordes individuales de los botones internos */
    border-radius: 0; /* Elimino el redondeo individual para que se integren */
  }

  span {
    padding: 0 10px; /* Espacio horizontal para el número de cantidad */
    min-width: 40px; /* Ancho mínimo para que el número no se comprima */
    text-align: center;
    font-weight: bold;
    color: #343a40; /* Color del texto del número de cantidad */
  }
`;

// Componente funcional que agrupa el control de cantidad.
// Recibe props para manejar la cantidad, incrementar y disminuir.
function QuantityControls({ quantity, onIncrement, onDecrement, disabled = false }) {
  return (
    <StyledQuantityControl>
      <StyledQuantityButton onClick={onDecrement} disabled={disabled}>-</StyledQuantityButton>
      <span>{quantity}</span>
      <StyledQuantityButton onClick={onIncrement} disabled={disabled}>+</StyledQuantityButton>
    </StyledQuantityControl>
  );
}

export default QuantityControls;