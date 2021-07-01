// В данном случае этот индекс будет объединять все routers, как связующее звено

//Создаем основной роутер нашего приложения ,получаем его мы из express
const Router = require("express");
//создаем объект этого роутера
const router = new Router();
const deviceController = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRoleMiddleware");
//будет создавать бренд

router.post("/", deviceController.create);

// ,будет получать все бренды
router.get("/", deviceController.getAll);

// ПОлучаем отдельно взятый девайс
router.get("/:id", deviceController.getOne);

module.exports = router;
