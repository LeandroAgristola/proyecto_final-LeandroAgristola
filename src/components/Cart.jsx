import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import QuantityControls from './common/QuantityControls.jsx';

const StyledProgressBar = styled.div`
  .progress-bar {
    background-color: #586875; /* A more subtle, quality color */
    transition: width 2s ease-in-out; /* Smooth transition for width */
  }
`;

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
    return (
        <div className="container py-5">
            <div className="card shadow-sm p-4">
                <div className="card-body text-center">
                    <h2 className="card-title mb-3">Tu carrito está vacío.</h2>
                    <p className="card-text lead">¡Parece que aún no has agregado ningún producto!</p>
                    <Link to="/productos" className="btn btn-dark mt-3">Explorar productos</Link>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="container py-5">
      <h2>Tu Carrito de Compras</h2>

      {isPurchasing && (
        <StyledProgressBar className="progress mb-3" style={{ height: '25px' }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: '100%' }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Confirmando compra...
          </div>
        </StyledProgressBar>
      )}


      <ul className="list-group mb-3">
        {carrito.map((item) => (
          <li
            key={item.id}
            className="list-group-item py-3"
          >
            <div className="d-none d-md-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center gap-2 me-4">
                  <QuantityControls
                    quantity={item.cantidad}
                    onIncrement={() => agregarAlCarrito(item)}
                    onDecrement={() => disminuirCantidad(item.id)}
                    disabled={isPurchasing}
                  />
                </div>
                <span className="fw-bold">{item.nombre}</span>
              </div>

              <span className="fw-bold text-end" style={{ color: '#e4231f' }}>{formatPrice(parseFloat(item.precio) * item.cantidad)}</span>
            </div>

            <div className="d-flex flex-column d-md-none">
              <div className="d-flex justify-content-between align-items-center w-100 mb-2">
                <div className="d-flex align-items-center gap-2 me-3">
                  <QuantityControls
                    quantity={item.cantidad}
                    onIncrement={() => agregarAlCarrito(item)}
                    onDecrement={() => disminuirCantidad(item.id)}
                    disabled={isPurchasing}
                  />
                </div>
                <span className="fw-bold fs-5" style={{ color: '#e4231f' }}>{formatPrice(parseFloat(item.precio) * item.cantidad)}</span>
              </div>

              <div className="w-100">
                <span className="fw-bold">{item.nombre}</span>
              </div>
            </div>
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