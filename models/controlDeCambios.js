"use strict";
module.exports = (sequelize, DataTypes) => {
  const ControlDeCambios = sequelize.define(
    "ControlDeCambios",
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
      vp_tipo_soporte_control_cambio: {
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
      },
      id_usuarios: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      }
    },
    {
      tableName: "criie_control_cambios",
      timestamps: false,
    }
  );

  ControlDeCambios.associate = function (models) {
    ControlDeCambios.belongsTo(models.Entregables, {
      foreignKey: "id_entregables",
      as: "entregables",
    });
    ControlDeCambios.belongsTo(models.Usuarios, {
      foreignKey: "id_usuarios",
      as: "usuarios",
    });
  };

  return ControlDeCambios;
};
