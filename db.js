//Подключение к базе данных

const { Sequelize } = require("sequelize");

//Здесь передаем пользователя под которым будем заходить
module.exports = new Sequelize(
  process.env.DB_NAME, //название БД,
  process.env.DB_USER, //Пользователь
  process.env.DB_PASSWORD, //Пароль
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
