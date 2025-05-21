import { useCart } from '../context/CartContext.jsx';

function ItemDetail({ producto }) {
  const { agregarAlCarrito } = useCart();

  if (!producto) {
    return <p className="text-center">Producto no encontrado.</p>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img src={producto.imagen} className="img-fluid rounded" alt={producto.nombre} style={{ maxHeight: '400px', objectFit: 'cover' }} />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p className="lead">{producto.descripcion || "Descripción no disponible."}</p>
          <h3 className="mb-3">${producto.precio}</h3>
          <p><small>Categoría: {producto.categoria || "No especificada"}</small></p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;