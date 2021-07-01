//Создаем струкрутуру приложения
require("dotenv").config();
//С помощью require импортирую модули в файл
const express = require("express");

// Импортирую объект с конфигурациями их файла db
const sequelize = require("./db");

//Выгружаю все в базу данных
const models = require("./models/models.js");

//настраиваю cors чтоб мы могли отправлять запросы с браузера
const cors = require("cors");

const fileUpload = require("express-fileupload");

//Здесь я сообщаю серверу о всех маршрутах
const router = require("./routes/index.js");

//регистрирую midleware
const errorHandler = require("./middleware/ErrorHandlingMiddlewaire");
const path = require("path");
//порт на котором мое приложение будет работать,получаю из переменных окружений
const PORT = process.env.PORT || 3000;

//Создаю объект, с которого будет начинаться запуск приложения
const app = express();
app.use(cors());

//создаю функцию для того,чтоб мое приложение могло парсить json формат
app.use(express.json());
//указываем серверу, что файлы из static необходимо раздавать как static,чтоб мы могли их получать
app.use(express.static(path.resolve(__dirname, "static")));
//указываю url по которому роутер должен обрабатываться ,
app.use(fileUpload({}));

app.use("/api", router);
//регистрация midleware с ошибками(должна быть в самом конце)
//последний midleware
app.use(errorHandler);

//создаю функцию для подключения к базе данных(все операции с базой данных явл. ассинхронными)
const start = async () => {
  try {
    //c помощью функции authenticate() будет устанавливаться подключение к базе данных
    await sequelize.authenticate();
    //эта функция будет сверять состояние базы данных с со схемой данных
    await sequelize.sync();
    //вызываю функцию listen которая указывает какой порт должен прослушивать наш сервер
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
