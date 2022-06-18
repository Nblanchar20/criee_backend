"use strict";
module.exports = (sequelize, DataTypes) => {
  const SoportesFinancieros = sequelize.define(
    "SoportesFinancieros",
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
      vp_tipo_soporte_financieros: {
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
      tableName: "criie_soportes_financieros",
      timestamps: false,
    }
  );

  SoportesFinancieros.associate = function (models) {
    SoportesFinancieros.belongsTo(models.Entregables, {
      foreignKey: "id_entregables",
      as: "entregables",
    });
  };

  return SoportesFinancieros;
};
