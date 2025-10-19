import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Create SQLite connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "database.sqlite"),
});

// ✅ Optional: Contact model (for contact form)
export const Contact = sequelize.define(
  "Contact",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: true }
);

// ✅ Export the database connection
export default sequelize;
