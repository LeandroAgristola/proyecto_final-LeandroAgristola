import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from 'styled-components';

const StyledLoginForm = styled.div`
  max-width: 500px;
  margin: 50px auto 50px auto;
  padding: 3rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  background-color: white;

  h2 {
    color: #343a40;
    margin-bottom: 2rem;
  }

  .form-label {
    color: #495057;
  }

  .form-control {
    &:focus {
      border-color: #555;
      box-shadow: 0 0 0 0.25rem rgba(85, 85, 85, 0.25);
    }
  }

  .password-input-group {
    position: relative;

    .form-control {
      padding-right: 55px;
    }
  }

  .btn-primary {
    background-color: #343a40;
    border-color: #343a40;
    color: white;
    &:hover {
      background-color: #555;
      border-color: #555;
    }
  }

  .password-toggle-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6c757d;

    /* NUEVO INTENTO PARA CENTRADO VERTICAL: Uso Flexbox para el SPAN que contiene el ícono */
    display: flex; /* Convierto el span en un contenedor flex. */
    align-items: center; /* Alineo verticalmente el ícono dentro del span. */
    height: 100%; /* Hago que el span ocupe toda la altura de su padre relativo para un cálculo de 50% más preciso. */


    &:hover {
      color: #343a40;
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledLoginForm className="container py-5">
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
        <div className="mb-3 password-input-group ">
          <label htmlFor="passwordInput" className="form-label">Contraseña</label>
          <div className="aling-items-center position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control" id="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-dark w-100">Ingresar</button>
      </form>
    </StyledLoginForm>
  );
}

export default Login;