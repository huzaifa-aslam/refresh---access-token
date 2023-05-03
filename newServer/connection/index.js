const Sequelize = require("sequelize");

const sequelize = new Sequelize("todo-app", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});
// db.user.sync({ force: true }).then(() => console.log("synced"));

module.exports = sequelize;
