import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const itemExistente = prev.find((item) => item.id === producto.id);
      if (itemExistente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const disminuirCantidad = (productoId) => {
    setCarrito((prev) => {
      const itemExistente = prev.find((item) => item.id === productoId);
      if (itemExistente.cantidad === 1) {
        return prev.filter((item) => item.id !== productoId);
      } else {
        return prev.map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        );
      }
    });
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider 
      value={{ carrito, agregarAlCarrito, disminuirCantidad, vaciarCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}