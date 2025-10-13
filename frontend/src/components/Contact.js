import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  console.log("Contact component loaded");

  const handleSubmit = (e) => {
    e.preventDefault(); 
   
    fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from backend:", data);
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="contact-container">
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Ime"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Sporočilo"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Pošlji</button>
        </form>
      ) : (
        <p className="thank-you">Hvala! Vaše sporočilo je bilo poslano.</p>
      )}
    </div>
  );
}

export default Contact;
