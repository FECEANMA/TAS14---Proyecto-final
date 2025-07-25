// src/components/DevicesInfo.js
import React from 'react';
import './DevicesInfo.css';

const devices = [
  {
    image: 'https://definicion.de/wp-content/uploads/2010/02/television.png', // Reemplaza por la URL de la imagen del televisor
    name: 'Televisor',
    specifications: {
      voltage: '220V',
      current: '1.5A',
      power: '300W',
    },
    recommendations: 'Asegúrate de conectar el televisor a un enchufe adecuado para evitar sobrecargas.'
  },
  {
    image: 'https://s3.us-east-2.amazonaws.com/ccp-prd-s3-uploads/2019/3/12/41bcf90e04ce562a9006bbcf07f77c3197121c4e.jpeg', // Reemplaza por la URL de la imagen de la consola
    name: 'Consola',
    specifications: {
      voltage: '110V',
      current: '2A',
      power: '200W',
    },
    recommendations: 'Es recomendable usar un estabilizador de corriente para evitar daños a la consola.'
  },
  {
    image: 'https://www.artefacta.com/media/catalog/product/1/3/133076_microondas_iwafclnau2xnkzf2.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1040&width=1040&canvas=1040:1040', // Reemplaza por la URL de la imagen del microondas
    name: 'Microondas',
    specifications: {
      voltage: '220V',
      current: '4A',
      power: '1000W',
    },
    recommendations: 'No conectes otros dispositivos de alto consumo junto al microondas.'
  }
];

const DevicesInfo = () => {
  return (
    <div className="devices-info">
      {devices.map((device, index) => (
        <div key={index} className="device-card">
          <img src={device.image} alt={device.name} className="device-image" />
          <h3>{device.name}</h3>
          <div className="specifications">
            <p><strong>Voltaje:</strong> {device.specifications.voltage}</p>
            <p><strong>Corriente:</strong> {device.specifications.current}</p>
            <p><strong>Potencia:</strong> {device.specifications.power}</p>
          </div>
          <p className="recommendations"><strong>Recomendación:</strong> {device.recommendations}</p>
        </div>
      ))}
    </div>
  );
};

export default DevicesInfo;
