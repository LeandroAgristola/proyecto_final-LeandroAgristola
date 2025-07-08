import { useCart } from '../context/CartContext.jsx';

function ItemDetail({ producto }) {
  const { agregarAlCarrito } = useCart();

  // Función para formatear el precio, la misma que uso en Item.jsx.
  // Esto asegura consistencia en cómo se muestra el precio en toda la aplicación.
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
    return <p className="text-center">Producto no encontrado o cargando...</p>; // Mensaje más descriptivo
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={producto.imagen} 
            className="img-fluid rounded" 
            alt={`Imagen de ${producto.nombre}`} // Descripción de imagen para accesibilidad
            style={{ maxHeight: '400px', objectFit: 'cover' }} 
          />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2>
          <p className="lead">{producto.descripcion || "Descripción no disponible."}</p>
          {/* Aquí aplico el formato al precio en la página de detalle. */}
          <h3 className="mb-3">{formatPrice(producto.precio)}</h3>
          <p><small>Categoría: {producto.categoria || "No especificada"}</small></p>
          {/* Agrego la subcategoría aquí también si está disponible. */}
          {producto.subcategoria && <p><small>Subcategoría: {producto.subcategoria.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</small></p>} {/* Formateo la subcategoría para que se vea más legible */}
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