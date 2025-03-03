"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, Sequelize.DataTypes);
db.Role = require("./role")(sequelize, Sequelize.DataTypes);
db.Permission = require("./permission")(sequelize, Sequelize.DataTypes);
db.RolePermission = require("./rolepermission")(sequelize, Sequelize.DataTypes);
db.ApplicationConfiguration = require("./applicationconfiguration")(
  sequelize,
  Sequelize.DataTypes
);
db.FAQ = require("./faq")(sequelize, Sequelize.DataTypes);
db.CMS = require("./cms")(sequelize, Sequelize.DataTypes);
db.EmailTemplate = require("./emailtemplate")(sequelize, Sequelize.DataTypes);
db.AuditLog = require("./auditlog")(sequelize, Sequelize.DataTypes);
db.ErrorLog = require("./errorlog.js")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection successful");
  } catch (error) {
    console.log("DB error", error);
  }
})();

module.exports = db;
