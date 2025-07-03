import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../services/api.js';
import ProductForm from '../components/ProductForm.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const navigate = useNavigate();

  const fetchProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (err) {
      console.error("Error al cargar productos en AdminPanel:", err);
      setError('Error al cargar productos.');
      toast.error('Error al cargar productos del panel de administración.'); 
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProducto(id);
        toast.success('Producto eliminado con éxito!'); 
        fetchProductos();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        toast.error('Error al eliminar producto.'); 
      }
    }
  };

  const handleEdit = (id) => {
    setEditingProductId(id);
  };

  const handleFormSuccess = () => {
    setEditingProductId(null);
    fetchProductos();
  };

  const handleAddProduct = () => {
    setEditingProductId(null);
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
      
      {editingProductId === null && productos.length > 0 && (
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