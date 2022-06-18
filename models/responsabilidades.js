"use strict";
module.exports = (sequelize, DataTypes) => {
  const Responsabilidades = sequelize.define(
    "Responsabilidades",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      responsabilidades: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
      id_roles: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      }
    },
    {
      tableName: "criie_responsabilidades",
      timestamps: false,
    }
  );

  Responsabilidades.associate = function (models) {
    Responsabilidades.belongsTo(models.Roles, {
      foreignKey: "id_roles",
      as: "roles",
    });
  };

  return Responsabilidades;
};
