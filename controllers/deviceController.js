//uuid будет генерировать случайные id ,чтоб они не повторялись
const uuid = require("uuid");
//получение файла и перемещение
const path = require("path");
//после того как файл перемещен,создаем сам девайс
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

//создаю для роутера контроллер
class DeviceController {
  //создание типа
  async create(req, res, next) {
    try {
      //получаем данные из тела запроса
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      //функция генерирующая id
      let fileName = uuid.v4() + ".jpg";
      //path resolve адаптирует указанный путь к оперативной системе
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      //функция создания девайса
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      //делаем проверку,есть ли инфо
      if (info) {
        //когда мы передаем данные через formData,они приходят в виде строки,поэтому марсив нужно парсить
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  //получение всех девайсов
  async getAll(req, res) {
    //limit количество девайсов отображающихся на одной странице
    let { brandId, typeId, limit, page } = req.query;
    //если brandId, typeId не указаны,будем возвращать все девайсы,а если хотя бы один из них указан,будем делать фильтрацию
    page = page || 1;
    limit = limit || 9;
    //Считаем отступ
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }
  //получение одного конкретного девайса
  async getOne(req, res) {
    //id берем из deviceRouter
    const { id } = req.params;
    const device = await Device.findOne({
      //условия поиска девайса
      where: { id },
      //получаем массив характеристик
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
