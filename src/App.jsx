import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx'; 
import Home from './pages/Home.jsx'; 
import Productos from './pages/Productos.jsx'; 
import Login from './pages/Login.jsx';
import Cart from './components/Cart.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx'; 
import ProductoDetalle from './pages/ProductoDetalle.jsx'; 

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} /> 
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;