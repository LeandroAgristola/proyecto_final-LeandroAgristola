import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

function Item({ producto }) {
  const { carrito, agregarAlCarrito, disminuirCantidad } = useCart();
  const cantidadEnCarrito = carrito.find(item => item.id === producto.id)?.cantidad || 0;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <Link to={`/producto/${producto.id}`}>
          <img 
            src={producto.imagen} 
            className="card-img-top" 
            alt={producto.nombre} 
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
          <p className="card-text">${producto.precio}</p>
          
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