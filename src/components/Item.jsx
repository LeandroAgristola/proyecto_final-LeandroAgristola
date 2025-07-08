import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import QuantityControls from './common/QuantityControls.jsx'; // Importo mi nuevo componente de control de cantidad


// Defino un componente StyledCard para aplicar estilos de hover y ajuste de imagen.
const StyledCard = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .card-img-top {
    height: 200px;
    object-fit: cover;
  }

  .card-body {
    padding: 1rem;
  }

  .card-title {
    font-size: 1rem;
    min-height: 3rem;
  }

  .card-text {
    font-size: 1.1rem;
    font-weight: bold;
    color: #e4231f; /* Color rojo de acento para el precio. */
  }

  /* RE-DEFINICIÓN DE ESTILOS PARA LOS BOTONES PRINCIPALES DENTRO DE StyledCard */
  .btn-primary { /* Este será el botón "Agregar al carrito" */
    background-color: #343a40;
    border-color: #343a40;
    color: white;

    &:hover {
      background-color: #555;
      border-color: #555;
    }
  }

  /* Los botones del control de cantidad (+/-) ahora son gestionados por StyledQuantityButton
     dentro de QuantityControls, por lo que estas reglas ya no son tan críticas aquí
     pero las mantengo por si alguna clase de Bootstrap se aplica. */
  .btn-outline-primary { 
    background-color: transparent;
    color: #343a40;
    border-color: #343a40;

    &:hover {
      background-color: #343a40;
      color: white;
    }
  }
`;

function Item({ producto }) {
  const { carrito, agregarAlCarrito, disminuirCantidad } = useCart();
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


  return (
    <div className="col-md-3 mb-4">
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
          
          {/* Lógica de renderizado CONDICIONAL para el botón/control de cantidad */}
          {cantidadEnCarrito === 0 ? (
            <button 
              className="btn btn-primary mt-auto" // Mantengo btn-primary para el color que definí en StyledCard
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          ) : (
            // Si ya hay ítems en el carrito, muestro el componente QuantityControls.
            <div className="d-flex align-items-center mt-auto"> {/* mt-auto para alinear al final */}
              <QuantityControls
                quantity={cantidadEnCarrito}
                onIncrement={() => agregarAlCarrito(producto)}
                onDecrement={() => disminuirCantidad(producto.id)}
              />
            </div>
          )}
        </div>
      </StyledCard>
    </div>
  );
}

export default Item;