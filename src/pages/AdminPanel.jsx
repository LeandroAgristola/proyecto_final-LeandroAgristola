import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../services/api.js';
import ProductForm from '../components/ProductForm.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import styled from 'styled-components'; 

const StyledAdminSelect = styled.select`
  background-color: #343a40; /* Fondo gris oscuro, igual que el botón de búsqueda */
  color: white; /* Texto blanco */
  border: 1px solid #343a40; /* Borde gris oscuro */
  border-radius: 0.25rem; /* Bordes redondeados */
  padding: 0.375rem 2.25rem 0.375rem 0.75rem; /* Padding similar al de Bootstrap para selects */
  -webkit-appearance: none; /* Eliminar estilos por defecto de navegador para consistencia */
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e"); /* Flecha blanca personalizada */
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;

  &:focus {
    border-color: #555; /* Borde más claro en foco */
    box-shadow: 0 0 0 0.25rem rgba(85, 85, 85, 0.25); /* Sombra gris en foco */
    outline: 0; /* Eliminar outline por defecto */
  }

  option {
    background-color: #343a40; /* Asegurar que las opciones también sean oscuras */
    color: white;
  }
`;


function AdminPanel() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [currentFormId, setCurrentFormId] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState(''); 

  const navigate = useNavigate();

  const categoriasDisponibles = [
    { nombre: 'Colchones', value: 'Colchones' },
    { nombre: 'Almohadas', value: 'Almohadas' },
    { nombre: 'Sábanas', value: 'Sábanas' },
    { nombre: 'Respaldos', value: 'Respaldos' }
  ];

  const fetchProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await getProductos();
      setAllProducts(res.data);
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

  useEffect(() => {
    let filtered = [...allProducts];
    if (selectedCategory) {
      filtered = filtered.filter(producto => 
        producto.categoria === selectedCategory
      );
    }
    setDisplayedProducts(filtered);
  }, [allProducts, selectedCategory]);

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

      <div className="mb-4 d-flex justify-content-between align-items-center">
        {currentFormId === null && (
          <button className="btn btn-dark me-2" onClick={handleAddProduct}>
            Agregar Nuevo Producto
          </button>
        )}
        {currentFormId === null && (
          <div className="flex-grow-1 ms-3">
            <label htmlFor="categoryFilter" className="form-label visually-hidden">Filtrar por Categoría</label>
            <StyledAdminSelect
              id="categoryFilter"
              className="form-select w-auto" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas las Categorías</option>
              {categoriasDisponibles.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.nombre}
                </option>
              ))}
            </StyledAdminSelect>
          </div>
        )}
        {currentFormId !== null && (
          <button className="btn btn-secondary ms-auto" onClick={handleCancelForm}>
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
              {displayedProducts.map(producto => (
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

      {(displayedProducts.length === 0 && currentFormId === null && !cargando) && (
        <p className="text-center">No hay productos que coincidan con la categoría seleccionada. ¡Intenta con otra o agrega uno nuevo!</p>
      )}
    </div>
  );
}

export default AdminPanel;