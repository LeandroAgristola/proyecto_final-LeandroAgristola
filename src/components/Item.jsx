import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

function Item({ producto }) {
  const { carrito, agregarAlCarrito, disminuirCantidad } = useCart();
  const cantidadEnCarrito = carrito.find(item => item.id === producto.id)?.cantidad || 0;

  // Función para formatear el precio: añade el signo de moneda y separadores de miles/decimales.
  // Utilizo Intl.NumberFormat para asegurar un formato correcto según la región .
  const formatPrice = (price) => {
    // Primero, me aseguro de que el precio sea un número, ya que viene como string del MockAPI.
    const numericPrice = parseFloat(price);
    // Luego, aplico el formato de moneda, sin decimales por ahora, ya que todos los precios son enteros.
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS', // ARS para Peso Argentino
      minimumFractionDigits: 0, // Aseguro que no haya decimales si el precio es entero
      maximumFractionDigits: 2 // Permito hasta dos decimales si los hubiera en el futuro
    }).format(numericPrice);
  };


  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <Link to={`/producto/${producto.id}`}>
          <img 
            src={producto.imagen} 
            className="card-img-top" 
            alt={`Imagen de ${producto.nombre}`} // Descripción de imagen para accesibilidad
            style={{ height: '250px', objectFit: 'cover' }}
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
          {/* Aquí aplico el formato al precio. */}
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
      </div>
    </div>
  );
}

export default Item;