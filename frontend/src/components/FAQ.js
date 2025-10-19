import React, { useEffect, useState } from "react";
import "./FAQ.css";
import { FaChevronDown } from "react-icons/fa";

function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/faqs")
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error("Error fetching FAQs:", err));
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Pogosta vprašanja</h2>
        <div className="faq-list">
          {faqs.length === 0 ? (
            <p className="no-faqs">Ni še dodanih vprašanj.</p>
          ) : (
            faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <FaChevronDown
                    className={`faq-icon ${openIndex === index ? "open" : ""}`}
                  />
                </button>
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Faq;
