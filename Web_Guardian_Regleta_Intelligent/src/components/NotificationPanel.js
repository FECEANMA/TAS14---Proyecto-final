// src/components/NotificationPanel.js
import React, { useEffect, useState, useRef } from 'react';
import axios from './axiosConfig';
import { FaExclamationTriangle } from 'react-icons/fa';
import './NotificationPanel.css';

const NotificationPanel = ({ onClose, onNavigateToHistory}) => {
  const [notifications, setNotifications] = useState([]);
  const panelRef = useRef();

  const handleNavigate = () => {
    onNavigateToHistory(); // Cambiar pestaña activa a 'history'
    onClose(); // Cierra el panel de notificaciones
  };

  useEffect(() => {
    const fetchRecentHistory = async () => {
      try {
        const response = await axios.get('/energy/history');
        const recent = response.data
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 3); // Mostrar últimas 3 notificaciones
        setNotifications(recent);
      } catch (err) {
        console.error('Error al cargar notificaciones:', err);
      }
    };
    fetchRecentHistory();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const timeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'hace unos segundos';
  };

  return (
    <div className="notification-panel" ref={panelRef}>
      <h4>Notificaciones</h4>
      {notifications.length === 0 ? (
        <p className="empty">Sin notificaciones recientes</p>
      ) : (
        notifications.map((n) => (
          <div className="notification-card" key={n.id}>
            <div className="icon-alert"><FaExclamationTriangle /></div>
            <div className="notif-details">
              <div className='text-content'>
              <p><strong>Voltaje:</strong> {n.voltage} V</p>
              <p><strong>Corriente:</strong> {n.current} A</p>
              <p><strong>Potencia:</strong> {n.power} W</p>
              </div>
            <div className="notif-footer">
              <span className="timestamp">{timeAgo(n.timestamp)}</span>
                </div>
            </div>
          </div>
        ))
      )}
       {/* ...notificaciones... */}
      <button className="view-all-btn" onClick={handleNavigate}>
        Ver Mas Detalles
      </button>
    </div>
  );
};

export default NotificationPanel;
