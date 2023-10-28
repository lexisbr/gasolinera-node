const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tanque', {
    id_tanque: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_estacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estacion',
        key: 'id_estacion'
      }
    },
    capacididad_galones: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    nivel_actual_galones: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    tipo_gasolina: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tanque',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tanque" },
        ]
      },
      {
        name: "id_estacion",
        using: "BTREE",
        fields: [
          { name: "id_estacion" },
        ]
      },
    ]
  });
};
