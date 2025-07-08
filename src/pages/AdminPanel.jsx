import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../services/api.js';
import ProductForm from '../components/ProductForm.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [currentFormId, setCurrentFormId] = useState(null); 
  const navigate = useNavigate();

  const fetchProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (err) {
      console.error("Error al cargar productos en AdminPanel:", err);
      setError('Error al cargar productos. Por favor, intenta de nuevo.');
      toast.error('Error al cargar productos del panel de administración.'); 
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible.')) {
      try {
        await deleteProducto(id);
        toast.success('Producto eliminado con éxito!'); 
        fetchProductos();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        toast.error('Error al eliminar producto. Por favor, intenta de nuevo.'); 
      }
    }
  };

  const handleEdit = (id) => {
    setCurrentFormId(id);
  };

  const handleAddProduct = () => {
    setCurrentFormId('new'); 
  };

  const handleFormSuccess = () => {
    setCurrentFormId(null); 
    fetchProductos();       
  };

  const handleCancelForm = () => {
    setCurrentFormId(null); 
    toast.info('Operación cancelada.'); 
  };

  if (cargando) return <p className="text-center py-5">Cargando panel de administración...</p>;
  if (error) return <p className="text-danger text-center py-5">Error: {error}</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center my-4">Panel de Administración de Productos</h2>

      <div className="mb-4">
        {/* MODIFICACIÓN: El botón "Agregar Nuevo Producto" solo se muestra cuando el formulario no está activo. */}
        {currentFormId === null && (
          <button className="btn btn-dark me-2" onClick={handleAddProduct}> {/* Cambiado a btn-dark para estilo gris */}
            Agregar Nuevo Producto
          </button>
        )}
        {/* El botón de "Cancelar" que estaba fuera del formulario ha sido eliminado,
            ya que solo mantendremos el que está dentro del ProductForm. */}
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
                      className="btn btn-secondary btn-sm me-2" // Edit: Cambiado a btn-secondary
                      onClick={() => handleEdit(producto.id)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" // Delete: Mantiene btn-danger (similar al rojo de acento)
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

      {(productos.length === 0 && currentFormId === null) && (
        <p className="text-center">No hay productos para administrar. ¡Agrega uno para empezar!</p>
      )}
    </div>
  );
}

export default AdminPanel;