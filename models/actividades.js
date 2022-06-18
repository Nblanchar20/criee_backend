"use strict";
module.exports = (sequelize, DataTypes) => {
  const Actividades = sequelize.define(
    "Actividades",
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
      descripcion_tecnica: {
        type: DataTypes.TEXT,
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
      vp_estado_actividad:{
        type: DataTypes.BIGINT(20),
        allowNull:false
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
      id_indicadores:{
        type: DataTypes.BIGINT(20),
        allowNull:false
      },
    },
    {
      tableName: "criie_actividades_proyecto",
      timestamps: false,
    }
  );

    Actividades.associate = function (models) {
        Actividades.belongsTo(models.Entregables, {
            foreignKey: "id_indicadores",
            as: "indicadores",
            });
    }


  return Actividades;
};
