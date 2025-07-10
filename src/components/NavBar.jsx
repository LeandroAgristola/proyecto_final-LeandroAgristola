import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaTimes, FaBoxOpen, FaFire } from 'react-icons/fa';
import logoColchones from '../assets/LogoColchones.png';
import styled from 'styled-components';
import { Collapse } from 'bootstrap';

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

const StyledUserDropdownMenu = styled.ul`
  position: absolute;
  top: 100% !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  min-width: 150px;
  z-index: 1050;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
  /* margin-top: 5px; // REMOVED THIS LINE */
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
      display: flex; /* Make nav-item a flex container to center its contents */
      justify-content: center; /* Center contents horizontally */
    }

    .nav-item.dropdown { /* Specific rule for dropdown nav items */
      flex-direction: column; /* Ensure button and dropdown stack vertically */
      align-items: center; /* Center them horizontally */
    }

    .nav-link {
      padding: 15px 0 !important;
      color: white !important;
      font-size: 1.2rem;
      width: 100%; /* Make nav-link take full width for hover effect */
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
        display: block; /* Ensure it's a block to take width */
        width: 100%; /* Make dropdown-item take full width for hover effect */
        text-align: center; /* Center text inside the block */
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

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(null); 
  const navbarCollapseRef = useRef(null);
  const bsCollapseInstance = useRef(null);
  const userDropdownRef = useRef(null); 

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
    setIsUserDropdownOpen(false); 
  };

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/productos?busqueda=${searchTerm}`);
    if (bsCollapseInstance.current) {
        bsCollapseInstance.current.hide(); 
    }
    setIsMenuOpen(false); 
  };

  const handleToggle = () => {
    if (bsCollapseInstance.current) {
      if (isMenuOpen) {
        bsCollapseInstance.current.hide();
      } else {
        bsCollapseInstance.current.show();
      }
    }
  };

  const handleLinkClick = () => {
    if (bsCollapseInstance.current) {
      bsCollapseInstance.current.hide(); 
    }
    setIsMenuOpen(false); 
    setIsUserDropdownOpen(false);
    setOpenCategoryDropdown(null); 
  };


  const handleCategoryDropdownToggle = (categoryName) => {
    if (openCategoryDropdown === categoryName) {
      setOpenCategoryDropdown(null); 
    } else {
      setOpenCategoryDropdown(categoryName); 
    }
    if (isUserDropdownOpen) {
        setIsUserDropdownOpen(false);
    }
  };

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    if (openCategoryDropdown) {
        setOpenCategoryDropdown(null);
    }
  };

  useEffect(() => {
    const mobileHeader = document.getElementById('mobile-header');
    if (mobileHeader) {
      setMobileHeaderHeight(mobileHeader.offsetHeight);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.documentElement.style.setProperty('--mobile-navbar-total-height', `${mobileHeaderHeight}px`);
  }, [mobileHeaderHeight]);

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

  useEffect(() => {
    if (navbarCollapseRef.current) {
      if (!bsCollapseInstance.current) {
          bsCollapseInstance.current = new Collapse(navbarCollapseRef.current, {
            toggle: false
          });
      }

      const collapseElement = navbarCollapseRef.current;

      const handleShown = () => {
        setIsMenuOpen(true);
        setIsUserDropdownOpen(false);
        setOpenCategoryDropdown(null);
      };
      const handleHidden = () => {
        setIsMenuOpen(false);
        setIsUserDropdownOpen(false);
        setOpenCategoryDropdown(null);
      };

      collapseElement.addEventListener('shown.bs.collapse', handleShown);
      collapseElement.addEventListener('hidden.bs.collapse', handleHidden);

      return () => {
        collapseElement.removeEventListener('shown.bs.collapse', handleShown);
        collapseElement.removeEventListener('hidden.bs.collapse', handleHidden);
        if (bsCollapseInstance.current) {
          bsCollapseInstance.current.dispose();
          bsCollapseInstance.current = null;
        }
      };
    }
  }, []); 

  useEffect(() => {
      const handleClickOutside = (event) => {

          if (userDropdownRef.current && !userDropdownRef.current.contains(event.target) && isUserDropdownOpen) {
              const clickedOnCategoryToggle = event.target.closest('.nav-item.dropdown button.dropdown-toggle');
              if (!clickedOnCategoryToggle || !clickedOnCategoryToggle.id.includes('navbarDropdown')) {
                setIsUserDropdownOpen(false);
              }
          }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [isUserDropdownOpen, openCategoryDropdown]);


  useEffect(() => {
    const handleClickOutsideCategory = (event) => {
      if (openCategoryDropdown &&
          (!navbarCollapseRef.current || !navbarCollapseRef.current.contains(event.target)) &&
          (!userDropdownRef.current || !userDropdownRef.current.contains(event.target))
      ) {
        const clickedOnUserToggle = event.target.closest('#userDropdownNavLink');
        if (!clickedOnUserToggle) {
          setOpenCategoryDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutsideCategory);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCategory);
    };
  }, [openCategoryDropdown, isMenuOpen, isUserDropdownOpen]);


  return (
    <>
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

          <Link className="nav-link text-dark d-flex flex-column align-items-center position-relative mt-2" to="/cart" aria-label="Ver carrito de compras">
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

      <div id="mobile-header" className="bg-light py-2 border-bottom d-block d-lg-none">
        <div className="container">
          <div className="d-flex justify-content-center py-2">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={logoColchones} alt="Logo Colchonera" style={{ height: '40px', marginRight: '10px' }} />
              <span className="text-dark fw-bold">Colchonera React</span>
            </Link>
          </div>

          <div className="d-flex justify-content-around align-items-center py-2"> 
            <button
              className="navbar-toggler"
              type="button"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={isMenuOpen}
              onClick={handleToggle}
              style={{ border: 'none', backgroundColor: 'transparent' }}
              aria-label={isMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
            >
              {isMenuOpen ? <FaTimes size={24} color="#343a40" /> : <FaBars size={24} color="#343a40" />}
            </button>

            <form className="input-group w-75 mx-3" onSubmit={handleSearch} role="search">
              <StyledSearchInput
                type="text"
                className="form-control"
                placeholder="Buscar productos por nombre o descripción..."
                aria-label="Buscar productos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <StyledSearchButton className='btn btn-dark' type="submit" aria-label="Buscar">
                <FaSearch />
              </StyledSearchButton>
            </form>

            <Link className="nav-link text-dark d-flex align-items-center position-relative" to="/cart" onClick={handleLinkClick} aria-label="Ver carrito de compras">
              <FaShoppingCart size={24} />
              {totalItemsCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItemsCarrito}
                  <span className="visually-hidden">productos en el carrito</span>
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0" role="navigation">
        <div className="container">
          <StyledMobileCollapse className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
            <ul className="navbar-nav w-100 justify-content-between" role="menu">
              <li className="nav-item dropdown" key="user-menu" ref={userDropdownRef} role="none">
                  {usuario ? (
                      <button
                          className="nav-link dropdown-toggle py-3 px-4"
                          id="userDropdownNavLink"
                          type="button"
                          aria-expanded={isUserDropdownOpen}
                          onClick={handleUserDropdownToggle}
                          aria-haspopup="true"
                          aria-controls="user-menu-options" 
                          aria-label={`Hola, ${usuario.nombre}. Opciones de usuario`} 
                      >
                          <FaUserCircle className="me-2" />Hola, {usuario.nombre}
                      </button>
                  ) : (
                      <Link className="nav-link py-3 px-4" to="/login" onClick={handleLinkClick} role="menuitem" aria-label="Iniciar sesión en tu cuenta">
                          <FaUserCircle className="me-2" />Mi Cuenta
                      </Link>
                  )}
                  {isUserDropdownOpen && (
                      <StyledUserDropdownMenu className="dropdown-menu open" aria-labelledby="userDropdownNavLink" role="menu" id="user-menu-options"> {/* Added role="menu" and id */}
                          <li role="none"><Link className="dropdown-item" to="/mis-compras" onClick={handleLinkClick} role="menuitem">Mis Compras</Link></li>
                          <li role="none"><Link className="dropdown-item" to="/datos-personales" onClick={handleLinkClick} role="menuitem">Datos Personales</Link></li>
                          <li role="none"><hr className="dropdown-divider" /></li>
                          <li role="none"><button className="dropdown-item" onClick={handleLogout} role="menuitem">Cerrar Sesión</button></li>
                      </StyledUserDropdownMenu>
                  )}
              </li>

              <li className="nav-item" role="none">
                <Link className="nav-link py-3 px-4" to="/ofertas" onClick={handleLinkClick} role="menuitem" aria-label="Ver todas las ofertas">
                  <FaFire className="me-2" />
                  Ofertas
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link className="nav-link py-3 px-4" to="/mas-vendidos" onClick={handleLinkClick} role="menuitem" aria-label="Ver productos más vendidos">
                  <FaBoxOpen className="me-2" />
                  Más Vendidos
                </Link>
              </li>

              {categorias.map((categoria, index) => (
                <li className="nav-item dropdown" key={index} role="none">
                  <button
                    className="nav-link dropdown-toggle py-3 px-4"
                    id={`navbarDropdown${categoria.nombre}`}
                    type="button"
                    aria-expanded={openCategoryDropdown === categoria.nombre}
                    onClick={() => handleCategoryDropdownToggle(categoria.nombre)}
                    aria-haspopup="true"
                    aria-controls={`category-menu-options-${categoria.nombre}`} 
                    aria-label={`Categoría ${categoria.nombre}. Desplegar subcategorías`} 
                  >
                    {categoria.nombre}
                  </button>
                  {openCategoryDropdown === categoria.nombre && (
                    <StyledCategoryDropdownMenu className="dropdown-menu open" aria-labelledby={`navbarDropdown${categoria.nombre}`} role="menu" id={`category-menu-options-${categoria.nombre}`}> {/* Added role="menu" and id */}
                      {categoria.subcategorias.map((subcategoria, subIndex) => (
                        <li key={subIndex} role="none">
                          <Link className="dropdown-item" to={`/productos?categoria=${categoria.nombre.toLowerCase()}&subcategoria=${subcategoria.value}`} onClick={handleLinkClick} role="menuitem">
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