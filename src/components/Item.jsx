import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


// Defino un componente StyledCard para aplicar estilos personalizados a mis tarjetas de producto.
const StyledCard = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden; /* Muy importante para que el efecto de hover no se "salga" de la tarjeta. */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Transición suave para la animación al pasar el ratón. */
  
  &:hover {
    transform: translateY(-5px); /* La tarjeta se eleva ligeramente al pasar el ratón. */
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); /* Añade una sombra para dar profundidad. */
  }

  .card-img-top {
    height: 200px; /* Reduje la altura de la imagen para que la tarjeta sea más compacta. */
    object-fit: cover; /* La imagen cubre todo el espacio sin deformarse. */
    /* Para imágenes de sábanas que podrían parecer cortadas, esta opción suele ser un buen balance. */
  }

  .card-body {
    padding: 1rem;
  }

  .card-title {
    font-size: 1rem;
    min-height: 3rem; /* Esto me asegura que los títulos de una o dos líneas no desplacen el diseño. */
  }

  .card-text {
    font-size: 1.1rem;
    font-weight: bold;
    color: #e4231f; /* CAMBIO: Color rojo de acento para el precio, como pedí. */
  }

  /* RE-DEFINICIÓN DE ESTILOS PARA LOS BOTONES DENTRO DE StyledCard */
  .btn-primary, .btn-outline-primary {
    background-color: #343a40; /* CAMBIO: Color gris oscuro para el fondo de los botones principales. */
    border-color: #343a40; /* CAMBIO: Color del borde igual al fondo. */
    color: white; /* Texto blanco en los botones. */

    &:hover {
      background-color: #555; /* CAMBIO: Un gris un poco más claro al pasar el ratón para el efecto hover. */
      border-color: #555;
    }
  }

  .btn-outline-primary {
    background-color: transparent; /* Fondo transparente para los botones delineados. */
    color: #343a40; /* CAMBIO: Texto gris oscuro para los botones delineados. */
    border-color: #343a40; /* CAMBIO: Borde gris oscuro. */

    &:hover {
      background-color: #343a40; /* CAMBIO: Fondo gris oscuro al pasar el ratón. */
      color: white; /* Texto blanco al pasar el ratón. */
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
    <div className="col-md-3 mb-4"> {/* CAMBIO: Uso col-md-3 para 4 tarjetas por fila, haciendo las tarjetas más chicas. */}
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
          
          {cantidadEnCarrito === 0 ? (
            <button 
              className="btn btn-primary mt-auto" 
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          ) : (
            <div className="d-flex align-items-center gap-2 mt-auto">
              <button 
                className="btn btn-outline-primary py-1" 
                onClick={() => disminuirCantidad(producto.id)}
              >
                -
              </button>
              <span className="mx-2">{cantidadEnCarrito}</span>
              <button 
                className="btn btn-outline-primary py-1" 
                onClick={() => agregarAlCarrito(producto)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </StyledCard>
    </div>
  );
}

export default Item;