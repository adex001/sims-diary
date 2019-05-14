"use strict";
import bcrypt from "bcrypt";

const encryptPassword = async function(password) {
  const saltRound = Math.floor(Math.random() * 5);
  const salt = await bcrypt.genSaltSync(saltRound);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  return hashedPassword;
};
const checkPassword = async function(myPassword) {
  const data = await bcrypt.compareSync(myPassword, this.password);
  return data;
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
