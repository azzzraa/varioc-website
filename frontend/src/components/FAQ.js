import React, { useState } from "react";
import "./FAQ.css";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Katere vrste varjenja ponujate?",
    answer:
      "Ponujamo MIG, MAG in TIG varjenje različnih kovin, kot so jeklo, inox in aluminij. Vsako delo izvedemo natančno in profesionalno.",
  },
  {
    question: "Ali nudite terenske storitve?",
    answer:
      "Da, po dogovoru izvajamo varjenje in popravila tudi na lokaciji stranke, z vso potrebno opremo.",
  },
  {
    question: "Kako hitro lahko izvedete storitev?",
    answer:
      "Čas izvedbe je odvisen od zahtevnosti projekta, vendar se trudimo vse dokončati v nekaj dneh.",
  },
  {
    question: "Ali nudite brezplačno ponudbo?",
    answer:
      "Seveda! Pošljite nam osnovne podatke o projektu in pripravili bomo neobvezujočo ponudbo.",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">
          <HelpCircle size={28} /> Pogosta vprašanja
        </h2>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <ChevronDown
                  className={`faq-icon ${
                    activeIndex === index ? "open" : ""
                  }`}
                  size={20}
                />
              </button>

              <motion.div
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
