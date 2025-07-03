import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://6812a437129f6313e20f2315.mockapi.io'
});

export const getProductos = () => apiClient.get('/productos');

export const getProductoById = (id) => apiClient.get(`/productos/${id}`);

// NUEVAS FUNCIONES PARA EL CRUD

// Función para crear un nuevo producto (POST)
// Recibe un objeto 'productoData' con los datos del nuevo producto.
export const postProducto = (productoData) => apiClient.post('/productos', productoData);

// Función para actualizar un producto existente (PUT)
// Recibe el 'id' del producto a actualizar y 'productoData' con los datos actualizados.
export const putProducto = (id, productoData) => apiClient.put(`/productos/${id}`, productoData);

// Función para eliminar un producto (DELETE)
// Recibe el 'id' del producto a eliminar.
export const deleteProducto = (id) => apiClient.delete(`/productos/${id}`);