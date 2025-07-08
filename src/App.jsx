import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Importo Link si no estaba
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx'; 
import Home from './pages/Home.jsx'; 
import Productos from './pages/Productos.jsx'; 
import Login from './pages/Login.jsx';
import Cart from './components/Cart.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx'; 
import ProductoDetalle from './pages/ProductoDetalle.jsx'; 
import AdminPanel from './pages/AdminPanel.jsx';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import OfertasPage from './pages/OfertasPage.jsx';
import MasVendidosPage from './pages/MasVendidosPage.jsx';
import styled from 'styled-components'; // Importo styled para el botón de WhatsApp
import { FaWhatsapp } from 'react-icons/fa'; // Importo el icono de WhatsApp


// NUEVO: Componente estilizado para el botón flotante de WhatsApp
const StyledWhatsAppButton = styled(Link)` /* Lo hago un Link de React Router para consistencia, aunque sea externo */
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25d366; /* Verde de WhatsApp */
  color: #fff;
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%; /* Botón circular */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para destacarlo */
  text-decoration: none; /* Sin subrayado */
  transition: transform 0.3s ease, background-color 0.3s ease; /* Transiciones suaves */
  z-index: 1000; /* Asegura que esté por encima de la mayoría de los elementos */

  &:hover {
    transform: scale(1.1); /* Efecto de escala al pasar el ratón */
    background-color: #1ebe57; /* Verde más oscuro al pasar el ratón */
    color: #fff; /* Asegura que el color del texto/icono no cambie en hover */
  }
`;


function App() {
  return (
    <>
      <NavBar />
      <main style={{ minHeight: 'calc(100vh - 100px)' }}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/ofertas" element={<OfertasPage />} />
          <Route path="/mas-vendidos" element={<MasVendidosPage />} />
          
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/mis-compras" element={<div className="container py-5"><h2>Mis Compras (En construcción)</h2><p>Aquí se mostrará tu historial de compras.</p></div>} />
          <Route path="/datos-personales" element={<div className="container py-5"><h2>Datos Personales (En construcción)</h2><p>Aquí podrás ver y editar tus datos de perfil.</p></div>} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* NUEVO: Botón flotante de WhatsApp */}
      <StyledWhatsAppButton 
        to="https://api.whatsapp.com/send?phone=5491112345678" /* Número de teléfono simulado */
        target="_blank" 
        aria-label="Chatea con nosotros por WhatsApp"
      >
        <FaWhatsapp /> {/* Icono de WhatsApp */}
      </StyledWhatsAppButton>
    </>
  );
}

export default App;