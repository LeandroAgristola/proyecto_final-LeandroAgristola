import React, { useState } from 'react'; // Importo useState para el estado de la compra simulada.
import { useCart } from '../context/CartContext.jsx';
import { toast } from 'react-toastify'; // Importo toast para las notificaciones.


function Cart() {
  const { carrito, agregarAlCarrito, disminuirCantidad, vaciarCarrito } = useCart();
  // Estado para simular el proceso de compra y su carga/animación.
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);


  // Función para formatear el precio, la misma que uso en Item.jsx y ItemDetail.jsx.
  // Esto asegura consistencia en cómo se muestra el precio.
  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(numericPrice);
  };


  // Calculo el total de la compra sumando el precio * cantidad de cada ítem en el carrito.
  const totalCompra = carrito.reduce((total, item) => total + (parseFloat(item.precio) * item.cantidad), 0);


  // Manejador para vaciar el carrito con una confirmación.
  const handleVaciarCarrito = () => {
    // NUEVO: Pregunto al usuario si realmente quiere vaciar el carrito.
    if (window.confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
      vaciarCarrito(); // Si confirma, llamo a la función para vaciar.
      toast.info('El carrito ha sido vaciado.'); // Notifico al usuario.
    }
  };


  // Manejador para simular la confirmación de la compra.
  const handleConfirmPurchase = () => {
    if (carrito.length === 0) {
      toast.error('Tu carrito está vacío. Agrega productos para confirmar la compra.');
      return;
    }

    setIsPurchasing(true); // Indico que el proceso de compra ha comenzado.
    toast.info('Procesando tu compra...');

    // Simulo un retardo para la animación de carga (como Mercado Libre).
    setTimeout(() => {
      setIsPurchasing(false); // La compra ha terminado de procesarse.
      setPurchaseCompleted(true); // Indico que la compra se ha completado.
      vaciarCarrito(); // Vacío el carrito después de una compra exitosa (simulada).
      toast.success('¡Compra realizada con éxito! Gracias por tu pedido.'); // Notifico el éxito.

      // Podría añadir una pequeña demora antes de resetear el mensaje de completado
      // si tuviera una animación más elaborada que quisiera que se viera un tiempo.
      setTimeout(() => {
        setPurchaseCompleted(false);
      }, 3000); // Reseteo el estado después de 3 segundos para que se pueda volver a comprar.

    }, 2000); // Simulo 2 segundos de procesamiento.
  };


  // Si el carrito está vacío, muestro un mensaje.
  if (carrito.length === 0 && !purchaseCompleted) { // Si no hay ítems Y no acabo de completar una compra.
    return <div className="container py-5"><h2>Tu carrito está vacío. ¡Explora nuestros productos!</h2></div>;
  }

  return (
    <div className="container py-5">
      <h2>Tu Carrito de Compras</h2>

      {/* Mensaje de compra completada */}
      {purchaseCompleted && (
        <div className="alert alert-success text-center my-4" role="alert">
          ¡Tu compra ha sido procesada con éxito!
        </div>
      )}

      {/* Animación de carga simulada */}
      {isPurchasing && (
        <div className="progress mb-3" style={{ height: '25px' }}>
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated bg-dark" 
            role="progressbar" 
            style={{ width: '100%' }} 
            aria-valuenow="100" 
            aria-valuemin="0" 
            aria-valuemax="100"
          >
            Confirmando compra...
          </div>
        </div>
      )}


      <ul className="list-group mb-3">
        {carrito.map((item) => (
          <li 
            key={item.id} 
            className="list-group-item d-flex justify-content-between align-items-center py-3" // Añadí py-3 para más espacio vertical
          >
            {/* NUEVO: Orden y espaciado de elementos */}
            <div className="d-flex align-items-center flex-grow-1"> {/* flex-grow-1 para que ocupe el espacio disponible */}
              <div className="d-flex align-items-center gap-2 me-4"> {/* me-4 para más espacio a la derecha del control de cantidad */}
                <button 
                  className="btn btn-outline-secondary btn-sm " // Hago los botones redondos
                  onClick={() => disminuirCantidad(item.id)}
                  disabled={isPurchasing} // Deshabilito durante la compra.
                >
                  -
                </button>
                <span className="fw-bold" style={{ minWidth: '20px', textAlign: 'center' }}>{item.cantidad}</span> {/* fw-bold para cantidad, minWidth para centrar */}
                <button 
                  className="btn btn-outline-secondary btn-sm" // Hago los botones redondos
                  onClick={() => agregarAlCarrito(item)}
                  disabled={isPurchasing} // Deshabilito durante la compra.
                >
                  +
                </button>
              </div>
              <span className="fw-bold">{item.nombre}</span> {/* Nombre del producto más cerca de los controles */}
            </div>
            {/* Aplico formato de precio aquí. */}
            <span className="fw-bold text-end" style={{ color: '#e4231f' }}>{formatPrice(parseFloat(item.precio) * item.cantidad)}</span> {/* Color de acento para el precio total del ítem */}
          </li>
        ))}
      </ul>

      {/* Sección del Total de la Compra y Botones de Acción */}
      {!isPurchasing && !purchaseCompleted && ( // Solo muestro esto si no estoy comprando ni he completado una compra.
        <div className="d-flex justify-content-between align-items-center fw-bold fs-5 mb-4 p-3 border-top"> {/* mb-4 para espacio, p-3 para padding, border-top para línea */}
          <span>Total:</span>
          <span style={{ color: '#e4231f' }}>{formatPrice(totalCompra)}</span> {/* Aplico formato al total */}
        </div>
      )}


      {!isPurchasing && !purchaseCompleted && ( // Solo muestro los botones si no estoy comprando ni he completado una compra.
        <div className="d-flex justify-content-between gap-3">
          <button 
            className="btn btn-dark btn-lg w-100" // Botón gris oscuro grande
            onClick={handleConfirmPurchase}
          >
            Confirmar Compra
          </button>
          <button 
            className="btn btn-outline-secondary btn-lg w-100" // Botón delineado gris grande
            onClick={handleVaciarCarrito}
          >
            Vaciar Carrito
          </button>
        </div>
      )}

      {/* Si el carrito se vació por una compra, muestro el mensaje de "gracias" */}
      {carrito.length === 0 && purchaseCompleted && (
        <div className="container py-5">
          <p className="text-center lead">¡Gracias por tu compra! Tu pedido ha sido procesado.</p>
          <p className="text-center"><Link to="/productos" className="btn btn-dark">Seguir comprando</Link></p>
        </div>
      )}
    </div>
  );
}

export default Cart;