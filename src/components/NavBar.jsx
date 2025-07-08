import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaTimes, FaBoxOpen, FaFire } from 'react-icons/fa';
import logoColchones from '../assets/LogoColchones.png';
import styled from 'styled-components';

// Componentes estilizados existentes
const StyledSearchInput = styled.input`
  &:focus {
    border-color: #ffff;
    box-shadow: 0 0 0 0.1em #ffff;
  }
`;

const StyledSearchButton = styled.button`
  background-color: #343a40;
  border-color: #343a40;
  color: white;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  width: 60px;
  flex-shrink: 0;
  &:hover {
    background-color: #555;
    border-color: #555;
  }
`;

// Modify existing StyledUserDropdownMenu to apply new colors for both desktop and mobile
const StyledUserDropdownMenu = styled.ul`
  position: absolute;
  top: 100% !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  min-width: 150px;
  z-index: 1050;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
  margin-top: 5px;
  background-color: #495057 !important; /* Applied for all (desktop/mobile) */

  .dropdown-item {
    color: white !important; /* White text for dropdown items */
    &:hover {
      background-color: #6c757d !important; /* Lighter on hover */
    }
  }
`;

// NEW Styled Component for Desktop Category Dropdown Menu (applies desired colors)
const StyledCategoryDropdownMenu = styled.ul`
  background-color: #495057 !important; /* Apply lighter background for desktop */

  .dropdown-item {
    color: white !important; /* White text for dropdown items */
    &:hover {
      background-color: #6c757d !important; /* Lighter on hover */
    }
  }
`;

// NEW Styled Component for Mobile Navbar Collapse
const StyledMobileCollapse = styled.div`
  @media (max-width: 991.98px) { /* Applies only on mobile and tablets */
    position: fixed;
    top: var(--mobile-navbar-total-height, 0px); /* Will be calculated by JS or fixed */
    left: 0;
    width: 100%;
    height: calc(100vh - var(--mobile-navbar-total-height, 0px)); /* Full height minus header */
    background-color: #343a40; /* Dark background as requested */
    z-index: 1040; /* Above regular content, below modals */
    overflow-y: auto; /* Enable scrolling if content overflows */

    .navbar-nav {
      flex-direction: column; /* Stack items vertically */
      align-items: center; /* Center horizontally */
      padding-top: 20px; /* Some padding at the top of the menu */
      width: 100%;
    }

    .nav-item {
      width: 100%;
      text-align: center;
      margin-bottom: 10px; /* Space between items */
    }

    .nav-link {
      padding: 15px 0 !important; /* Larger touch area */
      color: white !important; /* White text for main links */
      font-size: 1.2rem;
      &:hover {
        background-color: #555 !important; /* Slightly lighter on hover */
      }
    }

    /* Submenu styles for mobile, these will override StyledCategoryDropdownMenu for mobile */
    .dropdown-menu {
      background-color: #495057 !important; /* Slightly lighter than main menu for submenus */
      border: none;
      padding: 0;
      width: 100%;
      position: static !important; /* Don't float, keep in flow */
      transform: none !important; /* Remove any previous transforms */
      float: none !important; /* Remove float */
      text-align: center; /* Center submenu items */
      box-shadow: none;

      li {
        width: 100%;
      }

      .dropdown-item {
        color: white !important; /* White text for submenu items */
        padding: 10px 0;
        &:hover {
          background-color: #6c757d !important;
        }
      }
    }
  }
`;

function NavBar() {
  const { usuario, logout } = useAuth();
  const { carrito } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(0); // State to store mobile header height

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
    setIsMenuOpen(false); // Close menu after search
  };

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Effect to measure mobile header height for accurate menu positioning
  useEffect(() => {
    const mobileHeader = document.getElementById('mobile-header');
    if (mobileHeader) {
      setMobileHeaderHeight(mobileHeader.offsetHeight);
    }
  }, [isMenuOpen]);

  // Set CSS variable for StyledMobileCollapse to use for height calculation
  useEffect(() => {
    document.documentElement.style.setProperty('--mobile-navbar-total-height', `${mobileHeaderHeight}px`);
  }, [mobileHeaderHeight]);

  // Bug fix: Block scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function to reset overflow when component unmounts or before next effect
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);


  return (
    <>
      {/* HEADER (Parte superior con logo, búsqueda, mi cuenta, carrito) - Desktop */}
      <div className="bg-light py-2 border-bottom d-none d-lg-block">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logoColchones} alt="Logo Colchonera" style={{ height: '40px', marginRight: '10px' }} />
            <span className="text-dark fw-bold">Colchonera React</span>
          </Link>

          <form className="input-group w-50" onSubmit={handleSearch}>
            <StyledSearchInput
              type="text"
              className="form-control"
              placeholder="Buscar productos por nombre o descripción..."
              aria-label="Buscar productos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <StyledSearchButton className='btn btn-dark' type="submit">
              <FaSearch />
            </StyledSearchButton>
          </form>

          <div className="d-flex align-items-center">
            {usuario ? (
              <div className="dropdown me-3 mt-2">
                <Link
                  className="nav-link text-dark d-flex flex-column align-items-center"
                  to="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle size={24} />
                  <small>Hola, {usuario.nombre}</small>
                </Link>
                {/* Use StyledUserDropdownMenu for desktop user dropdown */}
                <StyledUserDropdownMenu className="dropdown-menu" aria-labelledby="userDropdown">
                  <li><Link className="dropdown-item" to="/mis-compras">Mis Compras</Link></li>
                  <li><Link className="dropdown-item" to="/datos-personales">Datos Personales</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                </StyledUserDropdownMenu>
              </div>
            ) : (
              <Link className="nav-link text-dark me-3 d-flex flex-column align-items-center mt-2" to="/login">
                <FaUserCircle size={24} />
                <small>Mi Cuenta</small>
              </Link>
            )}

            <Link className="nav-link text-dark d-flex flex-column align-items-center position-relative mt-2" to="/cart">
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

      {/* HEADER - Mobile (d-lg-none) */}
      <div id="mobile-header" className="bg-light py-2 border-bottom d-block d-lg-none">
        <div className="container">
          {/* Row 1: Logo (centered) */}
          <div className="d-flex justify-content-center py-2">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={logoColchones} alt="Logo Colchonera" style={{ height: '40px', marginRight: '10px' }} />
              <span className="text-dark fw-bold">Colchonera React</span>
            </Link>
          </div>

          {/* Row 2: User/Cart (centered horizontally) - Modified */}
          <div className="d-flex justify-content-center align-items-center py-2 mb-2">
            {usuario ? (
              <div className="dropdown me-3">
                <Link
                  className="nav-link text-dark d-flex align-items-center" // Changed to side-by-side
                  to="#"
                  id="userDropdownMobile"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle size={24} className="me-1" />
                  <small>Hola, {usuario.nombre}</small>
                </Link>
                {/* Use StyledUserDropdownMenu for mobile user dropdown */}
                <StyledUserDropdownMenu className="dropdown-menu" aria-labelledby="userDropdownMobile">
                  <li><Link className="dropdown-item" to="/mis-compras">Mis Compras</Link></li>
                  <li><Link className="dropdown-item" to="/datos-personales">Datos Personales</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                </StyledUserDropdownMenu>
              </div>
            ) : (
              <Link className="nav-link text-dark me-3 d-flex align-items-center" to="/login"> {/* Changed to side-by-side */}
                <FaUserCircle size={24} className="me-1" />
                <small>Mi Cuenta</small>
              </Link>
            )}

            <Link className="nav-link text-dark d-flex align-items-center position-relative" to="/cart"> {/* Changed to side-by-side, removed text */}
              <FaShoppingCart size={24} />
              {totalItemsCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItemsCarrito}
                  <span className="visually-hidden">productos en el carrito</span>
                </span>
              )}
              {/* Removed <small>Carrito</small> text */}
            </Link>
          </div>

          {/* Row 3: Hamburger/Search (centered horizontally) */}
          <div className="d-flex justify-content-center align-items-center py-2">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              onClick={handleToggle}
              style={{ border: 'none', backgroundColor: 'transparent' }} // Remove default button styles
            >
              {isMenuOpen ? <FaTimes size={24} color="#343a40" /> : <FaBars size={24} color="#343a40" />}
            </button>
            <form className="input-group w-75 ms-3" onSubmit={handleSearch}>
              <StyledSearchInput
                type="text"
                className="form-control"
                placeholder="Buscar..."
                aria-label="Buscar productos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <StyledSearchButton className='btn btn-dark' type="submit">
                <FaSearch />
              </StyledSearchButton>
            </form>
          </div>
        </div>
      </div>

      {/* NAVBAR HORIZONTAL - This remains the main collapsible part */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0">
        <div className="container">
          <StyledMobileCollapse className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100 justify-content-between">
              <li className="nav-item">
                <Link className="nav-link py-3 px-4" to="/ofertas" onClick={handleToggle}>
                  <FaFire className="me-2" />
                  Ofertas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link py-3 px-4" to="/mas-vendidos" onClick={handleToggle}>
                  <FaBoxOpen className="me-2" />
                  Más Vendidos
                </Link>
              </li>

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
                    {categoria.nombre}
                  </Link>
                  {/* Use StyledCategoryDropdownMenu for desktop category dropdowns */}
                  <StyledCategoryDropdownMenu className="dropdown-menu" aria-labelledby={`navbarDropdown${categoria.nombre}`}>
                    {categoria.subcategorias.map((subcategoria, subIndex) => (
                      <li key={subIndex}>
                        <Link className="dropdown-item" to={`/productos?categoria=${categoria.nombre.toLowerCase()}&subcategoria=${subcategoria.value}`} onClick={handleToggle}>
                          {subcategoria.display}
                        </Link>
                      </li>
                    ))}
                  </StyledCategoryDropdownMenu>
                </li>
              ))}
            </ul>
          </StyledMobileCollapse>
        </div>
      </nav>
    </>
  );
}

export default NavBar;