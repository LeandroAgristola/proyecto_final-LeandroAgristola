import React from 'react'; // Importo React ya que es necesario para JSX
import { useCart } from '../context/CartContext.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importo Link, useNavigate y useLocation
import styled from 'styled-components';
import QuantityControls from './common/QuantityControls.jsx';
import { useAuth } from '../context/AuthContext.jsx'; // Importo useAuth para verificar la sesión


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

  .btn-primary { 
    background-color: #343a40;
    border-color: #343a40;
    color: white;

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
  const { usuario } = useAuth(); // Obtengo el estado del usuario logueado.
  const navigate = useNavigate(); // Hook para la navegación.
  const location = useLocation(); // Hook para obtener la URL actual (para redirigir de vuelta).


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

  // NUEVA FUNCIÓN: Manejar el clic en "Agregar al carrito" con verificación de sesión.
  const handleAddToCart = () => {
    if (!usuario) { // Si el usuario NO está logueado (el objeto 'usuario' es null o undefined)
      // Redirijo al usuario a la página de login.
      // Le paso el 'state' para que, una vez logueado, pueda volver a esta página.
      navigate('/login', { state: { from: location } });
    } else {
      // Si el usuario SÍ está logueado, procedo a agregar el producto al carrito.
      agregarAlCarrito(producto);
    }
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
          <div className="mt-auto"> 
            {cantidadEnCarrito === 0 ? (
              <button 
                className="btn btn-primary w-100" 
                onClick={handleAddToCart} // CAMBIO: Ahora llama a la función handleAddToCart
              >
                Agregar al carrito
              </button>
            ) : (
              // Si ya hay ítems en el carrito, muestro el componente QuantityControls.
              // Asumo que el usuario ya está logueado si ya tiene el producto en el carrito.
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