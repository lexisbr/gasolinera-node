var DataTypes = require("sequelize").DataTypes;
var _cliente = require("./cliente");
var _empleado = require("./empleado");
var _estacion = require("./estacion");
var _tanque = require("./tanque");
var _transacciones = require("./transacciones");

function initModels(sequelize) {
  var cliente = _cliente(sequelize, DataTypes);
  var empleado = _empleado(sequelize, DataTypes);
  var estacion = _estacion(sequelize, DataTypes);
  var tanque = _tanque(sequelize, DataTypes);
  var transacciones = _transacciones(sequelize, DataTypes);

  transacciones.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(transacciones, { as: "transacciones", foreignKey: "id_cliente"});
  transacciones.belongsTo(empleado, { as: "id_empleado_empleado", foreignKey: "id_empleado"});
  empleado.hasMany(transacciones, { as: "transacciones", foreignKey: "id_empleado"});
  tanque.belongsTo(estacion, { as: "id_estacion_estacion", foreignKey: "id_estacion"});
  estacion.hasMany(tanque, { as: "tanques", foreignKey: "id_estacion"});
  transacciones.belongsTo(tanque, { as: "id_tanque_tanque", foreignKey: "id_tanque"});
  tanque.hasMany(transacciones, { as: "transacciones", foreignKey: "id_tanque"});

  return {
    cliente,
    empleado,
    estacion,
    tanque,
    transacciones,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
