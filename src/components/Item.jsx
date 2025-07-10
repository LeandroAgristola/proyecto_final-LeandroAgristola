import React from 'react'; 
import { useCart } from '../context/CartContext.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import styled from 'styled-components';
import QuantityControls from './common/QuantityControls.jsx';
import { useAuth } from '../context/AuthContext.jsx'; 

const StyledCard = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  width: 100%; /* Ocupa todo el ancho disponible de su columna */
  max-width: 280px; /* NUEVO: Limita el ancho máximo de la tarjeta para evitar estiramiento. */
  margin: 0 auto; /* NUEVO: Centra la tarjeta dentro de su columna si hay espacio extra. */

  height: 100%; /* Ocupa la altura disponible en su contenedor flex */
  display: flex; /* Convierte la tarjeta en un contenedor flex */
  flex-direction: column; /* Apila el contenido verticalmente */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .card-img-top {
    height: 200px;
    object-fit: cover;
    width: 100%; /* Asegura que la imagen ocupe el ancho completo de su contenedor flex */
  }

  .card-body {
    padding: 1rem;
    flex-grow: 1; /* Permite que el cuerpo de la tarjeta crezca y ocupe espacio */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Distribuye el contenido y empuja el botón hacia abajo */
  }

  .card-title {
    font-size: 1rem;
    min-height: 3rem;
    word-break: break-word; /* Rompe palabras largas para evitar desbordamiento */
  }

  .card-text {
    font-size: 1.1rem;
    font-weight: bold;
    color: #e4231f; /* Color rojo de acento para el precio. */
  }

  .btn-primary {
    background-color: #343a40;
    border-color: #343a40;
    color: white;
    width: 100%; /* Asegura que el botón ocupe el ancho completo del cuerpo de la tarjeta */

    &:hover {
      background-color: #555;
      border-color: #555;
    }
  }

  /* Las reglas para btn-outline-primary ya no son tan críticas aquí
     porque QuantityControls maneja sus propios estilos. */
`;

function Item({ producto }) {
  const { carrito, agregarAlCarrito, disminuirCantidad } = useCart();
  const { usuario } = useAuth(); 
  const navigate = useNavigate(); 
  const location = useLocation(); 


  const cantidadEnCarrito = carrito.find(item => item.id === producto.id)?.cantidad || 0;

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(numericPrice);
  };

  const handleAddToCart = () => {
    if (!usuario) { 
      navigate('/login', { state: { from: location } });
    } else {
      agregarAlCarrito(producto);
    }
  };


  return (

    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <StyledCard className="card h-100">
        <Link to={`/producto/${producto.id}`}>
          <img
            src={producto.imagen}
            className="card-img-top"
            alt={`Imagen de ${producto.nombre}`}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link
              to={`/producto/${producto.id}`}
              className="text-decoration-none text-dark"
            >
              {producto.nombre}
            </Link>
          </h5>
          <p className="card-text fw-bold">{formatPrice(producto.precio)}</p>

          <div className="mt-auto">
            {cantidadEnCarrito === 0 ? (
              <button
                className="btn btn-primary w-100"
                onClick={handleAddToCart} 
              >
                Agregar al carrito
              </button>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <QuantityControls
                  quantity={cantidadEnCarrito}
                  onIncrement={() => agregarAlCarrito(producto)}
                  onDecrement={() => disminuirCantidad(producto.id)}
                />
              </div>
            )}
          </div>
        </div>
      </StyledCard>
    </div>
  );
}

export default Item;