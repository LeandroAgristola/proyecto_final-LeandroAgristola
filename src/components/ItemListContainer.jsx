import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importo useLocation para leer los parámetros de la URL
import Item from './Item.jsx';
import { getProductos } from '../services/api.js';

function ItemListContainer() {
  // Mi estado para guardar todos los productos obtenidos de la API.
  const [allProductos, setAllProductos] = useState([]);
  // Mi estado para guardar los productos que realmente voy a mostrar después de aplicar filtros.
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  // Estado para indicar si los productos están cargando.
  const [cargando, setCargando] = useState(true);
  // Estado para manejar errores durante la carga.
  const [error, setError] = useState(null);

  // Hook de React Router para acceder a la ubicación actual, incluyendo los parámetros de búsqueda (query params).
  const location = useLocation();

  // Función auxiliar para obtener los parámetros de búsqueda de la URL (ej. ?categoria=colchones&subcategoria=king).
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      categoria: params.get('categoria'),
      subcategoria: params.get('subcategoria'),
      busqueda: params.get('busqueda') 
    };
  };

  // Efecto que se encarga de obtener TODOS los productos de la API.
  // Este se ejecuta una única vez al montar el componente.
  useEffect(() => {
    // Indico que la carga está en progreso.
    setCargando(true);
    // Limpio cualquier error previo.
    setError(null);
    getProductos()
      .then(res => {
        // Al recibir los datos, los guardo en 'allProductos' (todos los productos sin filtrar).
        // Esto me permite tener la lista completa para aplicar filtros posteriormente.
        setAllProductos(res.data);
        console.log("Productos cargados desde API (todos):", res.data); // Para depuración
      })
      .catch(err => {
        console.error("Detalles del error al cargar productos:", err.response || err); // Depuración del error
        setError('¡Ups! Hubo un problema al cargar los productos. Por favor, intenta de nuevo más tarde.');
      })
      .finally(() => setCargando(false)); // La carga ha terminado.
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez al montar.


  // Efecto que se encarga de aplicar los filtros cada vez que cambian los parámetros de la URL
  // O cuando la lista completa de productos (allProductos) se carga o actualiza.
  useEffect(() => {
    const { categoria, subcategoria, busqueda } = getQueryParams(); // Obtengo los filtros de la URL
    let productosTemp = [...allProductos]; // Creo una copia para no modificar el array original

    // Aplico el filtro por categoría si existe en la URL
    if (categoria) {
      productosTemp = productosTemp.filter(producto => 
        producto.categoria && producto.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }

    // Aplico el filtro por subcategoría si existe en la URL
    if (subcategoria) {
      productosTemp = productosTemp.filter(producto => 
        producto.subcategoria && producto.subcategoria.toLowerCase() === subcategoria.toLowerCase()
      );
    }
    // Actualizo el estado con los productos ya filtrados, que son los que se mostrarán.
    setProductosFiltrados(productosTemp);
  }, [allProductos, location.search]); // Este efecto se re-ejecuta si 'allProductos' cambia o si la URL cambia (location.search).


  // --- Renderizado Condicional ---
  // Muestro un mensaje de carga mientras se obtienen los datos.
  if (cargando) return <p className="text-center py-5">Cargando productos...</p>;
  // Muestro un mensaje de error si la carga falló.
  if (error) return <p className="text-danger text-center py-5">{error}</p>;
  // Si no hay productos después de aplicar los filtros, muestro un mensaje.
  if (productosFiltrados.length === 0) return <p className="text-center py-5">No se encontraron productos para los criterios seleccionados.</p>;


  return (
    <div className="container py-4">
      <div className="row">
        {/* Mapeo los productos filtrados para mostrarlos */}
        {productosFiltrados.map(producto => (
          <Item key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;