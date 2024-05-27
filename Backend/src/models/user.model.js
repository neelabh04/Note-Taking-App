import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
import bcrypt from "bcrypt";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.beforeCreate(async (user) => {
  if (user.changed("hashed_password", true)) {
    const saltRounds = 10; // Adjust the number of salt rounds as necessary
    user.hashed_password = await bcrypt.hash(user.hashed_password, saltRounds);
  }
});


export default User;
