"use strict";
module.exports = (sequelize, DataTypes) => {
  const Entregables = sequelize.define(
    "Entregables",
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
      descripcion: {
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
      tableName: "criie_entregables_proyecto",
      timestamps: false,
    }
  );

  Entregables.associate = function (models) {
    Entregables.belongsTo(models.Proyectos, {
      foreignKey: "id_proyectos",
      as: "proyectos",
    });
  };

  return Entregables;
};
