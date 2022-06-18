"use strict";
module.exports = (sequelize, DataTypes) => {
  const Proyectos = sequelize.define(
    "Proyectos",
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
      fecha_inicio:{
        type: DataTypes.DATE,
        allowNull:false
      },
      fecha_fin:{
        type: DataTypes.DATE,
        allowNull:false
      },
      fecha_inicio_esperado:{
        type: DataTypes.DATE,
        allowNull:false
      },
      fecha_fin_esperado:{
        type: DataTypes.DATE,
        allowNull:false
      },
      alcance:{
        type: DataTypes.TEXT,
        allowNull:false
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      tableName: "criie_proyecto",
      timestamps: false,
    }
  );

  Proyectos.associate = function (models) {
    Proyectos.hasMany(models.Objetivoproyectos, {
      foreignKey: "id_proyecto",
      as: "valoresParametros",
    });
  };

  return Proyectos;
};
