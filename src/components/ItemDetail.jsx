import React from 'react'; // Importo React ya que es necesario para JSX
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx'; // Importo useAuth
import { useNavigate, useLocation } from 'react-router-dom'; // Importo useNavigate y useLocation
import styled from 'styled-components'; 
import QuantityControls from './common/QuantityControls.jsx';


const StyledAddToCartButton = styled.button`
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.375rem 1rem;
  font-size: 1rem;
  line-height: 1.5;

  background-color: #343a40;
  border-color: #343a40;
  color: white;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &:hover {
    background-color: #555;
    border-color: #555;
  }
`;


function ItemDetail({ producto }) {
  const { agregarAlCarrito, disminuirCantidad, carrito } = useCart();
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
    if (!usuario) { // Si el usuario NO está logueado
      // Redirijo al usuario a la página de login.
      // Le paso el 'state' para que, una vez logueado, pueda volver a esta página.
      navigate('/login', { state: { from: location } });
    } else {
      // Si el usuario SÍ está logueado, procedo a agregar el producto al carrito.
      agregarAlCarrito(producto);
    }
  };


  if (!producto) {
    return <p className="text-center">Producto no encontrado o cargando...</p>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={producto.imagen} 
            className="img-fluid rounded" 
            alt={`Imagen de ${producto.nombre}`}
            style={{ maxHeight: '400px', objectFit: 'cover' }} 
          />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p className="lead">{producto.descripcion || "Descripción no disponible."}</p>
          <h3 className="mb-3">{formatPrice(producto.precio)}</h3>
          <p><small>Categoría: {producto.categoria || "No especificada"}</small></p>
          {producto.subcategoria && <p><small>Subcategoría: {producto.subcategoria.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</small></p>}
          
          {/* Lógica de renderizado CONDICIONAL para el botón/control de cantidad */}
          {cantidadEnCarrito === 0 ? (
            <StyledAddToCartButton className="mt-3" onClick={handleAddToCart}> {/* CAMBIO: Ahora llama a la función handleAddToCart */}
              Agregar al carrito
            </StyledAddToCartButton>
          ) : (
            // El control de cantidad ya tiene mt-3, así que su posición se mantendrá.
            <div className="d-flex align-items-center mt-3">
              <QuantityControls
                quantity={cantidadEnCarrito}
                onIncrement={() => agregarAlCarrito(producto)} // Estos ya asumen que está logueado para incrementar/disminuir
                onDecrement={() => disminuirCantidad(producto.id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;