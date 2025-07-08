import { useCart } from '../context/CartContext.jsx';
import styled from 'styled-components'; // Importo styled para aplicar estilos personalizados a los botones de cantidad

// Defino un componente estilizado para los botones de cantidad (+/-)
// Ahora con un diseño más integrado y uniforme.
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
  background-color: transparent; /* Fondo transparente */
  color: #343a40; /* Color gris oscuro para el texto/icono */
  border: 1px solid #343a40; /* Borde gris oscuro */

  &:hover {
    background-color: #343a40; /* Fondo gris oscuro en hover */
    color: white; /* Texto blanco en hover */
  }
`;

// Defino un contenedor estilizado para agrupar los botones y la cantidad,
// dándoles una apariencia unificada.
const StyledQuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #343a40; /* Borde alrededor de todo el control de cantidad */
  border-radius: 0.25rem;
  overflow: hidden; /* Aseguro que los bordes internos no sobresalgan */

  ${StyledQuantityButton} {
    border: none; /* Los botones internos no necesitan borde propio ya que el contenedor lo tiene */
    border-radius: 0; /* Elimino el redondeo individual para que se integren */
  }

  span {
    padding: 0 10px; /* Espacio alrededor del número de cantidad */
    min-width: 40px; /* Ancho mínimo para el número */
    text-align: center;
    font-weight: bold;
    color: #343a40; /* Color del texto de la cantidad */
  }

  /* Si el botón + o - está deshabilitado, el cursor no debe cambiar */
  ${StyledQuantityButton}:disabled {
    cursor: not-allowed;
    opacity: 0.6; /* Hago que los botones deshabilitados sean un poco transparentes */
  }
`;


function ItemDetail({ producto }) {
  const { agregarAlCarrito, disminuirCantidad, carrito } = useCart(); // Obtengo carrito para calcular cantidadEnCarrito

  // Calculo la cantidad de este producto en el carrito.
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
            <button
              className="btn btn-dark btn-lg mt-3" // Uso btn-dark como color principal para los botones
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          ) : (
            // Si ya hay ítems en el carrito, muestro el control de cantidad integrado.
            <div className="d-flex align-items-center mt-3">
              <StyledQuantityControl>
                <StyledQuantityButton onClick={() => disminuirCantidad(producto.id)}>-</StyledQuantityButton>
                <span>{cantidadEnCarrito}</span>
                <StyledQuantityButton onClick={() => agregarAlCarrito(producto)}>+</StyledQuantityButton>
              </StyledQuantityControl>
              {/* Opcional: Podríamos añadir un botón "Agregar más" al lado si se quiere una acción más explícita */}
              {/* <button className="btn btn-outline-dark ms-2" onClick={() => agregarAlCarrito(producto)}>
                Agregar otro
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;