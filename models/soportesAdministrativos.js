"use strict";
module.exports = (sequelize, DataTypes) => {
  const SoportesAdministrativos = sequelize.define(
    "SoportesAdministrativos",
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
      vp_tipo_soporte_administrativo: {
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
      tableName: "criie_soportes_administrativos",
      timestamps: false,
    }
  );

  SoportesAdministrativos.associate = function (models) {
    SoportesAdministrativos.belongsTo(models.Entregables, {
      foreignKey: "id_entregables",
      as: "entregables",
    });
  };

  return SoportesAdministrativos;
};
