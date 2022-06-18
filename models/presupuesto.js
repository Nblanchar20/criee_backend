"use strict";
module.exports = (sequelize, DataTypes) => {
  const Presupuesto = sequelize.define(
    "Presupuesto",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      presupuesto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
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
      tableName: "criie_detalle_presupuesto_proyecto",
      timestamps: false,
    }
  );

  Presupuesto.associate = function (models) {
    Presupuesto.belongsTo(models.Proyectos, {
      foreignKey: "id_proyecto",
      as: "proyectos",
    });
  };

  return Presupuesto;
};
