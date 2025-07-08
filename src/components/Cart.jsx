import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components'; // No es estrictamente necesario aquí si QuantityControls ya lo usa, pero lo mantengo.
import { Link } from 'react-router-dom';
import QuantityControls from './common/QuantityControls.jsx'; // Importo mi componente de control de cantidad


// NOTA: StyledQuantityButton ya no se define aquí, se importa desde QuantityControls.
// Sin embargo, si tuviera estilos específicos SÓLO para el carrito, los pondría aquí.


function Cart() {
  const { carrito, agregarAlCarrito, disminuirCantidad, vaciarCarrito } = useCart();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);


  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(numericPrice);
  };


  const totalCompra = carrito.reduce((total, item) => total + (parseFloat(item.precio) * item.cantidad), 0);


  const handleShowClearCartModal = () => setShowClearCartModal(true);
  const handleCloseClearCartModal = () => setShowClearCartModal(false);
  const handleConfirmClearCart = () => {
    vaciarCarrito();
    handleCloseClearCartModal();
    toast.info('El carrito ha sido vaciado.');
    if (purchaseCompleted) setPurchaseCompleted(false); 
  };


  const handleConfirmPurchase = () => {
    if (carrito.length === 0) {
      toast.error('Tu carrito está vacío. Agrega productos para confirmar la compra.');
      return;
    }

    setIsPurchasing(true);
    toast.info('Procesando tu compra...');

    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseCompleted(true);
      vaciarCarrito();
      toast.success('¡Compra realizada con éxito! Gracias por tu pedido.');
    }, 2000);
  };


  if (purchaseCompleted) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">¡Compra Realizada con Éxito!</h2>
        <p className="lead">Gracias por tu pedido. En breve recibirás un correo con los detalles de tu compra.</p>
        <p className="mt-4">
          <Link to="/productos" className="btn btn-dark btn-lg">Seguir comprando</Link>
        </p>
      </div>
    );
  }

  if (carrito.length === 0 && !purchaseCompleted) {
    return <div className="container py-5"><h2>Tu carrito está vacío. ¡Explora nuestros productos!</h2></div>;
  }

  return (
    <div className="container py-5">
      <h2>Tu Carrito de Compras</h2>

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
            className="list-group-item d-flex justify-content-between align-items-center py-3"
          >
            <div className="d-flex align-items-center flex-grow-1">
              <div className="d-flex align-items-center gap-2 me-4">
                {/* Utilizo el componente QuantityControls para los botones de cantidad. */}
                <QuantityControls
                  quantity={item.cantidad}
                  onIncrement={() => agregarAlCarrito(item)}
                  onDecrement={() => disminuirCantidad(item.id)}
                  disabled={isPurchasing} // Deshabilito si la compra está en proceso.
                />
              </div>
              <span className="fw-bold">{item.nombre}</span>
            </div>
            <span className="fw-bold text-end" style={{ color: '#e4231f' }}>{formatPrice(parseFloat(item.precio) * item.cantidad)}</span>
          </li>
        ))}
      </ul>

      {!isPurchasing && (
        <div className="d-flex justify-content-between align-items-center fw-bold fs-5 mb-4 p-3 border-top">
          <span>Total:</span>
          <span style={{ color: '#e4231f' }}>{formatPrice(totalCompra)}</span>
        </div>
      )}

      {!isPurchasing && (
        <div className="d-flex justify-content-between gap-3">
          <button 
            className="btn btn-dark btn-lg w-100"
            onClick={handleConfirmPurchase}
          >
            Confirmar Compra
          </button>
          <button 
            className="btn btn-outline-secondary btn-lg w-100"
            onClick={handleShowClearCartModal}
          >
            Vaciar Carrito
          </button>
        </div>
      )}

      <Modal show={showClearCartModal} onHide={handleCloseClearCartModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Vaciado de Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que quieres eliminar todos los productos de tu carrito?</p>
          <p className="fw-bold text-danger">Esta acción no se puede deshacer.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClearCartModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmClearCart}>
            Vaciar Carrito
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Cart;