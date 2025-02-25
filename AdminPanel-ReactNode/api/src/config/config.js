require('dotenv').config();
const {env} = require('node:process');

const dbconfig = {
  "development": {
    "username": env.sequelize_db_dev_username,
    "password": env.sequelize_db_dev_password,
    "database": env.sequelize_db_dev_database,
    "host": env.sequelize_db_dev_host,
    "dialect": env.sequelize_db_dev_dialect
  },
  "test": {
    "username": env.sequelize_db_test_username,
    "password": env.sequelize_db_test_password,
    "database": env.sequelize_db_test_database,
    "host": env.sequelize_db_test_host,
    "dialect": env.sequelize_db_test_dialect
  },
  "production": {
    "username": env.sequelize_db_prod_username,
    "password": env.sequelize_db_prod_password,
    "database": env.sequelize_db_prod_database,
    "host": env.sequelize_db_prod_host,
    "dialect": env.sequelize_db_prod_dialect
  }
};

module.exports = dbconfig;