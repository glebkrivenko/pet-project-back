const jwt = require("jsonwebtoken");

//Если токен не валидный,будет возвращаться ошибка о том,что пользователь не авторизирован

module.exports = function (req, res, next) {
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
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Пользователь не авторизован" });
  }
};
