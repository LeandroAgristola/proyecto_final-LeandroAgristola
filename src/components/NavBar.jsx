import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaTimes, FaBoxOpen, FaFire } from 'react-icons/fa';
import logoColchones from '../assets/LogoColchones.png';
import styled from 'styled-components';
import { Collapse } from 'bootstrap'; // Import Collapse component from bootstrap

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

// Modify existing StyledUserDropdownMenu and StyledCategoryDropdownMenu
// to be controlled by React state (display: none/block)
const StyledUserDropdownMenu = styled.ul`
  position: absolute;
  top: 100% !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  min-width: 150px;
  z-index: 1050;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
  margin-top: 5px;
  background-color: #495057 !important;
  display: none; /* Hidden by default, controlled by React state/class */

  &.open {
    display: block;
  }

  .dropdown-item {
    color: white !important;
    &:hover {
      background-color: #6c757d !important;
    }
  }

  @media (max-width: 991.98px) {
    position: static !important; /* Stacks on mobile */
    transform: none !important;
    left: auto !important;
    margin-top: 0 !important;
    width: 100%;
    text-align: center;
    box-shadow: none;
  }
`;

const StyledCategoryDropdownMenu = styled.ul`
  background-color: #495057 !important;
  display: none; /* Hidden by default, controlled by React state/class */

  &.open {
    display: block;
  }

  .dropdown-item {
    color: white !important;
    &:hover {
      background-color: #6c757d !important;
    }
  }

  @media (max-width: 991.98px) {
    position: static !important; /* Stacks on mobile */
    transform: none !important;
    left: auto !important;
    margin-top: 0 !important;
    width: 100%;
    text-align: center;
    box-shadow: none;
  }
`;

// NEW Styled Component for Mobile Navbar Collapse
const StyledMobileCollapse = styled.div`
  @media (max-width: 991.98px) { /* Applies only on mobile and tablets */
    position: fixed;
    top: var(--mobile-navbar-total-height, 0px);
    left: 0;
    width: 100%;
    height: calc(100vh - var(--mobile-navbar-total-height, 0px));
    background-color: #343a40;
    z-index: 1040;
    overflow-y: auto;

    .navbar-nav {
      flex-direction: column;
      align-items: center;
      padding-top: 20px;
      width: 100%;
    }

    .nav-item {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }

    .nav-link {
      padding: 15px 0 !important;
      color: white !important;
      font-size: 1.2rem;
      &:hover {
        background-color: #555 !important;
      }
    }

    /* Submenu styles for mobile, these override default dropdown styling */
    .dropdown-menu {
      /* Base colors already from StyledCategoryDropdownMenu/StyledUserDropdownMenu */
      /* Ensure they appear correctly when .open is applied */
      background-color: #495057 !important; /* Consistent with desktop submenu color */
      border: none;
      padding: 0;
      width: 100%;
      position: static !important;
      transform: none !important;
      float: none !important;
      text-align: center;
      box-shadow: none;

      li {
        width: 100%;
      }

      .dropdown-item {
        color: white !important;
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(0);

  // New states for controlling dropdowns directly in React
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(null); // Stores the name of the currently open category dropdown

  const navbarCollapseRef = useRef(null);
  const bsCollapseInstance = useRef(null);

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
    setIsUserDropdownOpen(false); // Close user dropdown on logout
  };

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/productos?busqueda=${searchTerm}`);
    if (bsCollapseInstance.current) {
        bsCollapseInstance.current.hide(); // Close main menu
    }
    setIsMenuOpen(false); // Sync state
  };

  // Main menu toggle function (now controls Bootstrap instance directly)
  const handleToggle = () => {
    if (bsCollapseInstance.current) {
      if (isMenuOpen) {
        bsCollapseInstance.current.hide();
      } else {
        bsCollapseInstance.current.show();
      }
    }
    // setIsMenuOpen will be updated by Bootstrap's 'shown.bs.collapse'/'hidden.bs.collapse' events
  };

  // Function to handle closing the main menu when a navigable link is clicked
  const handleLinkClick = () => {
    if (bsCollapseInstance.current) {
      bsCollapseInstance.current.hide(); // Close main menu
    }
    setIsMenuOpen(false); // Sync state
    setIsUserDropdownOpen(false); // Close any open user dropdown
    setOpenCategoryDropdown(null); // Close any open category dropdown
  };

  // Handle category dropdown toggle
  const handleCategoryDropdownToggle = (categoryName) => {
    if (openCategoryDropdown === categoryName) {
      setOpenCategoryDropdown(null); // Close if already open
    } else {
      setOpenCategoryDropdown(categoryName); // Open this one
    }
  };

  // Handle user dropdown toggle
  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Effect to measure mobile header height
  useEffect(() => {
    const mobileHeader = document.getElementById('mobile-header');
    if (mobileHeader) {
      setMobileHeaderHeight(mobileHeader.offsetHeight);
    }
  }, [isMenuOpen]);

  // Set CSS variable for StyledMobileCollapse
  useEffect(() => {
    document.documentElement.style.setProperty('--mobile-navbar-total-height', `${mobileHeaderHeight}px`);
  }, [mobileHeaderHeight]);

  // Bug fix: Block scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isMenuOpen]);

  // Effect to initialize Bootstrap Collapse and listen for its events
  useEffect(() => {
    if (navbarCollapseRef.current) {
      // Ensure only one instance is created
      if (!bsCollapseInstance.current) {
          bsCollapseInstance.current = new Collapse(navbarCollapseRef.current, {
            toggle: false // Important: prevent auto-toggling on init
          });
      }

      const collapseElement = navbarCollapseRef.current;

      const handleShown = () => setIsMenuOpen(true);
      const handleHidden = () => {
        setIsMenuOpen(false);
        // Also close any open dropdowns when the main menu closes
        setIsUserDropdownOpen(false);
        setOpenCategoryDropdown(null);
      };

      // Add event listeners for Bootstrap's collapse events
      collapseElement.addEventListener('shown.bs.collapse', handleShown);
      collapseElement.addEventListener('hidden.bs.collapse', handleHidden);

      // Cleanup event listeners and dispose Bootstrap instance on unmount
      return () => {
        collapseElement.removeEventListener('shown.bs.collapse', handleShown);
        collapseElement.removeEventListener('hidden.bs.collapse', handleHidden);
        if (bsCollapseInstance.current) {
          bsCollapseInstance.current.dispose();
          bsCollapseInstance.current = null;
        }
      };
    }
  }, []); // Empty dependency array means this runs once on mount

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
                  data-bs-toggle="dropdown" // Desktop user dropdown still uses data-bs-toggle
                  aria-expanded="false"
                >
                  <FaUserCircle size={24} />
                  <small>Hola, {usuario.nombre}</small>
                </Link>
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
                <button // Changed to button for mobile user dropdown toggle, no data-bs-toggle
                  className="nav-link text-dark d-flex align-items-center"
                  id="userDropdownMobile"
                  type="button"
                  aria-expanded={isUserDropdownOpen}
                  onClick={handleUserDropdownToggle}
                >
                  <FaUserCircle size={24} className="me-1" />
                  <small>Hola, {usuario.nombre}</small>
                </button>
                {/* Conditionally render based on React state */}
                {isUserDropdownOpen && (
                  <StyledUserDropdownMenu className="dropdown-menu open" aria-labelledby="userDropdownMobile">
                    <li><Link className="dropdown-item" to="/mis-compras" onClick={handleLinkClick}>Mis Compras</Link></li>
                    <li><Link className="dropdown-item" to="/datos-personales" onClick={handleLinkClick}>Datos Personales</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                  </StyledUserDropdownMenu>
                )}
              </div>
            ) : (
              <Link className="nav-link text-dark me-3 d-flex align-items-center" to="/login" onClick={handleLinkClick}>
                <FaUserCircle size={24} className="me-1" />
                <small>Mi Cuenta</small>
              </Link>
            )}

            <Link className="nav-link text-dark d-flex align-items-center position-relative" to="/cart" onClick={handleLinkClick}>
              <FaShoppingCart size={24} />
              {totalItemsCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItemsCarrito}
                  <span className="visually-hidden">productos en el carrito</span>
                </span>
              )}
            </Link>
          </div>

          {/* Row 3: Hamburger/Search (centered horizontally) */}
          <div className="d-flex justify-content-center align-items-center py-2">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={isMenuOpen}
              onClick={handleToggle} // Only onClick, no data-bs-toggle
              style={{ border: 'none', backgroundColor: 'transparent' }}
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

      {/* NAVBAR HORIZONTAL */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0">
        <div className="container">
          <StyledMobileCollapse className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
            <ul className="navbar-nav w-100 justify-content-between">
              <li className="nav-item">
                <Link className="nav-link py-3 px-4" to="/ofertas" onClick={handleLinkClick}>
                  <FaFire className="me-2" />
                  Ofertas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link py-3 px-4" to="/mas-vendidos" onClick={handleLinkClick}>
                  <FaBoxOpen className="me-2" />
                  Más Vendidos
                </Link>
              </li>

              {categorias.map((categoria, index) => (
                <li className="nav-item dropdown" key={index}>
                  <button // Changed from Link to button for category dropdown toggles, no data-bs-toggle
                    className="nav-link dropdown-toggle py-3 px-4"
                    id={`navbarDropdown${categoria.nombre}`}
                    type="button"
                    aria-expanded={openCategoryDropdown === categoria.nombre}
                    onClick={() => handleCategoryDropdownToggle(categoria.nombre)}
                  >
                    {categoria.nombre}
                  </button>
                  {/* Conditionally render based on React state */}
                  {openCategoryDropdown === categoria.nombre && (
                    <StyledCategoryDropdownMenu className="dropdown-menu open" aria-labelledby={`navbarDropdown${categoria.nombre}`}>
                      {categoria.subcategorias.map((subcategoria, subIndex) => (
                        <li key={subIndex}>
                          <Link className="dropdown-item" to={`/productos?categoria=${categoria.nombre.toLowerCase()}&subcategoria=${subcategoria.value}`} onClick={handleLinkClick}>
                            {subcategoria.display}
                          </Link>
                        </li>
                      ))}
                    </StyledCategoryDropdownMenu>
                  )}
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