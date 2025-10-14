// faqModel.js
import { DataTypes } from "sequelize";
import sequelize from "./db.js";

// Define a simple FAQ model
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
