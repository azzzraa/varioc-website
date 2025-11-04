import { Sequelize, DataTypes } from "sequelize";
import path from "path";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join("database.sqlite"),
});

export const Contact = sequelize.define("Contact", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

export default sequelize;
