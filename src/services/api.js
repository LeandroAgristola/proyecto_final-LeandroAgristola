import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://6812a437129f6313e20f2315.mockapi.io'
});

export const getProductos = () => apiClient.get('/productos');

export const getProductoById = (id) => apiClient.get(`/productos/${id}`);