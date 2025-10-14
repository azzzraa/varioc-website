// src/components/Services.js
import React from "react";
import { motion } from "framer-motion";
import { Hammer, Wrench, ShieldCheck } from "lucide-react";
import "./Services.css";

// import your service images
import weld1 from "../assets/V1.jpg";
import weld4 from "../assets/V4.jpg";
import weld3 from "../assets/V3.jpg";

function Services() {
  const services = [
    {
      title: "Varjenje",
      desc: "Kakovostno varjenje kovinskih delov po meri.",
      img: weld1,
      icon: <Hammer size={24} color="#ffb347" />,
    },
    {
      title: "Popravila",
      desc: "Popravilo kovinskih konstrukcij in manjših naprav.",
      img: weld4,
      icon: <Wrench size={24} color="#ffb347" />,
    },
    {
      title: "Konstrukcije",
      desc: "Izdelava kovinskih konstrukcij po naročilu.",
      img: weld3,
      icon: <ShieldCheck size={24} color="#ffb347" />,
    },
  ];

  return (
    <section id="services" className="services-section">
      <h2 className="services-title">Naše storitve</h2>
      <div className="services-grid">
        {services.map((s, index) => (
          <motion.div
            key={index}
            className="service-card"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={s.img} alt={s.title} className="service-image" />
            <div className="service-content">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Services;

