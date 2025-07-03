import React, { useState, useEffect } from 'react';
import { getProductoById, postProducto, putProducto } from '../services/api.js';

// Componente de formulario para agregar o editar productos.
// Recibe 'productoId' si estamos en modo edición, y 'onSuccess' para manejar el éxito de la operación.
function ProductForm({ productoId, onSuccess }) {
  // Estado para los datos del formulario. Inicializa con un objeto vacío o con los datos del producto si es edición.
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '', // URL de la imagen de Cloudinary
    categoria: ''
  });

  // Estado para manejar los errores de validación del formulario.
  const [errors, setErrors] = useState({});
  // Estado para controlar si el formulario está en proceso de envío.
  const [submitting, setSubmitting] = useState(false);
  // Estado para mostrar mensajes de carga o éxito.
  const [message, setMessage] = useState('');

  // useEffect para cargar los datos del producto si se proporciona un productoId (modo edición).
  useEffect(() => {
    if (productoId) {
      setMessage('Cargando datos del producto...');
      getProductoById(productoId)
        .then(res => {
          setFormData(res.data); // Llena el formulario con los datos del producto existente.
          setMessage('');
        })
        .catch(err => {
          console.error("Error al cargar producto para edición:", err);
          setMessage('Error al cargar datos del producto para edición.');
        });
    }
  }, [productoId]); // Se ejecuta cuando productoId cambia.

  // Manejador de cambios para los inputs del formulario.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpia el error para el campo actual si el usuario empieza a escribir.
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  };

  // Función de validación del formulario.
  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
    }
    if (parseFloat(formData.precio) <= 0 || isNaN(parseFloat(formData.precio))) {
      newErrors.precio = 'El precio debe ser un número mayor a 0.';
    }
    if (!formData.descripcion.trim() || formData.descripcion.trim().length < 10) {
      newErrors.descripcion = 'La descripción es obligatoria y debe tener al menos 10 caracteres.';
    }
    if (!formData.imagen.trim()) {
      newErrors.imagen = 'La URL de la imagen es obligatoria.';
    }
    if (!formData.categoria.trim()) {
      newErrors.categoria = 'La categoría es obligatoria.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores.
  };

  // Manejador del envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página).

    if (!validateForm()) {
      setMessage('Por favor, corrige los errores del formulario.');
      return;
    }

    setSubmitting(true); // Indica que el formulario se está enviando.
    setMessage('Guardando producto...');

    try {
      if (productoId) {
        // Si hay productoId, estamos editando.
        await putProducto(productoId, formData);
        setMessage('Producto actualizado con éxito!');
      } else {
        // Si no hay productoId, estamos creando uno nuevo.
        await postProducto(formData);
        setMessage('Producto agregado con éxito!');
        // Limpia el formulario después de agregar un nuevo producto.
        setFormData({
          nombre: '',
          descripcion: '',
          precio: '',
          imagen: '',
          categoria: ''
        });
      }
      if (onSuccess) {
        onSuccess(); // Llama a la función onSuccess si se proporciona.
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setMessage(`Error: ${error.response?.data?.message || 'No se pudo guardar el producto.'}`);
    } finally {
      setSubmitting(false); // Finaliza el estado de envío.
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">{productoId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={submitting}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>

        {/* Campo Descripción */}
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            disabled={submitting}
          ></textarea>
          {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
        </div>

        {/* Campo Precio */}
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            step="0.01" // Permite decimales
            disabled={submitting}
          />
          {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
        </div>

        {/* Campo URL de Imagen (Cloudinary) */}
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">URL de la Imagen (Cloudinary)</label>
          <input
            type="url" // Tipo url para validación básica de formato
            className={`form-control ${errors.imagen ? 'is-invalid' : ''}`}
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            disabled={submitting}
          />
          {errors.imagen && <div className="invalid-feedback">{errors.imagen}</div>}
        </div>

        {/* Campo Categoría */}
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <input
            type="text"
            className={`form-control ${errors.categoria ? 'is-invalid' : ''}`}
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            disabled={submitting}
          />
          {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
        </div>

        {/* Botón de envío del formulario */}
        <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
          {submitting ? 'Guardando...' : (productoId ? 'Actualizar Producto' : 'Agregar Producto')}
        </button>

        {/* Mensajes de estado */}
        {message && (
          <div className={`mt-3 alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default ProductForm;