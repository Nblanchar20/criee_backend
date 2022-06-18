"use strict";
module.exports = (sequelize, DataTypes) => {
  const ObjetivoProyectos = sequelize.define(
    "ObjetivoProyectos",
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
      descripcion:{
        type: DataTypes.TEXT,
        allowNull:false
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
      id_proyecto: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      }
    },
    {
      tableName: "criie_objetivos_proyecto",
      timestamps: false,
    }
  );

  ObjetivoProyectos.associate = function (models) {
    ObjetivoProyectos.belongsTo(models.Proyectos, {
      foreignKey: "id_proyecto",
      as: "proyectos",
    });
  };

  return ObjetivoProyectos;
};
