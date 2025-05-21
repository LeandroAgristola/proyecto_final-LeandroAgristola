import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(() => {
    try {
      const storedUser = localStorage.getItem('usuario');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  });


  useEffect(() => {
    try {
      if (usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
      } else {
        localStorage.removeItem('usuario');
      }
    } catch (error) {
      console.error("Error saving user to localStorage", error);
    }
  }, [usuario]);

  const login = (nombreUsuario) => {
    setUsuario({ nombre: nombreUsuario });
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}