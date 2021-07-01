// В данном случае этот индекс будет объединять все routers, как связующее звено

//Создаем основной роутер нашего приложения ,получаем его мы из express
const Router = require("express");
//создаем объект этого роутера
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

//регистрация
router.post("/registration", userController.registration);

// авторизация
router.post("/login", userController.login);

//С помощью Get буду определять авторизован пользователь или нет, это будет делать с помощью jwt токена
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
