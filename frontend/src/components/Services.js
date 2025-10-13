import React from 'react';
import './Services.css';

function Services() {
  return (
    <div className="services-container">
      <h1>Naše storitve</h1>
      <div className="services-grid">
        <div className="service-card">
          <h2>Varjenje</h2>
          <p>Kakovostno varjenje kovinskih delov po meri.</p>
        </div>
        <div className="service-card">
          <h2>Popravila</h2>
          <p>Popravilo kovinskih konstrukcij in manjših naprav.</p>
        </div>
        <div className="service-card">
          <h2>Konstrukcije</h2>
          <p>Izdelava manjših kovinskih konstrukcij po naročilu.</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
