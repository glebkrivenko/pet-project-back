// В данном случае этот индекс будет объединять все routers, как связующее звено

//Создаем основной роутер нашего приложения ,получаем его мы из express
const Router = require("express");
//создаем объект этого роутера
const router = new Router();
const typeController = require("../controllers/typeController");
//регистрация midleware с ошибками(должна быть в самом конце)

const checkRole = require("../middleware/checkRoleMiddleware");
//будет создавать бренд
router.post("/", checkRole("ADMIN"), typeController.create);

// ,будет получать все бренды
router.get("/", typeController.getAll);

module.exports = router;
