import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../services/api.js';
import ProductForm from '../components/ProductForm.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

function AdminPanel() {
  // Mi estado para la lista completa de productos obtenida de la API.
  const [allProducts, setAllProducts] = useState([]);
  // Mi estado para los productos que se muestran en la tabla, después de aplicar filtros.
  const [displayedProducts, setDisplayedProducts] = useState([]);
  // Estado para indicar si los productos están cargando.
  const [cargando, setCargando] = useState(true);
  // Estado para manejar cualquier error.
  const [error, setError] = useState(null);
  // Estado que controla si estoy editando un producto (su ID) o agregando uno nuevo ('new').
  const [currentFormId, setCurrentFormId] = useState(null); 
  // NUEVO: Estado para guardar la categoría seleccionada en el filtro de la tabla.
  const [selectedCategory, setSelectedCategory] = useState(''); 

  const navigate = useNavigate(); // Nota: 'navigate' no se está usando en este componente actualmente.

  // Defino las categorías disponibles, igual que en ProductForm y NavBar, para coherencia.
  const categoriasDisponibles = [
    { nombre: 'Colchones', value: 'Colchones' },
    { nombre: 'Almohadas', value: 'Almohadas' },
    { nombre: 'Sábanas', value: 'Sábanas' },
    { nombre: 'Respaldos', value: 'Respaldos' }
  ];


  // Función asíncrona para obtener la lista de productos de la API.
  const fetchProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await getProductos();
      setAllProducts(res.data); // Guardo todos los productos obtenidos.
    } catch (err) {
      console.error("Error al cargar productos en AdminPanel:", err);
      setError('Error al cargar productos. Por favor, intenta de nuevo.');
      toast.error('Error al cargar productos del panel de administración.'); 
    } finally {
      setCargando(false);
    }
  };

  // Efecto que se ejecuta una vez al montar para cargar todos los productos.
  useEffect(() => {
    fetchProductos();
  }, []);

  // NUEVO Efecto: se ejecuta cuando cambia allProducts o selectedCategory para aplicar el filtro.
  useEffect(() => {
    let filtered = [...allProducts]; // Empiezo con todos los productos.

    // Si hay una categoría seleccionada, filtro los productos.
    if (selectedCategory) {
      filtered = filtered.filter(producto => 
        producto.categoria === selectedCategory
      );
    }
    setDisplayedProducts(filtered); // Actualizo los productos que se mostrarán en la tabla.
  }, [allProducts, selectedCategory]); // Depende de la lista completa de productos y la categoría seleccionada.


  // Manejador para la eliminación de un producto.
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible.')) {
      try {
        await deleteProducto(id);
        toast.success('Producto eliminado con éxito!'); 
        fetchProductos(); // Vuelvo a cargar todos los productos después de eliminar.
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        toast.error('Error al eliminar producto. Por favor, intenta de nuevo.'); 
      }
    }
  };

  // Manejador para iniciar la edición de un producto.
  const handleEdit = (id) => {
    setCurrentFormId(id);
  };

  // Manejador para iniciar el modo de "agregar nuevo producto".
  const handleAddProduct = () => {
    setCurrentFormId('new'); 
  };

  // Manejador que se llama cuando el ProductForm termina su operación.
  const handleFormSuccess = () => {
    setCurrentFormId(null); 
    fetchProductos();       // Recargo todos los productos después de una operación exitosa.
  };

  // Manejador para cancelar la creación o edición de un producto.
  const handleCancelForm = () => {
    setCurrentFormId(null); 
    toast.info('Operación cancelada.'); 
  };


  // --- Renderizado Condicional ---
  if (cargando) return <p className="text-center py-5">Cargando panel de administración...</p>;
  if (error) return <p className="text-danger text-center py-5">Error: {error}</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center my-4">Panel de Administración de Productos</h2>

      <div className="mb-4 d-flex justify-content-between align-items-center">
        {/* Botón "Agregar Nuevo Producto" (solo visible si el formulario no está activo) */}
        {currentFormId === null && (
          <button className="btn btn-dark me-2" onClick={handleAddProduct}>
            Agregar Nuevo Producto
          </button>
        )}
        {/* NUEVO: Select para filtrar por categoría */}
        {currentFormId === null && ( // Solo muestro el filtro si no estoy editando/agregando
          <div className="flex-grow-1 ms-3"> {/* flex-grow-1 para que el select ocupe espacio */}
            <label htmlFor="categoryFilter" className="form-label visually-hidden">Filtrar por Categoría</label>
            <select
              id="categoryFilter"
              className="form-select w-auto" // w-auto para que el ancho se ajuste al contenido
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas las Categorías</option>
              {categoriasDisponibles.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Botón "Cancelar" (solo visible si el formulario está activo) */}
        {currentFormId !== null && (
          <button className="btn btn-secondary ms-auto" onClick={handleCancelForm}> {/* ms-auto para alinear a la derecha */}
            Cancelar
          </button>
        )}
      </div>

      {(currentFormId !== null) && (
        <div className="mb-5">
          <ProductForm 
            productoId={currentFormId === 'new' ? null : currentFormId} 
            onSuccess={handleFormSuccess} 
            onCancel={handleCancelForm} 
          />
        </div>
      )}
      
      {/* La tabla ahora muestra los productos filtrados (displayedProducts) */}
      {(currentFormId === null && displayedProducts.length > 0) && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map(producto => ( // Mapeo displayedProducts
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => handleEdit(producto.id)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(producto.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mensaje de "no hay productos" para la tabla, también basado en displayedProducts. */}
      {(displayedProducts.length === 0 && currentFormId === null && !cargando) && (
        <p className="text-center">No hay productos que coincidan con la categoría seleccionada. ¡Intenta con otra o agrega uno nuevo!</p>
      )}
    </div>
  );
}

export default AdminPanel;