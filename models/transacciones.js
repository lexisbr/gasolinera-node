const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transacciones', {
    id_transaccion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tanque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tanque',
        key: 'id_tanque'
      }
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente',
        key: 'id_cliente'
      }
    },
    galones_servidos: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    tipo_pago: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    precio_por_galon: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    fecha_transaccion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empleado',
        key: 'id_empleado'
      }
    }
  }, {
    sequelize,
    tableName: 'transacciones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_transaccion" },
        ]
      },
      {
        name: "id_tanque",
        using: "BTREE",
        fields: [
          { name: "id_tanque" },
        ]
      },
      {
        name: "id_cliente",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
      {
        name: "id_empleado",
        using: "BTREE",
        fields: [
          { name: "id_empleado" },
        ]
      },
    ]
  });
};
