import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Item from './Item.jsx';
import { getProductos } from '../services/api.js';

function ItemListContainer() {
  // Mi estado para guardar todos los productos obtenidos de la API, sin filtrar.
  const [allProductos, setAllProductos] = useState([]);
  // Mi estado para guardar los productos que se mostrarán después de aplicar todos los filtros.
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  // Estado para indicar si la carga de productos está en progreso.
  const [cargando, setCargando] = useState(true);
  // Estado para almacenar cualquier mensaje de error.
  const [error, setError] = useState(null);

  // Hook de React Router para obtener la información de la URL, incluyendo los parámetros de búsqueda.
  const location = useLocation();

  // Función auxiliar que normaliza una cadena de texto, eliminando acentos y convirtiendo a minúsculas.
  // Esto es crucial para que la búsqueda sea insensible a acentos y mayúsculas/minúsculas.
  const normalizeString = (str) => {
    if (!str) return ''; // Me aseguro de que la cadena no sea nula o indefinida
    return str
      .normalize("NFD") // Descompone caracteres acentuados en su base y el acento (ej. 'ó' se vuelve 'o' + '´')
      .replace(/[\u0300-\u036f]/g, "") // Elimina los caracteres diacríticos (los acentos descompuestos)
      .toLowerCase(); // Convierte todo a minúsculas
  };


  // Función auxiliar para extraer los parámetros de filtro de la URL.
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      categoria: params.get('categoria'),
      subcategoria: params.get('subcategoria'),
      busqueda: params.get('busqueda')
    };
  };

  // Efecto para cargar TODOS los productos de la API, se ejecuta una sola vez al montar el componente.
  useEffect(() => {
    setCargando(true);
    setError(null);
    getProductos()
      .then(res => {
        setAllProductos(res.data);
        console.log("Productos cargados desde API (todos):", res.data); // Para depuración.
      })
      .catch(err => {
        console.error("Detalles del error al cargar productos:", err.response || err);
        setError('¡Ups! Hubo un problema al cargar los productos. Por favor, intenta de nuevo más tarde.');
      })
      .finally(() => setCargando(false));
  }, []);


  // Efecto para aplicar los filtros (por categoría, subcategoría, y ahora por búsqueda de texto).
  useEffect(() => {
    const { categoria, subcategoria, busqueda } = getQueryParams();
    let productosTemp = [...allProductos];

    // Normalizo los términos de búsqueda para poder compararlos sin problemas de acentos/mayúsculas.
    const normalizedCategoria = normalizeString(categoria);
    const normalizedSubcategoria = normalizeString(subcategoria);
    const normalizedBusqueda = normalizeString(busqueda);


    // Paso 1: Filtrar por categoría (si está presente en la URL).
    if (normalizedCategoria) {
      productosTemp = productosTemp.filter(producto =>
        producto.categoria && normalizeString(producto.categoria) === normalizedCategoria
      );
    }

    // Paso 2: Filtrar por subcategoría (si está presente en la URL).
    if (normalizedSubcategoria) {
      productosTemp = productosTemp.filter(producto =>
        producto.subcategoria && normalizeString(producto.subcategoria) === normalizedSubcategoria
      );
    }

    // Paso 3: Filtrar por término de búsqueda (si está presente en la URL).
    if (normalizedBusqueda) {
      productosTemp = productosTemp.filter(producto =>
        (producto.nombre && normalizeString(producto.nombre).includes(normalizedBusqueda)) ||
        (producto.descripcion && normalizeString(producto.descripcion).includes(normalizedBusqueda))
      );
    }

    setProductosFiltrados(productosTemp);
    // console.log("Productos filtrados finales:", productosTemp); // Para depuración
  }, [allProductos, location.search]); // Dependencias: la lista completa de productos y los cambios en la URL.


  // --- Renderizado Condicional ---
  if (cargando) return <p className="text-center py-5">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center py-5">{error}</p>;
  if (productosFiltrados.length === 0) return <p className="text-center py-5">No se encontraron productos que coincidan con tu búsqueda.</p>;


  return (
    <div className="container py-4">
      <div className="row">
        {productosFiltrados.map(producto => (
          <Item key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;