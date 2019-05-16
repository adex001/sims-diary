"use strict";
import bcrypt from "bcryptjs";

const encryptPassword = async function(password) {
  const saltRound = Math.floor(Math.random() * 5);
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};


module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: async function(user) {
          user.password = await encryptPassword(user.password);
        },
        beforeUpdate: async function(user) {
          user.password = await encryptPassword(user.password);
        }
      }
    }
  );

  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
