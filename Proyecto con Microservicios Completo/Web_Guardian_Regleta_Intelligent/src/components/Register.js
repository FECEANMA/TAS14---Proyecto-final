// src/components/Register.js
import React, { useState } from 'react';
import axios from './axiosConfig';
import Toast from './Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [showRepeatPassword, setShowRepeatPassword] = useState(false); 
  const [toast, setToast] = useState(null);


  const isValidEmail = (email) => {
  const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const domain = parts[1].toLowerCase();
  return allowedDomains.includes(domain);
};

  const handleRegister = async () => {
    if (!username || !password || !repeatPassword || !email) {
      setToast({ message: 'Todos los campos son obligatorios', type: 'error' });
  return;
}

if (password.length < 6) {
      setToast({ message: 'La contraseña debe tener al menos 6 caracteres', type: 'error' });
  return;
}

    if (password !== repeatPassword) {
      setToast({ message: 'Las contraseñas no coinciden', type: 'error' });
      return;
    }

    if (!isValidEmail(email)) {
      setToast({ message: 'El correo debe ser @gmail.com, @hotmail.com, @outlook.com o similar', type: 'error' });
    return;
  }

    try {
      await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      setToast({ message: 'Registro exitoso. Ya puedes iniciar sesión.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Error al registrar: ' + (err.response?.data?.message || 'Error desconocido'), type: 'error' });
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo101.png" alt="Logo" className="app-logo" />
      <h2>Register</h2>
      <input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div style={{ position: 'relative' }}>
        <input
          placeholder="Contraseña"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: 'gray',
          }}
        />
      </div>
      <div style={{ position: 'relative' }}>
        <input
          placeholder="Repetir Contraseña"
          type={showRepeatPassword ? 'text' : 'password'}
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showRepeatPassword ? faEyeSlash : faEye}
          onClick={() => setShowRepeatPassword(!showRepeatPassword)}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: 'gray',
          }}
        />
      </div>
      <button onClick={handleRegister}>Registrarse</button>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Register;
