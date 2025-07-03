import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../services/api.js';
import ProductForm from '../components/ProductForm.jsx'; // Importamos el formulario
import { useNavigate } from 'react-router-dom'; // Para la navegación programática

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null); // Estado para saber qué producto estamos editando
  const navigate = useNavigate(); // Hook para navegar programáticamente

  // Función para cargar los productos. Se llamará al montar y después de cada operación CRUD.
  const fetchProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (err) {
      console.error("Error al cargar productos en AdminPanel:", err);
      setError('Error al cargar productos.');
    } finally {
      setCargando(false);
    }
  };

  // Carga los productos al montar el componente.
  useEffect(() => {
    fetchProductos();
  }, []);

  // Manejador para el botón de eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProducto(id);
        alert('Producto eliminado con éxito!'); 
        fetchProductos(); // Recarga la lista de productos
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        alert('Error al eliminar producto.'); 
      }
    }
  };

  // Manejador para el botón de editar producto
  const handleEdit = (id) => {
    setEditingProductId(id); // Establece el ID del producto que se va a editar
  };

  // Manejador para cuando el formulario de producto se guarda con éxito
  const handleFormSuccess = () => {
    setEditingProductId(null); // Sale del modo edición
    fetchProductos(); // Recarga la lista de productos
  };

  // Manejador para el botón "Agregar Nuevo Producto"
  const handleAddProduct = () => {
    setEditingProductId(null); // Asegura que no estemos en modo edición
  };


  if (cargando) return <p className="text-center py-5">Cargando panel de administración...</p>;
  if (error) return <p className="text-danger text-center py-5">Error: {error}</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center my-4">Panel de Administración de Productos</h2>

      <div className="mb-4">
        <button className="btn btn-success me-2" onClick={handleAddProduct}>
          {editingProductId ? 'Cancelar Edición / Agregar Nuevo' : 'Agregar Nuevo Producto'}
        </button>
      </div>

      {editingProductId !== null && (
        <div className="mb-5">
          <ProductForm productoId={editingProductId} onSuccess={handleFormSuccess} />
        </div>
      )}
      
      {editingProductId === null && productos.length > 0 && ( // Solo muestra la tabla si no estamos editando
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

      {productos.length === 0 && editingProductId === null && (
        <p className="text-center">No hay productos para administrar. ¡Agrega uno!</p>
      )}
    </div>
  );
}

export default AdminPanel;