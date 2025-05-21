import { useEffect, useState } from 'react';
import Item from './Item.jsx';
import { getProductos } from '../services/api.js';

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  getProductos()
    .then(res => {
      console.log("Datos recibidos:", res.data);
      setProductos(res.data);
    })
    .catch(err => {
      console.error("Detalles del error:", err.response); 
      setError('Error al cargar productos. Intenta de nuevo más tarde.');
    })
    .finally(() => setCargando(false));
}, []);

  if (cargando) return <p className="text-center py-5">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center py-5">{error}</p>;
  if (productos.length === 0) return <p className="text-center py-5">No hay productos disponibles en este momento.</p>;




  return (
    <div className="container py-4">
      <div className="row">
        {productos.map(producto => (
          <Item key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;