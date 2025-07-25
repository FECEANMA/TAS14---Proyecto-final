// src/App.js
import React, { useState, useEffect } from 'react';
import Monitor from './components/Monitor';
import OverloadHistory from './components/OverloadHistory';
import './App.css'; // Importing CSS for styling
import { FaTachometerAlt, FaHistory, FaUserCircle, FaLightbulb, FaBell } from 'react-icons/fa'; // Icons for navigation
import Settings from './components/Settings'; 
import Login from './components/Login';
import Register from './components/Register';
import NotificationPanel from './components/NotificationPanel';
import DevicesInfo from './components/DevicesInfo'; // Importamos el nuevo componente


const App = () => {
  const [activeTab, setActiveTab] = useState('monitor');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  useEffect(() => {
  // Forzar logout en cada inicio
  localStorage.removeItem('token');
  setIsAuthenticated(false);
  setUsername('');
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setActiveTab('monitor'); 
    setUsername('');
  };
  
   if (!isAuthenticated) {
    return showRegister ? (
      <div className="App">
        <Register />
        <button className='regislogin-button' onClick={() => setShowRegister(false)}>¿Ya tienes cuenta? Inicia sesión</button>
      </div>
    ) : (
      <div className="App">
        <Login onLogin={() => {
  const token = localStorage.getItem('token');
  setIsAuthenticated(true);
  const payload = JSON.parse(atob(token.split('.')[1]));
  setUsername(payload.username); 
  setActiveTab('monitor'); 
}} />
        <button className='regislogin-button' onClick={() => setShowRegister(true)}>¿No tienes Cuenta? Registrate, es Gratis</button>
      </div>
    );
  }
  

  return (
    <div className="App">
      <header className="App-header">
  <div className="header-left">
    <FaUserCircle size={24} style={{ marginRight: '8px' }} />
    <span>{username}</span>
  </div>

  <h1>SmartView Energy</h1>

  <div className="header-right">
    <button className="icon-button" onClick={() => setShowNotifications(!showNotifications)}>
      <FaBell />
    </button>
{showNotifications && (
  <NotificationPanel
    onClose={() => setShowNotifications(false)}
    onNavigateToHistory={() => setActiveTab('history')}
  />
)}
    <button className="icon-button" onClick={() => setActiveTab('devices')}>
            <FaLightbulb />
          </button>
  </div>
</header>

      <main className="App-main">
  {activeTab === 'monitor' && <Monitor />}
  {activeTab === 'history' && <OverloadHistory />}
  {activeTab === 'settings' && <Settings onLogout={handleLogout} />}
   {activeTab === 'devices' && <DevicesInfo />} 
</main>

      <nav className="App-nav">
        <button
          className={activeTab === 'monitor' ? 'active' : ''}
          onClick={() => setActiveTab('monitor')}
        >
          <FaTachometerAlt /> Monitoreo
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory /> Historial
        </button>
      </nav>
    </div>
  );
};

export default App;
