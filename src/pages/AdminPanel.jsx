import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../services/api.js';
import ProductForm from '../components/ProductForm.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

function AdminPanel() {
  // Mi estado para la lista de productos que muestro en la tabla.
  const [productos, setProductos] = useState([]);
  // Estado para indicar si los productos están cargando.
  const [cargando, setCargando] = useState(true);
  // Estado para manejar cualquier error durante la carga de productos.
  const [error, setError] = useState(null);
  // Estado clave: controla si estoy editando un producto (ID del producto)
  // o agregando uno nuevo ('new'), o si no estoy en ningún modo (null).
  const [currentFormId, setCurrentFormId] = useState(null); // Renombrado de editingProductId a currentFormId para mayor claridad
  // Hook para la navegación programática (aunque no lo estoy usando aquí directamente para redirigir, es útil para otras rutas).
  const navigate = useNavigate(); // Nota del profesor: el 'navigate' no se está usando en este componente actualmente.


  // Función asíncrona para obtener la lista de productos de mi API.
  const fetchProductos = async () => {
    setCargando(true); // Indico que la carga ha comenzado.
    setError(null);    // Limpio cualquier error previo.
    try {
      const res = await getProductos(); // Hago la solicitud GET a la API.
      setProductos(res.data); // Actualizo el estado con los productos recibidos.
    } catch (err) {
      console.error("Error al cargar productos en AdminPanel:", err); // Muestro el error en consola para depuración.
      setError('Error al cargar productos. Por favor, intenta de nuevo.'); // Mensaje amigable para el usuario.
      toast.error('Error al cargar productos del panel de administración.'); // Notificación de error con Toastify.
    } finally {
      setCargando(false); // La carga ha finalizado (con o sin error).
    }
  };

  // Efecto que se ejecuta una vez cuando el componente se monta para cargar los productos.
  useEffect(() => {
    fetchProductos();
  }, []); // El array vacío [] asegura que se ejecute solo al montar.


  // Manejador para la eliminación de un producto.
  const handleDelete = async (id) => {
    // Pido confirmación al usuario antes de eliminar para evitar errores.
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible.')) {
      try {
        await deleteProducto(id); // Envío la solicitud DELETE a la API.
        toast.success('Producto eliminado con éxito!'); // Notificación de éxito.
        fetchProductos(); // Vuelvo a cargar la lista para mostrar los cambios.
      } catch (err) {
        console.error("Error al eliminar producto:", err); // Depuración del error.
        toast.error('Error al eliminar producto. Por favor, intenta de nuevo.'); // Notificación de error.
      }
    }
  };

  // Manejador para iniciar la edición de un producto.
  const handleEdit = (id) => {
    setCurrentFormId(id); // Establezco el ID del producto que quiero editar.
  };

  // Manejador para iniciar el modo de "agregar nuevo producto".
  // Aquí es donde corregimos la lógica: establezco un valor específico ('new')
  // que me indica que el formulario debe aparecer en modo creación.
  const handleAddProduct = () => {
    setCurrentFormId('new'); // Indico que quiero agregar un producto nuevo.
  };

  // Manejador que se llama cuando el ProductForm termina su operación (guardar/actualizar).
  const handleFormSuccess = () => {
    setCurrentFormId(null); // Vuelvo al estado inicial (no mostrar formulario).
    fetchProductos();       // Recargo la lista de productos para ver el nuevo/actualizado.
  };


  // --- Renderizado Condicional ---
  // Muestro un mensaje de carga mientras se obtienen los datos iniciales.
  if (cargando) return <p className="text-center py-5">Cargando panel de administración...</p>;
  // Muestro un mensaje de error si la carga inicial falló.
  if (error) return <p className="text-danger text-center py-5">Error: {error}</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center my-4">Panel de Administración de Productos</h2>

      <div className="mb-4">
        {/* El texto del botón cambia dinámicamente según el modo (agregar/editar) */}
        <button className="btn btn-success me-2" onClick={handleAddProduct}>
          {currentFormId ? 'Cancelar Edición / Agregar Nuevo' : 'Agregar Nuevo Producto'}
        </button>
        {/* Aquí podríamos añadir un botón para volver a la vista de productos si estamos editando/agregando
            y el profesor lo considera necesario. Por ahora, el mismo botón de "Agregar Nuevo Producto"
            actúa como "Cancelar Edición" cuando el formulario está visible. */}
      </div>

      {/* Condición para mostrar el formulario ProductForm:
          Se muestra si currentFormId NO es null.
          Si currentFormId es 'new', le paso null al formulario para que sepa que es creación.
          Si currentFormId es un ID de producto, le paso ese ID para que sepa que es edición. */}
      {(currentFormId !== null) && (
        <div className="mb-5">
          <ProductForm 
            productoId={currentFormId === 'new' ? null : currentFormId} 
            onSuccess={handleFormSuccess} 
          />
        </div>
      )}
      
      {/* Condición para mostrar la tabla de productos:
          Solo se muestra si currentFormId ES null (no estoy en modo agregar/editar)
          Y SI hay productos en el array. */}
      {(currentFormId === null && productos.length > 0) && (
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
              {productos.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    <button 
                      className="btn btn-warning btn-sm me-2" 
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

      {/* Condición para mostrar el mensaje de "no hay productos":
          Solo se muestra si currentFormId ES null (no estoy en modo agregar/editar)
          Y SI no hay productos en el array. */}
      {(productos.length === 0 && currentFormId === null) && (
        <p className="text-center">No hay productos para administrar. ¡Agrega uno para empezar!</p>
      )}
    </div>
  );
}

export default AdminPanel;