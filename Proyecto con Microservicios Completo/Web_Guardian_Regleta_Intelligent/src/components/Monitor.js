// src/components/Monitor.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import { CircularProgressbar } from 'react-circular-progressbar';  
import 'react-circular-progressbar/dist/styles.css';  


const Monitor = () => {
  const [energyData, setEnergyData] = useState(null);

  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        const response = await axios.get('/energy/monitor');
        setEnergyData(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchEnergyData(); // Llamada inicial para obtener datos
      // Intervalo de actualización cada 2 segundos
    const interval = setInterval(fetchEnergyData, 2000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);
 // Función para calcular el porcentaje del círculo de progreso
  const calculatePercentage = (value, max) => {
    return Math.min((value / max) * 100, 100); // Asegura que no sea más de 100%
  };
  return (
    <div className="monitor-container">
      <h2>Monitoreo de Energía</h2>
      {energyData ? (
        <div className='progress-row'>
          {/* Contenedor de Voltaje */}
          <div className="circular-progress-container">
            <CircularProgressbar
              value={calculatePercentage(energyData.voltage, 240)} // Asumimos que 240V es el máximo
              text={`${energyData.voltage} V`}
              circleRatio={0.5}
              styles={{
                path: { stroke: '#f1c40f', 
                        transform: 'rotate(0.75turn)',
                        transformOrigin: 'center',},
                trail:{ stroke: '#d6d6d6',
                        transform: 'rotate(0.75turn)',
                        transformOrigin: 'center',},
                text: { fill: '#7f8c8d', 
                        fontSize: '16px' },
              }}
            />
            <div class="card">
              <i class="fas fa-bolt icon"></i>
                <div class="label">Voltaje</div>
            </div>
          </div>

          {/* Contenedor de Corriente */}
          <div className="circular-progress-container">
            <CircularProgressbar
              value={calculatePercentage(energyData.current, 10)} // Asumimos 10A como máximo
              text={`${energyData.current} A`}
              circleRatio={0.5}
              styles={{
                path: { stroke: '#3498db',transform: 'rotate(0.75turn)',
                        transformOrigin: 'center',},
                trail:{ stroke: '#d6d6d6',
                        transform: 'rotate(0.75turn)',
                        transformOrigin: 'center',},
                text: { fill: '#7f8c8d', fontSize: '16px' },
              }}
            />
            <div class="card">
              <i class="fas fa-exchange-alt icon"></i>
                <div class="label">Corriente</div>
            </div>          
            </div>

          {/* Contenedor de Potencia */}
          <div className="circular-progress-container">
            <CircularProgressbar
              value={calculatePercentage(energyData.power, 2000)} // Asumimos 2000W como máximo
              text={`${energyData.power} W`}
              circleRatio={0.5}
              styles={{
                path: { stroke: '#e74c3c', transform: 'rotate(0.75turn)',
                        transformOrigin: 'center', },
                trail:{ stroke: '#d6d6d6',
                        transform: 'rotate(0.75turn)',
                        transformOrigin: 'center',},
                text: { fill: '#7f8c8d', fontSize: '16px' },
              }}
            />
            <div class="card">
              <i class="fas fa-plug icon"></i>
                <div class="label">Potencia</div>
            </div>          
            </div>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Monitor;
