// В данном случае этот индекс будет объединять все routers, как связующее звено

//Создаем основной роутер нашего приложения ,получаем его мы из express
const Router = require("express");
//создаем объект этого роутера
const router = new Router();

const brandController = require("../controllers/brandController");
//будет создавать бренд
router.post("/", brandController.create);

// ,будет получать все бренды
router.get("/", brandController.getAll);

module.exports = router;
