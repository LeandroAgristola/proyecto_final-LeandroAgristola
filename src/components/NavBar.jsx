import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

function NavBar() {
  const { usuario, logout } = useAuth();
  const { carrito } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Colchonera React</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Carrito {totalItemsCarrito > 0 && <span className="badge bg-primary ms-1">{totalItemsCarrito}</span>}
              </Link>
            </li>
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hola, {usuario.nombre}!</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;