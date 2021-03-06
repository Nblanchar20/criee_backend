"use strict";
module.exports = (sequelize, DataTypes) => {
  const Objetivos = sequelize.define(
    "Objetivos",
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
      id_proyectos: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      }
    },
    {
      tableName: "criie_objetivos_proyecto",
      timestamps: false,
    }
  );

  Objetivos.associate = function (models) {
    Objetivos.belongsTo(models.Proyectos, {
      foreignKey: "id_proyectos",
      as: "proyectos",
    });
  };

  return Objetivos;
};
