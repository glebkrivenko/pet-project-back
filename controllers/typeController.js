//добавление в базу данных объектов
const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

//создаю для роутера контроллер
class TypeController {
  //создание типа
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }
  //получение
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
}

module.exports = new TypeController();
