import React, { useEffect, useState } from 'react';
import { getProductos } from '../services/api.js';
import ItemListContainer from '../components/ItemListContainer.jsx';
import { toast } from 'react-toastify';
import CategoryBanner from '../components/CategoryBanner.jsx'; 

function OfertasPage() {
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfertas = async () => {
      setCargando(true);
      setError(null);
      try {
        const res = await getProductos();
        const allProducts = res.data;

        const getRandomProducts = (arr, num) => {
          const shuffled = [...arr].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, num);
        };

        setOfertas(getRandomProducts(allProducts, 8)); 
      } catch (err) {
        console.error("Error al cargar ofertas:", err);
        setError('Error al cargar las ofertas. Por favor, intenta de nuevo.');
        toast.error('Error al cargar las ofertas.');
      } finally {
        setCargando(false);
      }
    };

    fetchOfertas();
  }, []);

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando ofertas...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center py-5">Error: {error}</p>;
  }

  if (ofertas.length === 0) {
    return <p className="text-center py-5">No hay ofertas disponibles en este momento.</p>;
  }

  return (
    <div className="container py-5">
      <CategoryBanner category="ofertas" />
      <ItemListContainer productos={ofertas} />
    </div>
  );
}

export default OfertasPage;