import React, { useState, useEffect } from 'react';
import { getProductoById, postProducto, putProducto } from '../services/api.js';
import { toast } from 'react-toastify'; 

function ProductForm({ productoId, onSuccess }) {
  // Mi estado para los datos del formulario.
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '', // URL de la imagen 
    categoria: '', 
    subcategoria: '' 
  });

  // Estado para manejar los errores de validación.
  const [errors, setErrors] = useState({});
  // Estado para controlar si el formulario se está enviando.
  const [submitting, setSubmitting] = useState(false);

  // Mis categorías y subcategorías disponibles, las mismas que en el Navbar.
  // Esto asegura coherencia entre las opciones del formulario y la navegación.
  const categoriasDisponibles = [
    {
      nombre: 'Colchones',
      subcategorias: [
        { display: '1 Plaza', value: '1-plaza' },
        { display: '1 Plaza y Media', value: '1-plaza-y-media' },
        { display: '2 Plazas', value: '2-plazas' },
        { display: '2 Plazas y Media', value: '2-plazas-y-media' },
        { display: 'King', value: 'king' }
      ]
    },
    {
      nombre: 'Almohadas',
      subcategorias: [
        { display: 'Fibra', value: 'fibra' },
        { display: 'Viscoelásticas', value: 'viscoelásticas' }
      ]
    },
    {
      nombre: 'Sábanas',
      subcategorias: [
        { display: 'Twin', value: 'twin' },
        { display: 'Full', value: 'full' },
        { display: 'Queen', value: 'queen' },
        { display: 'King', value: 'king' }
      ]
    },
    {
      nombre: 'Respaldos',
      subcategorias: [
        { display: '1 Plaza', value: '1-plaza' },
        { display: '2 Plazas y Media', value: '2-plazas-y-media' },
        { display: 'King', value: 'king' }
      ]
    }
  ];

  // Encuentro las subcategorías basadas en la categoría seleccionada en el formulario.
  // Esto me permite mostrar solo las subcategorías relevantes.
  const subcategoriasParaCategoria = categoriasDisponibles.find(
    (cat) => cat.nombre === formData.categoria
  )?.subcategorias || [];


  // Efecto para cargar los datos del producto si estoy en modo edición (productoId está presente).
  useEffect(() => {
    if (productoId) {
      toast.info('Cargando datos del producto para edición...'); 
      getProductoById(productoId)
        .then(res => {
          // Si el producto se carga, actualizo el estado del formulario con sus datos.
          setFormData(res.data);
          toast.success('Datos del producto cargados.'); 
        })
        .catch(err => {
          console.error("Error al cargar producto para edición:", err);
          toast.error('Error al cargar datos del producto para edición.'); 
        });
    }
  }, [productoId]); // Este efecto se ejecuta cada vez que cambia el productoId.


  // Manejador de cambios para los inputs del formulario.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpio el error asociado a ese campo cuando el usuario lo modifica.
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  };

  // Manejador especial para el cambio de categoría.
  // Cuando se cambia la categoría, también reseteo la subcategoría para evitar inconsistencias.
  const handleCategoryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      categoria: e.target.value,
      subcategoria: '' // Reinicio la subcategoría al cambiar la categoría principal
    }));
    setErrors(prev => ({
      ...prev,
      categoria: undefined,
      subcategoria: undefined
    }));
  };


  // Función para validar el formulario antes de enviar.
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
    // Añado validación para categoría y subcategoría
    if (!formData.categoria.trim()) {
      newErrors.categoria = 'La categoría es obligatoria.';
    }
    if (subcategoriasParaCategoria.length > 0 && !formData.subcategoria.trim()) {
      newErrors.subcategoria = 'La subcategoría es obligatoria para esta categoría.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejador del envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evito el comportamiento por defecto del formulario.

    if (!validateForm()) {
      toast.error('Por favor, corrige los errores del formulario.'); 
      return;
    }

    setSubmitting(true); // Indico que el formulario se está enviando.
    toast.info('Guardando producto...');

    try {
      if (productoId) {
        // Si hay un productoId, estoy editando.
        await putProducto(productoId, formData);
        toast.success('Producto actualizado con éxito!'); 
      } else {
        // Si no hay productoId, estoy creando uno nuevo.
        await postProducto(formData);
        toast.success('Producto agregado con éxito!');
        // Limpio el formulario después de agregar un producto nuevo.
        setFormData({
          nombre: '',
          descripcion: '',
          precio: '',
          imagen: '',
          categoria: '',
          subcategoria: ''
        });
      }
      // Llamo a la función onSuccess que me pasaron por props (por ejemplo, para recargar la lista de productos).
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error(`Error: ${error.response?.data?.message || 'No se pudo guardar el producto.'}`);
    } finally {
      setSubmitting(false); // Indico que el envío ha terminado.
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">{productoId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo Nombre del Producto */}
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
            aria-describedby="nombreHelp" // Para accesibilidad
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
          <div id="nombreHelp" className="form-text">Ej: Colchón 2 Plazas Resortes</div>
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
            aria-describedby="descripcionHelp"
          ></textarea>
          {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
          <div id="descripcionHelp" className="form-text">Mínimo 10 caracteres.</div>
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
            aria-describedby="precioHelp"
          />
          {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
          <div id="precioHelp" className="form-text">Debe ser un número mayor a 0.</div>
        </div>

        {/* Campo URL de la Imagen */}
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">URL de la Imagen (Cloudinary/pública)</label>
          <input
            type="url"
            className={`form-control ${errors.imagen ? 'is-invalid' : ''}`}
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            disabled={submitting}
            aria-describedby="imagenHelp"
          />
          {errors.imagen && <div className="invalid-feedback">{errors.imagen}</div>}
          <div id="imagenHelp" className="form-text">Pega aquí la URL de tu imagen (ej. de Cloudinary).</div>
        </div>

        {/* Campo Categoría (Select/Desplegable) */}
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            className={`form-select ${errors.categoria ? 'is-invalid' : ''}`}
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleCategoryChange} // Usamos el manejador específico
            disabled={submitting}
            aria-describedby="categoriaHelp"
          >
            <option value="">Selecciona una categoría</option>
            {categoriasDisponibles.map((cat) => (
              <option key={cat.nombre} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
          {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
          <div id="categoriaHelp" className="form-text">Elige la categoría principal del producto.</div>
        </div>

        {/* Campo Subcategoría (Select/Desplegable, aparece solo si hay una categoría seleccionada con subcategorías) */}
        {subcategoriasParaCategoria.length > 0 && (
          <div className="mb-3">
            <label htmlFor="subcategoria" className="form-label">Subcategoría</label>
            <select
              className={`form-select ${errors.subcategoria ? 'is-invalid' : ''}`}
              id="subcategoria"
              name="subcategoria"
              value={formData.subcategoria}
              onChange={handleChange}
              disabled={submitting}
              aria-describedby="subcategoriaHelp"
            >
              <option value="">Selecciona una subcategoría</option>
              {subcategoriasParaCategoria.map((subcat) => (
                <option key={subcat.value} value={subcat.value}>
                  {subcat.display}
                </option>
              ))}
            </select>
            {errors.subcategoria && <div className="invalid-feedback">{errors.subcategoria}</div>}
            <div id="subcategoriaHelp" className="form-text">Selecciona una subcategoría específica.</div>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
          {submitting ? 'Guardando...' : (productoId ? 'Actualizar Producto' : 'Agregar Producto')}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;