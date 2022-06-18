"use strict";
module.exports = (sequelize, DataTypes) => {
  const Indicadores = sequelize.define(
    "Indicadores",
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
      id_proyectos: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      }
    },
    {
      tableName: "criie_indicadores",
      timestamps: false,
    }
  );

  Indicadores.associate = function (models) {
    Indicadores.belongsTo(models.Proyectos, {
      foreignKey: "id_proyectos",
      as: "proyectos",
    });
  };

  return Indicadores;
};
