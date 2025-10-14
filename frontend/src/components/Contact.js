import React, { useState } from "react";
import "./Contact.css";
import { Mail } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", type: "", message: "" });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">
          <Mail size={28} /> Kontakt & Povpraševanje
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Ime in priimek"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-pošta"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Sporočilo"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="contact-btn">Pošlji</button>
          </form>
        ) : (
          <p className="thank-you">Hvala! Vaše sporočilo je bilo poslano.</p>
        )}
      </div>
    </section>
  );
}

export default Contact;
