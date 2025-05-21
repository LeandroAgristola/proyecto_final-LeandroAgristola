import { useCart } from '../context/CartContext.jsx';

function Cart() {
  const { carrito, agregarAlCarrito, disminuirCantidad, vaciarCarrito } = useCart();

  if (carrito.length === 0) {
    return <div className="container py-5"><h2>Tu carrito está vacío</h2></div>;
  }

  return (
    <div className="container py-5">
      <h2>Carrito de compras</h2>
      <ul className="list-group mb-3">
        {carrito.map((item) => (
          <li 
            key={item.id} 
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex flex-column gap-2">
              <span>{item.nombre}</span>
              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={() => disminuirCantidad(item.id)}
                >
                  -
                </button>
                <span className="mx-2">{item.cantidad}</span>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={() => agregarAlCarrito(item)}
                >
                  +
                </button>
              </div>
            </div>
            <span>${item.precio * item.cantidad}</span>
          </li>
        ))}
      </ul>
      <button className="btn btn-danger" onClick={vaciarCarrito}>
        Vaciar carrito
      </button>
    </div>
  );
}

export default Cart;