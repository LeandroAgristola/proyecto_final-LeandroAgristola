import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail.jsx';
import { getProductoById } from '../services/api.js';

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    setCargando(true);
    setError(null);
    getProductoById(id.toString())
      .then((res) => {
        if (!res.data) {
          throw new Error("Producto no encontrado");
        }
        setProducto(res.data);
      })
      .catch((err) => {
        console.error(`Error al obtener producto (ID: ${id}):`, err);
        setError(err.response?.data?.message || "Producto no disponible");
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <p className="text-center py-5">Cargando detalle del producto...</p>;
  if (error) return <p className="text-danger text-center py-5">Error: {error}</p>;

  return <ItemDetail producto={producto} />;
}

export default ItemDetailContainer;