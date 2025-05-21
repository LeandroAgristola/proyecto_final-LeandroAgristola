import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) { 
      const nombreUsuario = email.split('@')[0];
      login(nombreUsuario);
      navigate(from, { replace: true }); 
    } else {
      alert("Por favor, ingresa email y contraseña (simulados)");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;