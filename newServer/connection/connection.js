const sequelize = require("./");
const userModel = require("./../models/user");
const db = {};
db.sequelize = sequelize;
db.user = userModel(sequelize);
module.exports = db;
