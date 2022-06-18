"use strict";
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define(
    "Usuarios",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      documento: {
        type: DataTypes.STRING(500),
        unique:true,
        allowNull: false,
      },
      nombres: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique:true,
      },
      telefono: {
        type: DataTypes.STRING(500),
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        allowNull: false,
      },id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      }
    },
    {
      tableName: "criie_usuarios",
      timestamps: false,
    }
  );
  Usuarios.associate = function (models) {
    Usuarios.belongsTo(models.Usuarios, {
      foreignKey: "id_usuarios",
      as: "usuarios",
      });
  }
  return Usuarios;
};
