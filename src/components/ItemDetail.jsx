import { useCart } from '../context/CartContext.jsx';
import styled from 'styled-components'; // Importo styled para aplicar estilos personalizados a los botones
import QuantityControls from './common/QuantityControls.jsx'; // Asegúrate de que esta importación sea correcta si lo moviste


const StyledAddToCartButton = styled.button`
  /* Propiedades de tamaño y alineación para que coincida con QuantityControls */
  height: 34px; /* Ajustado para que su altura sea similar a la de QuantityControls */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.375rem 1rem; /* Padding para que el texto se vea bien */
  font-size: 1rem; /* Tamaño de fuente estándar */
  line-height: 1.5; /* Altura de línea para centrar el texto verticalmente */

  /* Colores y bordes que ya hemos definido para los botones principales (gris oscuro) */
  background-color: #343a40;
  border-color: #343a40;
  color: white;
  border-radius: 0.25rem; /* Bordes redondeados estándar */
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out; /* Transición suave para hover */

  &:hover {
    background-color: #555;
    border-color: #555;
  }
`;


function ItemDetail({ producto }) {
  const { agregarAlCarrito, disminuirCantidad, carrito } = useCart();
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
            <StyledAddToCartButton className="mt-3" onClick={() => agregarAlCarrito(producto)}>
              Agregar al carrito
            </StyledAddToCartButton>
          ) : (
            // El control de cantidad ya tiene mt-3, así que su posición se mantendrá.
            <div className="d-flex align-items-center mt-3">
              <QuantityControls
                quantity={cantidadEnCarrito}
                onIncrement={() => agregarAlCarrito(producto)}
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