import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Item from './Item.jsx';
import Pagination from './Pagination.jsx'; 
import { getProductos } from '../services/api.js';

function ItemListContainer() {
  const [allProductos, setAllProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(8); 
  const location = useLocation();

  const normalizeString = (str) => {
    if (!str) return '';
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      categoria: params.get('categoria'),
      subcategoria: params.get('subcategoria'),
      busqueda: params.get('busqueda')
    };
  };

  useEffect(() => {
    setCargando(true);
    setError(null);
    getProductos()
      .then(res => {
        setAllProductos(res.data);
        console.log("Productos cargados desde API (todos):", res.data);
      })
      .catch(err => {
        console.error("Detalles del error al cargar productos:", err.response || err);
        setError('¡Ups! Hubo un problema al cargar los productos. Por favor, intenta de nuevo más tarde.');
      })
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    const { categoria, subcategoria, busqueda } = getQueryParams();
    let productosTemp = [...allProductos];

    const normalizedCategoria = normalizeString(categoria);
    const normalizedSubcategoria = normalizeString(subcategoria);
    const normalizedBusqueda = normalizeString(busqueda);


    if (normalizedCategoria) {
      productosTemp = productosTemp.filter(producto =>
        producto.categoria && normalizeString(producto.categoria) === normalizedCategoria
      );
    }

    if (normalizedSubcategoria) {
      productosTemp = productosTemp.filter(producto =>
        producto.subcategoria && normalizeString(producto.subcategoria) === normalizedSubcategoria
      );
    }

    if (normalizedBusqueda) {
      productosTemp = productosTemp.filter(producto =>
        (producto.nombre && normalizeString(producto.nombre).includes(normalizedBusqueda)) ||
        (producto.descripcion && normalizeString(producto.descripcion).includes(normalizedBusqueda))
      );
    }
    setProductosFiltrados(productosTemp);
    setCurrentPage(1);
  }, [allProductos, location.search]);

  const indexOfLastItem = currentPage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  const currentItems = productosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (cargando) return <p className="text-center py-5">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center py-5">{error}</p>;
  if (productosFiltrados.length === 0) return <p className="text-center py-5">No se encontraron productos que coincidan con tu búsqueda.</p>;


  return (
    <div className="container py-4">
      <div className="row">
        {currentItems.map(producto => (
          <Item key={producto.id} producto={producto} />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={productosFiltrados.length} 
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}

export default ItemListContainer;