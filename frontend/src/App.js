import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon, Info, Settings, Mail, Hammer, ClipboardList } from "lucide-react";
import "./App.css";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AdminMessages from "./components/AdminMessages";
import LatestNews from "./components/LatestNews";
import AdminNews from "./components/AdminNews";


function App() {
useEffect(() => {
  const header = document.querySelector(".header");
  if (!header) return; 
  const onScroll = () => {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);


  return (
    <Router>
      <Routes>

        {/* PUBLIC MAIN WEBSITE */}
        <Route
          path="/"
          element={
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
                      <a href="#faq"><ClipboardList size={18} /> FAQ</a>
                      {/* TEMPORARY ADMIN ACCESS LINK (CAN REMOVE LATER) */}
              
                      {localStorage.getItem("isAdmin") === "true" && (
  <a href="/admin" style={{ color: "red" }}>Admin</a>
)}

                    </nav>
                  </div>
                </motion.div>
              </header>

              <Home />

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
                    Samostojni podjetnik, specializiran za kovinske konstrukcije,
                    popravila in izdelavo po meri. S strokovnim pristopom zagotavljamo
                    kakovostne rešitve, ki trajajo.
                  </p>
                </motion.div>
              </section>

              <Services />
              <FAQ />
              <Contact />
              <LatestNews />
              <Footer />
            </div>
          }
        />

        {/* SEPARATE ADMIN PAGE */}
        <Route path="/login" element={<Login />} />
  <Route
    path="/admin"
    element={
      localStorage.getItem("isAdmin") === "true"
        ? <AdminMessages />
        : <Login />
    }
    />
<Route
  path="/admin/news"
  element={
    localStorage.getItem("isAdmin") === "true"
      ? <AdminNews />
      : <Login />
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
