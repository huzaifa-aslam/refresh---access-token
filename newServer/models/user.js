const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const tUser = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  return tUser;
};
