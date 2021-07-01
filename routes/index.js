// В данном случае этот индекс будет объединять все routers, как связующее звено

//Создаем основной роутер нашего приложения ,получаем его мы из express
const Router = require("express");
//создаем объект этого роутера
const router = new Router();
//все routers импортирую сюда
const deviceRouter = require("./deviceRouter");
const userRouter = require("./userRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
//Так как остальные файлы будут явл. подроутерами,я в осном роутере это укажу
//Так же сопоставляю маршруты,котоорые я указал с соотвествующим роутером
router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

module.exports = router;
