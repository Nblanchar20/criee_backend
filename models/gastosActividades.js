"use strict";
module.exports = (sequelize, DataTypes) => {
  const GastosActividades = sequelize.define(
    "GastosActividades",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      gasto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
      id_actividades: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      }
    },
    {
      tableName: "criie_detalle_gasto_actividad",
      timestamps: false,
    }
  );

  GastosActividades.associate = function (models) {
    GastosActividades.belongsTo(models.Actividades, {
      foreignKey: "id_actividades",
      as: "actividades",
    });
  };

  return GastosActividades;
};
