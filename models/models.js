const sequelize = require("../db");

// Импортируем DataTypes из sequelize c помощтю которого описываются типы того или иного поля

const { DataTypes } = require("sequelize");

//Описание первой модели пользователя

const User = sequelize.define("user", {
  //описываем типа поля,первичный ключ будет автоинкрементироваться(при создании нового объекта id будет меняться)
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // email будет уникаальным,чтоб двух пользователей с одним умэйлом не могло быть
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  //По умолчанию роль будет  user
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

//Модель корзины
const Basket = sequelize.define("basket", {
  //описываем типа поля,первичный ключ будет автоинкрементироваться(при создании нового объекта id будет меняться)
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
//модель товара в корзине
const BasketDevice = sequelize.define("basket_device", {
  //описываем типа поля,первичный ключ будет автоинкрементироваться(при создании нового объекта id будет меняться)
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//Модель устройства
const Device = sequelize.define("device", {
  //описываем типа поля,первичный ключ будет автоинкрементироваться(при создании нового объекта id будет меняться)
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

//модель типа
const Type = sequelize.define("type", {
  //описываем типа поля,первичный ключ будет автоинкрементироваться(при создании нового объекта id будет меняться)
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
// модель бренда
const Brand = sequelize.define("brand", {
  //описываем типа поля,первичный ключ будет автоинкрементироваться(при создании нового объекта id будет меняться)
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
// модель рейтинга
const Rating = sequelize.define("rating", {
  //описываем типа поля,первичный ключ будет автоинкрементироваться(при создании нового объекта id будет меняться)
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});
// модель  информации устройства
const DeviceInfo = sequelize.define("device_info", {
  //описываем типа поля,первичный ключ будет автоинкрементироваться(при создании нового объекта id будет меняться)
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

//связующая модель типа и бренда
const TypeBrend = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//Описание того,как эти модели связаны между собой

//1. Cвязь между пользователем и корзиной 1:1
User.hasOne(Basket);
Basket.belongsTo(User);
//2. Один юзер может иметь несколько оценок
User.hasMany(Rating);
Rating.belongsTo(User);
//3
Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);
//4
Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, {as:"info"});
DeviceInfo.belongsTo(Device);

//Описываю тип связей между типом и брендом(многим ко многим)

Type.belongsToMany(Brand, { through: TypeBrend });
Brand.belongsToMany(Type, { through: TypeBrend });

//Экспортируем модели
module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  TypeBrend,
  DeviceInfo,
};
