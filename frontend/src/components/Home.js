import React, { useEffect, useState } from 'react';
import './Home.css';
import weld1 from '../assets/V1.jpg';
import weld2 from '../assets/V2.jpg';

function Home() {
  const images = [weld1, weld2];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="home-container" 
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      <div className="home-overlay">
        <h1 className="home-title">Sean Varilec</h1>
        <p className="home-subtitle">Storitve po meri – zanesljivo in kakovostno.</p>
        <a href="#contact" className="home-button">Kontaktiraj nas</a>
      </div>
    </div>
  );
}

export default Home;
