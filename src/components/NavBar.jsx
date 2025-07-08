import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaBoxOpen, FaFire, FaAngleDown } from 'react-icons/fa';
import logoColchones from '../assets/LogoColchones.png';
import styled from 'styled-components';

// Defino un componente estilizado para el input de búsqueda.
const StyledSearchInput = styled.input`
  /* Estilos base del input, como el de Bootstrap */
  &:focus {
    border-color: #555;
    box-shadow: 0 0 0 0.25rem rgba(85, 85, 85, 0.25);
  }
`;

// Defino un componente estilizado para el botón de búsqueda con los nuevos ajustes.
const StyledSearchButton = styled.button`
  background-color: #343a40; /* Mantengo el fondo gris oscuro. */
  border-color: #343a40;     /* Mantengo el borde gris oscuro. */
  color: white;             /* Mantengo el icono/texto blanco. */
  
  /* ESTILOS PARA INTEGRAR EL BOTÓN A LA BARRA DE BÚSQUEDA */
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;

  /* NUEVO: Hacer el botón más ancho */
  width: 60px; /* Le doy un ancho fijo para que no quede tan chico. Puedes ajustar este valor. */
  flex-shrink: 0; /* Aseguro que el botón no se encoja si el espacio es limitado. */

  /* NUEVO: Elimino el cambio de color de fondo y borde en hover.
     Ahora, solo el cursor indica interactividad, manteniendo el color estático. */
  &:hover {
    background-color: #343a40; /* Mantengo el mismo color en hover. */
    border-color: #343a40;     /* Mantengo el mismo color de borde en hover. */
  }
`;


function NavBar() {
  const { usuario, logout } = useAuth();
  const { carrito } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const categorias = [
    {
      nombre: 'Colchones',
      subcategorias: [
        { display: '1 Plaza', value: '1-plaza' },
        { display: '1 Plaza y Media', value: '1-plaza-y-media' },
        { display: '2 Plazas', value: '2-plazas' },
        { display: '2 Plazas y Media', value: '2-plazas-y-media' },
        { display: 'King', value: 'king' }
      ]
    },
    {
      nombre: 'Almohadas',
      subcategorias: [
        { display: 'Fibra', value: 'fibra' },
        { display: 'Viscoelásticas', value: 'viscoelásticas' }
      ]
    },
    {
      nombre: 'Sábanas',
      subcategorias: [
        { display: 'Twin', value: 'twin' },
        { display: 'Full', value: 'full' },
        { display: 'Queen', value: 'queen' },
        { display: 'King', value: 'king' }
      ]
    },
    {
      nombre: 'Respaldos',
      subcategorias: [
        { display: '1 Plaza', value: '1-plaza' },
        { display: '2 Plazas y Media', value: '2-plazas-y-media' },
        { display: 'King', value: 'king' }
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/productos?busqueda=${searchTerm}`);
  };


  return (
    <>
      {/* HEADER (Parte superior con logo, búsqueda, mi cuenta, carrito) */}
      <div className="bg-light py-2 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logoColchones} alt="Logo Colchonera" style={{ height: '40px', marginRight: '10px' }} />
            <span className="text-dark fw-bold">Colchonera React</span>
          </Link>

          {/* Barra de búsqueda - Ahora usa componentes estilizados */}
          <form className="input-group w-50" onSubmit={handleSearch}>
            <StyledSearchInput
              type="text"
              className="form-control"
              placeholder="Buscar productos por nombre o descripción..."
              aria-label="Buscar productos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <StyledSearchButton type="submit">
              <FaSearch />
            </StyledSearchButton>
          </form>

          <div className="d-flex align-items-center">
            {/* Icono Mi Cuenta */}
            <Link className="nav-link text-dark me-3 d-flex flex-column align-items-center" to="/login">
              <FaUserCircle size={24} />
              <small>{usuario ? `Hola, ${usuario.nombre}` : 'Mi Cuenta'}</small>
            </Link>

            {/* Icono Carrito */}
            <Link className="nav-link text-dark d-flex flex-column align-items-center position-relative" to="/cart">
              <FaShoppingCart size={24} />
              {totalItemsCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItemsCarrito}
                  <span className="visually-hidden">productos en el carrito</span>
                </span>
              )}
              <small>Carrito</small>
            </Link>
          </div>
        </div>
      </div>

      {/* NAVBAR HORIZONTAL (Debajo del Header con enlaces y desplegables) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100 justify-content-between">
              <li className="nav-item">
                <Link className="nav-link py-3 px-4" to="/ofertas">
                  <FaFire className="me-2" />
                  Ofertas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link py-3 px-4" to="/mas-vendidos">
                  <FaBoxOpen className="me-2" />
                  Más Vendidos
                </Link>
              </li>

              {/* Menús desplegables para categorías */}
              {categorias.map((categoria, index) => (
                <li className="nav-item dropdown" key={index}>
                  <Link
                    className="nav-link dropdown-toggle py-3 px-4"
                    to={`/productos?categoria=${categoria.nombre.toLowerCase()}`}
                    id={`navbarDropdown${categoria.nombre}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {categoria.nombre} <FaAngleDown className="ms-1" />
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby={`navbarDropdown${categoria.nombre}`}>
                    {/* Genera subcategorías con Link y parámetros de URL */}
                    {categoria.subcategorias.map((subcategoria, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          className="dropdown-item"
                          to={`/productos?categoria=${categoria.nombre.toLowerCase()}&subcategoria=${subcategoria.value}`}
                        >
                          {subcategoria.display}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}

              {/* Botones de Login/Logout existentes */}
              {usuario ? (
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white py-3 px-4" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link py-3 px-4" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;