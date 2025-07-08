import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Item from './Item.jsx';
import Pagination from './Pagination.jsx'; // Importo mi nuevo componente de paginación
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

  // **** ESTADOS PARA PAGINACIÓN ****
  const [currentPage, setCurrentPage] = useState(1); // La página actual en la que me encuentro. Empiezo en la primera.
  const [itemsPerPage] = useState(8); // Cuántos productos quiero mostrar por página (ej. 3 columnas * 3 filas).


  // Hook de React Router para obtener la información de la URL, incluyendo los parámetros de búsqueda.
  const location = useLocation();

  // Función auxiliar que normaliza una cadena de texto, eliminando acentos y convirtiendo a minúsculas.
  const normalizeString = (str) => {
    if (!str) return '';
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
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
        console.log("Productos cargados desde API (todos):", res.data);
      })
      .catch(err => {
        console.error("Detalles del error al cargar productos:", err.response || err);
        setError('¡Ups! Hubo un problema al cargar los productos. Por favor, intenta de nuevo más tarde.');
      })
      .finally(() => setCargando(false));
  }, []);


  // Efecto para aplicar los filtros (por categoría, subcategoría, y por búsqueda de texto).
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

    // Una vez que los productos están filtrados, actualizo el estado.
    setProductosFiltrados(productosTemp);
    // IMPORTANTE: Después de filtrar, reseteo la página actual a 1
    // Esto evita que el usuario se quede en una página 5 cuando solo hay 2 páginas de resultados.
    setCurrentPage(1);
    // console.log("Productos filtrados finales:", productosTemp); // Para depuración
  }, [allProductos, location.search]);


  // **** LÓGICA DE PAGINACIÓN ****
  // Calculo los índices para saber qué productos mostrar en la página actual.
  const indexOfLastItem = currentPage * itemsPerPage; // Índice del último producto en la página actual.
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Índice del primer producto en la página actual.
  // Obtengo solo los productos que corresponden a la página actual.
  const currentItems = productosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página. La pasaré al componente Pagination.
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // --- Renderizado Condicional ---
  if (cargando) return <p className="text-center py-5">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center py-5">{error}</p>;
  // Si no hay productos después de aplicar los filtros, muestro un mensaje.
  if (productosFiltrados.length === 0) return <p className="text-center py-5">No se encontraron productos que coincidan con tu búsqueda.</p>;


  return (
    <div className="container py-4">
      <div className="row">
        {/* Mapeo y renderizo solo los productos de la página actual. */}
        {currentItems.map(producto => (
          <Item key={producto.id} producto={producto} />
        ))}
      </div>
      {/* Renderizo el componente de Paginación debajo de los productos. */}
      {/* Le paso las propiedades necesarias para que sepa cómo renderizar los controles. */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={productosFiltrados.length} // El total de ítems a paginar es el de los filtrados, no el de 'allProductos'.
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}

export default ItemListContainer;