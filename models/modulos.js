"use strict";
module.exports = (sequelize, DataTypes) => {
  const Modulos = sequelize.define(
    "Modulos",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      tableName: "criie_modulos",
      timestamps: false,
    }
  );

  return Modulos;
};
