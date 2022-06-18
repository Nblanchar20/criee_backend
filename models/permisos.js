"use strict";
module.exports = (sequelize, DataTypes) => {
  const Permisos = sequelize.define(
    "Permisos",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      id_grupos_usuarios: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      id_modulos_acciones: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      tableName: "criie_permisos",
      timestamps: false,
    }
  );

  Permisos.associate = function (models) {
    Permisos.belongsTo(models.GrupoUsuarios, {
      foreignKey: "id_grupos_usuarios",
      as: "grupoUsuarios",
    });
    Permisos.belongsTo(models.ModulosAcciones, {
      foreignKey: "id_modulos_acciones",
      as: "modulosAcciones",
    });
  };

  return Permisos;
};
