"use strict";
module.exports = (sequelize, DataTypes) => {
  const SoportesTecnicos = sequelize.define(
    "SoportesTecnicos",
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
      ruta: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vp_tipo_soporte_tecnico: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
      id_entregables: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      }
    },
    {
      tableName: "criie_soportes_tecnicos",
      timestamps: false,
    }
  );

  SoportesTecnicos.associate = function (models) {
    SoportesTecnicos.belongsTo(models.Entregables, {
      foreignKey: "id_entregables",
      as: "entregables",
    });
  };

  return SoportesTecnicos;
};
