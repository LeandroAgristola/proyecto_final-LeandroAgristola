import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx'; 
import Home from './pages/Home.jsx'; 
import Productos from './pages/Productos.jsx'; 
import Login from './pages/Login.jsx';
import Cart from './components/Cart.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Usamos tu ProtectedRoute existente
import ProductoDetalle from './pages/ProductoDetalle.jsx'; 
import AdminPanel from './pages/AdminPanel.jsx';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
// Importaciones para las nuevas páginas de Ofertas y Más Vendidos
import OfertasPage from './pages/OfertasPage.jsx';
import MasVendidosPage from './pages/MasVendidosPage.jsx';

function App() {
  return (
    <>
      <NavBar />
      {/* Ajusto la altura mínima del main para que el footer no suba si el contenido es poco. */}
      <main style={{ minHeight: 'calc(100vh - 100px)' }}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} /> 
          <Route path="/login" element={<Login />} />
          {/* NUEVAS RUTAS PARA OFERTAS Y MÁS VENDIDOS */}
          <Route path="/ofertas" element={<OfertasPage />} />
          <Route path="/mas-vendidos" element={<MasVendidosPage />} />
          
          {/* Ruta protegida para el carrito */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          {/* RUTA PROTEGIDA PARA EL PANEL DE ADMINISTRACIÓN (usando tu ProtectedRoute original) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          {/* Rutas para "Mis Compras" y "Datos Personales" (sin componente funcional por ahora) */}
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
    </>
  );
}

export default App;