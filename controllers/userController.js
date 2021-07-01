const ApiError = require("../error/ApiError");

//хеширование паролей
const bcrypt = require("bcrypt");
//токен
const jwt = require("jsonwebtoken");

//модель пользователя и корзины
const { User, Basket } = require("../models/models");

//Роль
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
//создаю для роутера контроллер
class UserController {
  //регистрация
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    //Проверка на заполнение полей
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    //проверка существует пользователь в системы или нет
    const candidate = await User.findOne({ where: { email } });
    //проверка,если пользователь вернулся не пустой
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    //TЕсли же такого пользователя не было найдено,то можно хешировать пароль и создать нового пользователя
    const hashPassword = await bcrypt.hash(password, 5);
    //Создание пользователя
    const user = await User.create({ email, role, password: hashPassword });
    //Создание корзину пользователя
    const basket = await Basket.create({ userId: user.id });
    //генерация json web токена
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  //логин
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    //проверка,если пользователь не наден выдает ошибку
    if (!user) {
      return next(ApiError.internal("Пользователь с таким именем не найден"));
    }
    //проверка введеного пароля пользователем с паролем лежащим в базе данных
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  //проверяет авторизирован пользователь или нет
  async check(req, res, next) {
    //будет генерировать новый токен и отправлять его на клиент(если пользователь постоянно использует свой аккаунт,токен будет перезаписываться)
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
