// backend/faqModel.js
import { DataTypes } from "sequelize";
import sequelize from "./db.js";

// Sequelize model for FAQs
const Faq = sequelize.define("Faq", {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Faq;
