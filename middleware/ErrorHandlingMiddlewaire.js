const ApiError = require("../error/ApiError");

//midlewaire(принимает в себя ошибку,запрос и функцию next,вызывав которую я передам управление следующему в цепочке midlewaire)
module.exports = function (err, req, res, next) {
  //проверяю,если класс ошибки ApiError, то тогда на клиент возвращаю ответ со статус кодом,получаймым из ошибки сообщением в котором
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  //на случай,если сюда попала ошибка,которая не явл. instanceof, то выведится след.
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
