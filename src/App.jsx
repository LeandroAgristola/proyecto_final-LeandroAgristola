import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Productos from './pages/Productos.jsx';
import Login from './pages/Login.jsx';
import Cart from './components/Cart.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProductoDetalle from './pages/ProductoDetalle.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import OfertasPage from './pages/OfertasPage.jsx';
import MasVendidosPage from './pages/MasVendidosPage.jsx';
import { Helmet } from 'react-helmet-async'; 

function App() {
  return (
    <>
      <Helmet>
        <title>Colchonera React - Descansa Mejor</title>
        <meta name="description" content="Tienda online de colchones, almohadas y sábanas para un descanso perfecto." />
        <meta name="keywords" content="colchones, almohadas, sábanas, descanso, dormir, tienda online, colchonería" />
        <meta name="author" content="Leandro Agristola" />
      </Helmet>
      <NavBar />
      <main style={{ minHeight: 'calc(50vh - 100px)' }}>
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
    </>
  );
}

export default App;