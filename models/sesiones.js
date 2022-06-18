"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sesiones = sequelize.define(
    "Sesiones",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      fecha_sesion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      token_sesion: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      sesion_id: {
        type: DataTypes.STRING(500),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },
      id_usuarios: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
    },
    {
      tableName: "criie_sesiones",
      timestamps: false,
    }
  );

  Sesiones.associate = function (models) {
    Sesiones.belongsTo(models.Usuarios, {
      foreignKey: "id_usuarios",
      as: "usuarios",
    });
  };

  return Sesiones;
};
