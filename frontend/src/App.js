import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Home as HomeIcon, Info, Settings, Mail, Hammer, Wrench, ShieldCheck } from "lucide-react";
import "./App.css";

// Import components
import Home from "./components/Home";

// Services images
import V1 from "./assets/V1.jpg";
import V2 from "./assets/V2.jpg";
import V3 from "./assets/V3.jpg";
import V4 from "./assets/V4.jpg";

function App() {
  // Scroll effect for header (optional)
  useEffect(() => {
    const header = document.querySelector(".header");
    const onScroll = () => {
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const services = [
    { img: V1, title: "TIG/MIG Varjenje", desc: "Precizno varjenje kovinskih delov z modernimi tehnikami za popolne spoje.", icon: <Hammer size={32}/> },
    { img: V2, title: "Kovinske Konstrukcije", desc: "Izdelava kakovostnih konstrukcij za industrijske in zasebne objekte.", icon: <Wrench size={32}/> },
    { img: V3, title: "Popravila in Predelave", desc: "Obnova, ojačitev in predelava poškodovanih kovinskih elementov.", icon: <ShieldCheck size={32}/> },
    { img: V4, title: "Mobilne Storitve", desc: "Varjenje in popravila na terenu z lastno opremo.", icon: <Hammer size={32}/> },
  ];

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <motion.div
          className="header-glass"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container header-inner">
            <div className="logo">
              <Hammer size={24} color="#bbb8b8ff" style={{ marginRight: '8px' }} />
              <span style={{ color: '#bbb8b8ff', fontWeight: 'bold' }}>Sean Varilec</span>
            </div>
            <nav>
              <a href="#home"><HomeIcon size={18} /> Domov</a>
              <a href="#about"><Info size={18} /> O nas</a>
              <a href="#services"><Settings size={18} /> Storitve</a>
              <a href="#contact"><Mail size={18} /> Kontakt</a>
            </nav>
          </div>
        </motion.div>
      </header>

      {/* HERO / HOME SECTION */}
      <Home />

      {/* ABOUT */}
      <section id="about" className="about">
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2>O nas</h2>
          <p>
            Varioc je samostojni podjetnik, specializiran za kovinske konstrukcije,
            popravila in izdelavo po meri. S strokovnim pristopom zagotavljamo
            kakovostne rešitve, ki trajajo.
          </p>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services">
        <div className="container">
          <h2>Storitve</h2>
          <div className="grid">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="card"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={service.img} alt={service.title} />
                <div className="card-content">
                  <div className="icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Kontakt</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submission test — backend next!");
            }}
          >
            <input type="text" placeholder="Ime in priimek" required />
            <input type="email" placeholder="E-pošta" required />
            <textarea placeholder="Vaše sporočilo" required></textarea>
            <button type="submit" className="btn">Pošlji</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Varioc Welding | Vse pravice pridržane</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
