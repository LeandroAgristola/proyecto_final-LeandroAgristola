import React, { useState, useEffect } from 'react';
import { getProductoById, postProducto, putProducto } from '../services/api.js';
import { toast } from 'react-toastify'; 

function ProductForm({ productoId, onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '', // URL de la imagen de Cloudinary
    categoria: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    if (productoId) {
      toast.info('Cargando datos del producto para edición...'); 
      getProductoById(productoId)
        .then(res => {
          setFormData(res.data);
          toast.success('Datos del producto cargados.'); 
        })
        .catch(err => {
          console.error("Error al cargar producto para edición:", err);
          toast.error('Error al cargar datos del producto para edición.'); 
        });
    }
  }, [productoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  };

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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrige los errores del formulario.'); 
      return;
    }

    setSubmitting(true);
    toast.info('Guardando producto...');

    try {
      if (productoId) {
        await putProducto(productoId, formData);
        toast.success('Producto actualizado con éxito!'); 
      } else {
        await postProducto(formData);
        toast.success('Producto agregado con éxito!');
        setFormData({
          nombre: '',
          descripcion: '',
          precio: '',
          imagen: '',
          categoria: ''
        });
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error(`Error: ${error.response?.data?.message || 'No se pudo guardar el producto.'}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">{productoId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            step="0.01"
            disabled={submitting}
          />
          {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">URL de la Imagen (Cloudinary)</label>
          <input
            type="url"
            className={`form-control ${errors.imagen ? 'is-invalid' : ''}`}
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            disabled={submitting}
          />
          {errors.imagen && <div className="invalid-feedback">{errors.imagen}</div>}
        </div>

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

        <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
          {submitting ? 'Guardando...' : (productoId ? 'Actualizar Producto' : 'Agregar Producto')}
        </button>
        {}
      </form>
    </div>
  );
}

export default ProductForm;