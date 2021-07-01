//проверка кто добавляет новый товар,это может сделать только администратор

const jwt = require("jsonwebtoken");

//Если токен не валидный,будет возвращаться ошибка о том,что пользователь не авторизирован

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; //Bearer fdfdfdfdfdfd
      if (!token) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
      }
      //проверка токена на валидность
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "Пользователь не авторизован" });
    }
  };
};
