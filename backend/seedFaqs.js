// backend/seedFaqs.js
import sequelize from "./db.js";
import Faq from "./faqModel.js";

const seedFaqs = async () => {
  try {
    await sequelize.sync();

    // Example FAQs (you can change or add more)
    const faqs = [
      {
        question: "Kaj je varjenje?",
        answer: "Varjenje je postopek spajanja kovin z uporabo toplote ali tlaka za ustvarjanje trdnega spoja.",
      },
      {
        question: "Katere vrste varjenja obstajajo?",
        answer: "Najpogostejše vrste varjenja so MIG/MAG, TIG in obločno varjenje z oplaščenimi elektrodami.",
      },
      {
        question: "Ali ponujate mobilne storitve varjenja?",
        answer: "Da, nudimo mobilno varjenje na terenu za kovinske konstrukcije in popravila.",
      },
      {
        question: "Ali izvajate varjenje aluminija?",
        answer: "Da, specializirani smo tudi za varjenje aluminija z uporabo TIG postopka.",
      },
      {
        question: "Kako lahko zahtevam ponudbo?",
        answer: "Uporabite kontaktni obrazec na naši spletni strani ali nas pokličite neposredno.",
      },
    ];

    // Clear old data (optional)
    await Faq.destroy({ where: {} });

    // Insert new ones
    await Faq.bulkCreate(faqs);

    console.log("✅ FAQs successfully seeded!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding FAQs:", err);
    process.exit(1);
  }
};

seedFaqs();
