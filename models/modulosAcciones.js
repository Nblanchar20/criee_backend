"use strict";
module.exports = (sequelize, DataTypes) => {
  const ModulosAcciones = sequelize.define(
    "ModulosAcciones",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      id_acciones: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      id_modulos: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      tableName: "criie_modulos_acciones",
      timestamps: false,
    }
  );

  ModulosAcciones.associate = function (models) {
    ModulosAcciones.belongsTo(models.Acciones, {
      foreignKey: "id_acciones",
      as: "acciones",
    });
    ModulosAcciones.belongsTo(models.Modulos, {
      foreignKey: "id_modulos",
      as: "modulos",
    });
  };

  return ModulosAcciones;
};
